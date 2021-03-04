<template>
	<AppDialog router title="全部处理列表" :show.sync="show">
		<allTable
			@Placement="Placement"
			@install="install"
			@batchPlacement="batchPlacement"
			@batchInstall="batchInstall"
		></allTable>
	</AppDialog>
</template>
<script>
/*
@author        cui
@name          OperationsAssetEquipmentHandleAlltable
@desc          全部处理列表
@query         
@props
@emit
*/
import { AppDialog } from "@/components/App"
import allTable from "./components/allTable"
export default {
	name: "OperationsAssetEquipmentHandleAlltable",
	components: {
		AppDialog,
		allTable,
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
		//批量贴置
		batchPlacement(list) {
			this.$router.push({
				path: "/operations/asset/equipment/handle/batchPlacement",
				query: {
					selections: list,
				},
			})
		},
		batchInstall(list) {
			this.$router.push({
				path: "/operations/asset/equipment/handle/batchInstall",
				query: {
					selections: list,
				},
			})
		},
		//安装
		install(id) {
			//安装install
			this.$router.push({
				path: "/operations/asset/equipment/handle/install",
				query: {
					equipmentId: id,
				},
			})
		},
		//贴置
		Placement(id) {
			this.$router.push({
				path: "/operations/asset/equipment/handle/placement",
				query: {
					equipmentId: id,
				},
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
