<template>
	<AppDialog title="保养任务详情" :show.sync="show" @close="close">
		<DarkMenu
			:navs="navs"
			:noRouter="true"
			v-model="activeNav"
			@select="getnav"
		>
		</DarkMenu>
		<div class="detail-main">
			<baseInfo v-if="activeNav == '0'"></baseInfo>
			<record v-if="activeNav == '1'"></record>
			<order v-if="activeNav == '2'"></order>
		</div>
	</AppDialog>
</template>
<script>
/*
@author        cui
@name          taskDetail
@desc          保养任务详情
@query         taskId    string    保养任务id
@props
@emit
*/
import { AppDialog, DarkMenu } from "@/components/App"
import baseInfo from "./components/baseInfo"
import record from "./components/record"
import order from "./components/order"
export default {
	name: "taskDetail",
	components: {
		DarkMenu,
		AppDialog,
		baseInfo,
		record,
		order,
	},
	data() {
		return {
			navs: [
				{ text: "基本信息", path: "0" },
				{ text: "保养情况", path: "1" },
				{ text: "保养工单", path: "2" },
			],
			show: false,
			taskId: "",
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
			this.show = false
			this.$router.push({
				path:
					"/operations/maintain/task" +
					(this.$route.query.status
						? "/" + this.$route.query.status
						: ""),
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
