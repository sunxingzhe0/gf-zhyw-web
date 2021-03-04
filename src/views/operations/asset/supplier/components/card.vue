<template>
	<div>
		<div class="item" v-for="(item, index) in datas" :key="index">
			<div class="item-content">
				<div class="head">
					<div class="status bg">
						<svg class="iconfont" aria-hidden="true">
							<use
								xlink:href="#icongongyingshangdailishang"
							></use>
						</svg>
					</div>
					<div class="info">
						<div class="name">
							{{ item.supplierName }}
						</div>
						<div class="date">
							{{ item.supplierStatus == 1 ? "启用" : "停用" }}
						</div>
						<div class="item-info">
							公司编码：{{ item.supplierNo }}
						</div>
						<div class="item-info">
							公司地址：{{ item.supplierNo }}
						</div>
						<div class="cycle">
							公司电话：{{ item.supplierPhone }}
						</div>
						<div class="cycle">
							关联合同：{{ item.contractNum }}
						</div>
						<div class="cycle">
							合同金额：￥{{ item.contractAcount }}
						</div>
						<div class="cycle">创建时间：{{ item.createTime }}</div>
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
	name: "card",
	props: {
		datas: {
			type: Array,
		},
	},
	methods: {
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
			.cycle,
			.item-info {
				width: 50%;
				font-size: 13px;
				color: #b3b3b3;
				margin-top: 10px;
				line-height: 13px;
				text-overflow: -o-ellipsis-lastline;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				line-clamp: 2;
				-webkit-box-orient: vertical;
			}
			.name {
				font-size: 14px;
				line-height: 20px;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				margin-top: 0px;
				width: calc(100% - 28px);
			}
			.item-info {
				width: 100%;
			}
		}
		.date {
			font-size: 14px;
			color: #fff;
			line-height: 14px;
			text-align: right;
			width: 28px;
			white-space: nowrap;
			overflow: hidden;
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
		// display: flex;
		padding-top: 11px;
		div:last-child {
			border: none;
		}
		.el-button {
			border: none;
			padding: 0px;
		}
		.delbtn {
			color: #f74a4a;
		}
	}
}
</style>
