<template>
	<div class="equipment-subsidiary-table-main">
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
						<el-option label="附属设备类型" value="1"></el-option>
						<el-option label="附属设备编码" value="2"></el-option>
						<el-option label="附属设备名称" value="3"></el-option>
						<el-option label="备注" value="4"></el-option>
					</el-select>
				</el-input>
			</div>
			<div class="add-content">
				<div
					class="date"
					style="display: flex;justify-content: flex-end;"
				>
					<div class="zsk-content">
						<div class="zsk-list" v-if="zsk">
							<div
								x-arrow=""
								class="popper__arrow"
								style="left: 99px;"
							></div>
							<div class="list-content">
								<addsubsidiary @add="add"></addsubsidiary>
							</div>
						</div>

						<el-button size="small" type="primary" @click="show"
							>新增</el-button
						>
					</div>
				</div>
			</div>
		</div>
		<div class="main-table">
			<Table v-model="query" :columns="columns" :tableData="tableData">
				<template v-slot:fixed="{ row }">
					<el-button
						type="text"
						@click="remove(row.id)"
						class="backbtn"
						>移除</el-button
					>
				</template>
			</Table>
		</div>
	</div>
</template>
<script>
import { Table, TableMixin } from "@/components/App"
import asset from "@/api/operations/asset"
import addsubsidiary from "./addsubsidiary"
export default {
	components: {
		Table,
		addsubsidiary,
	},
	mixins: [
		TableMixin([
			{
				fetchListFunction: asset.equipment.getsubsidiaryList,
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
				fixed: {
					width: "50",
				},
			},
			zsk: false,
			id: this.$route.query.equipmentId,
		}
	},
	methods: {
		async remove(id) {
			await asset.equipment.removeSubsidiaryEquipment({
				id: this.id,
				eid: id,
			})
			this.$message.success("移除成功")
			this.$_fetchTableData(asset.equipment.getsubsidiaryList)
		},
		show() {
			this.zsk = !this.zsk
		},
		async add(id) {
			await asset.equipment.addSubsidiary({ id: this.id, ids: id })
			this.zsk = false
			this.$message.success("添加成功")
			this.$_fetchTableData(asset.equipment.getsubsidiaryList)
		},
	},
}
</script>

<style lang="scss">
.equipment-subsidiary-table-main {
	padding: 20px 0px;
	.filter {
		margin-bottom: 20px;
		display: flex;
		justify-content: space-between;
		padding: 0px 20px;
		.el-date-editor {
			width: 250px;
			margin-left: 10px;
		}
		.input-with-select-search {
			width: 280px;
			margin-left: 10px;
			.el-input-group__prepend {
				width: 130px !important;
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
	.zsk {
		border: 1px solid #0071e3;
		border-radius: 2px;
		background: transparent;
		color: #0071e3;
		&:hover,
		&:focus {
			background: transparent;
			color: #0071e3;
		}
	}
	.zsk-content {
		position: relative;
		width: 56px;
		.zsk-list {
			position: absolute;
			top: 40px;
			left: -165px;
			background: #000;
			width: 420px;
			height: 344px;
			background: #000000;
			border: 1px solid #666666;
			border-radius: 2px;
			padding: 12px;
			z-index: 40000;
			color: #606266;
			line-height: 1.4;
			text-align: justify;
			font-size: 14px;
			box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
			word-break: break-all;
			.popper__arrow {
				top: -13px;
				left: 45% !important;
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
