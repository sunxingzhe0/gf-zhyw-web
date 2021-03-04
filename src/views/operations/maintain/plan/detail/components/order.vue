<template>
	<div class="plan-order-main">
		<div class="filter">
			<el-select size="small" v-model="query.type">
				<el-option label="全部设备类型" value=""></el-option>
			</el-select>
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
			<el-date-picker
				v-model="query.time"
				size="small"
				type="datetimerange"
				range-separator="至"
				start-placeholder="开始日期"
				end-placeholder="结束日期"
			>
			</el-date-picker>
		</div>
		<div class="main">
			<Table v-model="query" :columns="columns" :tableData="tableData">
				<template v-slot:fixed="{ row }">
					<el-button type="text" @click="showOrderdetail(row.id)"
						>查看</el-button
					>
				</template>
			</Table>
		</div>
	</div>
</template>
<script>
import { Table, TableMixin } from "@/components/App"
import maintain from "@/api/operations/maintain"
let types = []
export default {
	components: {
		Table,
	},
	mixins: [
		TableMixin([
			{
				fetchListFunction: maintain.plan.detail.getorderList,
			},
		]),
	],
	async beforeCreate() {
		let res = await maintain.plan.getTypes()
		let ordertypes = res.map((item) => {
			return { text: item.name, value: item.id }
		})
		types = ordertypes
		this.$nextTick(function() {
			this.columns.etype.filters = types
		})
	},
	data() {
		return {
			query: {
				orderType: "",
				etype: "",
				source: "",
				status: "",
				searchType: "",
				keyword: "",
				time: [],
				pageNum: 1,
				pageSize: 10,
			},
			columns: {
				index: {
					hidden: true,
				},
				fixed: {
					width: 50,
				},
				type: {
					filters: [
						{ text: "设备", value: "1" },
						{ text: "非设备", value: "2" },
					],
					"filter-method": this.filterOrdertype,
					"filter-placement": "bottom-end",
				},
				etype: {
					filters: types,
					"filter-method": this.filterTag,
					"filter-placement": "bottom-end",
				},
				source: {
					filters: [
						{ text: "电话", value: "1" },
						{ text: "巡检报障", value: "2" },
						{ text: "巡检报障", value: "3" },
						{ text: "其他", value: "4" },
					],
					"filter-method": this.filterTag,
					"filter-placement": "bottom-end",
				},
				status: {
					filters: [
						{ text: "待处理", value: "1" },
						{ text: "待接单", value: "2" },
						{ text: "进行中", value: "3" },
						{ text: "挂起中", value: "4" },
						{ text: "待审核", value: "5" },
						{ text: "待评价", value: "6" },
						{ text: "已完成", value: "7" },
					],
					"filter-method": this.filterTag,
					"filter-placement": "bottom-end",
					formatter: (item) => {
						return item.status == 1
							? "待处理"
							: item.status == 2
							? "待接单"
							: item.status == 3
							? "进行中"
							: item.status == 4
							? "挂起中"
							: item.status == 5
							? "待审核"
							: item.status == 6
							? "待评价"
							: item.status == 7
							? "已完成"
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
		filterTag(value) {
			console.log(value)
		},
		filterOrdertype(value) {
			this.query.orderType = value
			this.$_fetchTableData(maintain.plan.detail.getorderList)
		},
		showOrderdetail(id) {
			this.$router.push({
				path: "/operations/maintain/order/detail",
				query: {
					orderId: id,
					nav: "third",
				},
			})
		},
	},
}
</script>
<style lang="scss">
.plan-order-main {
	.filter {
		margin-bottom: 20px;
		.el-select {
			width: 150px;
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
	.main {
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
