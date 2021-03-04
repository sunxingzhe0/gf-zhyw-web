<template>
	<div class="equipment-repair-table-main">
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
						<el-option label="报修内容" value="1"></el-option>
						<el-option label="报修人姓名" value="2"></el-option>
						<el-option label="报修人工号" value="3"></el-option>
						<el-option label="报修人电话" value="4"></el-option>
					</el-select>
				</el-input>
			</div>
			<div>
				<span class="label">报修日期:</span>
				<el-date-picker
					v-model="query.repairTime"
					size="small"
					type="datetimerange"
					range-separator="至"
					start-placeholder="开始日期"
					end-placeholder="结束日期"
				></el-date-picker>
			</div>
		</div>
		<div class="main-table">
			<Table v-model="query" :columns="columns" :tableData="tableData">
				<template v-slot:fixed="{ row }">
					<el-button
						type="text"
						@click="edit(row.id)"
						v-if="row.repairStatus == 'ToBeProcessed'"
						>派单</el-button
					>
					<el-button type="text" @click="show(row.id)" v-else
						>查看</el-button
					>
				</template>
			</Table>
		</div>
	</div>
</template>
<script>
import { Table, TableMixin } from "@/components/App"
import asset from "@/api/operations/asset"
let depts = [] //使用部门
let WorkOrderStatus = [] //状态
let orderStatus = null //状态json
export default {
	components: {
		Table,
	},
	mixins: [
		TableMixin([
			{
				fetchListFunction: asset.equipment.getrepairList,
			},
		]),
	],
	async beforeCreate() {
		let deptres = await asset.equipment.getDepts()
		depts = deptres.map((item) => {
			return { text: item.deptName, value: item.id }
		})
		let status = this.$store.state.operations.status.WorkOrderStatus
		for (let key in status) {
			WorkOrderStatus.push({ text: status[key], value: key })
		}
		orderStatus = status
		this.$nextTick(function() {
			this.columns.repairDeptname.filters = depts
			this.columns.executiveDept.filters = depts
			this.columns.repairStatus.filters = WorkOrderStatus
			this.WorkOrderStatus = status
		})
	},
	data() {
		return {
			query: {
				keyword: "",
				searchType: "1",
				time: [],
				pageNum: 1,
				pageSize: 10,
				repairTime: [],
				equipmentId: this.$route.query.equipmentId,
			},
			columns: {
				index: {
					hidden: true,
				},
				fixed: {
					width: 50,
				},
				executiveDept: {
					filters: depts,
					"filter-method": this.filterOrdertype,
					"filter-placement": "bottom-end",
				},
				repairDeptname: {
					filters: depts,
					"filter-method": this.filterOrdertype,
					"filter-placement": "bottom-end",
				},
				repairStatus: {
					filters: WorkOrderStatus,
					"filter-method": this.filterTag,
					"filter-placement": "bottom-end",
					formatter: (item) => {
						return orderStatus ? orderStatus[item.repairStatus] : ""
					},
				},
				repairDuration: { sortable: true },
				repairDate: { sortable: true },
			},
		}
	},
	methods: {
		edit(id) {
			console.log(id)
		},
		show(id) {
			console.log(id)
		},
	},
}
</script>

<style lang="scss">
.equipment-repair-table-main {
	padding: 20px 0px;
	.filter {
		margin-bottom: 20px;
		display: flex;
		.el-date-editor {
			width: 250px;
			margin-left: 10px;
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
	.btn {
		background: transparent;
		border: 1px solid #0071e3;
		border-radius: 2px;
		color: #0071e3;
		&:hover,
		&:focus {
			background: transparent;
			color: #0071e3;
		}
	}
	.backbtn {
		color: #f74a4a;
	}
	.main-table {
		height: 500px;
		.c__list {
			height: 100%;
			.el-table {
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
		}
	}
}
</style>
