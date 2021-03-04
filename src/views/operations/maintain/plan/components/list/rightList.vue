<template>
	<div class="right-list">
		<div class="table-main zsk-content">
			<Table
				v-model="query"
				:columns="columns"
				:tableData="tableData"
				:bats="[]"
				:span-method="objectSpanMethod"
			>
				<template v-slot:fixed="scope">
					<el-button
						type="text"
						@click="
							addContent(
								scope.row.type,
								scope.row.typeid,
								scope.$index
							)
						"
						><i class="el-icon-plus"></i>添加</el-button
					>
				</template>
			</Table>
			<div class="zsk-list" v-if="zsk" :style="{ top: getpx() + 'px' }">
				<div x-arrow="" class="popper__arrow"></div>
				<div class="list-content">
					<planContent
						:typeid="typeid"
						:typename="typename"
						:planId="this.query.planid"
					></planContent>
				</div>
			</div>
			<!-- <Table
				ref="refTable"
				:columns="columns"
				:fetcher="fetcher"
				class="record-list"
				:table="{ 'span-method': objectSpanMethod }"
			>
			</Table> -->
		</div>
	</div>
</template>
<script>
import { Table, TableMixin } from "@/components/App"
// import { Table } from "@/components/Base"
import maintain from "@/api/operations/maintain"
import planContent from "./planContent"
export default {
	props: {
		query: Object,
	},
	components: {
		Table,
		planContent,
	},
	mixins: [
		TableMixin([
			{
				fetchListFunction: maintain.plan.getequipmentList,
			},
		]),
	],
	data() {
		return {
			columns: {
				index: {
					hidden: true,
				},
				fixed: {
					width: 84,
					label: "保养内容",
				},
			},
			types: [],
			typeid: "",
			typename: "",
			zsk: false,
			// columns: {
			// 	index: { width: 50 },
			// },
			// fetcher: maintain.plan.getequipmentList,
			index: 1,
		}
	},
	methods: {
		addContent(type, typeid, index) {
			this.typename = type
			this.index = index
			this.typeid = typeid
			this.zsk = !this.zsk
		},
		objectSpanMethod() {
			console.log(22)
			return {
				rowspan: 2,
				colspan: 1,
			}
			//{ row, column, rowIndex, columnIndex }
			// if (columnIndex === 0) {
			// 	if (rowIndex % 2 === 0) {

			// 	} else {
			// 		return {
			// 			rowspan: 0,
			// 			colspan: 0,
			// 		}
			// 	}
			// }
		},
		getpx() {
			let dan = this.index * 37
			return 88 + dan
		},
	},
}
</script>
<style lang="scss">
.right-list {
	height: 100%;
	.table-main {
		width: 100%;
		height: 100%;
		.c__list {
			height: 100%;
			& > .el-table,
			.DarkDialog .c__list .el-table {
				height: calc(100% - 57px) !important;
			}
			.c__tool {
				position: inherit;
			}
		}
	}
	.zsk-content {
		position: relative;
		.zsk-list {
			position: absolute;
			top: 88px;
			right: 0px;
			background: #000;
			width: 420px;
			height: 344px;
			background: #000000;
			border: 1px solid #666666;
			border-radius: 2px;
			padding: 12px;
			z-index: 99999;
			color: #606266;
			line-height: 1.4;
			text-align: justify;
			font-size: 14px;
			box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
			word-break: break-all;
			.popper__arrow {
				top: -13px;
				left: 83% !important;
				margin-right: 3px;
				border-top-width: 0;
				border-bottom-color: #666666 !important;
			}
			.popper__arrow {
				border-width: 6px;
				filter: drop-shadow(0 2px 12px rgba(0, 0, 0, 0.03));
			}
			.popper__arrow,
			.popper__arrow:after {
				position: absolute;
				display: block;
				width: 0;
				height: 0;
				border-color: transparent;
				border-style: solid;
			}
			.list-content {
				height: 100%;
			}
		}
	}
}
</style>
