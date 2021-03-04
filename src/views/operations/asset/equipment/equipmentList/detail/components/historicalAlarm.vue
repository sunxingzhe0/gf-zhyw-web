<template>
	<div class="equipment-alarm-table-main">
		<div class="filter">
			<div>
				<span class="label">报警时间:</span>
				<el-date-picker
					v-model="query.alarmTime"
					size="mini"
					type="datetimerange"
					range-separator="至"
					start-placeholder="开始日期"
					end-placeholder="结束日期"
				></el-date-picker>
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
				fetchListFunction: asset.equipment.gethistoricalAlarmList,
			},
		]),
	],
	data() {
		return {
			query: {
				alarmTime: [],
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
				alarmTime: { sortable: true },
				handleTime: { sortable: true },
			},
			i: 0,
			bnts: ["昨日", "本周", "本月", "今年"],
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
.equipment-alarm-table-main {
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
