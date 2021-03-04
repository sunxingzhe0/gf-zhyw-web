<template>
	<div class="abnormal-main-table">
		<Table v-model="query" :columns="columns" :tableData="tableData">
			<template v-slot:slot_result="{ row }">
				<span v-if="row.inventoryResult == 1" class="green">正常</span>
				<span v-else class="red">{{
					row.inventoryResult == 1
						? "正常"
						: row.inventoryResult == 2
						? "故障"
						: row.inventoryResult == 3
						? "丢失"
						: "停用"
				}}</span>
			</template>
			<template v-slot:fixed="{ row }">
				<el-button type="text" @click="repair(row.id)">修复</el-button>
			</template>
		</Table>
	</div>
</template>
<script>
import { Table, TableMixin } from "@/components/App"
import asset from "@/api/operations/asset"
export default {
	props: {
		id: String,
	},
	components: {
		Table,
	},
	mixins: [
		TableMixin([
			{
				fetchListFunction: asset.inventory.getabnormalEquipmentList,
			},
		]),
	],
	data() {
		return {
			query: {
				keyword: "",
				searchType: "1",
				id: this.$route.query.equipmentId,
				pageNum: 1,
				pageSize: 10,
			},
			columns: {
				index: {
					hidden: true,
					width: 40,
				},
				fixed: {
					width: 50,
				},
				inventoryResult: {
					prop: "slot_result",
				},
			},
		}
	},
	methods: {
		repair(id) {
			console.log(id)
			this.$message.success("修复成功")
			this.$_fetchTableData(asset.inventory.getabnormalEquipmentList)
		},
	},
}
</script>
<style lang="scss">
.abnormal-main-table {
	height: 455px;
	.green {
		color: #42d36b;
	}
	.red {
		color: #f74a4a;
	}
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
</style>
