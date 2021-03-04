<template>
	<div class="apply-main">
		<div class="header-query">
			<el-input
				placeholder="关键字"
				size="mini"
				v-model="list.query.keyword"
				class="input-with-select"
			>
				<!-- <el-select
					v-model="list.query.searchType"
					slot="prepend"
					placeholder="请选择"
				>
					<el-option label="全部" value=""></el-option>
					<el-option label="设备名称" value="1"></el-option>
					<el-option label="类型编码" value="2"></el-option>
				</el-select> -->
				<el-button
					slot="append"
					icon="el-icon-search"
					type="primary"
					size="mini"
					@click="search"
				></el-button>
			</el-input>
			<el-button type="primary" size="mini" class="addbtn"
				>更多</el-button
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
			<pieChart :data="data"></pieChart>
			<card :datas="list.datas" @agree="agree" @refuse="refuse"></card>
		</List>
	</div>
</template>
<script>
import { List } from "@/components/App"
import card from "./components/card"
import pieChart from "./components/pieChart"
import asset from "@/api/operations/asset"
export default {
	name: "OperationsAssetapplyAssetApply",
	meta: {
		sort: 0,
		title: "资产申领",
		hideMenu: true,
	},
	components: {
		List,
		card,
		pieChart,
	},
	data() {
		return {
			list: {
				query: {
					pageNum: 1,
					pageSize: 10,
					keyword: "",
					searchType: "",
				},
				total: 0,
				datas: [],
			},
			loading: false,
			data: [],
		}
	},
	created() {
		this.getlist()
		this.getassetData()
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
			let res = await asset.applyAsset.getassetList(this.list.query)
			this.list.datas = res.list
			this.list.total = res.total
			this.loading = false
		},
		async getassetData() {
			this.data = await asset.applyAsset.getassetData({
				keyword: this.list.query.keyword,
			})
		},
		agree(item) {
			this.$confirm("确定要同意申请该资产吗？", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			}).then(async () => {
				await asset.applyAsset.agree({
					id: item.id,
				})
				// 重新拉取数据
				this.getlist()
				this.$message.success("操作成功!")
			})
		},
		refuse(item) {
			this.$confirm("确定要拒绝改资产申领吗？", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			}).then(async () => {
				await asset.applyAsset.refuse({
					id: item.id,
				})
				// 重新拉取数据
				this.getlist()
				this.$message.success("操作成功!")
			})
		},
		search() {
			this.getlist()
		},
	},
}
</script>
<style lang="scss">
@import "./style.scss";
</style>
