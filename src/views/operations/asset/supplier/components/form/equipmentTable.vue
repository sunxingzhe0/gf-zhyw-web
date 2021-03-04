<template>
	<div class="table-main">
		<el-input
			placeholder="关键字"
			size="mini"
			v-model="query.keyword"
			class="input-with-select"
		>
			<el-button
				slot="append"
				icon="el-icon-search"
				type="primary"
				size="mini"
				@click="search"
			></el-button>
		</el-input>
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
import { Table, TableMixin } from "@/components/App"
import asset from "@/api/operations/asset"
export default {
	props: {
		supplierId: String,
	},
	components: {
		Table,
	},
	mixins: [
		TableMixin([
			{
				fetchListFunction: asset.supplier.getequipmentList,
			},
		]),
	],
	data() {
		return {
			query: {
				supplierId: this.supplierId,
				pageNum: 1,
				pageSize: 10,
				keyword: "",
			},
			columns: {
				index: {
					width: "10px",
					hidden: true,
				},
				contractBidding: {
					formatter: (row) => {
						return row.contractBidding == "1" ? "是" : "否"
					},
				},
				contractStatus: {
					formatter(row) {
						return row.contractBidding == "1" ? "有效" : "无效"
					},
				},
			},
		}
	},
	methods: {
		search() {
			this.$_fetchTableData(asset.supplier.getcontractList)
		},
	},
}
</script>
