<template>
	<AppDialog router title="批量注册设备" :show.sync="show">
		<batchRegister :tableData="selections"></batchRegister>
	</AppDialog>
</template>
<script>
/*
@author        cui
@name          clothingBatchRegister
@desc          批量注册设备
@query         selections    array    被服
@props
@emit
*/
import batchRegister from "./components/batchRegister"
import { AppDialog } from "@/components/App"
export default {
	name: "clothingBatchRegister",
	components: {
		AppDialog,
		batchRegister,
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
