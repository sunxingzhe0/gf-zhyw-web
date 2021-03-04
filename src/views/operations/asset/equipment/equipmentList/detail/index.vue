<template>
	<AppDialog router title="设备详情" :show.sync="show">
		<DarkMenu :navs="navs" :noRouter="true" v-model="activeNav"> </DarkMenu>
		<basic-info v-if="activeNav == '0'"></basic-info>
		<repair-table v-if="activeNav == '1'"></repair-table>
		<maintain-table v-if="activeNav == '2'"></maintain-table>
		<inspection-table v-if="activeNav == '3'"></inspection-table>
		<order-table v-if="activeNav == '4'"></order-table>
		<spareAndpartTable v-if="activeNav == '5'"></spareAndpartTable>
		<knowledgeBase v-if="activeNav == '6'"></knowledgeBase>
		<historical-alarm v-if="activeNav == '7'"></historical-alarm>
		<subsidiaryTable v-if="activeNav == '8'"></subsidiaryTable>
		<actionTable v-if="activeNav == '9'"></actionTable>
	</AppDialog>
</template>
<script>
/*
@author        qiang
@name          equipmentDetail
@desc          设备详情
@query         equipmentId    string    设备id
@props
@emit
*/
import { AppDialog, DarkMenu } from "@/components/App"
import basicInfo from "./components/basicInfo"
import repairTable from "./components/repairTable"
import maintainTable from "./components/maintainTable"
import inspectionTable from "./components/inspectionTable"
import orderTable from "./components/orderTable"
import spareAndpartTable from "./components/spareAndpartTable"
import knowledgeBase from "./components/knowledgeBase"
import historicalAlarm from "./components/historicalAlarm"
import subsidiaryTable from "./components/subsidiaryTable"
import actionTable from "./components/actionTable"
export default {
	name: "equipmentDetail",
	components: {
		DarkMenu,
		AppDialog,
		basicInfo,
		repairTable,
		maintainTable,
		inspectionTable,
		orderTable,
		spareAndpartTable,
		knowledgeBase,
		historicalAlarm,
		subsidiaryTable,
		actionTable,
	},
	computed: {
		dialogShow: {
			get() {
				return this.show
			},
			set() {
				this.activeNav = "0"
				this.$emit("update:show", false)
			},
		},
	},
	data() {
		return {
			navs: [
				{ text: "基本信息", path: "0" },
				{ text: "设备维修", path: "1" },
				{ text: "设备保养", path: "2" },
				{ text: "巡检记录", path: "3" },
				{ text: "工单记录", path: "4" },
				{ text: "备品备件", path: "5" },
				{ text: "知识库", path: "6" },
				{ text: "历史报警", path: "7" },
				{ text: "附属设备", path: "8" },
				{ text: "启停记录", path: "9" },
			],
			show: false,
			baseInfo: null, // 基本信息
			activeNav: "0",
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
