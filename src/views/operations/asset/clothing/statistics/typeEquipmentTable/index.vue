<template>
	<AppDialog router :title="'设备列表 - ' + typeName" :show.sync="show">
		<typeTable></typeTable>
	</AppDialog>
</template>
<script>
/*
@author        cui
@name          typeEquipmentTable
@desc          单个类型设备列表
@query         typeId    string    类型id
               typeName  string    类型名称
@props
@emit
*/
import { AppDialog } from "@/components/App"
import typeTable from "./components/typeTable"
export default {
	name: "equipmentDetail",
	components: {
		AppDialog,
		typeTable,
	},
	data() {
		return {
			show: false,
			typeId: "",
			typeName: "",
		}
	},
	mounted() {
		this.show = true
		this.typeId = this.$route.query.typeId
		this.typeName = this.$route.query.typeName
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
