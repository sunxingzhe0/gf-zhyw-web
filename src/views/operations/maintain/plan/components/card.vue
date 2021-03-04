<template>
	<div class="plan-card">
		<div class="item" v-for="(item, index) in datas" :key="index">
			<div class="item-content">
				<div class="head">
					<div :class="item.status ? 'status bg' : 'status nobg'">
						<svg class="iconfont" aria-hidden="true">
							<use xlink:href="#iconjihua"></use>
						</svg>
					</div>
					<div class="info">
						<div class="name" :title="item.name">
							{{ item.name }}
						</div>
						<div class="date level">
							{{
								item.level == 1
									? "日常保养"
									: item.level == 2
									? "一级保养"
									: item.level == 3
									? "二级保养"
									: item.level == 4
									? "三级保养"
									: item.level == 5
									? "定期检修"
									: ""
							}}
						</div>
						<div class="date equs">
							保养设备 ({{ item.equipments }})
						</div>
						<div class="cycle">
							保养规则:
							{{ item.rules.map((item) => item.value).join(";") }}
						</div>
					</div>
				</div>
				<div class="footer">
					<div>
						<el-button type="text" @click="detail(item)"
							>详情</el-button
						>
					</div>
					<div>
						<el-button type="text" @click.stop="edit(item)"
							>编辑</el-button
						>
					</div>
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
		detail(item) {
			this.$emit("detail", item)
		},
	},
}
</script>

<style lang="scss">
.plan-card {
	.item {
		background: rgba(51, 51, 51, 0.6);
		box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
		margin: 10px 20px;
		cursor: pointer;
		.item-content {
			padding: 10px;
			box-sizing: border-box;
		}
		.head {
			display: flex;
			padding-bottom: 10px;
			border-bottom: 1px solid rgba(255, 255, 255, 0.2);
			.info {
				flex: 1;
				display: flex;
				margin-left: 10px;
				overflow: hidden;
				flex-wrap: wrap;
				.name {
					font-size: 14px;
					line-height: 20px;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					margin-top: 0px;
					flex: 1;
					margin-right: 10px;
				}
				.cycle {
					font-size: 12px;
					color: #b3b3b3;
					margin-top: 10px;
					line-height: 20px;
					width: 100%;
				}
				.equs {
					width: 100%;
					margin-top: 10px;
				}
				.date {
					font-size: 12px;
					color: #b3b3b3;
					line-height: 12px;
				}
				.level {
					width: 55px;
					background: rgba(247, 74, 74, 0.2);
					color: #f74a4a;
					line-height: 20px;
					text-align: center;
				}
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
			display: flex;
			padding-top: 11px;
			& > div {
				flex: 1;
				text-align: center;
			}
			div:nth-of-type(odd) {
				border-right: 1px solid rgba(255, 255, 255, 0.2);
			}
			.el-button {
				border: none;
				padding: 0px;
			}
		}
	}
}
</style>
