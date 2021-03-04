<template>
	<div class="inventory-action-table-main">
		<div class="main-table">
			<Table v-model="query" :columns="columns" :tableData="tableData">
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
				fetchListFunction: asset.inventory.getequipmentActionList,
			},
		]),
	],
	data() {
		return {
			query: {
				pageNum: 1,
				pageSize: 10,
				id: this.$route.query.equipmentId,
			},
			columns: {
				index: {
					hidden: true,
				},
				actionUser: {
					width: "200",
				},
				actionTime: {
					width: "200",
				},
			},
		}
	},
}
</script>

<style lang="scss">
.inventory-action-table-main {
	height: 455px;
	.main-table {
		height: 100%;
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
