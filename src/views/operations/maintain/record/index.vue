<template>
	<div class="record-main">
		<wordTitle :title="$route.meta.title">
			<el-button
				size="mini"
				:class="isq ? 'primary timebtn' : 'default timebtn'"
				plain
				@click="getweektime"
				>近七天</el-button
			>
			<el-button
				:class="!isq ? 'primary timebtn' : 'default timebtn'"
				size="mini"
				plain
				@click="getmonthtime"
				>近30天</el-button
			>
			<el-input
				placeholder="请输入关键字查询"
				size="mini"
				v-model="list.query.search"
				class="input-with-select"
			>
				<el-button
					slot="append"
					icon="el-icon-search"
					type="primary"
					class="searchbtn"
				></el-button>
			</el-input>
			<el-select
				class="select-search"
				v-model="list.query.status"
				placeholder="请选择"
				size="mini"
			>
				<el-option label="全部" value=""></el-option>
				<el-option value="1">待接单</el-option>
				<el-option value="2">未开始</el-option>
				<el-option value="3">进行中</el-option>
				<el-option value="4">挂起中</el-option>
				<el-option value="5">验收中</el-option>
				<el-option value="6">转单中</el-option>
				<el-option value="7">已完成</el-option>
				<el-option value="8">待评价</el-option>
				<el-option value="9">已关闭</el-option>
			</el-select>
		</wordTitle>
		<List
			:pageNum="list.query.pageNum"
			:pageSize="list.query.pageSize"
			:total="list.total"
			@handleSizeChange="handleSizeChange"
			@handleCurrentChange="handleCurrentChange"
			v-loading="loading"
		>
			<card :datas="list.datas" @show="show"></card>
		</List>
		<DarkDialog v-model="maintainDig">
			<recordDetail :taskId="id"></recordDetail>
		</DarkDialog>
	</div>
</template>
<script>
import wordTitle from "../components/wordTitle"
import { List } from "@/components/App"
import card from "./components/card"
import maintain from "@/api/operations/maintain"
import DarkDialog from "@/components/App/DarkDialog"
import recordDetail from "./components/recordDetail"
export default {
	name: "OperationsMaintainRecord",
	meta: {
		sort: 4,
		title: "保养记录",
		hideMenu: true,
	},
	components: {
		wordTitle,
		List,
		card,
		DarkDialog,
		recordDetail,
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
					status: "",
					search: "",
					time: [],
				},
			},
			loading: true,
			//弹窗
			maintainDig: {
				dialogVisible: false,
				binds: {
					title: "保养记录详情",
					width: "1200px",
				},
			},
			id: "",
			forminfo: null,
			isq: true,
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
			let res = await maintain.record.getRecordList(this.list.query)
			this.list.datas = res.list
			this.list.total = res.total
			this.loading = false
		},
		show(item) {
			this.id = item.id
			this.maintainDig.dialogVisible = true
		},
		async getweektime() {
			let end = new Date()
			let start = new Date()
			start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
			this.list.query.time = [start, end]
			this.isq = !this.isq
			await this.getlist()
		},
		async getmonthtime() {
			let end = new Date()
			let start = new Date()
			start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
			this.list.query.time = [start, end]
			this.isq = !this.isq
			await this.getlist()
		},
	},
}
</script>
<style lang="scss">
@import "@/assets/css/variables.scss";
.record-main {
	height: calc(100% - 220px);

	.right > .timebtn {
		width: 48px;
		margin-right: 10px;
		margin-left: 0px;
	}
	.right > .primary {
		color: #0071e3;
		border: 1px solid #0071e3;
	}
	.right > .default {
		border: 1px solid #4d4d4d;
		color: #fff;
	}
	.select-search {
		width: 75px;
		margin-left: 10px;
	}
	.input-with-select {
		width: 120px;
		.el-input-group__append {
			width: 26px !important;
			color: #0071e3;
			background: transparent;
			border-color: #4d4d4d;
			padding: 0px;
		}
		.el-input-group__prepend {
			width: 100px !important;
			color: #0071e3;
			background: transparent;
			border-color: #4d4d4d;
		}
		.el-button {
			margin: 0px;
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

	.el-button {
		width: 36px;
		padding: 7px 0px;
		border-color: #4d4d4d;
	}
	.addbtn {
		width: 48px;
		margin-left: 10px;
	}
	.dialognav {
		.tabs-header {
			padding: 0px 20px;
			box-sizing: border-box;
			background: rgba(26, 26, 26, 0.8);
			.tab-item {
				display: inline-block;
				cursor: pointer;
				line-height: 36px;
				color: #fff;
				margin-right: 38px;
			}
			.is-active {
				color: #0071e3;
				position: relative;
				&::after {
					content: "";
					position: absolute;
					left: 0;
					bottom: 0;
					width: 56px;
					height: 2px;
					background: #0071e3;
				}
			}
		}

		.tab-pane {
			padding: 20px 20px;
		}
	}
}
</style>
