<template>
	<div class="handicap-card">
		<div class="item" v-for="(item, index) in datas" :key="index">
			<div class="item-content">
				<div class="head">
					<div class="status bg">
						<svg class="iconfont" aria-hidden="true">
							<use xlink:href="#iconandengbaozhangyuchuli"></use>
						</svg>
					</div>
					<div class="info-right">
						<div class="info">
							<div class="name" :title="item.title">
								{{ item.title }}
							</div>
							<div class="date">
								{{
									item.status == 1
										? "待处理"
										: item.status == 2
										? "处理中"
										: item.status == 3
										? "已完结"
										: ""
								}}
							</div>
						</div>
						<div class="other-info">
							<div class="cycle">
								登记人:{{ item.registrant }}
							</div>
							<div class="info-item">
								报修人姓名:{{ item.repairName }}
							</div>
							<div class="info-item">
								报修人工号:{{ item.repairNo }}
							</div>
							<div class="info-item">
								报修人电话:{{ item.repairPhone }}
							</div>
							<div class="info-item">
								报修科室:{{ item.repairDept }}
							</div>
							<div class="info-item">
								报修时间:{{ item.repairTime }}
							</div>
						</div>
					</div>
				</div>
				<div class="footer">
					<el-button
						type="text"
						@click="edit(item)"
						v-if="item.status == 1"
						>催办</el-button
					>
					<el-button
						type="text"
						class="show"
						@click="show(item)"
						v-else-if="item.status == 2 || item.status == 3"
						>查看工单</el-button
					>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		datas: {
			type: Array,
		},
	},
	methods: {
		edit(item) {
			this.$emit("edit", item)
		},
		show(item) {
			this.$emit("show", item)
		},
	},
}
</script>

<style lang="scss">
.handicap-card {
	.item {
		background: rgba(51, 51, 51, 0.6);
		box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
		margin: 10px 20px;
		.item-content {
			padding: 10px;
			box-sizing: border-box;
		}
		.head {
			display: flex;
			padding-bottom: 10px;
			border-bottom: 1px solid rgba(255, 255, 255, 0.2);
			.info-right {
				flex: 1;
				margin-left: 10px;
				overflow: hidden;
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
			}
			.info {
				width: 100%;
				display: flex;
				justify-content: space-between;

				.name {
					flex: 1;
					font-size: 14px;
					line-height: 20px;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					margin-top: 0px;
				}
			}
			.other-info {
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				.cycle {
					width: 100%;
					font-size: 12px;
					color: #b3b3b3;
					margin-top: 10px;
					line-height: 12px;
				}
				div {
					width: 50%;
					font-size: 12px;
					color: #b3b3b3;
					margin-top: 10px;
					line-height: 12px;
					white-space: nowrap;
				}
			}
			.date {
				font-size: 12px;
				color: #fff;
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
			.el-button {
				border: none;
				padding-top: 11px;
				padding-bottom: 1px;
			}
			.show {
				color: #0ab2c1;
			}
		}
	}
}
</style>
