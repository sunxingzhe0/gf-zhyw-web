<template>
	<div class="log">
		<Table v-model="query" :columns="columns" :tableData="tableData">
		</Table>
	</div>
</template>
<script>
import { Table, TableMixin } from "@/components/App"
import maintain from "@/api/operations/maintain"
export default {
	name: "log",
	props: {
		id: {
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
				fetchListFunction: maintain.handicap.gelogList,
			},
		]),
	],
	data() {
		return {
			query: {
				pageNum: 1,
				pageSize: 10,
				id: this.id,
			},
			columns: {
				index: {
					hidden: true,
				},
			},
		}
	},
}
</script>
<style lang="scss">
.log {
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
