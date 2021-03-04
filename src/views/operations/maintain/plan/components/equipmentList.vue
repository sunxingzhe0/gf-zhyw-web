<template>
	<div class="list-all">
		<div class="title">
			<el-select
				size="mini"
				placeholder="设备类型"
				class="type"
				v-model="query.type"
				@change="search"
			>
				<el-option label="全部" value="0"></el-option>
				<el-option
					v-for="(item, index) in types"
					:key="index"
					:label="item.name"
					:value="item.id"
				></el-option>
			</el-select>
			<el-input
				placeholder="关键字"
				size="mini"
				v-model="query.keyword"
				class="input-with-select"
			>
				<el-select
					v-model="query.searchType"
					slot="prepend"
					placeholder="请选择"
				>
					<el-option label="设备名称" value="1"></el-option>
					<el-option label="设备编号" value="2"></el-option>
				</el-select>
				<el-button
					slot="append"
					icon="el-icon-search"
					type="primary"
					size="mini"
					@click="search"
				></el-button>
			</el-input>
		</div>
		<div class="equipment-list-content">
			<div class="list-left">
				<leftList :query="query" ref="leftlist"></leftList>
			</div>
			<div class="list-center">
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
								<batchContent
									:types="types"
									:planId="formId"
								></batchContent>
							</div>
						</div>
						<el-button
							class="contentBtn"
							size="mini"
							:disabled="formId ? false : true"
							@click="show"
							>批量设置保养内容</el-button
						>
					</div>
				</div>

				<el-button
					size="mini"
					class="primary-btn"
					:disabled="formId ? false : true"
					@click="relation"
					>关联<i class="el-icon-caret-right"></i
				></el-button>
				<el-button
					size="mini"
					class="danger-btn"
					:disabled="formId ? false : true"
					@click="Unbundling"
					><i class="el-icon-caret-left"></i>解绑</el-button
				>
			</div>
			<div class="list-right">
				<rightList
					:query="query"
					:planid="formId"
					ref="rightlist"
				></rightList>
			</div>
		</div>
	</div>
</template>
<script>
import leftList from "./list/leftList"
import rightList from "./list/rightList"
import batchContent from "./list/batchContent"
import maintain from "@/api/operations/maintain"
export default {
	props: {
		formId: String,
	},
	components: {
		leftList,
		rightList,
		batchContent,
	},
	data() {
		return {
			query: {
				searchType: "1",
				keyword: "",
				pageSize: 10,
				pageNum: 1,
				type: "",
			},
			types: [],
			zsk: false,
		}
	},
	watch: {
		formId: () => {
			this.query.planid = this.formId
		},
	},
	created() {
		this.gettypes()
	},
	methods: {
		async gettypes() {
			this.types = await maintain.plan.getTypes()
		},
		//关联
		async relation() {
			let list = this.$refs.leftlist.$refs.equipments.getCheckedNodes()
			// 关联
			if (list.length == 0) {
				this.$message.warning("请选择要关联的设备数据!")
				return false
			} else {
				let res = await maintain.plan.savePlanquipment({
					planid: this.formId,
					data: list,
				})
				this.$message.success(res.message)
				//刷新数据
				this.$refs.leftlist.node_had.childNodes = []
				this.$refs.leftlist.loadNode(
					this.$refs.leftlist.node_had,
					this.$refs.leftlist.resolve_had
				) //再次执行懒加载的方法
				this.$refs.rightlist.$_fetchTableData(
					maintain.plan.getequipmentList
				)
			}
		},
		//解绑
		async Unbundling() {
			let list = this.$refs.rightlist.tableData.multipleSelection
			//判断是否勾选数据
			if (list.length == 0) {
				this.$message.warning("请选择要解绑的设备数据!")
				return false
			} else {
				let ids = []
				for (let j in list) {
					ids.push(list[j].id)
				}
				await maintain.plan.removePlanequipment({
					planid: this.formId,
					data: ids,
				})
				this.$message.success("解绑成功")
				//刷新数据
				this.$refs.leftlist.node_had.childNodes = []
				this.$refs.leftlist.loadNode(
					this.$refs.leftlist.node_had,
					this.$refs.leftlist.resolve_had
				) //再次执行懒加载的方法
				this.$refs.rightlist.$_fetchTableData(
					maintain.plan.getequipmentList
				)
			}
		},
		search() {
			this.$refs.leftlist.node_had.childNodes = []
			this.$refs.leftlist.loadNode(
				this.$refs.leftlist.node_had,
				this.$refs.leftlist.resolve_had
			) //再次执行懒加载的方法
			this.$refs.rightlist.$_fetchTableData(
				maintain.plan.getequipmentList
			)
		},
		show() {
			this.zsk = !this.zsk
		},
	},
}
</script>
<style lang="scss">
.list-all {
	.title {
		padding: 10px 0px;
		line-height: 28px;
		.input-with-select {
			width: 300px;
			.el-input-group__append {
				width: 26px !important;
			}
			.el-input-group__prepend {
				width: 100px !important;
			}
		}
		.type {
			width: 120px;
			margin-right: 20px;
		}
	}
}
.equipment-list-content {
	width: 100%;
	display: flex;
	height: 400px;
	.list-left,
	.list-right {
		width: 45%;
		height: 100%;
		background: rgba(26, 26, 26, 0.8);
	}
	.list-left {
		padding: 10px 0px;
	}
	.list-center {
		width: 10%;
		color: #fff;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		.el-button {
			width: 58px;
			border-radius: 2px;
			&:focus,
			&:hover {
				background: transparent;
			}
		}
		.el-button + .el-button {
			margin-left: 0px;
			margin-top: 20px;
		}
		.contentBtn {
			background: transparent;
			border: 1px solid #cccccc;
			color: #fff;
			white-space: normal;
			padding: 12px 14px;
			line-height: 20px;
		}
		.primary-btn {
			background: transparent;
			border: 1px solid #0071e3;
			color: #0071e3;
			white-space: normal;
			padding: 7px 10px;
		}
		.danger-btn {
			background: transparent;
			border: 1px solid #f74a4a;
			color: #f74a4a;
			white-space: normal;
			padding: 7px 10px;
		}
		.is-disabled {
			background: transparent;
			border: 1px solid #999999;
			color: #999999;
			&:focus,
			&:hover {
				background: transparent;
				border: 1px solid #999999;
				color: #999999;
			}
		}
		.date {
			margin-bottom: 20px;
		}
		.zsk-content {
			position: relative;
			width: 56px;
			.zsk-list {
				position: absolute;
				top: 115px;
				left: -165px;
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
}
</style>
