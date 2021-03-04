<template>
	<AppDialog router title="设备编辑" :show.sync="show">
		<equipmentForm @submit="submit" :id="equipmentId"></equipmentForm>
	</AppDialog>
</template>
<script>
/*
@author        cui
@name          OperationsAssetEquipmentEdit
@desc          设备编辑
@query         equipmentId    string    设备id
@props
@emit
*/
import { AppDialog } from "@/components/App"
import equipmentForm from "../components/equipmentForm"
export default {
	name: "OperationsAssetEquipmentEdit",
	components: {
		AppDialog,
		equipmentForm,
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
		//编辑保存
		submit() {
			// this.$refs.pagelist.loadData()
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
