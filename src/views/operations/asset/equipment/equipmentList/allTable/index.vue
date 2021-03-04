<template>
	<AppDialog router title="全部日常列表" :show.sync="show">
		<tableLis @edit="edit" @scrap="scrap"></tableLis>
	</AppDialog>
</template>
<script>
/*
@author        cui
@name          OperationsAssetEquipmentListAlltable
@desc          全部日常列表
@query         
@props
@emit
*/
import { AppDialog } from "@/components/App"
import tableLis from "./components/tableLis"
export default {
	name: "OperationsAssetEquipmentListAlltable",
	components: {
		AppDialog,
		tableLis,
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
		edit(item) {
			this.$router.push({
				path: "/operations/asset/equipment/edit",
				query: {
					equipmentId: item.id,
				},
			})
		},
		scrap(item) {
			this.$router.push({
				path: "/operations/asset/equipment/equipmentList/scrap",
				query: {
					equipmentId: item.id,
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
