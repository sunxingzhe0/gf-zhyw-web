<template>
	<div class="page-inventory">
		<CardList
			:params="params"
			:fetcher="fetcher"
			:renderFunc="renderFunc"
			:headerBtns="headerBtns"
			ref="page-daily-list"
		></CardList>
		<router-view></router-view>
	</div>
</template>
<script>
import { CardList } from "@/components/App"
import asset from "@/api/operations/asset"
export default {
	name: "OperationsAssetClothingInventory",
	meta: {
		sort: 2,
		title: "盘点",
		hideMenu: true,
	},
	components: {
		CardList,
	},
	data() {
		return {
			params: [
				{
					elAttrs: {
						size: "mini",
					},
					key: "searchType",
					options: [
						{ label: "名称", value: "1" },
						{ label: "盘点人", value: "2" },
					],
					component: "el-select",
				},
				{
					elAttrs: {
						size: "mini",
						placeholder: "关键字搜索",
						"suffix-icon": "el-icon-search",
					},
					key: "keyword",
					className: "keyword",
					component: "el-input",
				},
			],
			headerBtns: [
				{
					text: "开始盘点",
					onClick: this.add,
					className: "addbtn",
				},
				{
					onClick: this.showTable,
					className: "tablebtn",
					icon: "iconliebiao",
					elAttrs: {
						size: "mini",
					},
				},
			],
			fetcher: asset.inventory.getClothings,
		}
	},
	methods: {
		renderFunc(item) {
			return (
				<div class="card-item plan-item">
					<div class="card-content">
						<div class="card-icon">
							<svg class="iconfont" aria-hidden="true">
								<use xlinkHref="#iconpandian1"></use>
							</svg>
						</div>
						<div class="card-infos">
							<div class="card-info">
								<span
									class="card-title"
									title={item.inventoryName}
								>
									{item.inventoryName}
								</span>
								<span
									class={
										item.inventoryResult == 2
											? "card-title text-color"
											: "card-title"
									}
								>
									{item.inventoryResult == 1
										? "正常"
										: item.inventoryResult == 2
										? "异常"
										: item.inventoryResult == 3
										? "未知"
										: ""}
								</span>
							</div>
							<div class="card-info">
								<span>设备数量: {item.equipmentNum}</span>
								<span>
									库存修复:
									{item.InventoryRepair == 1
										? "是"
										: item.InventoryRepair == 0
										? "否"
										: ""}
								</span>
							</div>
							<div class="card-info">
								<span>盘点人: {item.inventoryUser}</span>
								<span>使用部门: {item.inventoryDept}</span>
							</div>
							<div class="card-info">
								<span>盘点时间: {item.inventoryTime}</span>
							</div>
						</div>
					</div>
					<div class="card-footer">
						<span
							type="text"
							onClick={() => this.showDetail(item.id)}
						>
							详情
						</span>
						<span
							type="text"
							onClick={() => this.download(item.id)}
						>
							打印
						</span>
						<span
							type="text"
							class="down"
							onClick={() => this.download(item.id)}
						>
							下载
						</span>
						{item.inventoryResult == 2 ? (
							<span
								type="text"
								class="down"
								onClick={() => this.repair(item.id)}
							>
								修复
							</span>
						) : (
							""
						)}
						{item.inventoryResult == 3 ? (
							<span
								type="text"
								onClick={() => this.Input(item.id)}
							>
								录入
							</span>
						) : (
							""
						)}
					</div>
				</div>
			)
		},
		//录入
		Input(item) {
			this.$router.push({
				path: "/operations/asset/clothing/inventory/input",
				query: { inventoryId: item.id },
			})
		},
		download(id) {
			this.$confirm("确定要下载吗？", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			}).then(async () => {
				await asset.inventory.equipmentInventoryDown({
					id: id,
				})
				// 重新拉取数据
				this.$refs.pagelist.loadData()
				this.$message.success("操作成功!")
			})
		},
		printing(id) {
			this.$confirm("确定要打印吗？", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			}).then(async () => {
				await asset.inventory.equipmentInventoryPrinting({
					id: id,
				})
				// 重新拉取数据
				this.$refs.pagelist.loadData()
				this.$message.success("操作成功!")
			})
		},
		repair(id) {
			this.$confirm("确定要修复吗？", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			}).then(async () => {
				await asset.inventory.equipmentInventoryRepair({
					id: id,
				})
				// 重新拉取数据
				this.$refs.pagelist.loadData()
				this.$message.success("操作成功!")
			})
		},
		append() {
			this.$router.push({
				path: "/operations/asset/clothing/inventory/add",
			})
		},
		//详情
		showDetail(id) {
			this.$router.push({
				path: "/operations/asset/clothing/inventory/detail",
				query: { inventoryId: id },
			})
		},
		showTable() {
			this.$router.push({
				path: "/operations/asset/clothing/inventory/allTable",
			})
		},
	},
}
</script>
<style lang="scss">
.page-inventory {
	.card-list-header {
		border: none;
	}
	.header-right {
		width: 100%;
	}
	.addbtn {
		margin-left: 10px;
	}
	.card-content {
		padding-bottom: 10px;
		margin-bottom: 0px !important;
	}
	.tablebtn {
		margin-left: 10px;
		background: transparent;
		font-size: 20px;
		border: 1px solid #4d4d4d;
		padding: 3px;
		color: #4d4d4d;
	}
	.text-color {
		color: #f74a4a !important;
	}
	.down {
		color: #0ab2c1;
	}
	.card-footer {
		.el-button {
			flex: 1;
			cursor: pointer;
			text-align: center;
			position: relative;
			&:before {
				content: "";
				position: absolute;
				width: 1px;
				height: 14px;
				background: hsla(0, 0%, 100%, 0.2);
				right: 0;
				top: 10px;
			}
			span {
				&:before {
					width: 0px;
				}
			}
		}
		& > span:last-child {
			&::before {
				width: 0px;
			}
		}
	}
}
</style>
