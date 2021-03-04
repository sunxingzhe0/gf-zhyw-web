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
	components: {
		Table,
	},
	mixins: [
		TableMixin([
			{
				fetchListFunction: asset.blacklist.getBlacksupplierList,
			},
		]),
	],
	data() {
		return {
			query: {
				pageNum: 1,
				pageSize: 10,
				keyword: "",
			},
			columns: {
				index: {
					width: "10px",
					hidden: true,
				},
			},
		}
	},
	methods: {
		search() {
			this.$_fetchTableData(asset.blacklist.getsupplierList)
		},
	},
}
</script>
