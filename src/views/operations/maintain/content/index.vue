<!-- @format -->

<template>
	<div class="word-content">
		<wordTitle :title="$route.meta.title">
			<el-input
				placeholder="请输入关键字查询"
				size="mini"
				v-model="list.query.search"
				class="input-with-select"
			>
				<el-select
					v-model="list.query.type"
					slot="prepend"
					placeholder="请选择"
					size="mini"
				>
					<el-option label="全部" value="0"></el-option>
					<el-option label="空调" value="1"></el-option>
					<el-option label="新风" value="2"></el-option>
				</el-select>
				<el-button
					slot="append"
					icon="el-icon-search"
					type="primary"
					class="searchbtn"
				></el-button>
			</el-input>
			<el-button
				size="mini"
				type="primary"
				class="addbtn"
				@click="addMaintainContent"
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
			<card :datas="list.datas" @edit="edit" @del="del"></card>
		</List>
		<DarkDialog v-model="maintainDig" @close="close">
			<contentForm
				:id="id"
				@sumbit="sumbit"
				:forminfo="forminfo"
				ref="contentform"
			></contentForm>
		</DarkDialog>
	</div>
</template>
<script>
import wordTitle from "../components/wordTitle"
import { List } from "@/components/App"
import card from "./components/card"
import maintain from "@/api/operations/maintain"
import DarkDialog from "@/components/App/DarkDialog"
import contentForm from "./components/contentForm"
export default {
	name: "OperationsMaintainContent",
	meta: {
		sort: 3,
		title: "保养内容",
		hideMenu: true,
	},
	components: {
		wordTitle,
		List,
		card,
		DarkDialog,
		contentForm,
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
					type: "1",
					search: "",
				},
			},
			loading: true,
			//弹窗
			maintainDig: {
				dialogVisible: false,
				binds: {
					title: "新增保养内容",
					width: "680px",
				},
			},
			id: "",
			forminfo: null,
		}
	},
	async created() {
		await this.getlist()
	},
	methods: {
		addMaintainContent() {
			this.maintainDig.dialogVisible = true
			this.id = ""
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
			let res = await maintain.content.getContentList(this.list.query)
			this.list.datas = res.list
			this.list.total = res.total
			this.loading = false
		},
		sumbit(flg) {
			if (flg) {
				this.maintainDig.dialogVisible = false
				this.getlist()
			}
		},
		edit(item) {
			this.maintainDig.dialogVisible = true
			this.id = item.id
			this.maintainDig.binds.title = "编辑内容"
			this.forminfo = item
		},
		close() {
			this.forminfo = null
			this.id = ""
			this.$refs.contentform.$refs.contentform.resetFields()
		},
		async del(row) {
			this.$confirm("确定要删除该条数据吗？", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			}).then(async () => {
				await maintain.content.delContents({
					id: row.id,
				})
				// 重新拉取数据
				await this.getlist()
				this.$message.success("操作成功!")
			})
		},
	},
}
</script>
<style lang="scss">
@import "@/assets/css/variables.scss";
.word-content {
	height: calc(100% - 220px);
	.select-search {
		width: 75px;
		margin-left: 10px;
	}
	.input-with-select {
		width: 260px;
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
