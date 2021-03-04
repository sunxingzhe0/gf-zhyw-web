<template>
	<div class="task-record-main" v-loading="loading">
		<div class="task-layout-title">
			<span class="label">保养明细</span>
			<span class="filter">
				<el-input
					size="small"
					placeholder="请输入"
					v-model="query.keyword"
					class="input-with-select-search"
				>
					<el-select
						slot="prepend"
						placeholder="请选择"
						size="small"
						v-model="query.searchType"
					>
						<el-option label="设备名称" value="1"></el-option>
						<el-option label="设备编号" value="2"></el-option>
					</el-select>
				</el-input>
				<el-select
					size="mini"
					placeholder="设备状态"
					v-model="query.TaskStatus"
				>
					<el-option label="全部" value="-1"></el-option>
					<el-option label="已完成" value="Completed"></el-option>
					<el-option label="已超时" value="Timedout"></el-option>
					<el-option label="已终止" value="Terminated"></el-option>
					<el-option
						label="超时完成"
						value="TimeoutCompleted"
					></el-option>
				</el-select>
				<el-select
					placeholder="请选择"
					size="mini"
					v-model="query.timeType"
				>
					<el-option label="任务时间" value="1"></el-option>
					<el-option label="执行时间" value="2"></el-option>
					<el-option label="任务名称" value="3"></el-option>
				</el-select>
				<el-date-picker
					v-model="query.time"
					size="mini"
					type="datetimerange"
					range-separator="至"
					start-placeholder="开始日期"
					end-placeholder="结束日期"
				>
				</el-date-picker>
			</span>
		</div>
		<div class="record-content">
			<div
				class="content-item"
				v-for="(item, index) in records"
				:key="index"
			>
				<div class="left">
					<span
						class="name"
						:title="'[ ' + item.etypeName + ' ]  ' + item.ename"
						>[ {{ item.etypeName }} ] {{ item.ename }}</span
					>
					<span
						class="success"
						v-if="
							item.status == '正常' &&
								index + 1 != 4 &&
								index + 1 != 5
						"
						>正常</span
					>
					<span
						class="fail"
						v-else-if="index + 1 != 4 && index + 1 != 5"
					>
						<span>异常</span>
						<el-button type="text" size="mini">查看</el-button>
					</span>
				</div>
				<div
					class="right nocontent"
					v-if="index + 1 == 4 || index + 1 == 5"
				>
					<div class="header">
						<span class="time">任务时间：{{ item.taskTime }}</span>
						<span>
							<el-button
								class="maintian"
								size="small"
								@click="showOrderdetail(item.id)"
								>保养</el-button
							>
						</span>
					</div>
				</div>
				<div class="right" v-else>
					<div class="header">
						<span class="time">任务时间：{{ item.taskTime }}</span>
						<span class="time"
							>保养时间：{{ item.maintainTime }}</span
						>
						<span class="fail" v-if="item.status == '异常'"
							>异常</span
						>
						<span class="success" v-else>正常</span>
					</div>
					<div class="contents">
						<div
							class="item"
							v-for="(citem, cindex) in item.contents"
							:key="cindex"
						>
							<span>{{ cindex + 1 }}.{{ citem.name }} </span>
							<span>执行人：{{ citem.executionUser }} </span>
							<span
								:class="
									citem.status == 2 && item.status == '异常'
										? 'fail'
										: ''
								"
								>执行时间：{{ citem.executionDate }}</span
							>
						</div>
					</div>
					<div class="remak">
						{{ item.remark }}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import maintain from "@/api/operations/maintain"
export default {
	data() {
		return {
			query: {
				keyword: "",
				searchType: "1",
				TaskStatus: "-1",
				timeType: "1",
				time: [],
				planid: this.$route.planId ? this.$route.planId : "",
			},
			records: [],
			loading: false,
		}
	},
	created() {
		this.getRecord()
	},
	methods: {
		async getRecord() {
			this.loading = true
			this.records = await maintain.task.getRecord(this.query)
			this.loading = false
		},
		showOrderdetail(id) {
			this.$router.push({
				path: "/operations/maintain/order/detail",
				query: {
					orderId: id,
					nav: "first",
				},
			})
		},
	},
}
</script>
<style lang="scss">
.task-record-main {
	.task-layout-title {
		display: flex;
		justify-content: space-between;
		.label {
			position: relative;
			font-size: 16px;
			color: #fff;
			padding-left: 10px;
			line-height: 16px;
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
		.filter {
			.el-select {
				width: 100px;
			}
			.el-date-editor {
				width: 200px;
			}
			.input-with-select-search {
				width: 250px;
				margin-right: 20px;
				.el-input-group__prepend {
					width: 100px !important;
					color: #0071e3;
					background: transparent;
					border-color: #4d4d4d;
				}
			}
		}
	}
	.record-content {
		padding: 20px 8% 20px 5%;
		background: rgba(26, 26, 26, 0.8);
		margin-top: 20px;
		.content-item {
			display: flex;
			min-height: 36px;
			.left {
				margin-right: 25px;
				min-width: 245px;
				position: relative;
				display: flex;
				.success {
					color: #42d36b;
					margin-left: 20px;
					font-size: 12px;
				}
				.fail {
					width: 24px;
					margin-left: 20px;
					color: #f74a4a;
					display: flex;
					font-size: 12px;
					flex-direction: column;
					.el-button {
						padding: 0px;
						margin: 0px;
						margin-top: 10px;
					}
				}
				&::before {
					content: "";
					position: absolute;
					right: -31px;
					top: 0;
					width: 12px;
					height: 12px;
					background: #cccccc;
					border-radius: 50%;
				}
				&::after {
					content: "";
					position: absolute;
					right: -26px;
					top: 0;
					width: 2px;
					height: 100%;
					background: rgba(255, 255, 255, 0.2);
				}
			}
			.name {
				font-size: 12px;
				font-family: PingFang SC;
				font-weight: 500;
				color: #ffffff;
				text-align: right;
				width: 200px;
				white-space: nowrap;
				overflow: hidden;
				cursor: pointer;
			}
			.right {
				margin-left: 25px;
				flex: 1;
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
				.maintian {
					padding: 0px;
					font-size: 12px;
					color: #0071e3;
					background: transparent;
					border: 1px solid #0071e3;
					border-radius: 2px;
					padding: 7px;
				}
			}
			.nocontent {
				.header {
					margin-bottom: 20px;
				}
			}
		}
	}
}
</style>
