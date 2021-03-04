<template>
	<el-form
		:model="ruleForm"
		:rules="rules"
		ref="inventoryForm"
		label-width="100px"
		class="inventory-ruleForm"
	>
		<el-form-item label="盘点名称:" prop="inventoryName" class="w3">
			<el-input
				v-model="ruleForm.inventoryName"
				size="small"
				placeholder="请输入"
			></el-input>
		</el-form-item>
		<el-form-item label="盘点部门:" prop="inventoryDept" class="w3">
			<el-select
				v-model="ruleForm.inventoryDept"
				placeholder="请选择"
				size="small"
			>
				<el-option
					v-for="(item, index) in depts"
					:key="index"
					:label="item.deptName"
					:value="item.id"
				></el-option>
			</el-select>
		</el-form-item>
		<el-form-item class="w3"></el-form-item>
		<el-form-item label="盘点范围:" prop="type" class="w25">
			<el-select
				v-model="ruleForm.type"
				placeholder="请选择"
				size="small"
			>
				<el-option label="设备" value="1"></el-option>
				<el-option label="被服" value="2"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item prop="eCategory" class="w25 aq">
			<el-select placeholder="物资类别" v-model="model" size="small">
				<el-option class="down-select" value="1"
					><el-tree
						:props="props"
						:data="data"
						show-checkbox
						icon-class="el-icon-arrow-right"
						:check-strictly="true"
						ref="ecategory"
						@check-change="categoryChange"
					>
					</el-tree
				></el-option>
			</el-select>
		</el-form-item>
		<el-form-item prop="eType" class="w25 aq">
			<el-select placeholder="物资类型" v-model="model1" size="small">
				<el-option class="down-select" value="1"
					><el-tree
						:props="props"
						:data="typeTree"
						show-checkbox
						icon-class="el-icon-arrow-right"
						:check-strictly="true"
						ref="eType"
						@check-change="typeChange"
					>
					</el-tree
				></el-option>
			</el-select>
		</el-form-item>
		<div class="footer-btns">
			<el-button
				type="primary"
				size="small"
				@click="submitForm('inventoryForm')"
				>确认</el-button
			>
		</div>
	</el-form>
</template>
<script>
import asset from "@/api/operations/asset"
export default {
	data() {
		var getTypes = (rule, value, callback) => {
			if (value.length <= 0) {
				callback(new Error("请选择物资类型"))
			} else {
				callback()
			}
		}
		var getCategorys = (rule, value, callback) => {
			if (value.length <= 0) {
				callback(new Error("请选择物资类别"))
			} else {
				callback()
			}
		}
		return {
			ruleForm: {
				inventoryName: "",
				inventoryDept: "",
				type: "1",
				eType: [],
				eCategory: [],
			},
			rules: {
				inventoryName: [
					{
						required: true,
						message: "请输入盘点名称",
						trigger: "blur",
					},
				],
				inventoryDept: [
					{
						required: true,
						message: "请选择盘点部门",
						trigger: "blur",
					},
				],
				type: [
					{
						required: true,
						message: "请选择盘点范围",
						trigger: "blur",
					},
				],
				eType: [
					{
						required: true,
						validator: getTypes,
						trigger: "blur",
					},
				],
				eCategory: [
					{
						required: true,
						validator: getCategorys,
						trigger: "blur",
					},
				],
			},
			props: {
				label: "name",
				value: "id",
			},
			data: [],
			typeTree: [],
			model: "",
			model1: "",
			depts: [],
		}
	},
	created() {
		this.getdept()
		this.gettype()
		this.getcategory()
	},
	methods: {
		submitForm(formName) {
			this.$refs[formName].validate(async (valid) => {
				if (valid) {
					await asset.inventory.saveEquipmentInventory(this.ruleForm)
					this.$message.success("新增成功")
					this.$emit("submit")
				} else {
					return false
				}
			})
		},
		categoryChange() {
			this.ruleForm.eCategory = this.$refs.ecategory.getCheckedNodes()
		},
		typeChange() {
			this.ruleForm.eType = this.$refs.eType.getCheckedNodes()
		},
		//部门
		async getdept() {
			this.depts = await asset.inventory.getDepts()
		},
		//物资类型
		async gettype() {
			this.typeTree = await asset.inventory.getTree()
		},
		//物资类别
		async getcategory() {
			this.data = await asset.inventory.getcategoryTree()
		},
	},
}
</script>
<style lang="scss">
.inventory-ruleForm {
	padding: 20px;
	padding-bottom: 52px;
	.el-form-item__label {
		color: #fff;
		font-size: 14px;
	}
	.w3 {
		width: 33.3%;
		display: inline-block;
	}
	.w25 {
		width: 25%;
		display: inline-block;
	}
	.aq {
		width: 199px;
		display: inline-block;
		.el-form-item__content {
			margin-left: 0px !important;
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
.down-select,
.el-select-dropdown__item {
	height: auto;
	.el-tree-node__expand-icon {
		color: #0071e3;
		font-size: 14px;
		font-weight: bold;
	}
	.el-checkbox__input,
	.is-checked + .el-tree-node__label {
		color: #0071e3;
	}
}
</style>
