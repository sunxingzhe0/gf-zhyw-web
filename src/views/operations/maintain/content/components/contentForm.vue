<template>
	<el-form
		:model="ruleForm"
		:rules="rules"
		ref="contentform"
		label-width="100px"
		class="demo-ruleForm-content"
	>
		<el-form-item label="设备类型" prop="type">
			<el-cascader
				size="small"
				:options="options"
				:props="{ checkStrictly: true, label: 'name', value: 'id' }"
				v-model="ruleForm.type"
				clearable
			></el-cascader>
		</el-form-item>
		<el-form-item label="名称" prop="name">
			<el-input
				size="small"
				placeholder="请输入"
				v-model="ruleForm.name"
			></el-input>
		</el-form-item>
		<el-form-item label="内容" prop="content">
			<el-input
				type="textarea"
				v-model="ruleForm.content"
				size="small"
				:rows="4"
			></el-input>
		</el-form-item>
		<el-form-item style="width:100%;text-align: center;">
			<el-button
				type="primary"
				@click="submitForm('contentform')"
				size="small"
				>{{ id ? "保存" : "提交" }}</el-button
			>
		</el-form-item>
	</el-form>
</template>
<script>
import maintain from "@/api/operations/maintain"
export default {
	name: "conntentForm",
	props: {
		id: {
			type: String,
			default: "",
		},
		forminfo: {
			type: Object,
		},
	},
	data() {
		return {
			ruleForm: {
				type: [],
				name: "",
				content: "",
			},
			rules: {
				type: [
					{
						required: true,
						message: "请选择类型",
						trigger: "blur",
					},
				],
				name: [
					{
						required: true,
						message: "请输入名称",
						trigger: "blur",
					},
				],
				content: [
					{
						required: true,
						message: "请输入内容",
						trigger: "blur",
					},
				],
			},
			options: [],
		}
	},
	async created() {
		this.options = await maintain.content.getequipmenttree()
	},
	watch: {
		forminfo() {
			if (this.forminfo) {
				this.ruleForm = {
					type: this.forminfo.type,
					name: this.forminfo.name,
					content: this.forminfo.content,
					id: this.id,
				}
			} else {
				this.ruleForm = {
					type: [],
					name: "",
					content: "",
				}
			}
		},
	},
	methods: {
		submitForm(formName) {
			this.$refs[formName].validate(async (valid) => {
				if (valid) {
					await maintain.content.saveContent(this.ruleForm)
					this.$message.success("新增成功")
					this.$emit("sumbit", true)
				} else {
					return false
				}
			})
		},
	},
}
</script>
<style lang="scss">
.demo-ruleForm-content {
	padding: 20px 57px;
	.el-textarea,
	.el-input,
	.el-select {
		width: 400px;
	}
	.el-form-item__label {
		color: #fff;
		font-size: 14px;
	}
	.el-form-item__content > .el-button {
		border: none;
		padding: 12px 24px;
		width: 74px;
	}
}
</style>
