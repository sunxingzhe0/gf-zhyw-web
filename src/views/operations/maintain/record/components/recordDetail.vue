<template>
	<div class="m-record" v-loading="loading">
		<div class="layout-title">
			<span class="label">保养明细</span>
		</div>
		<div class="equipmentinfo" v-if="record">
			<div class="title">
				<span class="name"
					>[ {{ record.etypeName }} ] {{ record.ename }}</span
				>
				<span class="success" v-if="record.status == '正常'">正常</span>
				<span class="fail" v-else>异常</span>
			</div>
			<div class="header">
				<span class="time">任务时间：{{ record.taskTime }}</span>
				<span class="time">保养时间：{{ record.maintainTime }}</span>
				<span class="fail" v-if="record.status == '异常'">异常</span>
				<span class="success" v-else>正常</span>
			</div>
			<div class="contents">
				<div
					class="item"
					v-for="(citem, cindex) in record.contents"
					:key="cindex"
				>
					<span>{{ cindex + 1 }}.{{ citem.name }} </span>
					<span>执行人：{{ citem.executionUser }} </span>
					<span
						:class="
							citem.status == 2 && record.status == '异常'
								? 'fail'
								: ''
						"
						>执行时间：{{ citem.executionDate }}</span
					>
				</div>
			</div>
			<div class="remak">
				{{ record.remark }}
			</div>
		</div>
		<div class="layout-title">
			<span class="label">所属保养任务信息</span>
		</div>
		<div class="basicinfo" v-if="baseInfo">
			<div class="basicinfoitem">
				<span class="infolabel">任务名称:</span>
				<span> {{ baseInfo.name }}</span>
			</div>
			<div class="basicinfoitem">
				<span class="infolabel">任务编号:</span>
				<span> {{ baseInfo.id }}</span>
			</div>
			<div class="basicinfoitem">
				<span class="infolabel">执行部门:</span>
				<span> {{ baseInfo.dept }}</span>
			</div>
			<div class="basicinfoitem">
				<span class="infolabel">执行人:</span>
				<span> {{ baseInfo.executor }}</span>
			</div>
			<div class="basicinfoitem">
				<span class="infolabel">状态:</span>
				<span> {{ baseInfo.status ? "启用" : "停用" }}</span>
			</div>
			<div class="basicinfoitem">
				<span class="infolabel">创建人:</span>
				<span> {{ baseInfo.createuserName }}</span>
			</div>
			<div class="basicinfoitem">
				<span class="infolabel">创建时间:</span>
				<span> {{ baseInfo.createTime }}</span>
			</div>
			<div class="basicinfoitem contents">
				<span class="infolabel">保养规则:</span>
				<span>
					<div
						v-for="(item, index) in baseInfo.mrules"
						:key="index"
						class="rule-item"
					>
						<span>{{ getrule(item, index) }} </span>
						<span>保养等级: 日常保养</span>
					</div>
				</span>
			</div>
			<div class="basicinfoitem contents">
				<span class="infolabel">保养进度:</span>
				<span>
					<div class="progress">
						<div class="header">
							<div>保养总数: 108</div>
							<div>
								<span class="white">已完成：100</span>
								<span class="white">超时完成：2</span>
								<span class="white">已关闭：2</span>
								<span class="white">已终止：2</span>
								<span class="black">已超时：0</span>
								<span class="black">进行中：0</span>
								<span class="black">未执行：0</span>
							</div>
						</div>
						<div class="complete">
							<span>完成度：</span>
							<span>
								<el-progress :percentage="50"></el-progress>
							</span>
						</div>
						<div class="current">
							<span>当前进度：</span>
							<span>
								<el-progress :percentage="50"></el-progress>
							</span>
						</div>
					</div>
				</span>
			</div>
		</div>
	</div>
