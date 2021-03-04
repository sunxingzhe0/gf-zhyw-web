<template>
	<div class="elist">
		<Table v-model="query" :columns="columns" :tableData="tableData">
		</Table>
	</div>
</template>
<script>
import { Table, TableMixin } from "@/components/App"
import maintain from "@/api/operations/maintain"
export default {
	name: "repairTable",
	props: {
		repairTablequey: {
			type: Object,
		},
	},
	components: {
		Table,
	},
	mixins: [
		TableMixin([
			{
				fetchListFunction: maintain.plan.getrepairList,
			},
		]),
	],
	data() {
		return {
			query: {
				pageNum: 1,
				pageSize: 10,
				type: this.repairTablequey.type,
				keyword: this.repairTablequey.keyword,
				searchType: this.repairTablequey.searchType,
				time: [],
				etype: [],
				recordid: this.repairTablequey.recordid,
				source: [],
				status: [],
			},
			columns: {
				index: {
					hidden: true,
				},
				fixed: {
					width: 50,
				},
				etype: {
					filters: [
						{ text: "类型1", value: "1" },
						{ text: "类型2", value: "2" },
						{ text: "类型3", value: "3" },
					],
					"filter-method": this.etypeHandler,
				},
				source: {
					filters: [
						{ text: "移动", value: "1" },
						{ text: "来电", value: "2" },
					],
					"filter-method": this.sourceHandler,
				},
				status: {
					filters: [
						{ text: "待处理", value: "1" },
						{ text: "待接单", value: "2" },
					],
					"filter-method": this.statusHandler,
				},
			},
		}
	},
	methods: {
		etypeHandler(value) {
			this.query.etype = value
		},
		sourceHandler(value) {
			this.query.source = value
		},
		statusHandler(value) {
			this.query.status = value
		},
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
}
</style>
