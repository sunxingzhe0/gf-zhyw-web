<template>
	<div class="tasks-main">
		<div class="layout-title">
			<span class="label">保养任务</span>
			<span class="filter">
				<el-select
					size="mini"
					placeholder="设备类型"
					v-model="TaskType"
					class="e-type"
					@change="getList()"
				>
					<el-option label="全部" value="-1"></el-option>
					<el-option label="保养周期" value="1"></el-option>
					<el-option label="保养后运行时长" value="2"></el-option>
					<el-option label="保养累积时长" value="3"></el-option>
				</el-select>
				<el-select
					placeholder="请选择"
					size="mini"
					v-model="searchType"
				>
					<el-option label="开始时间" value="1"></el-option>
					<el-option label="结束时间" value="2"></el-option>
					<el-option label="任务名称" value="3"></el-option>
				</el-select>
				<el-date-picker
					v-model="time"
					size="mini"
					type="datetimerange"
					range-separator="至"
					start-placeholder="开始日期"
					end-placeholder="结束日期"
					@change="getList()"
				>
				</el-date-picker>
			</span>
		</div>
		<div class="task-content">
			<div class="table-main" v-loading="loading">
				<div
					class="card-item task-item"
					v-for="(item, index) in list"
					:key="index"
				>
					<div class="card-content">
						<div class="card-infos">
							<div class="card-info">
								<span
									class="card-title name"
									title="是范德萨范德萨发"
								>
									反倒是发送到发送到发送到
								</span>
								<span class="card-level">保养等级</span>
								<span class="card-title">保养周期</span>
							</div>
							<div class="card-info item">
								<span>
									任务时间：2020-11-11 09:00:00 ~ 09:30:00
								</span>
							</div>
							<div class="card-info item">
								<span>完成度：</span>
								<span>
									<el-progress :percentage="50"></el-progress>
								</span>
							</div>
							<div class="card-info item">
								<span>当前进度：</span>
								<span>
									<el-progress
										:percentage="100"
									></el-progress>
								</span>
							</div>
							<div class="card-info">
								<span>保养总数：202</span>
								<span class="success">已完成：100</span>
								<span class="fail">未执行：0</span>
								<span class="fail">进行中：0</span>
							</div>
							<div class="card-info">
								<span>超时完成：2</span>
								<span>已关闭：2</span>
								<span>已关闭：2</span>
								<span class="fail">已超时：0</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="table-page">
				<el-pagination
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page="pageNum"
					:page-sizes="[9, 18, 27, 36]"
					:page-size="pageSize"
					layout="total, sizes, prev, pager, next, jumper"
					:total="total"
				>
				</el-pagination>
			</div>
		</div>
	</div>
</template>
<script>
import maintain from "@/api/operations/maintain"
export default {
	data() {
		return {
			TaskType: "",
			searchType: "",
			time: [],
			pageNum: 1,
			pageSize: 9,
			total: 200,
			list: [],
			loading: false,
		}
	},
	created() {
		this.getList()
	},
	methods: {
		handleSizeChange(val) {
			this.pageSize = val
			this.getList()
		},
		handleCurrentChange(val) {
			this.pageNum = val
			this.getList()
		},
		async getList() {
			this.loading = true
			let res = await maintain.plan.getTaskList({
				pageNum: this.pageNum,
				pageSize: this.pageSize,
				TaskType: this.TaskType,
				searchType: this.searchType,
				time: this.time,
				planid: this.$route.query.planId,
			})
			this.list = res.list
			this.loading = false
		},
	},
}
</script>
<style lang="scss">
.tasks-main {
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
			.e-type {
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
	.task-content {
		margin-top: 20px;
		.table-main {
			display: flex;
			flex-wrap: wrap;
			.card-item {
				width: 32.75%;
				margin-bottom: 10px;
				padding: 10px 10px 0;
				background: rgba(51, 51, 51, 0.6);
				box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
				margin-right: 10px;
				&:nth-of-type(3n) {
					margin-right: 0px;
				}
				.card-content {
					display: flex;
					margin-bottom: 10px;
					.card-infos {
						flex: 1;
						.card-info {
							display: flex;
							font-size: 12px;
							line-height: 14px;
							margin-top: 10px;
							font-family: PingFang SC;
							font-weight: 500;
							color: #b3b3b3;
							justify-content: space-between;
						}
					}
				}
			}
			.task-item {
				padding-bottom: 10px !important;
				cursor: pointer;
				.card-info {
					color: #e6e6e6;
					.success {
						color: #42d36b;
					}
					.fail {
						color: #808080;
					}
					.name {
						max-width: calc(100% - 150px);
					}
					.el-progress__text {
						font-size: 12px !important;
						color: #0071e3;
					}
					.el-progress-bar__outer {
						background-color: #1a1a1a;
					}
				}
				.item {
					display: flex;
					& > span:last-child {
						flex: 1;
					}
				}
				.card-level {
					background: rgba(247, 74, 74, 0.2);
					padding: 1px 2px;
					font-size: 10px;
					font-family: PingFang SC;
					font-weight: 500;
					color: #f74a4a;
				}
			}
		}
		.table-page {
			padding-top: 10px;
		}
	}
}
</style>
