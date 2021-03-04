<template>
	<div class="purchase-main">
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
			<card
				:datas="list.datas"
				@signFor="signFor"
				@purchase="purchase"
				@entry="entry"
				@withdraw="withdraw"
			></card>
		</List>
	</div>
</template>
<script>
import { List } from "@/components/App"
import card from "./components/card"
import pieChart from "./components/pieChart"
import asset from "@/api/operations/asset"
export default {
	name: "OperationsAssetapplyAssetPurchase",
	meta: {
		sort: 1,
		title: "采购",
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
			let res = await asset.applyAsset.getpurchaseAseets(this.list.query)
			this.list.datas = res.list
			this.list.total = res.total
			this.loading = false
		},
		async getassetData() {
			this.data = await asset.applyAsset.getpurchaseData({
				keyword: this.list.query.keyword,
			})
		},
		//采购
		purchase(item) {
			this.$confirm("确定要采购该资产吗？", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			}).then(async () => {
				await asset.applyAsset.purchase({
					id: item.id,
				})
				// 重新拉取数据
				this.getlist()
				this.$message.success("操作成功!")
			})
		},
		//签收
		signFor(item) {
			this.$confirm("确定要签收该资产吗？", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			}).then(async () => {
				await asset.applyAsset.signFor({
					id: item.id,
				})
				// 重新拉取数据
				this.getlist()
				this.$message.success("操作成功!")
			})
		},
		//入账
		entry() {
			this.$message.success("操作成功!")
		},
		//撤回
		withdraw(item) {
			this.$confirm("确定要撤回吗？", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			}).then(async () => {
				await asset.applyAsset.withdraw({
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
