<template>
	<div class="list-main">
		<div class="header-query">
			<el-input
				placeholder="关键字"
				size="mini"
				v-model="list.query.keyword"
				class="input-with-select"
			>
				<el-select
					v-model="list.query.searchType"
					slot="prepend"
					placeholder="请选择"
				>
					<el-option label="全部" value=""></el-option>
					<el-option label="设备名称" value="1"></el-option>
					<el-option label="类型编码" value="2"></el-option>
				</el-select>
				<el-button
					slot="append"
					icon="el-icon-search"
					type="primary"
					size="mini"
					@click="search"
				></el-button>
			</el-input>
			<el-button size="small" class="addbtn" @click="showTable">
				<svg class="iconfont" aria-hidden="true">
					<use xlink:href="#iconliebiao"></use>
				</svg>
			</el-button>
		</div>
		<List
			:pageNum="list.query.pageNum"
			:pageSize="list.query.pageSize"
			:total="list.total"
			@handleSizeChange="handleSizeChange"
			@handleCurrentChange="handleCurrentChange"
			v-loading="loading"
		>
			<card
				:datas="list.datas"
				@edit="edit"
				@scrap="scrap"
				@del="del"
				@show="showDetail"
			></card>
		</List>
		<router-view></router-view>
	</div>
</template>
<script>
/*
@author        
@name          OperationsAssetEquipmentList
@desc          设备列表
@query         
@props         
@emit           
*/
import { List } from "@/components/App"
import card from "./components/card"
import asset from "@/api/operations/asset"
export default {
	name: "OperationsAssetEquipmentList",
	meta: {
		sort: 1,
		title: "日常",
		hideMenu: true,
	},
	components: {
		List,
		card,
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
			let res = await asset.equipment.getdailyEquipmentList(
				this.list.query
			)
			this.list.datas = res.list
			this.list.total = res.total
			this.loading = false
		},
		edit(item) {
			this.$router.push({
				path: "/operations/asset/equipment/edit",
				query: {
					equipmentId: item.id,
				},
			})
		},
		scrap(item) {
			this.$router.push({
				path: "/operations/asset/equipment/equipmentList/scrap",
				query: {
					equipmentId: item.id,
				},
			})
		},
		del(item) {
			this.$confirm("确定要删除该设备吗？", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			}).then(async () => {
				await asset.equipment.equipmentRemove({
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
		showDetail(item) {
			this.$router.push({
				path: "/operations/asset/equipment/equipmentList/detail",
				query: { equipmentId: item.id },
			})
		},
		showTable() {
			this.$router.push({
				path: "/operations/asset/equipment/equipmentList/allTable",
			})
		},
	},
}
</script>
<style lang="scss">
@import "./style.scss";
.list-main {
	.addbtn {
		margin-left: 10px;
		background: transparent;
		font-size: 20px;
		border: 1px solid #4d4d4d;
		padding: 3px;
		color: #4d4d4d;
	}
	.input-with-select {
		width: calc(100% -38px) !important;
	}
}
</style>
