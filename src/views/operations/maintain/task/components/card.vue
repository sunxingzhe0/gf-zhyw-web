<template>
	<div>
		<div class="item" v-for="(item, index) in datas" :key="index">
			<div class="item-content">
				<div class="head">
					<div class="status bg">
						<svg class="iconfont" aria-hidden="true">
							<use xlink:href="#iconduty-act"></use>
						</svg>
					</div>
					<div class="info">
						<div class="name">{{ item.name }}</div>
						<div class="date">{{ item.time }}</div>
						<div class="cycle">
							<div>{{ item.ename }}</div>
							<div>楼宇名称:{{ item.floor }}F</div>
						</div>
						<div class="cycle">
							<div>执行人:{{ item.executor }}</div>
							<div>所属部门:{{ item.dept }}F</div>
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
		border-bottom: 1px solid rgba(255, 255, 255, 0.2);
		.info {
			flex: 1;
			margin: 0px 10px;
			overflow: hidden;
			display: flex;
			justify-self: space-between;
			flex-wrap: wrap;
			.cycle {
				width: 48%;
				font-size: 12px;
				color: #b3b3b3;
				margin-top: 10px;
				line-height: 12px;
				white-space: nowrap;
				overflow: hidden;
				margin-right: 4%;
				div {
					margin-bottom: 10px;
				}
			}
			.cycle:nth-of-type(even) {
				margin-right: 0px;
			}
			.name {
				flex: 1;
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
			width: 119px;
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
