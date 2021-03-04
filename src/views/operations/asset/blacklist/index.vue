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
			<card :datas="list.datas" @remove="remove"></card>
		</List>
		<DarkDialog v-model="supplierDig">
			<blacklistForm @submit="submit"></blacklistForm>
		</DarkDialog>
	</div>
</template>
<script>
import { List } from "@/components/App"
import card from "./components/card"
import asset from "@/api/operations/asset"
import DarkDialog from "@/components/App/DarkDialog"
import blacklistForm from "./components/blacklistForm"
export default {
	name: "OperationsAssetBlacklist",
	meta: {
		sort: 3,
		title: "黑名单管理",
		hideMenu: true,
	},
	components: {
		List,
		card,
		DarkDialog,
		blacklistForm,
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
					title: "添加黑名单",
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
			let res = await asset.blacklist.getBlacksupplierList(
				this.list.query
			)
			this.list.datas = res.list
			this.list.total = res.total
			this.loading = false
		},
		remove(item) {
			this.id = item.id
			this.$confirm("确定要将该供应商从黑名单移除吗？", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			}).then(async () => {
				await asset.blacklist.removeBlacklist({
					supplierIds: item.id,
				})
				// 重新拉取数据
				await this.getlist()
				this.$message.success("操作成功!")
			})
		},
		append() {
			this.supplierDig.dialogVisible = true
		},
		submit() {
			this.supplierDig.dialogVisible = false
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
