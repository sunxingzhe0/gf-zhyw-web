<template>
	<AppDialog router title="保养单列表" :show.sync="show">
		<orderList></orderList>
	</AppDialog>
</template>
<script>
/*
@author        cui
@name          orderTable
@desc          保养单列表
@query         taskId    string    保养任务id
@props
@emit
*/
import { AppDialog } from "@/components/App"
import orderList from "./components/orderList"
export default {
	name: "orderTable",
	components: {
		AppDialog,
		orderList,
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
