<template>
	<div class="inventory-form-input">
		<div class="content-input">
			<div class="baseinfo-main">
				<div class="basicinfo" v-if="data">
					<div class="basicinfoitem">
						<span class="infolabel">盘点名称:</span>
						<span>{{ data.inventoryName }}</span>
					</div>
					<div class="basicinfoitem">
						<span class="infolabel">盘点设备:</span>
						<span> {{ data.inventoryNum }}</span>
					</div>
					<div class="basicinfoitem">
						<span class="infolabel">盘点人:</span>
						<span>
							{{ data.inventoryUser }},{{
								data.inventoryDept
							}}</span
						>
					</div>
					<div class="basicinfoitem">
						<span class="infolabel">盘点时间:</span>
						<span> {{ data.inventoryTime }}</span>
					</div>
					<div class="basicinfoitem">
						<span class="infolabel">创建时间:</span>
						<span> {{ data.createDate }}</span>
					</div>
				</div>
			</div>
			<div class="daily-table-main">
				<div class="filter">
					<div>
						<span class="label">库存校对:</span>
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
								<el-option
									label="物资名称"
									value="1"
								></el-option>
								<el-option
									label="物资编号"
									value="2"
								></el-option>
								<el-option label="规格" value="3"></el-option>
								<el-option
									label="生产厂商"
									value="4"
								></el-option>
								<el-option
									label="生产日期"
									value="4"
								></el-option>
							</el-select>
						</el-input>
					</div>
				</div>
				<div class="main-table">
					<Table
						v-model="query"
						:columns="columns"
						:tableData="tableData"
					>
						<template v-slot:slot_remark="{ row }">
							<el-input
								v-model="row.remark"
								placeholder="请输入"
							></el-input>
						</template>
						<template v-slot:slot_result="{ row }">
							<el-select v-model="row.inventoryResult">
								<el-option label="正常" value="1"></el-option>
								<el-option label="故障" value="2"></el-option>
								<el-option label="丢失" value="3"></el-option>
								<el-option label="停用" value="4"></el-option>
							</el-select>
						</template>
					</Table>
				</div>
			</div>
		</div>
		<div class="footer-btns">
			<el-button type="primary" size="small" @click="submitForm"
				>提交</el-button
			>
		</div>
	</div>
</template>
<script>
import { Table, TableMixin } from "@/components/App"
import asset from "@/api/operations/asset"
export default {
	props: {
		id: String,
	},
	components: {
		Table,
	},
	mixins: [
		TableMixin([
			{
				fetchListFunction: asset.inventory.getinventoryEquipmentList,
			},
		]),
	],
	data() {
		return {
			query: {
				keyword: "",
				searchType: "1",
				inventoryTime: [],
				pageNum: 1,
				pageSize: 10,
			},
			columns: {
				index: {
					hidden: true,
				},
				fixed: {
					width: 170,
				},
				remark: {
					width: "200",
					prop: "slot_remark",
				},
				inventoryResult: {
					width: "200",
					prop: "slot_result",
				},
			},
			data: null, //盘点记录信息
		}
	},
	async created() {
		this.data = await asset.inventory.getEquipmentInventoryRecord({
			id: this.id,
		})
	},
	methods: {
		async submitForm() {
			let data = {
				id: this.id,
				results: [],
			}
			data.results = this.tableData.list.map((item) => {
				return {
					id: item.id,
					inventoryResult: item.inventoryResult,
					remark: item.remarks,
				}
			})
			await asset.inventory.saveEquipmentInventoryInfo(data)
			this.$message.success("录入成功")
			this.$_fetchTableData(asset.inventory.getinventoryEquipmentList)
		},
	},
}
</script>

<style lang="scss">
.inventory-form-input {
	height: 600px;
	overflow-y: auto;
	.content-input {
		height: calc(100% - 72px);
	}
	.baseinfo-main {
		padding-top: 20px;
		.basicinfo {
			width: 100%;
			padding: 0px 20px;
			.basicinfoitem {
				width: 33.3%;
				display: inline-block;
				font-size: 14px;
				color: #fff;
				margin-bottom: 20px;
				overflow: hidden;
				white-space: nowrap;
				.infolabel {
					margin-right: 10px;
				}
				.index {
					margin-right: 10px;
				}
			}
			.contents {
				width: 100%;
				overflow: none;
				white-space: normal;
			}
		}
	}
	.footer-btns {
		position: absolute;
		bottom: 0;
		left: 0;
		text-align: center;
		height: 72px;
		width: 100%;
		border-top: 1px solid rgba(255, 255, 255, 0.3);
		padding: 20px 0px;
		box-sizing: border-box;
		.el-button {
			width: 74px;
		}
		.backbtn {
			border: 1px solid #fff;
			color: #fff;
			background: transparent;
		}
	}
}
.inventory-form-input .daily-table-main {
	padding: 20px;
	padding-top: 0px;
	.filter {
		margin-bottom: 20px;
		display: flex;
		justify-content: space-between;
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
	.backbtn,
	.red {
		color: #f74a4a;
	}
	.main-table {
		height: 370px;
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
