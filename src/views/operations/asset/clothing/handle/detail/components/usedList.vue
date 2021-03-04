<template>
	<div class="used-table-main">
		<div class="filter">
			<div>
				<el-input
					size="small"
					placeholder="请输入"
					v-model="query.keyword"
					class="input-with-select-search"
				>
					<el-select
						slot="prepend"
						placeholder="请选择"
						size="small"
						v-model="query.searchType"
					>
						<el-option label="使用人" value="1"></el-option>
					</el-select>
				</el-input>
			</div>
			<div>
				<el-select
					placeholder="请选择"
					size="small"
					v-model="query.timeType"
					class="time-type"
				>
					<el-option label="注册时间" value="1"></el-option>
					<el-option label="召回时间" value="2"></el-option>
				</el-select>
				<el-date-picker
					v-model="query.time"
					size="small"
					type="datetimerange"
					range-separator="至"
					start-placeholder="开始日期"
					end-placeholder="结束日期"
				></el-date-picker>
			</div>
		</div>
		<Table
			v-model="query"
			:columns="columns"
			:tableData="tableData"
			:bats="[]"
		>
		</Table>
	</div>
</template>
<script>
/*
@author        cui
@name          
@desc          被服使用情况
@query         
@props         clothingId    string    被服id
@emit           
*/
import { Table, TableMixin } from "@/components/App"
import asset from "@/api/operations/asset"
let depts = [] //部门
export default {
	props: {
		clothingId: String,
	},
	components: {
		Table,
	},
	mixins: [
		TableMixin([
			{
				fetchListFunction: asset.clothing.usedList,
			},
		]),
	],
	async beforeCreate() {
		let deptres = await asset.equipment.getDepts()
		depts = deptres.map((item) => {
			return { text: item.deptName, value: item.id }
		})
		this.$nextTick(function() {
			this.columns.usedDeptName.filters = depts
		})
	},
	data() {
		return {
			query: {
				clothingId: this.clothingId,
				pageNum: 1,
				pageSize: 10,
				keyword: "",
				searchType: "1",
				timeType: "1",
				time: [],
			},
			columns: {
				index: {
					width: "10px",
					hidden: true,
				},
				recallTime: { sortable: true },
				usedTime: { sortable: true },
				usedNum: { sortable: true },
				usedSumprice: {
					sortable: true,
					formatter: (row) => {
						return "￥" + row.usedSumprice
					},
				},
				usedDuration: {
					sortable: true,
					formatter: (item) => {
						return item.usedDuration + "天"
					},
				},
				usedDeptName: {
					filters: depts,
					"filter-method": this.filterResult,
					"filter-placement": "bottom-end",
				},
			},
		}
	},
	methods: {
		search() {
			this.$_fetchTableData(asset.clothing.usedList)
		},
		filterResult() {
			this.$_fetchTableData(asset.clothing.washList)
		},
	},
}
</script>
<style lang="scss">
.used-table-main {
	height: 500px;
	.filter {
		padding: 20px 10px;
		display: flex;
		& > div {
			margin-right: 20px;
		}
		.time-type {
			width: 100px;
		}
		.el-date-editor {
			width: 250px;
		}
		.input-with-select-search {
			width: 250px;
			margin-left: 10px;
			.el-input-group__prepend {
				width: 100px !important;
				color: #0071e3;
				background: transparent;
				border-color: #4d4d4d;
			}
		}
		.label {
			font-size: 14px;
			color: #fff;
			margin-left: 20px;
			margin-right: 10px;
		}
	}
	.c__list {
		height: calc(100% - 72px) !important;
		& > .el-table,
		.DarkDialog .c__list .el-table {
			height: calc(100% - 42px) !important;
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
	}
}
</style>
