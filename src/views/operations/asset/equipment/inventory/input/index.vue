<template>
	<AppDialog router title="盘点录入" :show.sync="show">
		<inventoryForm @submit="submit" :id="inventoryId"></inventoryForm>
	</AppDialog>
</template>
<script>
/*
@author        cui
@name          OperationsAssetEquipmentInventoryInput
@desc          盘点录入
@query         inventoryId    string    盘点记录id
@props
@emit
*/
import { AppDialog } from "@/components/App"
import inventoryForm from "./components/inventoryForm"
export default {
	name: "OperationsAssetEquipmentInventoryInput",
	components: {
		AppDialog,
		inventoryForm,
	},
	data() {
		return {
			show: false,
			inventoryId: "",
		}
	},
	mounted() {
		this.show = true
		this.inventoryId = this.$route.query.inventoryIds
	},
	methods: {
		submit() {
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
