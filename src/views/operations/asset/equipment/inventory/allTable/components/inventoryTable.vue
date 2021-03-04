<template>
	<div class="daily-table-main">
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
						<el-option label="盘点名称" value="1"></el-option>
					</el-select>
				</el-input>
			</div>
			<div>
				<span class="label">盘点时间:</span>
				<el-date-picker
					v-model="query.inventoryTime"
					size="small"
					type="datetimerange"
					range-separator="至"
					start-placeholder="开始日期"
					end-placeholder="结束日期"
				></el-date-picker>
			</div>
			<div>
				<el-button size="small" class="btn" @click="append"
					>开始盘点</el-button
				>
			</div>
		</div>
		<div class="main-table">
			<Table v-model="query" :columns="columns" :tableData="tableData">
				<template v-slot:fixed="{ row }">
					<el-button type="text" @click="printing(row)"
						>打印</el-button
					>
					<el-button type="text" @click="download(row)"
						>下载</el-button
					>
					<el-button
						type="text"
						@click="repair(row)"
						v-if="row.InventoryRepair == '0'"
						>修复</el-button
					>
					<el-button
						type="text"
						@click="Input(row)"
						v-if="row.inventoryResult == '3'"
						>录入</el-button
					>
				</template>
				<template v-slot:slot_result="{ row }">
					<span :class="row.inventoryResult == 2 ? 'red' : ''">{{
						row.inventoryResult == 1
							? "正常"
							: row.inventoryResult == 2
							? "异常"
							: row.inventoryResult == 3
							? "未知"
							: ""
					}}</span>
				</template>
			</Table>
		</div>
	</div>
</template>
<script>
import { Table, TableMixin } from "@/components/App"
import asset from "@/api/operations/asset"
export default {
	components: {
		Table,
	},
	mixins: [
		TableMixin([
			{
				fetchListFunction: asset.inventory.getEquipments,
			},
		]),
	],
	data() {
		return {
			query: {
				keyword: "",
				searchType: "1",
				inventoryTime: [],
				pageNum: 1,
				pageSize: 10,
			},
			columns: {
				index: {
					hidden: true,
				},
				fixed: {
					width: 170,
				},
				inventoryResult: {
					prop: "slot_result",
				},
				InventoryRepair: {
					formatter: (item) => {
						return item.InventoryRepair == "1"
							? "是"
							: item.InventoryRepair == "0"
							? "否"
							: ""
					},
				},
			},
			data: null, //盘点记录信息
		}
	},
	methods: {
		//录入
		Input(item) {
			this.$emit("Input", item)
		},
		download(item) {
			this.$emit("download", item.id)
		},
		repair(item) {
			this.$emit("repair", item.id)
		},
		append() {
			this.$emit("append")
		},
		printing(item) {
			this.$emit("printing", item.id)
		},
	},
}
</script>

<style lang="scss">
.daily-table-main {
	padding: 20px;
	.filter {
		margin-bottom: 20px;
		display: flex;
		justify-content: space-between;
		& > div {
			margin-right: 20px;
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
		.label {
			font-size: 14px;
			color: #fff;
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
	.backbtn,
	.red {
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