</template>
<script>
import maintain from "@/api/operations/maintain"
export default {
	name: "recordDetail",
	data() {
		return {
			data: null,
			loading: false,
			baseInfo: null,
			record: null,
		}
	},
	props: {
		taskId: {
			type: String,
			default: "",
		},
	},
	async created() {
		this.loading = true
		this.record = await maintain.record.getRecord({
			recordid: this.recordid,
		})
		this.baseInfo = await maintain.plan.detail.getPlanInfo({
			taskId: this.taskId,
		})
		this.loading = false
	},
	methods: {
		getrule(item, index) {
			let text = index + 1 + "."
			if (item.value.id == "a") {
				text += "保养周期: " + item.value.cycle + item.value.company
			} else if (item.value.id == "b") {
				text +=
					"保养后运行: " +
					item.value.hour +
					"小时, 初始化时间为" +
					item.value.initialization
			} else if (item.value.id == "c") {
				text += "累积运行: " + item.value.accumulate + "小时"
			}
			return text
		},
	},
}
</script>
<style lang="scss">
.m-record {
	padding: 20px;
	.layout-title {
		height: 16px;
		.label {
			position: relative;
			font-size: 16px;
			color: #fff;
			padding-left: 10px;
			line-height: 16px !important;
			&::before {
				content: "";
				position: absolute;
				left: 0;
				top: 0px;
				width: 2px;
				height: 16px;
				background: #0071e3;
			}
		}
	}
	.equipmentinfo {
		width: 100%;
		padding: 20px 20px;
		background: rgba(26, 26, 26, 0.8);
		margin-top: 10px;
		margin-bottom: 20px;
		.title {
			margin-bottom: 10px;
			.name {
				font-size: 14px;
				color: #fff;
			}
			.success {
				color: #42d36b;
				margin-left: 20px;
				font-size: 12px;
			}
			.fail {
				margin-left: 20px;
				color: #f74a4a;
				font-size: 12px;
			}
		}
		.header {
			margin-bottom: 10px;
			line-height: 12px;
			.success {
				color: #42d36b;
				margin-left: 20px;
				font-size: 12px;
			}
			.time {
				font-size: 12px;
				margin-right: 20px;
				color: #ffffff;
			}
			.fail {
				margin-left: 20px;
				color: #f74a4a;
				font-size: 12px;
			}
		}
		.contents {
			background: rgba(255, 255, 255, 0.1);
			border-radius: 0px 6px 6px 6px;
			padding: 10px;
			margin-bottom: 10px;
			.item {
				color: #fff;
				font-size: 12px;
				line-height: 12px;
				margin-bottom: 10px;
				&:last-child {
					margin-bottom: 0px;
				}
				span {
					margin-right: 20px;
				}
				.fail {
					color: #f74a4a;
					font-size: 12px;
				}
			}
		}
		.remak {
			font-size: 12px;
			color: #ffffff;
			line-height: 18px;
			margin-bottom: 20px;
		}
	}
	.basicinfo {
		width: 100%;
		margin-top: 20px;
		.basicinfoitem {
			width: 33.3%;
			display: inline-block;
			font-size: 14px;
			color: #fff;
			margin-bottom: 20px;
			overflow: hidden;
			.infolabel {
				margin-right: 10px;
			}
			.index {
				margin-right: 10px;
			}
		}
		.contents {
			width: 100%;
			overflow: none;
			white-space: normal;
			display: flex;
			span:last-child {
				flex: 1;
				div {
					line-height: 22px;
				}
			}
			.rule-item {
				span {
					margin-right: 20px;
				}
			}
			.progress {
				background: rgba(26, 26, 26, 0.8);
				padding: 20px;
				.header {
					display: flex;
					justify-content: space-between;
					margin-bottom: 10px;
					div {
						line-height: 14px;
						span {
							margin-left: 15px;
						}
					}
					.black {
						color: #808080;
					}
				}
				.complete {
					margin-bottom: 10px;
				}
				.complete,
				.current {
					display: flex;
					span:first-of-type {
						width: 60px;
						margin-right: 10px;
						font-size: 12px;
						color: #e6e6e6;
					}
				}
				.el-progress__text {
					font-size: 12px !important;
					color: #0071e3;
				}
				.el-progress-bar__outer {
					background-color: #333333;
				}
			}
		}
	}
}
</style>
