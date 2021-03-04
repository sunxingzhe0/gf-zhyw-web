<template>
	<div class="elist">
		<Table v-model="query" :columns="columns" :tableData="tableData">
			<template v-slot:slot_order="{ row }">
				<el-button type="text">{{ row.order }}</el-button>
			</template>
		</Table>
	</div>
</template>
<script>
import { Table, TableMixin } from "@/components/App"
import maintain from "@/api/operations/maintain"
export default {
	name: "equipmentTable",
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
				fetchListFunction: maintain.plan.getmaintainEquipmentList,
			},
		]),
	],
	data() {
		return {
			query: {
				pageNum: 1,
				pageSize: 10,
				recordid: this.recordid,
			},
			columns: {
				index: {
					hidden: true,
				},
				fixed: {
					width: 50,
				},
				order: {
					prop: "slot_order",
				},
			},
		}
	},
}
</script>
<style lang="scss">
.elist {
	height: 100%;
	.c__list {
		height: 100%;
		& > .el-table,
		.DarkDialog .c__list .el-table {
			height: calc(100% - 47px) !important;
		}
	}
	.el-button {
		border: none;
	}
}
</style>
