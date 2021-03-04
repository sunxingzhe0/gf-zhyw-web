<template>
	<AppDialog router title="被服详情" :show.sync="show">
		<DarkMenu :navs="navs" :noRouter="true" v-model="activeNav"> </DarkMenu>
		<div v-if="activeNav == '0'">
			<baseInfo :baseInfo="baseInfo"></baseInfo>
		</div>
		<div v-else-if="activeNav == '1'">
			<usedList :clothingId="clothingId"></usedList>
		</div>
		<div v-else-if="activeNav == '2'">
			<washList :clothingId="clothingId"></washList>
		</div>
	</AppDialog>
</template>
<script>
/*
@author        cui
@name          clothingDetail
@desc          被服详情
@query         clothingId    string    被服id
@props         
@emit           
*/
import asset from "@/api/operations/asset"
import { AppDialog, DarkMenu } from "@/components/App"
import baseInfo from "./components/baseInfo"
import usedList from "./components/usedList"
import washList from "./components/washList"
export default {
	name: "clothingDetail",
	components: {
		DarkMenu,
		AppDialog,
		baseInfo,
		usedList,
		washList,
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
				{ text: "使用情况", path: "1" },
				{ text: "洗涤记录", path: "2" },
			],
			show: false,
			clothingId: "",
			baseInfo: null, // 基本信息
			activeNav: "0",
		}
	},
	mounted() {
		this.show = true
		this.clothingId = this.$route.query.clothingId
		if (this.clothingId) {
			this.getBaseInfo()
		}
	},
	methods: {
		// 获取被服基本信息
		async getBaseInfo() {
			this.baseInfo = await asset.clothing.getClothingInfo({
				id: this.clothingId,
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
</style>
