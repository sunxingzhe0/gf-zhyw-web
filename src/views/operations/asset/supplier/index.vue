<template>
	<div class="supplier-main">
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
		<DarkDialog v-model="supplierDig" @close="colse">
			<supplierForm
				:formId="id"
				@submit="submit"
				:isedit="isedit"
			></supplierForm>
		</DarkDialog>
	</div>
</template>
<script>
import { List } from "@/components/App"
import card from "./components/card"
import asset from "@/api/operations/asset"
import DarkDialog from "@/components/App/DarkDialog"
import supplierForm from "./components/supplierForm"
export default {
	name: "OperationsAssetSupplier",
	components: {
		List,
		card,
		DarkDialog,
		supplierForm,
	},
	meta: {
		sort: 2,
		title: "供应商管理",
		hideMenu: true,
	},
	data() {
		return {
			loading: false,
			list: {
				query: {
					pageNum: 1,
					pageSize: 10,
					searchType: "",
					keyword: "",
				},
				total: 0,
			},
			id: "",
			supplierDig: {
				dialogVisible: false,
				binds: {
					title: "新增供应商",
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
			let res = await asset.supplier.getsupplierList(this.list.query)
			this.list.datas = res.list
			this.list.total = res.total
			this.loading = false
		},
		edit(item) {
			this.supplierDig.dialogVisible = true
			this.supplierDig.binds.title = "编辑供应商"
			this.isedit = true
			this.id = item.id
		},
		append() {
			this.supplierDig.dialogVisible = true
			this.supplierDig.binds.title = "新增供应商"
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
.supplier-main {
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
