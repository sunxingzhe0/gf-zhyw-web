<template>
	<div class="type-equipment-table-main">
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
						<el-option label="设备名称" value="1"></el-option>
						<el-option label="设备编号" value="2"></el-option>
						<el-option label="安装位置" value="3"></el-option>
						<el-option label="使用部门" value="4"></el-option>
						<el-option label="管理负责人" value="5"></el-option>
						<el-option label="管理部门" value="6"></el-option>
						<el-option label="生产厂商" value="7"></el-option>
						<el-option label="合同编号" value="8"></el-option>
					</el-select>
				</el-input>
			</div>
			<div>
				<template v-for="(item, index) in bnts">
					<el-button
						size="mini"
						type="primary"
						v-if="index == i"
						plain
						:key="index"
						@click="setTime(index)"
						class="btn-active btn"
						>{{ item }}</el-button
					>
					<el-button
						size="mini"
						plain
						v-else
						:key="index"
						class="btn"
						@click="setTime(index)"
						>{{ item }}</el-button
					>
				</template>
			</div>
			<div>
				<span class="label">创建时间:</span>
				<el-date-picker
					v-model="query.createTime"
					size="mini"
					type="datetimerange"
					range-separator="至"
					start-placeholder="开始日期"
					end-placeholder="结束日期"
				></el-date-picker>
			</div>
		</div>
		<div class="main-table">
			<Table v-model="query" :columns="columns" :tableData="tableData">
				<template v-slot:fixed="{ row }">
					<el-button type="text" @click="edit(row.id)"
						>编辑</el-button
					>
				</template>
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
				fetchListFunction: asset.type.gettypeEquipmentList,
			},
		]),
	],
	data() {
		return {
			query: {
				keyword: "",
				searchType: "1",
				typeId: this.$route.query.typeId,
				pageNum: 1,
				pageSize: 10,
				createTime: [],
			},
			columns: {
				index: {
					hidden: true,
					width: 40,
				},
				fixed: {
					width: 50,
				},
				status: {
					formatter: (row) => {
						return row.status == "Using"
							? "在用"
							: row.status == "Free"
							? "空闲"
							: ""
					},
				},
			},
			i: 0,
			bnts: ["昨日", "昨日", "近7天", "近30天"],
		}
	},
	methods: {
		edit(id) {
			this.$router.push({
				path: "/operations/asset/equipment/edit",
				query: {
					equipmentId: id,
				},
			})
		},
		setTime(index) {
			this.i = index
			this.$_fetchTableData(asset.type.gettypeEquipmentList)
		},
		submit() {
			this.equipmentDig.dialogVisible = false
			this.id = ""
			this.$_fetchTableData(asset.type.gettypeEquipmentList)
		},
	},
}
</script>
<style lang="scss">
.type-equipment-table-main {
	padding: 20px 0px;
	.filter {
		margin-bottom: 20px;
		display: flex;
		& > div {
			margin-right: 20px;
		}
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
		border: 1px solid #999999;
		border-radius: 2px;
		color: #999999;
		&:hover,
		&:focus {
			background: transparent;
			color: #999999;
		}
	}
	.btn-active {
		color: #0071e3;
		border-color: #0071e3;
		&:hover,
		&:focus {
			color: #0071e3;
			border-color: #0071e3;
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
