<template>
	<div class="handicap-main">
		<wordTitle :title="$route.meta.title">
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
					size="mini"
				>
					<el-option label="全部" value=""></el-option>
					<el-option label="报修主题" value="1"></el-option>
					<el-option label="登记人" value="2"></el-option>
					<el-option label="报修人姓名" value="3"></el-option>
					<el-option label="报修人工号" value="4"></el-option>
					<el-option label="报修人电话" value="5"></el-option>
				</el-select>
				<el-button
					slot="append"
					icon="el-icon-search"
					type="primary"
					class="searchbtn"
				></el-button>
			</el-input>
			<el-button
				type="primary"
				size="mini"
				class="btn-m-left"
				@click="showdig"
				>报修</el-button
			>
			<el-button size="mini" class="tablebtn" @click="showTable">
				<svg class="iconfont" aria-hidden="true">
					<use xlink:href="#iconliebiao"></use>
				</svg>
			</el-button>
		</wordTitle>
		<List
			:pageNum="list.query.pageNum"
			:pageSize="list.query.pageSize"
			:total="list.total"
			@handleSizeChange="handleSizeChange"
			@handleCurrentChange="handleCurrentChange"
			v-loading="loading"
		>
			<card :datas="list.datas" @edit="edit" @show="show"></card>
		</List>
		<DarkDialog v-model="showDig">
			<handicapDetail :id="id"></handicapDetail>
		</DarkDialog>
		<router-view></router-view>
	</div>
</template>
<script>
import wordTitle from "../components/wordTitle"
import { List } from "@/components/App"
import card from "./components/card"
import maintain from "@/api/operations/maintain"
import DarkDialog from "@/components/App/DarkDialog"
import handicapDetail from "./components/handicapDetail"
export default {
	name: "OperationsMaintainHandicap",
	meta: {
		sort: 7,
		title: "保养报障",
		hideMenu: true,
	},
	components: {
		wordTitle,
		List,
		card,
		DarkDialog,
		handicapDetail,
	},
	data() {
		return {
			//列表
			list: {
				total: 0,
				datas: [],
				query: {
					pageNum: 1,
					pageSize: 10,
					keyword: "",
					searchType: "",
				},
			},
			loading: true,
			//详情
			showDig: {
				dialogVisible: false,
				binds: {
					title: "维修工单详情",
					width: "1200px",
				},
			},
			id: "",
		}
	},
	async created() {
		await this.getlist()
	},
	methods: {
		async handleSizeChange(pageSize) {
			this.list.pageSize = pageSize
			await this.getlist(this.list.query)
		},
		async handleCurrentChange(pageNum) {
			this.list.pageNum = pageNum
			await this.getlist(this.list.query)
		},
		async getlist() {
			this.loading = true
			let res = await maintain.handicap.getHandicapList(this.list.query)
			this.list.datas = res.list
			this.list.total = res.total
			this.loading = false
		},
		//催办
		edit(item) {
			this.$confirm("确定要操作该条信息吗？", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			}).then(async () => {
				await maintain.handicap.urging({
					id: item.id,
				})
				// 重新拉取数据
				await this.getlist()
				this.$message.success("操作成功!")
			})
		},
		//查看工单
		show(item) {
			this.id = item.id
			this.showDig.dialogVisible = true
		},
		showdig() {
			this.$router.push({
				path: "/operations/workbench/repair/register",
			})
		},
		showTable() {
			this.$router.push({
				path: "/operations/maintain/handicap/repairReport",
			})
		},
	},
}
</script>
<style lang="scss" scoped>
@import "@/assets/css/variables.scss";
.handicap-main {
	height: calc(100% - 220px);
	.select-search {
		width: 75px;
		margin-left: 10px;
	}
	.input-with-select {
		width: 200px;
		::v-deep .el-input-group__append {
			width: 26px !important;
			color: #0071e3;
			background: transparent;
			border-color: #4d4d4d;
			padding: 0px;
		}
		::v-deep .el-input-group__prepend {
			width: 80px !important;
			color: #0071e3;
			background: transparent;
			border-color: #4d4d4d;
		}
		.el-button {
			width: 36px;
			padding: 7px 0px;
			border-color: #4d4d4d;
		}
	}
	.searchbtn {
		border: none;
		width: 26px !important;
		margin: 0px;
	}
	.el-button--default {
		background: transparent;
		color: #fff;
	}
	.btn-m-left {
		margin-left: 10px;
	}
	.tablebtn {
		width: 28px;
		height: 28px;
		background: rgba(51, 51, 51, 0.6);
		border: 1px solid #4d4d4d;
		border-radius: 2px;
		padding: 0;
		font-size: 16px;
		overflow: hidden;
		color: #cccccc;
		margin-left: 10px;
	}
}
</style>
