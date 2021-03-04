<template>
	<AppDialog router title="开始盘点" :show.sync="show">
		<addForm @submit="addDigClose"></addForm>
	</AppDialog>
</template>
<script>
/*
@author        cui
@name          OperationsAssetEquipmentInventoryAdd
@desc          开始盘点
@query         
@props
@emit
*/
import { AppDialog } from "@/components/App"
import addForm from "./components/addForm"
export default {
	name: "OperationsAssetEquipmentInventoryAdd",
	components: {
		AppDialog,
		addForm,
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
		addDigClose() {
			this.$router.back()
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
