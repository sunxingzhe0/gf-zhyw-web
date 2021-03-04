<template>
	<div class="step-line-main" v-loading="loading">
		<el-steps direction="vertical" class="step">
			<el-step
				v-for="(item, index) in datas"
				:key="index"
				:class="(index + 1) % 2 != 0 ? 'active' : ''"
			>
				<div slot="title" class="line-content">
					<div class="date">{{ item.time }}</div>
					<div class="no-show" v-if="(index + 1) % 2 == 0">
						<div class="exetuoter">{{ item.exetuoter }}</div>
						<div class="status">{{ item.content }}</div>
					</div>
					<div v-else>
						<div class="no-show" slot="title">
							<div class="exetuoter">
								{{ item.exetuoter }}
							</div>
							<div class="status">{{ item.content }}</div>
						</div>
						<div class="line-content-collapse">
							<div class="line-info">
								{{ item.record }}
							</div>
						</div>
					</div>
				</div>
			</el-step>
		</el-steps>
	</div>
</template>
<script>
import maintain from "@/api/operations/maintain"
export default {
	name: "stepLine",
	data() {
		return {
			datas: [],
			loading: false,
		}
	},
	async created() {
		this.loading = true
		this.datas = await maintain.order.getOrdertracking()
		this.loading = false
	},
}
</script>
<style lang="scss">
.step-line-main {
	.el-step__icon,
	.is-text {
		width: 16px;
		height: 16px;
		font-size: 0px;
		border: 4px solid;
		position: absolute;
		.el-step__icon-inner {
			width: 10px;
			height: 10px;
			color: transparent;
		}
	}
	.el-step__line {
		background: #333;
	}
	.active .el-step__icon,
	.active .is-text {
		color: #0071e3 !important;
		border-color: #0071e3 !important;
		.el-step__icon-inner {
			width: 0px !important;
			height: 0px !important;
			border-color: #fff !important;
			border: 4px solid;
			border-radius: 50%;
		}
	}
	.el-step.is-vertical,
	.el-step__line {
		left: 7px !important;
	}
	.is-process,
	.is-wait {
		.el-step__icon,
		.is-text {
			border-color: #999999;
			color: #999999;
			border: 8px solid;
			.el-step__icon-inner {
				width: 0px;
				height: 0px;
				color: transparent;
			}
		}
	}
	.step {
		margin-left: 264px;
	}
	.line-content {
		color: #fff;
		background: rgba(26, 26, 26, 0.8);
		margin-bottom: 20px;
		position: relative;
		width: 600px;
		.date {
			position: absolute;
			left: -190px;
			top: -2px;
			width: 146px;
			height: 12px;
			font-size: 14px;
			color: #ffffff;
			z-index: 3000;
		}
		.line-title {
			font-size: 14px;
			margin-bottom: 10px;
		}
		.line-info {
			background: rgba(255, 255, 255, 0.1);
			border: 1px solid #999999;
			padding: 10px;
			box-sizing: border-box;
			width: 100%;
			.info-remark {
				color: #b3b3b3;
				line-height: 24px;
				font-size: 14px;
				margin-bottom: 10px;
			}
			.info-img {
				display: flex;
				flex-wrap: wrap;
				width: 100%;
				div {
					width: 71.4px;
					height: 71.4px;
					background: rgba(0, 0, 0, 0.5);
					border: 1px solid #0071e3;
					margin-right: 10px;
					img {
						width: 100%;
						height: 100%;
					}
				}
				div:nth-of-type(7n) {
					margin: 0;
				}
			}
		}
	}
	.no-show {
		width: 100%;
		padding: 20px;
		display: flex;
		font-size: 14px;
		justify-content: space-between;
	}
	.el-collapse {
		border: none;
		.el-collapse-item__wrap {
			background: transparent;
			border: none;
			padding: 20px;
			width: 100%;
			box-sizing: border-box;
			.el-collapse-item__content {
				color: #fff;
				width: 100%;
				padding-bottom: 0px;
			}
		}
		.el-collapse-item__header {
			background: transparent;
			color: #0071e3;
			border-color: rgba(255, 255, 255, 0.3);
			padding-right: 20px;
		}
	}
}
</style>
