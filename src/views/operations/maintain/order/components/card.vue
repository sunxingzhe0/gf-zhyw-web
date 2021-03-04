<template>
	<div>
		<div
			class="item"
			v-for="(item, index) in datas"
			:key="index"
			@click="show(item)"
		>
			<div class="item-content">
				<div class="head-title">
					<div class="left">{{ item.type }} ({{ item.no }})</div>
					<div class="right">
						{{
							item.status == 1
								? "待处理"
								: item.status == 2
								? "待接单"
								: item.status == 3
								? "进行中"
								: item.status == 4
								? "挂起中"
								: item.status == 5
								? "待审核"
								: item.status == 6
								? "待评价"
								: item.status == 7
								? "已完成"
								: ""
						}}
					</div>
				</div>
				<div class="head">
					<div class="status bg">
						<svg class="iconfont" aria-hidden="true">
							<use xlink:href="#icondanzi"></use>
						</svg>
					</div>
					<div class="info">
						<div class="name">
							{{ item.ename }} ({{ item.etype }})
						</div>
						<div class="cycle">
							登记时间: {{ item.registerTime }}
						</div>
						<div class="cycle">所属保养任务: {{ item.task }}</div>
						<div class="cycle">所属保养记录: {{ item.record }}</div>
					</div>
				</div>
				<div class="footer">
					<el-button
						type="text"
						@click.stop="distribute(item)"
						v-if="item.status == 1"
						>派单</el-button
					>
					<el-button
						type="text"
						@click.stop="receiving(item)"
						v-if="item.status == 2"
						>接单</el-button
					>
					<div class="btns" v-else-if="item.status == 3">
						<div>
							<el-button type="text" @click.stop="end(item)"
								>结束</el-button
							>
						</div>
						<div>
							<el-button
								type="text"
								class="xz"
								@click.stop="assist(item)"
								>协助</el-button
							>
						</div>
						<div>
							<el-button
								type="text"
								class="zd"
								@click.stop="transfer(item)"
								>转单</el-button
							>
						</div>
						<div>
							<el-button
								type="text"
								class="gq"
								@click.stop="hangUp(item)"
								>挂起</el-button
							>
						</div>
					</div>
					<el-button
						type="text"
						@click.stop="recovery(item)"
						v-if="item.status == 4"
						>恢复</el-button
					>
					<div class="btns" v-else-if="item.status == 5">
						<div>
							<el-button type="text" @click.stop="agree(item)"
								>同意</el-button
							>
						</div>
						<div>
							<el-button
								type="text"
								class="jj"
								@click.stop="refuse(item)"
								>拒绝</el-button
							>
						</div>
					</div>
					<el-button
						type="text"
						@click.stop="evaluate(item)"
						v-if="item.status == 6"
						>评价</el-button
					>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: "card",
	props: {
		datas: {
			type: Array,
		},
	},
	methods: {
		//详情
		show(item) {
			this.$emit("show", item)
		},
		//派单
		distribute(item) {
			this.$emit("distribute", item)
		},
		//接单
		receiving(item) {
			this.$emit("receiving", item)
		},
		//结束
		end(item) {
			this.$emit("end", item)
		},
		//转单
		transfer(item) {
			this.$emit("transfer", item)
		},
		//协助
		assist(item) {
			this.$emit("assist", item)
		},
		//挂起
		hangUp(item) {
			this.$emit("hangUp", item)
		},
		//恢复
		recovery(item) {
			this.$emit("recovery", item)
		},
		//同意
		agree(item) {
			this.$emit("agree", item)
		},
		//拒绝
		refuse(item) {
			this.$emit("refuse", item)
		},
		//评价
		evaluate(item) {
			this.$emit("evaluate", item)
		},
	},
}
</script>

<style lang="scss" scoped>
.item {
	background: rgba(51, 51, 51, 0.6);
	box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
	margin: 10px 20px;
	.item-content {
		padding: 10px;
		box-sizing: border-box;
	}
	.head-title {
		display: flex;
		justify-content: space-between;
		font-size: 14px;
		padding-bottom: 10px;
		line-height: 14px;
		border-bottom: 1px solid rgba(255, 255, 255, 0.2);
		margin-bottom: 10px;
	}
	.head {
		display: flex;
		padding-bottom: 10px;
		border-bottom: 1px solid rgba(255, 255, 255, 0.2);
		.info {
			flex: 1;
			margin: 0px 10px;
			overflow: hidden;
			.cycle {
				font-size: 12px;
				color: #b3b3b3;
				margin-top: 10px;
				line-height: 12px;
				display: flex;
				div {
					padding: 0px 10px;
					border-right: 1px solid rgba(255, 255, 255, 0.2);
					white-space: nowrap;
				}
				div:first-child {
					padding-left: 0px;
				}
				div:last-child {
					border: none;
				}
			}
			.name {
				font-size: 14px;
				line-height: 20px;
				// overflow: hidden;
				// text-overflow: ellipsis;
				// white-space: nowrap;
				margin-top: 0px;
			}
		}
		.date {
			font-size: 12px;
			color: #b3b3b3;
			line-height: 12px;
		}
		.status {
			width: 36px;
			height: 36px;

			border-radius: 50%;
			font-size: 18px;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.nobg {
			background: #666666;
		}
		.bg {
			background: #0071e3;
		}
	}
	.footer {
		text-align: center;

		padding-top: 11px;
		.btns {
			display: flex;
			div {
				flex: 1;
			}
			div {
				border-right: 1px solid rgba(255, 255, 255, 0.2);
			}
			div:last-child {
				border: none;
			}
		}

		.el-button {
			border: none;
			padding: 0px;
		}
		.xz {
			color: #9c34f5;
		}
		.zd {
			color: #e39600;
		}
		.gq {
			color: #0ab2c1;
		}
		.jj {
			color: #fff2ac;
		}
	}
}
</style>
