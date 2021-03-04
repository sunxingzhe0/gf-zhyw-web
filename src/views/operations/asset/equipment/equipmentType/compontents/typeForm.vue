<template>
	<el-form
		:model="ruleForm"
		:rules="rules"
		ref="ruleForms"
		label-width="80px"
		class="demo-ruleForm-type"
	>
		<el-form-item label="上级类型" prop="pid">
			<el-cascader
				v-model="ruleForm.pid"
				placeholder="请选择"
				size="small"
				:options="datas"
				:props="showoptions"
			>
			</el-cascader>
		</el-form-item>
		<el-form-item label="类型编号" prop="no">
			<el-input
				v-model="ruleForm.no"
				placeholder="请输入"
				size="small"
				:disabled="id ? true : false"
			></el-input>
		</el-form-item>
		<el-form-item label="类型名称" prop="name">
			<el-input
				v-model="ruleForm.name"
				placeholder="请输入"
				size="small"
			></el-input>
		</el-form-item>
		<el-form-item style="width:480px;text-align: center;">
			<el-button
				type="primary"
				@click="submitForm('ruleForms')"
				size="small"
				class="btn"
				>{{ id ? "保存" : "提交" }}</el-button
			>
			<el-button size="small" class="btn defaultBtn" plain @click="close"
				>返回</el-button
			>
		</el-form-item>
	</el-form>
</template>
<script>
import asset from "@/api/operations/asset"
export default {
	name: "typeForm",
	props: {
		id: {
			type: String,
		},
		datas: {
			type: Array,
		},
		formInfo: {
			type: Object,
		},
		pid: {
			type: String,
		},
	},
	watch: {
		formInfo() {
			this.ruleForm = {
				name: this.formInfo.name,
				no: this.formInfo.no,
				pid: [this.formInfo.pid],
				id: this.id,
			}
		},
		pid() {
			this.ruleForm.pid = this.pid
		},
	},
	data() {
		return {
			ruleForm: {
				name: "",
				no: "",
				pid: [],
			},
			rules: {
				name: [
					{
						required: true,
						message: "请输入类型名称",
						trigger: "blur",
					},
				],
				no: [
					{
						required: true,
						message: "请输入类型编号",
						trigger: "blur",
					},
				],
			},
			showoptions: {
				value: "id",
				label: "name",
				children: "children",
			},
		}
	},
	methods: {
		submitForm(formName) {
			this.$refs[formName].validate(async (valid) => {
				if (valid) {
					console.log(this.ruleForm)
					if (this.id) {
						await asset.type.editEquipmentType(this.ruleForm)
						this.$message.success("编辑设备类型成功")
					} else {
						await asset.type.saveEquipmentType(this.ruleForm)
						this.$message.success("新增设备类型成功")
					}
					this.$emit("sumbit", true)
				} else {
					return false
				}
			})
		},
		close() {
			this.$emit("close")
		},
	},
}
</script>
<style lang="scss">
.demo-ruleForm-type {
	padding: 20px;
	.el-form-item {
		width: 480px;
		margin: 0 auto;
		margin-bottom: 17px;
		.el-select,
		.el-input {
			width: 400px;
		}
		.el-form-item__label {
			color: #fff;
		}
		.btn {
			width: 74px;
			border-radius: 2px;
		}
		.defaultBtn {
			background: transparent;
			color: #fff;
		}
		.el-button + .el-button {
			margin-left: 20px;
		}
	}
}
</style>
