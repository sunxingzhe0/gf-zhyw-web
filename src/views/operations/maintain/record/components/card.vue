<template>
	<div>
		<div class="item" v-for="(item, index) in datas" :key="index">
			<div class="item-content">
				<div class="head">
					<div class="status bg">
						<svg class="iconfont" aria-hidden="true">
							<use xlink:href="#iconjilu"></use>
						</svg>
					</div>
					<div class="info">
						<div class="name" :title="item.name">
							{{ item.name }}
						</div>
						<span class="card-level">保养等级</span>
						<div class="date">{{ item.time }}</div>
						<div class="cycle">
							<div>{{ item.executor }}</div>
							<div>{{ item.dept }}</div>
						</div>
					</div>
				</div>
				<div class="footer">
					<el-button type="text" @click="show(item)">详情</el-button>
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
		show(item) {
			this.$emit("show", item)
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
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				margin-top: 0px;
				max-width: 55%;
			}
			.cycle {
				width: 100%;
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
			.card-level {
				background: rgba(247, 74, 74, 0.2);
				padding: 1px 2px;
				font-size: 10px;
				font-family: PingFang SC;
				font-weight: 500;
				color: #f74a4a;
				margin-right: 10px;
				margin-left: 10px;
			}
			.date {
				font-size: 12px;
				color: #b3b3b3;
				line-height: 12px;
				flex: 1;
				text-align: right;
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
		text-align: center;
		.el-button {
			border: none;
			padding-top: 11px;
			padding-bottom: 1px;
		}
	}
}
</style>
