<template>
	<AppDialog router title="批量安装设备" :show.sync="show">
		<batchInstall :tableData="selections"></batchInstall>
	</AppDialog>
</template>
<script>
/*
@author        cui
@name          OperationsAssetEquipmentHandleBatchInstall
@desc          批量安装
@query         selections    array     贴置数据
@props
@emit
*/
import { AppDialog } from "@/components/App"
import batchInstall from "./components/batchInstall"
export default {
	name: "OperationsAssetEquipmentHandleBatchInstall",
	components: {
		AppDialog,
		batchInstall,
	},
	data() {
		return {
			show: false,
			selections: [],
		}
	},
	mounted() {
		this.show = true
		this.selections = this.$route.query.selections
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
