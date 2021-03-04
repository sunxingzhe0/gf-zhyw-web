<template>
	<div class="clothing-main">
		<div class="layout-title">
			<span>被服管理</span>
		</div>
		<DarkMenu :navs="navs"></DarkMenu>
		<router-view ref="view"></router-view>
	</div>
</template>
<script>
import { DarkMenu } from "@/components/App"
import { Navs } from "./constant"
export default {
	name: "OperationsAssetClothing",
	meta: {
		sort: 5,
		title: "被服管理",
		hideMenu: true,
		redirect: "/operations/asset/clothing/handle",
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
.clothing-main {
	height: calc(100% - 220px);
	.layout-title {
		padding: 15px;
		font-size: 16px;
		font-family: PingFang-SC-Bold;
		border-top: 1px solid rgba(255, 255, 255, 0.3);
		.el-button {
			float: right;
		}
	}
}
</style>
