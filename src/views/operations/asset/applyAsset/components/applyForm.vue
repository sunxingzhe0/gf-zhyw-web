<template>
	<el-form
		:model="ruleForm"
		:rules="rules"
		ref="applyform"
		label-width="100px"
		class="apply-form"
	>
		<el-form-item label="申领部门" prop="applyDeptName">
			<el-select
				v-model="ruleForm.applyDeptName"
				size="small"
				placeholder="请选择"
			>
				<el-option label="部门1" value="1"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="申领人" prop="applyUserName">
			<el-select
				v-model="ruleForm.applyUserName"
				size="small"
				placeholder="请选择"
			>
				<el-option label="张三" value="1"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="资产名称" prop="assetName">
			<el-select
				v-model="ruleForm.assetName"
				size="small"
				placeholder="请选择"
			>
				<el-option label="资产1" value="1"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="资产型号" prop="assetNo">
			<el-select
				v-model="ruleForm.assetNo"
				size="small"
				placeholder="请选择"
			>
				<el-option label="型号1" value="1"></el-option
			></el-select>
		</el-form-item>
		<el-form-item label="申领理由" prop="applyRemark">
			<el-input
				type="textarea"
				rows="3"
				v-model="ruleForm.applyRemark"
				size="small"
				placeholder="请输入"
			></el-input>
		</el-form-item>
		<el-form-item style="width:100%;text-align: center;">
			<el-button
				type="primary"
				@click="submitForm('applyform')"
				size="small"
				>提交</el-button
			>
		</el-form-item>
	</el-form>
</template>
<script>
import asset from "@/api/operations/asset"
export default {
	data() {
		return {
			ruleForm: {
				assetName: "",
				assetNo: "",
				applyDeptName: "",
				applyRemark: "",
				applyUserName: "",
			},
			rules: {
				assetName: [
					{
						required: true,
						message: "请选择资产名称",
						trigger: "blur",
					},
				],
				assetNo: [
					{
						required: true,
						message: "请选择资产型号",
						trigger: "blur",
					},
				],
				applyDeptName: [
					{
						required: true,
						message: "请选择申领部门",
						trigger: "blur",
					},
				],
				applyRemark: [
					{
						required: true,
						message: "请输入申领理由",
						trigger: "blur",
					},
				],
				applyUserName: [
					{
						required: true,
						message: "请选择申领人",
						trigger: "blur",
					},
				],
			},
		}
	},
	methods: {
		submitForm(formName) {
			this.$refs[formName].validate(async (valid) => {
				if (valid) {
					await asset.applyAsset.saveApply(this.formName)
					this.$emit("submit")
					this.$message.success("提交成功!")
					this.$refs[formName].resetFields()
				} else {
					return false
				}
			})
		},
	},
}
</script>
<style lang="scss">
.apply-form {
	padding: 20px;
	box-sizing: border-box;
	.el-form-item__label {
		color: #fff;
	}
}
</style>
