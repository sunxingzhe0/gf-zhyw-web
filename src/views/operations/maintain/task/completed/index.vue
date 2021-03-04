<template>
	<div class="word">
		<CardList
			:fetcher="fetcher"
			:renderFunc="renderFunc"
			:params="params"
			ref="pagelist"
		></CardList>
		<router-view></router-view>
	</div>
</template>
<script>
/*
@author        cui
@name          OperationsMaintainTaskCompleted
@desc          保养任务已完成
@query         
@props         
@emit           
*/
import { CardList } from "@/components/App"
import maintain from "@/api/operations/maintain"
export default {
	name: "OperationsMaintainTaskCompleted",
	meta: {
		sort: 3,
		title: "已完成",
		hideMenu: true,
	},
	components: {
		CardList,
	},
	props: {
		query: Object,
	},
	watch: {
		query: () => {
			console.log(this.query)
		},
	},
	data() {
		return {
			fetcher: maintain.task.getTaskList,
			params: [
				{
					key: "time",
					default: this.time,
				},
				{
					key: "TaskStatus",
					default: "Completed",
				},
			],
		}
	},
	methods: {
		renderFunc(item) {
			return (
				<div
					class="card-item task-item"
					onClick={() => this.showDetail(item.id)}
				>
					<div class="card-content">
						<div class="card-infos">
							<div class="card-info">
								<span class="card-title name" title={item.name}>
									{item.name}
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
									<el-progress percentage={50}></el-progress>
								</span>
							</div>
							<div class="card-info item">
								<span>当前进度：</span>
								<span>
									<el-progress percentage={100}></el-progress>
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
			)
		},
		showDetail(id) {
			this.$router.push({
				path: "/operations/maintain/task/detail",
				query: { taskId: id, nav: "0", status: "completed" },
			})
		},
	},
}
</script>
<style lang="scss">
.word {
	height: calc(100% - 220px);
	.card-list-header {
		border-top: none;
		display: none;
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
</style>
