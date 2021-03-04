<template>
	<AppDialog router title="单条安装" :show.sync="show" class="install-dialog">
		<installForm :id="equipmentId" @submit="installSubmit"></installForm>
	</AppDialog>
</template>
<script>
/*
@author        cui
@name          OperationsAssetEquipmentHandleInstall
@desc          单条安装
@query         equipmentId    string    设备id
@props
@emit
*/
import { AppDialog } from "@/components/App"
import installForm from "./components/installForm"
export default {
	name: "OperationsAssetEquipmentHandleInstall",
	components: {
		AppDialog,
		installForm,
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
		installSubmit() {
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
.install-dialog {
	.el-dialog {
		width: 680px !important;
	}
}
</style>
