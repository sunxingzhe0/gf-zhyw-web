<template>
	<div class="contract-main">
		<div class="layout-title">
			<span>{{ $route.meta.title }}</span>
			<el-button type="primary" size="mini" @click="append"
				>新增</el-button
			>
		</div>
		<List
			:pageNum="list.query.pageNum"
			:pageSize="list.query.pageSize"
			:total="list.total"
			@handleSizeChange="handleSizeChange"
			@handleCurrentChange="handleCurrentChange"
			v-loading="loading"
		>
			<card :datas="list.datas" @edit="edit"></card>
		</List>
		<DarkDialog v-model="contractDig" @close="colse">
			<contractForm
				:formId="id"
				@submit="submit"
				:isedit="isedit"
			></contractForm>
		</DarkDialog>
	</div>
</template>
<script>
import asset from "@/api/operations/asset"
import { List } from "@/components/App"
import DarkDialog from "@/components/App/DarkDialog"
import card from "./components/card"
import contractForm from "./components/contractForm"
export default {
	name: "OperationsAssetContract",
	meta: {
		sort: 1,
		title: "合同管理",
		hideMenu: true,
	},
	components: {
		List,
		card,
		contractForm,
		DarkDialog,
	},
	data() {
		return {
			loading: false,
			list: {
				query: {
					pageNum: 1,
					pageSize: 10,
					keyword: "",
				},
				total: 0,
			},
			id: "",
			contractDig: {
				dialogVisible: false,
				binds: {
					title: "新增合同",
					width: "1200px",
				},
			},
			isedit: false,
		}
	},
	created() {
		this.getlist()
	},
	methods: {
		handleSizeChange(pageSize) {
			this.list.query.pageSize = pageSize
			this.getlist(this.list.query)
		},
		handleCurrentChange(pageNum) {
			this.list.query.pageNum = pageNum
			this.getlist(this.list.query)
		},
		async getlist() {
			this.loading = true
			let res = await asset.contract.getcontractList(this.list.query)
			this.list.datas = res.list
			this.list.total = res.total
			this.loading = false
		},
		edit(item) {
			this.contractDig.dialogVisible = true
			this.contractDig.binds.title = "编辑合同"
			this.isedit = true
			this.id = item.id
		},
		append() {
			this.contractDig.dialogVisible = true
			this.contractDig.binds.title = "新增合同"
			this.isedit = false
			this.id = ""
		},
		submit(val) {
			this.id = val
		},
		colse() {
			this.id = ""
		},
	},
}
</script>
<style lang="scss">
.contract-main {
	height: calc(100% - 224px);
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
