<template>
	<div class="order-table-main">
		<div class="filter">
			<div>
				<span>报修人:</span>
				<el-select size="small" v-model="query.repairman">
					<el-option label="我的" value="1"></el-option>
					<el-option label="全部" value="-1"></el-option>
				</el-select>
			</div>
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
						<el-option label="设备名称" value="1"></el-option>
						<el-option label="设备类型" value="2"></el-option>
						<el-option label="编号" value="3"></el-option>
						<el-option label="所属保养任务" value="4"></el-option>
					</el-select>
				</el-input>
			</div>
			<div>
				<span>报修时间:</span>
				<el-date-picker
					v-model="query.time"
					size="small"
					type="datetimerange"
					range-separator="至"
					start-placeholder="开始日期"
					end-placeholder="结束日期"
				></el-date-picker>
			</div>
			<div>
				<el-button type="primary" size="small" @click="showdig"
					>报修</el-button
				>
			</div>
		</div>
		<div class="main-table">
			<Table v-model="query" :columns="columns" :tableData="tableData">
				<template v-slot:fixed="{ row }">
					<el-button type="text" v-if="row.status == 1"
						>催办</el-button
					>
					<el-button
						type="text"
						v-if="row.status == 2 || row.status == 3"
						>查看工单</el-button
					>
				</template>
			</Table>
		</div>
	</div>
</template>
<script>
import { Table, TableMixin } from "@/components/App"
import maintain from "@/api/operations/maintain"
let depts = []
export default {
	components: {
		Table,
	},
	mixins: [
		TableMixin([
			{
				fetchListFunction: maintain.handicap.getHandicapList,
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
			this.columns.repairDept.filters = depts
		})
	},
	data() {
		return {
			query: {
				keyword: "",
				searchType: "",
				time: [],
				pageNum: 1,
				pageSize: 10,
				repairman: "1",
			},
			columns: {
				index: {
					hidden: true,
				},
				fixed: {
					width: 120,
				},
				repairDept: {
					filters: depts,
					"filter-method": this.filterTag,
					"filter-placement": "bottom-end",
				},
				status: {
					filters: [
						{ text: "待审核", value: "1" },
						{ text: "已驳回", value: "2" },
						{ text: "已通过", value: "3" },
					],
					"filter-method": this.filterTag,
					"filter-placement": "bottom-end",
					formatter: (item) => {
						return item.status == 1
							? "待审核"
							: item.status == 2
							? "已驳回"
							: item.status == 3
							? "已通过"
							: ""
					},
				},
				repairTime: {
					sortable: true,
				},
			},
		}
	},
	methods: {
		showdig() {
			this.$router.push({
				path: "/operations/workbench/repair/register",
			})
		},
	},
}
</script>

<style lang="scss">
.order-table-main {
	padding: 20px;
	.filter {
		margin-bottom: 20px;
		display: flex;
		& > div {
			margin-right: 15px;
			& > span {
				font-size: 14px;
				color: #fff;
			}
		}
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
	}
	.xz {
		color: #9c34f5;
	}
	.zd {
		color: #e39600;
	}
	.gq {
		color: #0ab2c1;
	}
	.jj {
		color: #fff2ac;
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
