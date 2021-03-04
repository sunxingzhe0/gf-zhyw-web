<template>
	<AppDialog router title="盘点详情" :show.sync="show">
		<div class="baseinfo-main">
			<div class="basicinfo" v-if="baseInfo">
				<div class="basicinfoitem">
					<span class="infolabel">盘点名称:</span>
					<span>{{ baseInfo.inventoryName }}</span>
				</div>
				<div class="basicinfoitem">
					<span class="infolabel">盘点设备:</span>
					<span> {{ baseInfo.inventoryNum }}</span>
				</div>
				<div class="basicinfoitem">
					<span class="infolabel">库存修复:</span>
					<span>
						{{
							baseInfo.InventoryRepair == "0" ? "否" : "是"
						}}</span
					>
				</div>
				<div class="basicinfoitem">
					<span class="infolabel">盘点人:</span>
					<span>
						{{ baseInfo.inventoryUser }},{{
							baseInfo.inventoryDept
						}}</span
					>
				</div>
				<div class="basicinfoitem">
					<span class="infolabel">盘点结果:</span>
					<span>
						{{
							baseInfo.inventoryResult == "1"
								? "正常"
								: baseInfo.inventoryResult == "2"
								? "异常"
								: "未知"
						}}</span
					>
				</div>
				<div class="basicinfoitem">
					<span class="infolabel">盘点时间:</span>
					<span> {{ baseInfo.inventoryTime }}</span>
				</div>
				<div class="basicinfoitem">
					<span class="infolabel">创建时间:</span>
					<span> {{ baseInfo.createDate }}</span>
				</div>
			</div>
		</div>
		<DarkMenu :navs="navs" :noRouter="true" v-model="activeNav"> </DarkMenu>
		<abnormalTable v-if="activeNav == '0'"></abnormalTable>
		<stockTable v-if="activeNav == '1'"></stockTable>
		<actionTable v-if="activeNav == '2'"></actionTable>
	</AppDialog>
</template>
<script>
/*
@author        cui
@name          inventoryDetail
@desc          设备盘点详情
@query         inventoryId    string    盘点id
@props         
@emit           
*/
import asset from "@/api/operations/asset"
import { AppDialog, DarkMenu } from "@/components/App"
import abnormalTable from "./compontents/abnormalTable"
import stockTable from "./compontents/stockTable"
import actionTable from "./compontents/actionTable"
export default {
	name: "inventoryDetail",
	components: {
		DarkMenu,
		AppDialog,
		abnormalTable,
		stockTable,
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
				{ text: "异常库存", path: "0" },
				{ text: "库存详情", path: "1" },
				{ text: "操作日志", path: "2" },
			],
			show: false,
			inventoryId: "",
			baseInfo: null, // 基本信息
			activeNav: "0",
		}
	},
	mounted() {
		this.show = true
		this.inventoryId = this.$route.query.inventoryId
		if (this.inventoryId) {
			this.getBaseInfo()
		}
	},
	methods: {
		// 获取被服基本信息
		async getBaseInfo() {
			this.baseInfo = await asset.inventory.getEquipmentInventoryRecord({
				id: this.inventoryId,
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
.baseinfo-main {
	padding-top: 20px;
	.basicinfo {
		width: 100%;
		padding: 0px 20px;
		.basicinfoitem {
			width: 33.3%;
			display: inline-block;
			font-size: 14px;
			color: #fff;
			margin-bottom: 20px;
			overflow: hidden;
			white-space: nowrap;
			.infolabel {
				margin-right: 10px;
			}
			.index {
				margin-right: 10px;
			}
		}
		.contents {
			width: 100%;
			overflow: none;
			white-space: normal;
		}
	}
}
</style>
