<template>
	<AppDialog router title="发放" :show.sync="show"> </AppDialog>
</template>
<script>
/*
@author        cui
@name          OperationsAssetReleaseAdd
@desc          发放
@query         
@props
@emit
*/
import { AppDialog } from "@/components/App"
export default {
	name: "OperationsAssetReleaseAdd",
	components: {
		AppDialog,
	},
	data() {
		return {
			show: false,
		}
	},
	mounted() {
		this.show = true
	},
	methods: {},
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
