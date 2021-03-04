<template>
	<AppDialog router title="保养单详情" :show.sync="show">
		<singleDetail :id="id" :nav="nav"></singleDetail>
	</AppDialog>
</template>
<script>
/*
@author        cui
@name          orderDetail
@desc          保养单详情
@query         orderId    string    保养单id
@props
@emit
*/
import { AppDialog } from "@/components/App"
import singleDetail from "../components/detail/singleDetail"
export default {
	name: "orderDetail",
	components: {
		AppDialog,
		singleDetail,
	},
	computed: {
		dialogShow: {
			get() {
				return this.show
			},
			set() {
				this.$emit("update:show", false)
			},
		},
	},
	data() {
		return {
			show: false,
			id: this.$route.query.orderId,
			nav: this.$route.query.nav ? this.$route.query.nav : "",
		}
	},
	mounted() {
		this.show = true
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
