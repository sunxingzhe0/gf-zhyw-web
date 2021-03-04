<template>
	<AppDialog title="保养计划详情" :show.sync="show" @close="close">
		<DarkMenu
			:navs="navs"
			:noRouter="true"
			v-model="activeNav"
			@select="getnav"
		>
		</DarkMenu>
		<div class="detail-main">
			<base-info v-if="activeNav == '0'"></base-info>
			<record v-if="activeNav == '1'"></record>
			<task v-if="activeNav == '2'"></task>
			<order v-if="activeNav == '3'"></order>
			<repair v-if="activeNav == '4'"></repair>
		</div>
	</AppDialog>
</template>
<script>
/*
@author        cui
@name          planDetail
@desc          保养计划详情
@query         planId    string    保养计划id
@props
@emit
*/
import { AppDialog, DarkMenu } from "@/components/App"
import baseInfo from "./components/baseInfo"
import record from "./components/record"
import task from "./components/task"
import order from "./components/order"
import repair from "./components/repair"
export default {
	name: "planDetail",
	components: {
		DarkMenu,
		AppDialog,
		baseInfo,
		record,
		task,
		order,
		repair,
	},
	data() {
		return {
			navs: [
				{ text: "基本信息", path: "0" },
				{ text: "保养记录", path: "1" },
				{ text: "保养任务", path: "2" },
				{ text: "保养工单", path: "3" },
				{ text: "维修记录", path: "4" },
			],
			show: false,
			planId: "",
			baseInfo: null, // 基本信息
			activeNav: "0",
		}
	},
	mounted() {
		this.show = true
		this.activeNav = this.$route.query.nav
	},
	methods: {
		getnav(val) {
			let query = this.$router.history.current.query
			let path = this.$router.history.current.path
			//对象的拷贝
			let newQuery = JSON.parse(JSON.stringify(query))
			// 地址栏的参数值赋值
			newQuery.nav = val
			this.$router.push({ path, query: newQuery })
		},
		close() {
			this.$router.push({ path: "/operations/maintain/plan" })
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
.detail-main {
	width: 100%;
	padding: 20px;
	max-height: 600px;
	overflow-y: auto;
	overflow-x: hidden;
	padding-bottom: 0px;
}
.detail-main::-webkit-scrollbar {
	/*滚动条整体样式*/
	width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
	height: 1px;
}
.detail-main::-webkit-scrollbar-thumb {
	/*滚动条里面小方块*/
	border-radius: 10px;
	box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
	background: #535353;
}
.detail-main::-webkit-scrollbar-track {
	/*滚动条里面轨道*/
	box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
	border-radius: 10px;
	background: transparent;
}
</style>
