<template>
	<AppDialog router title="全部处理列表" :show.sync="show">
		<allTable
			@Placement="Placement"
			@register="register"
			@batchPlacement="batchPlacement"
			@batchRegister="batchRegister"
			@edit="showEditor"
		></allTable>
	</AppDialog>
</template>
<script>
/*
@author        cui
@name          clothingHandleAlltable
@desc          全部处理列表
@query         clothingId    string    被服id
@props
@emit
*/
import allTable from "./components/allTable"
import { AppDialog } from "@/components/App"
export default {
	name: "clothingHandleAlltable",
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
		Placement(id) {
			this.$router.push({
				path: "/operations/asset/clothing/handle/placement",
				query: {
					clothingId: id,
				},
			})
		},
		register(id) {
			this.$router.push({
				path: "/operations/asset/clothing/handle/register",
				query: {
					clothingId: id,
				},
			})
		},
		//批量贴置
		batchPlacement(list) {
			this.$router.push({
				path: "/operations/asset/clothing/handle/batchPlacement",
				query: {
					selections: list,
				},
			})
		},
		//批量注册
		batchRegister(list) {
			this.$router.push({
				path: "/operations/asset/clothing/handle/batchRegister",
				query: {
					selections: list,
				},
			})
		},
		showEditor(id) {
			this.$router.push({
				path: "/operations/asset/clothing/edit",
				query: {
					clothingId: id,
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
