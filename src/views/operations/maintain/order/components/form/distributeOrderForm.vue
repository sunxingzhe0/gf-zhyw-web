<template>
	<div class="distribute-order-form">
		<el-form
			:model="ruleForm"
			:rules="rules"
			ref="ruleForms"
			label-width="110px"
			class="demo-ruleForm"
		>
			<el-form-item label="执行人" prop="execouter">
				<el-input
					v-model="ruleForm.execouter"
					placeholder="请输入"
					size="small"
				></el-input>
			</el-form-item>
			<el-form-item label="级别" prop="level">
				<el-select
					v-model="ruleForm.level"
					placeholder="请选择"
					size="small"
				>
					<el-option label="低" value="1"></el-option>
					<el-option label="中" value="2"></el-option>
					<el-option label="高" value="3"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="计划完成时间" prop="completeTime">
				<el-input
					v-model="ruleForm.completeTime"
					placeholder="请输入"
					size="small"
				></el-input>
			</el-form-item>
			<el-form-item style="width:100%;text-align: center;">
				<el-button
					type="primary"
					@click="submitForm('ruleForms')"
					size="small"
					>提交</el-button
				>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
import maintain from "@/api/operations/maintain"
export default {
	name: "distributeOrderForm",
	props: {
		id: {
			type: String,
		},
	},
	data() {
		return {
			ruleForm: {
				execouter: "",
				level: "",
				completeTime: "",
			},
			rules: {
				execouter: [
					{
						required: true,
						message: "请输入执行人",
						trigger: "blur",
					},
				],
				level: [
					{
						required: true,
						message: "请选择级别",
						trigger: "blur",
					},
				],
				completeTime: [
					{
						required: true,
						message: "请输入完成时间",
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
					this.ruleForm.id = this.id
					await maintain.order.saveOrder(this.ruleForm)
					this.$message.success("派单成功")
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
.distribute-order-form {
	.demo-ruleForm {
		padding: 0px 20px 20px 20px;
		.el-form-item {
			width: 50%;
			display: inline-block;
			.el-input,
			.el-input {
				width: 400px;
			}
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
}
</style>
