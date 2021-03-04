<template>
	<AppDialog router title="全部日常列表" :show.sync="show">
		<allTable @edit="edit" @show="showDetail"></allTable>
	</AppDialog>
</template>
<script>
/*
@author        cui
@name          clothingdailyAlltable
@desc          全部日常列表
@query         
@props
@emit
*/
import allTable from "./components/allTable"
import { AppDialog } from "@/components/App"
export default {
	name: "clothingdailyAlltable",
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
		edit(id) {
			this.$router.push({
				path: "/operations/asset/clothing/edit",
				query: { clothingId: id },
			})
		},
		//详情
		showDetail(id) {
			this.$router.push({
				path: "/operations/asset/clothing/handle/detail",
				query: { clothingId: id },
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
