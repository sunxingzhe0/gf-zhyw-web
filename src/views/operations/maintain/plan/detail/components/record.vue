<template>
	<div class="record-main" v-loading="loading">
		<div class="layout-title">
			<span class="label">保养明细</span>
			<span class="filter">
				<el-select
					size="mini"
					placeholder="设备状态"
					v-model="TaskStatus"
					class="e-status"
					@change="getRecord()"
				>
					<el-option label="全部" value="all"></el-option>
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
					v-model="searchType"
				>
					<el-option label="任务时间" value="1"></el-option>
					<el-option label="执行时间" value="2"></el-option>
					<el-option label="任务名称" value="3"></el-option>
				</el-select>
				<el-date-picker
					v-model="time"
					size="mini"
					type="datetimerange"
					range-separator="至"
					start-placeholder="开始日期"
					end-placeholder="结束日期"
					@change="getRecord()"
				>
				</el-date-picker>
			</span>
		</div>
		<div class="record-content" v-if="records">
			<div
				class="content-item"
				v-for="(item, index) in records"
				:key="index"
			>
				<div class="item-head">
					<div class="name">{{ item.name }}</div>
					<div class="time">
						<span>任务时间：{{ item.taskTime }}</span>
						<span>执行时间：{{ item.executionTime }}</span>
					</div>
				</div>
				<div
					class="many-times"
					v-for="(items, indexs) in item.timeInterval"
					:key="indexs"
				>
					<div class="time-interval">
						{{ indexs + 1 }}.第{{
							intToChinese(indexs)
						}}次保养时段：09:00 ~ 10:00
					</div>
					<div class="item-ponit">
						<div class="ponit">
							<div class="name left frist">
								<span class="ponitName">{{
									items.ponitName
								}}</span>
							</div>
							<div class="time right">
								<span>保养时间：{{ items.maintainTime }}</span>
								<span class="success" v-if="indexs % 2 == 0"
									>正常</span
								>
								<span class="fail" v-else>超时</span>
							</div>
						</div>
						<div
							class="ponit"
							v-for="(eitem, eindex) in items.equipments"
							:key="eindex"
						>
							<div class="name left">
								<span class="ename">{{ eitem.ename }}</span>
								<span
									class="success"
									v-if="eitem.status == '正常'"
									>正常</span
								>
								<span class="fail" v-else>
									<div>异常</div>
									<el-button
										size="mini"
										type="text"
										@click="showTask(item.id)"
										>查看</el-button
									>
								</span>
							</div>
							<div class="contents right">
								<div
									class="item"
									v-for="(citem, cindex) in eitem.contents"
									:key="cindex"
								>
									<span
										>{{ cindex + 1 }}.{{ citem.name }}
									</span>
									<span
										>执行人：{{
											citem.executionUser
										}}
										执行时间：{{
											citem.executionDate
										}}</span
									>
								</div>
							</div>
						</div>
						<div class="ponit">
							<div class="name left last"></div>
							<div class="remak right">
								{{ items.remark }}
							</div>
						</div>
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
			TaskStatus: "",
			searchType: "1",
			time: [],
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
			this.records = await maintain.plan.getRecord({
				TaskStatus: this.TaskStatus,
				searchType: this.searchType,
				time: this.time,
				planid: this.$route.planId ? this.$route.planId : "",
			})
			this.loading = false
		},
		intToChinese(val) {
			let chin_list = [
				"一",
				"二",
				"三",
				"四",
				"五",
				"六",
				"七",
				"八",
				"九",
				"十",
			] //所有的数值对应的汉字
			let sn = parseInt(val) + 1 //这里由于我的后台是从0开始排序
			if (sn <= 10) {
				return chin_list[sn - 1]
			} else if (sn <= 100) {
				if (sn < 20) return "十" + chin_list[(sn % 10) - 1]
				if (sn % 10 == 0)
					return chin_list[Math.floor(sn / 10) - 1] + "十"
				else
					return (
						chin_list[Math.floor(sn / 10) - 1] +
						"十" +
						chin_list[(sn % 10) - 1]
					)
			} else {
				//可以支持更多
			}
		},
		showTask(id) {
			this.$router.push({
				path: "/operations/maintain/task/detail",
				query: { taskId: id, nav: "1" },
			})
		},
	},
}
</script>
<style lang="scss">
.record-main {
	.layout-title {
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
			.e-status {
				margin-right: 10px;
			}
			.el-select {
				width: 150px;
			}
			.el-date-editor {
				width: 350px;
			}
		}
	}
	.record-content {
		padding-top: 20px;
		.content-item {
			margin-bottom: 20px;
			background: rgba(26, 26, 26, 0.8);
			padding: 20px;
			&:last-child {
				margin-bottom: 0px;
			}
			.item-head {
				display: flex;
				justify-content: space-between;
				margin-bottom: 20px;
				.name {
					font-size: 14px;
					font-family: PingFang SC;
					font-weight: 500;
					color: #ffffff;
				}
				.time {
					font-size: 12px;
					font-family: PingFang SC;
					font-weight: 500;
					color: #b3b3b3;
					span {
						margin-left: 20px;
					}
				}
			}
			.many-times {
				margin-top: 20px;
			}
			.time-interval {
				font-size: 14px;
				font-family: PingFang SC;
				font-weight: 500;
				color: #ffffff;
				margin-bottom: 20px;
			}
			.item-ponit {
				padding: 0px 8%;
				.ponit {
					display: flex;
					min-height: 36px;
					.left {
						margin-right: 25px;
						min-width: 105px;
						position: relative;
						display: flex;
						.success {
							color: #42d36b;
							margin-left: 20px;
						}
						.fail {
							width: 24px;
							margin-left: 20px;
							color: #f74a4a;
							display: flex;
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
							right: -29px;
							top: 0;
							width: 8px;
							height: 8px;
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
					.frist {
						&::before {
							content: "";
							right: -31px;
							width: 12px;
							height: 12px;
						}
					}
					.last {
						&::before {
							display: none;
						}
					}
					.name {
						font-size: 12px;
						font-family: PingFang SC;
						font-weight: 500;
						color: #ffffff;
						text-align: right;
					}
					.ponitName {
						width: 105px;
						white-space: nowrap;
						overflow: hidden;
					}
					.ename {
						width: 60px;
						overflow: hidden;
						white-space: nowrap;
					}
					.right {
						margin-left: 25px;
						flex: 1;
					}
					.time {
						color: #fff;
						font-size: 12px;
						line-height: 12px;
						.success {
							color: #42d36b;
							margin-left: 20px;
						}
						.fail {
							margin-left: 20px;
							color: #f74a4a;
						}
					}
					.contents {
						background: rgba(255, 255, 255, 0.1);
						border-radius: 0px 6px 6px 6px;
						padding: 10px;
						margin-bottom: 20px;
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
						}
					}
					.remak {
						font-size: 12px;
						font-weight: 500;
						color: #ffffff;
						line-height: 18px;
					}
				}
			}
		}
	}
}
</style>
