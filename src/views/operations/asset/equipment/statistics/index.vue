<template>
	<div class="statistics-page-equipment">
		<pieChart :data="data"></pieChart>
		<div class="type-content" v-loading="loading">
			<div class="titles">
				<div>设备类型</div>
				<div>类型编码</div>
				<div>设备数量</div>
				<div>占比</div>
			</div>
			<el-tree
				:data="data"
				:highlight-current="false"
				icon-class="el-icon-arrow-right"
				:expand-on-click-node="false"
			>
				<div class="equipment-tree-node" slot-scope="{ data }">
					<div class="info">
						<div class="name data-item" :title="data.name">
							<span @click="showTable(data.id, data.name)">{{
								data.name
							}}</span>
						</div>
						<div class="data-item">
							{{ data.no }}
						</div>
						<div class="data-item">
							{{ data.clothingNum }}
						</div>
						<div class="data-item">{{ data.Proportion }}%</div>
					</div>
				</div>
			</el-tree>
		</div>
		<router-view></router-view>
	</div>
</template>
<script>
import pieChart from "./components/pieChart"
import asset from "@/api/operations/asset"
export default {
	name: "OperationsAssetEquipmentStatics",
	meta: {
		sort: 3,
		title: "统计",
		hideMenu: true,
	},
	components: {
		pieChart,
	},
	data() {
		return {
			data: [],
			loading: false,
		}
	},
	created() {
		this.getDatas()
	},
	methods: {
		//获取类型数据
		async getDatas() {
			this.loading = true
			this.data = await asset.type.getTypetree()
			this.loading = false
		},
		//单个类型查看设备列表
		showTable(id, name) {
			this.$router.push({
				path:
					"/operations/asset/equipment/statistics/typeEquipmentTable",
				query: { typeId: id, typeName: name },
			})
		},
	},
}
</script>
<style lang="scss">
.statistics-page-equipment {
	.type-content {
		padding: 15px;
		background: rgba(51, 51, 51, 0.6);
		box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
		margin-top: 20px;
		height: calc(100% - 48px);
		overflow-y: auto;
		.titles {
			width: 100%;
			display: flex;
			padding-left: 26px;
			margin-bottom: 10px;
			div {
				width: 20%;
				margin-right: 10px;
			}
			& > div:first-child {
				width: 40%;
			}
		}
		.el-tree {
			background: transparent;
			.el-tree-node:focus > .el-tree-node__content {
				background-color: transparent;
			}
			.el-tree-node__content {
				&:hover {
					background-color: transparent;
				}
			}
			.el-tree-node__expand-icon {
				color: #0071e3;
				font-size: 14px;
				font-weight: bold;
			}
			.equipment-tree-node {
				width: 100%;
				display: flex;
				justify-content: space-between;
				.info {
					width: 100%;
					font-size: 14px;
					line-height: 25px;
					color: #e6e6e6;
					display: flex;
					.data-item {
						width: 20%;
						margin-right: 10px;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}
					.name {
						width: 40%;
						color: #0071e3;
					}
				}
			}
		}
	}
	.type-content::-webkit-scrollbar {
		/*滚动条整体样式*/
		width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
		height: 1px;
	}
	.type-content::-webkit-scrollbar-thumb {
		/*滚动条里面小方块*/
		border-radius: 10px;
		box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
		background: #535353;
	}
	.type-content::-webkit-scrollbar-track {
		/*滚动条里面轨道*/
		box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
		border-radius: 10px;
		background: transparent;
	}
}
</style>
