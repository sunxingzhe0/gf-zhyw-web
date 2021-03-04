<template>
	<div class="word">
		<wordTitle title="保养计划" class="plan-title">
			<el-input
				placeholder="请输入关键字"
				size="mini"
				v-model="list.query.search"
				class="input-with-select-search"
			>
				<el-button
					slot="append"
					icon="el-icon-search"
					type="primary"
					class="searchbtn"
					@click="search"
				></el-button>
			</el-input>
			<el-select
				v-model="list.query.status"
				placeholder="请选择"
				size="mini"
				class="select-search"
				@change="search"
			>
				<el-option label="全部" value=""> </el-option>
				<el-option
					v-for="(item, index) in options"
					:key="index"
					:label="item.label"
					:value="item.value"
				>
				</el-option>
			</el-select>
			<el-button
				size="mini"
				type="primary"
				class="addbtn"
				@click="addMaintain"
				>新增</el-button
			>
		</wordTitle>
		<List
			:pageNum="list.query.pageNum"
			:pageSize="list.query.pageSize"
			:total="list.total"
			@handleSizeChange="handleSizeChange"
			@handleCurrentChange="handleCurrentChange"
			v-loading="loading"
		>
			<card :datas="list.datas" @edit="edit" @detail="detail"></card>
		</List>
		<DarkDialog v-model="maintainDig" @close="close">
			<addForm
				:formId="formId"
				:isedit="isedit"
				@submit="sumbit"
			></addForm>
		</DarkDialog>
		<router-view></router-view>
	</div>
</template>
<script>
import wordTitle from "../components/wordTitle"
import { List } from "@/components/App"
import addForm from "./components/addForm"
import card from "./components/card"
import DarkDialog from "@/components/App/DarkDialog"
import maintain from "@/api/operations/maintain"
export default {
	name: "OperationsMaintainPlan",
	meta: {
		sort: 1,
		title: "保养计划",
		hideMenu: true,
	},
	components: {
		wordTitle,
		List,
		DarkDialog,
		card,
		addForm,
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
					search: "",
					status: "",
				},
			},
			loading: true,
			activeName: "first",
			//弹窗
			maintainDig: {
				dialogVisible: false,
				binds: {
					title: "新增保养计划",
					width: "1200px",
				},
			},
			options: [
				{ label: "启用", value: "1" },
				{ label: "停用", value: "0" },
			],
			formId: "",
			navs: [
				{ label: "基本信息", name: "first" },
				{ label: "设备关联", name: "second" },
				{ label: "保养记录", name: "third" },
				{ label: "保养任务", name: "fourth" },
				{ label: "关联工单", name: "five" },
			],
			isedit: false,
		}
	},
	async created() {
		await this.getlist()
	},
	methods: {
		addMaintain() {
			this.maintainDig.dialogVisible = true
			this.formId = ""
			this.isedit = false
			this.maintainDig.binds.title = "新增保养计划"
		},
		handleClick(name) {
			this.activeName = name
		},
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
			let res = await maintain.plan.getPlanList(this.list.query)
			this.list.datas = res.list
			this.list.total = res.total
			this.loading = false
		},
		search() {
			this.getlist()
		},
		sumbit(id) {
			if (id) {
				this.formId = id
				this.getlist()
			}
		},
		edit(item) {
			this.formId = item.id
			this.isedit = true
			this.maintainDig.dialogVisible = true
			this.maintainDig.binds.title = "编辑保养计划"
		},
		detail(item) {
			this.$router.push({
				path: "/operations/maintain/plan/detail",
				query: { planId: item.id, nav: "0" },
			})
		},
		close() {
			this.isedit = false
			this.formId = ""
			this.maintainDig.dialogVisible = false
		},
	},
}
</script>
<style lang="scss">
@import "@/assets/css/variables.scss";
.word {
	height: calc(100% - 220px);
	.plan-title {
		.select-search {
			width: 75px;
			margin-left: 10px;
		}
		.input-with-select-search {
			width: 160px;
			margin-left: 10px;
			.el-input-group__append {
				width: 26px !important;
				color: $--color-primary;
				background: transparent;
				border-color: #4d4d4d;
				padding: 0px;
				.el-button {
					padding: 7px 0px;
				}
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
		.addbtn {
			width: 36px;
			padding: 7px 0px;
			border: none;
			margin-left: 10px;
		}
		.addbtn {
			width: 48px;
		}
	}
}
</style>
