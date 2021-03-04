<template>
	<div class="equipment-main">
		<div class="layout-title">设备管理</div>
		<DarkMenu :navs="navs"></DarkMenu>
		<router-view></router-view>
	</div>
</template>
<script>
import { DarkMenu } from "@/components/App"
import { Navs } from "./constant"
export default {
	name: "OperationsAssetEquipment",
	meta: {
		sort: 0,
		title: "设备管理",
		hideMenu: true,
		redirect: "/operations/asset/equipment/handle",
	},
	components: {
		DarkMenu,
	},
	data() {
		return {
			navs: Navs,
		}
	},
	methods: {
		handleClick(name) {
			this.activeName = name
		},
	},
}
</script>
<style lang="scss">
.equipment-main {
	height: calc(100% - 220px);
	.layout-title {
		padding: 15px;
		font-size: 16px;
		font-family: PingFang-SC-Bold;
		border-top: 1px solid rgba(255, 255, 255, 0.3);
	}
}
</style>
