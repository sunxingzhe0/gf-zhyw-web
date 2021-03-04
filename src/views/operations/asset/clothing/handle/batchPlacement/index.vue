<template>
	<AppDialog router title="批量贴置设备" :show.sync="show">
		<batchPlacement :tableData="selections"></batchPlacement>
	</AppDialog>
</template>
<script>
/*
@author        cui
@name          clothingBatchPlacement
@desc          批量贴置设备
@query         selections    array    被服
@props
@emit
*/
import batchPlacement from "./components/batchPlacement"
import { AppDialog } from "@/components/App"
export default {
	name: "clothingBatchPlacement",
	components: {
		AppDialog,
		batchPlacement,
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
