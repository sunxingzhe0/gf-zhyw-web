<template>
	<div class="stock-main-table">
		<Table v-model="query" :columns="columns" :tableData="tableData">
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
				fetchListFunction: asset.inventory.getinventoryEquipmentList,
			},
		]),
	],
	data() {
		return {
			query: {
				keyword: "",
				searchType: "1",
				pageNum: 1,
				pageSize: 10,
				id: this.$route.query.equipmentId,
			},
			columns: {
				index: {
					hidden: true,
					width: 40,
				},
				inventoryResult: {
					formatter: (row) => {
						return row.inventoryResult == 1
							? "正常"
							: row.inventoryResult == 2
							? "故障"
							: row.inventoryResult == 3
							? "丢失"
							: "停用"
					},
				},
			},
		}
	},
}
</script>
<style lang="scss">
.stock-main-table {
	height: 455px;
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
