<template>
	<AppDialog
		router
		title="单条贴置"
		:show.sync="show"
		class="palcement-dialog"
	>
		<placementForm
			:id="equipmentId"
			@submit="placementSubmit"
		></placementForm>
	</AppDialog>
</template>
<script>
/*
@author        cui
@name          OperationsAssetEquipmentHandlePlacement
@desc          单条贴置
@query         equipmentId    string    设备id
@props
@emit
*/
import { AppDialog } from "@/components/App"
import placementForm from "./components/placementForm"
export default {
	name: "OperationsAssetEquipmentHandlePlacement",
	components: {
		AppDialog,
		placementForm,
	},
	data() {
		return {
			show: false,
			equipmentId: "",
		}
	},
	mounted() {
		this.show = true
		this.equipmentId = this.$route.query.equipmentId
	},
	methods: {
		placementSubmit() {
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
<style lang="scss">
.palcement-dialog {
	.el-dialog {
		width: 680px !important;
	}
}
</style>
