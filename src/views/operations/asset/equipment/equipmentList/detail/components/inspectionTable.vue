<template>
	<div class="equipment-inspection-table-main">
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
						<el-option label="巡检点编号" value="1"></el-option>
						<el-option label="巡检点名称" value="2"></el-option>
						<el-option label="RFID" value="3"></el-option>
						<el-option label="GIS定位" value="4"></el-option>
						<el-option label="执行人姓名" value="5"></el-option>
						<el-option label="执行人科室" value="6"></el-option>
						<el-option label="执行人工号" value="7"></el-option>
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
				<span class="label">巡检时间:</span>
				<el-date-picker
					v-model="query.repairTime"
					size="small"
					type="datetimerange"
					range-separator="至"
					start-placeholder="开始日期"
					end-placeholder="结束日期"
				></el-date-picker>
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
let inspectionAreas = [] //区域
let inspectionTypes = [] //类型
let inspectionTasks = [] //任务
export default {
	components: {
		Table,
	},
	mixins: [
		TableMixin([
			{
				fetchListFunction: asset.equipment.getinspectionList,
			},
		]),
	],
	async beforeCreate() {
		// let deptres = await asset.equipment.getDepts()
		inspectionAreas = []
		inspectionTypes = []
		inspectionTasks = []
		this.$nextTick(function() {
			this.columns.inspectionArea.filters = inspectionAreas
			this.columns.inspectionTypeName.filters = inspectionTypes
			this.columns.inspectionTask.filters = inspectionTasks
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
				repairTime: [],
				equipmentId: this.$route.query.equipmentId,
			},
			columns: {
				index: {
					hidden: true,
				},
				fixed: {
					width: 50,
				},
				inspectionArea: {
					filters: inspectionAreas,
					"filter-method": this.filterOrdertype,
					"filter-placement": "bottom-end",
				},
				inspectionTypeName: {
					filters: inspectionTypes,
					"filter-method": this.filterOrdertype,
					"filter-placement": "bottom-end",
				},
				inspectionTask: {
					filters: inspectionTasks,
					"filter-method": this.filterTag,
					"filter-placement": "bottom-end",
				},
				inspectionTime: { sortable: true },
			},
			i: 0,
			bnts: ["今日", "昨日", "近7日", "近30天"],
		}
	},
	methods: {
		setTime(index) {
			this.i = index
			this.$_fetchTableData(asset.equipment.getinspectionList)
		},
	},
}
</script>

<style lang="scss">
.equipment-inspection-table-main {
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
			width: 270px;
			margin-left: 10px;
			.el-input-group__prepend {
				width: 120px !important;
				color: #0071e3;
				background: transparent;
				border-color: #4d4d4d;
			}
		}
		.label {
			font-size: 14px;
			color: #fff;
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
