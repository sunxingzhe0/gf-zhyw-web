<template>
	<AppDialog router title="发放记录详情" :show.sync="show"> </AppDialog>
</template>
<script>
/*
@author        cui
@name          OperationsAssetReleaseDetail
@desc          发放记录详情
@query         releaseId     string   发放记录id
@props
@emit
*/
import { AppDialog } from "@/components/App"
export default {
	name: "OperationsAssetReleaseDetail",
	components: {
		AppDialog,
	},
	data() {
		return {
			show: false,
			releaseId: "",
		}
	},
	mounted() {
		this.show = true
		this.releaseId = this.$route.query.releaseId
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
