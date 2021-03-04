<template>
	<div class="claim-main">
		<div class="layout-title">
			<span>{{ $route.meta.title }}</span>
			<el-button type="primary" size="mini" @click="append"
				>申领资产</el-button
			>
		</div>
		<DarkMenu :navs="navs"></DarkMenu>
		<router-view ref="view"></router-view>
		<DarkDialog v-model="applyDig">
			<applyForm @submit="submit"></applyForm>
		</DarkDialog>
	</div>
</template>
<script>
import { DarkMenu } from "@/components/App"
import { Navs } from "./constant"
import DarkDialog from "@/components/App/DarkDialog"
import applyForm from "./components/applyForm"
export default {
	name: "OperationsAssetapplyAsset",
	meta: {
		sort: 4,
		title: "资产申领",
		hideMenu: true,
		redirect: "/operations/asset/applyAsset/apply",
	},
	components: {
		DarkMenu,
		DarkDialog,
		applyForm,
	},
	data() {
		return {
			navs: Navs,
			applyDig: {
				dialogVisible: false,
				binds: {
					title: "申领资产",
					width: "680px",
				},
			},
		}
	},
	methods: {
		handleClick(name) {
			this.activeName = name
		},
		append() {
			this.applyDig.dialogVisible = true
		},
		submit() {
			this.applyDig.dialogVisible = false
			if (this.$route.path == "/operations/asset/applyAsset/apply") {
				this.$refs.view.getlist()
			}
		},
	},
}
</script>
<style lang="scss">
.claim-main {
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
