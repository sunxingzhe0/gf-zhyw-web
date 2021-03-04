<template>
	<AppDialog router title="全部盘点列表" :show.sync="show">
		<inventoryTable
			@Input="Input"
			@download="download"
			@repair="repair"
			@append="append"
			@printing="printing"
		></inventoryTable>
	</AppDialog>
</template>
<script>
/*
@author        cui
@name          OperationsAssetEquipmentInventoryAlltable
@desc          全部盘点列表
@query         
@props
@emit
*/
import { AppDialog } from "@/components/App"
import inventoryTable from "./components/inventoryTable"
import asset from "@/api/operations/asset"
export default {
	name: "OperationsAssetEquipmentInventoryAlltable",
	components: {
		AppDialog,
		inventoryTable,
	},
	data() {
		return {
			show: false,
		}
	},
	mounted() {
		this.show = true
	},
	methods: {
		append() {
			this.$router.push({
				path: "/operations/asset/equipment/inventory/add",
			})
		},
		//录入
		Input(item) {
			this.$router.push({
				path: "/operations/asset/equipment/inventory/input",
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
	},
}
</script>
<style lang="scss" scoped>
.dark-el-menu.el-menu {
	padding: 0 20px;
	justify-content: flex-start;
	background: rgba(26, 26, 26, 0.8);
	&::v-deep {
		.el-menu-item {
			margin-right: 40px;
		}
	}
}
</style>
