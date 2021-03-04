<template>
	<div class="notes-table">
		<div class="haeder-search">
			<div class="search-left">
				<div class="search-item">
					<div class="label">申领人:</div>
					<el-select
						size="small"
						placeholder="请选择"
						v-model="query.applicant"
					>
						<el-option label="全部" value=""></el-option>
					</el-select>
				</div>
				<div class="search-item">
					<el-input
						placeholder="请输入"
						v-model="query.keyword"
						class="input-with-select"
						size="small"
					>
						<el-select
							v-model="query.searchType"
							slot="prepend"
							placeholder="请选择"
							size="small"
						>
							<el-option label="申领人内容" value="1"></el-option>
							<el-option label="申领人姓名" value="2"></el-option>
							<el-option label="申领人工号" value="3"></el-option>
							<el-option label="申领人电话" value="4"></el-option>
						</el-select>
					</el-input>
				</div>
			</div>
			<div class="search-right">
				<div class="search-item">
					<div class="label">申领日期:</div>
					<el-date-picker
						size="small"
						v-model="query.time"
						type="datetimerange"
						range-separator="至"
						start-placeholder="开始日期"
						end-placeholder="结束日期"
						align="right"
						class="search-time"
					>
					</el-date-picker>
				</div>
				<div class="search-item">
					<el-button type="primary" plain size="small" @click="show"
						>申领备件</el-button
					>
				</div>
			</div>
		</div>
		<div class="table-main">
			<Table v-model="query" :columns="columns" :tableData="tableData">
			</Table>
		</div>
	</div>
</template>
<script>
import { Table, TableMixin } from "@/components/App"
import maintain from "@/api/operations/maintain"
let depts = []
export default {
	name: "notesTable",
	props: {
		recordid: {
			type: String,
			default: "",
		},
	},
	components: {
		Table,
	},
	mixins: [
		TableMixin([
			{
				fetchListFunction: maintain.order.getnotesList,
			},
		]),
	],
	async beforeCreate() {
		let res = await maintain.order.getDdepts()
		let orderDepts = res.map((item) => {
			return { text: item.name, value: item.id }
		})
		depts = orderDepts
		this.$nextTick(function() {
			this.columns.dept.filters = depts
		})
	},
	data() {
		return {
			query: {
				pageNum: 1,
				pageSize: 10,
				applicant: "",
				keyword: "",
				searchType: "1",
				time: "",
				dept: "",
				status: "",
			},
			columns: {
				index: {
					hidden: true,
				},
				dept: {
					filters: depts,
					"filter-method": this.deptHandler,
				},
				status: {
					filters: [
						{ text: "待审核", value: "1" },
						{ text: "已驳回", value: "2" },
						{ text: "已通过", value: "3" },
					],
					"filter-method": this.statusHandler,
					formatter: (item) => {
						return item.status == "1"
							? "待审核"
							: item.status == "2"
							? "已驳回"
							: item.status == "3"
							? "已通过"
							: ""
					},
				},
				time: {
					sortable: true,
				},
			},
		}
	},
	methods: {
		deptHandler(value) {
			this.query.dept = value
		},
		statusHandler(value) {
			this.query.status = value
		},
		show() {
			this.$router.push({ path: "/operations/asset/applyAsset/apply" })
		},
	},
}
</script>
<style lang="scss">
.notes-table {
	height: 443px;
	.table-main {
		height: calc(100% - 52px);
	}
	.c__list {
		height: 100%;
		& > .el-table,
		.DarkDialog .c__list .el-table {
			height: calc(100% - 47px) !important;
			.el-table__column-filter-trigger {
				i {
					font-size: 20px !important;
					margin-left: 7px;
					color: #0071e3;
					font-weight: bolder;
				}
			}
			.caret-wrapper {
				.ascending {
					border-bottom-color: #0071e3;
				}
				.descending {
					border-top-color: #0071e3;
				}
			}
		}
		.el-button {
			border: none;
		}
	}

	.haeder-search {
		display: flex;
		margin-bottom: 20px;
		justify-content: space-between;
		.search-left,
		.search-right {
			display: flex;
			.search-item {
				display: flex;
				margin-right: 15px;
				.label {
					font-size: 14px;
					line-height: 32px;
					color: #fff;
					margin-right: 10px;
				}
				.search-time {
					width: 300px;
				}
				.input-with-select {
					width: 250px;
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
						width: 36px;
						padding: 7px 0px;
						border-color: #4d4d4d;
					}
				}
			}
			.search-item:last-child {
				margin: 0;
			}
		}
	}
}
</style>
