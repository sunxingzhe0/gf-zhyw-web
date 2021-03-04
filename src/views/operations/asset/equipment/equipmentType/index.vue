<template>
	<div class="type-main">
		<div class="header-query">
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
					<el-option label="全部" value=""></el-option>
					<el-option label="设备名称" value="1"></el-option>
					<el-option label="类型编码" value="2"></el-option>
				</el-select>
				<el-button
					slot="append"
					icon="el-icon-search"
					type="primary"
					size="mini"
				></el-button>
			</el-input>
			<el-button
				type="primary"
				size="mini"
				class="addbtn"
				@click="append()"
				>新增</el-button
			>
		</div>
		<div class="type-content" v-loading="loading">
			<el-tree
				:data="data"
				:highlight-current="false"
				icon-class="el-icon-arrow-right"
				:expand-on-click-node="false"
			>
				<div class="equipment-tree-node" slot-scope="{ node, data }">
					<div class="info">
						<div class="name">
							{{ data.name }}
						</div>
						<div class="no">({{ data.no }})</div>
					</div>
					<div class="right-btn">
						<el-button
							type="text"
							size="mini"
							@click="() => edit(data)"
						>
							编辑
						</el-button>
						<el-button
							type="text"
							size="mini"
							@click="() => append(data)"
						>
							新增
						</el-button>
						<el-button
							type="text"
							size="mini"
							class="delbtn"
							@click="() => remove(node, data)"
						>
							删除
						</el-button>
					</div>
				</div>
			</el-tree>
		</div>
		<DarkDialog v-model="equipmentTypeDig" @close="close">
			<typeForm
				ref="ruleform"
				@sumbit="sumbit"
				:datas="data"
				:id="id"
				:formInfo="formInfo"
				:pid="pid"
				@close="close"
			></typeForm>
		</DarkDialog>
	</div>
</template>
<script>
import DarkDialog from "@/components/App/DarkDialog"
import typeForm from "./compontents/typeForm"
import asset from "@/api/operations/asset"
export default {
	name: "OperationsAssetEquipmentType",
	meta: {
		sort: 0,
		title: "设备类型",
		hideMenu: true,
	},
	components: {
		DarkDialog,
		typeForm,
	},
	data() {
		return {
			query: {
				keyword: "",
				searchType: "",
			},
			data: [],
			//弹窗
			equipmentTypeDig: {
				dialogVisible: false,
				binds: {
					title: "新增设备类型",
					width: "680px",
				},
			},
			loading: false,
			id: "",
			formInfo: null,
			pid: "",
		}
	},
	created() {
		this.getDatas()
	},
	methods: {
		//新增类型
		append(data) {
			if (data) {
				this.pid = data.id
			}
			this.equipmentTypeDig.dialogVisible = true
		},
		//编辑类型
		edit(data) {
			this.id = data.id
			this.pid = data.pid
			this.formInfo = data
			this.equipmentTypeDig.dialogVisible = true
			this.equipmentTypeDig.binds.title = "编辑设备类型"
		},
		//删除
		remove(data) {
			this.$confirm("确定要删除该类型吗？", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			}).then(async () => {
				await asset.type.removeType({
					id: data.id,
				})
				// 重新拉取数据
				this.getDatas()
				this.$message.success("删除成功!")
			})
		},
		//获取类型数据
		async getDatas() {
			this.loading = true
			this.data = await asset.type.getTree(this.query)
			this.loading = false
		},
		sumbit(flg) {
			if (flg) {
				this.equipmentTypeDig.dialogVisible = false
				this.getDatas()
			}
		},
		close() {
			this.equipmentTypeDig.dialogVisible = false
			this.$refs.ruleform.ruleForm = {
				name: "",
				pid: "",
				no: "",
			}
		},
	},
}
</script>
<style lang="scss">
@import "./style.scss";
</style>
