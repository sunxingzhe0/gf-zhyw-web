<template>
	<div>
		<div class="item" v-for="(item, index) in datas" :key="index">
			<div class="item-content">
				<div class="head-title">
					<div class="left">{{ item.contractNo }}</div>
					<div class="right">
						{{ item.contractStatus == 1 ? "有效" : "" }}
					</div>
				</div>
				<div class="head">
					<div class="status bg">
						<svg class="iconfont" aria-hidden="true">
							<use xlink:href="#iconhetongguanli1"></use>
						</svg>
					</div>
					<div class="info">
						<div class="name">
							{{ item.contractName }}
						</div>
						<div class="date">￥{{ item.contractPrice }}</div>
						<div class="otherinfo">
							<div class="cycle">
								合同供应商: {{ item.supplierName }}
							</div>
							<div class="cycle">
								智能科室: {{ item.deptName }}
							</div>
							<div class="cycle">
								开始时间: {{ item.startTime }}
							</div>
							<div class="cycle">
								结束时间: {{ item.endTime }}
							</div>
						</div>
					</div>
				</div>
				<div class="footer">
					<el-button type="text" @click="edit(item)">编辑</el-button>
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
		//编辑
		edit(item) {
			this.$emit("edit", item)
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
			margin-left: 10px;
			overflow: hidden;
			display: flex;
			flex-wrap: wrap;
			.name {
				font-size: 14px;
				line-height: 20px;
				flex: 1;
				margin-top: 0px;
			}
		}
		.otherinfo {
			width: 100%;
			.cycle {
				font-size: 12px;
				color: #b3b3b3;
				margin-top: 10px;
				line-height: 12px;
				width: 50%;
				display: inline-block;
			}
		}
		.date {
			font-size: 14px;
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
