<template>
	<div class="handle-table-main">
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
						<el-option label="生产厂家" value="7"></el-option>
					</el-select>
				</el-input>
			</div>
			<div>
				<el-button size="small" class="btn" @click="batchPlacement"
					>批量贴置</el-button
				>
				<el-button size="small" class="btn" @click="batchInstall"
					>批量安装</el-button
				>
			</div>
		</div>
		<div class="main-table">
			<Table
				v-model="query"
				:columns="columns"
				:tableData="tableData"
				:bats="[]"
			>
				<template v-slot:fixed="{ row }">
					<el-button
						type="text"
						v-if="row.status == 'ToBePosted'"
						@click="Placement(row.id)"
						>贴置</el-button
					>
					<el-button
						type="text"
						v-if="row.status == 'ToBeInstalled'"
						@click="install(row.id)"
						>安装</el-button
					>
					<el-button
						type="text"
						v-if="row.status == 'ToBeInstalled'"
						class="backbtn"
						>撤回</el-button
					>
				</template>
			</Table>
		</div>
	</div>
</template>
<script>
import { Table, TableMixin } from "@/components/App"
import asset from "@/api/operations/asset"
let types = [] //设备类型
let manufactors = [] //生产厂家
let depts = [] //使用部门
export default {
	components: {
		Table,
	},
	mixins: [
		TableMixin([
			{
				fetchListFunction: asset.equipment.getEquipmentList,
			},
		]),
	],
	async beforeCreate() {
		let res = await asset.equipment.getTypes()
		types = res.map((item) => {
			return { text: item.name, value: item.id }
		})
		let mres = await asset.equipment.getManufactors()
		manufactors = mres.map((item) => {
			return { text: item.manufactorName, value: item.id }
		})
		let deptres = await asset.equipment.getDepts()
		depts = deptres.map((item) => {
			return { text: item.deptName, value: item.id }
		})
		this.$nextTick(function() {
			this.columns.typeName.filters = types
			this.columns.manufactorName.filters = manufactors
			this.columns.deptName.filters = depts
		})
	},
	data() {
		return {
			query: {
				keyword: "",
				searchType: "1",
				time: [],
				pageNum: 1,
				pageSize: 10,
			},
			columns: {
				index: {
					hidden: true,
				},
				fixed: {
					width: 100,
				},
				manufactorName: {
					filters: manufactors,
					"filter-method": this.filterOrdertype,
					"filter-placement": "bottom-end",
				},
				deptName: {
					filters: depts,
					"filter-method": this.filterOrdertype,
					"filter-placement": "bottom-end",
				},
				typeName: {
					filters: types,
					"filter-method": this.filterTag,
					"filter-placement": "bottom-end",
				},
				status: {
					filters: [
						{ text: "待贴置", value: "ToBePosted" },
						{ text: "待安装", value: "ToBeInstalled" },
					],
					"filter-method": this.filterTag,
					"filter-placement": "bottom-end",
					formatter: (item) => {
						return item.status == "ToBePosted"
							? "待贴置"
							: item.status == "ToBeInstalled"
							? "待安装"
							: ""
					},
				},
			},
		}
	},
	methods: {
		Placement(id) {
			this.$emit("Placement", id)
		},
		install(id) {
			this.$emit("install", id)
		},
		batchPlacement() {
			let list = this.tableData.multipleSelection
			if (list.length == 0) {
				this.$message.warning("请选择要贴置的数据")
				return false
			}
			this.$emit("batchPlacement", list)
		},
		batchInstall() {
			let list = this.tableData.multipleSelection
			if (list.length == 0) {
				this.$message.warning("请选择要安装的数据")
				return false
			}
			this.$emit("batchInstall", list)
		},
	},
}
</script>

<style lang="scss">
.handle-table-main {
	padding: 20px;
	.filter {
		margin-bottom: 20px;
		display: flex;
		justify-content: space-between;
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
