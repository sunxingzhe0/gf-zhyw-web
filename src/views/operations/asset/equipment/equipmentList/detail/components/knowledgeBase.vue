<template>
	<div class="equipment-base-table-main">
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
						<el-option label="名称" value="1"></el-option>
					</el-select>
				</el-input>
			</div>
		</div>
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
				fetchListFunction: asset.equipment.getknowledgeBaseList,
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
				equipmentId: this.$route.query.equipmentId,
			},
			columns: {
				index: {
					hidden: true,
				},
				name: {
					width: "150",
				},
			},
		}
	},
}
</script>

<style lang="scss">
.equipment-base-table-main {
	padding: 20px 0px;
	.filter {
		margin-bottom: 20px;
		display: flex;
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
			margin-left: 20px;
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
	.backbtn {
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
