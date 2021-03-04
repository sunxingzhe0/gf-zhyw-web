<template>
	<div class="transfer-form">
		<el-form
			:model="ruleForm"
			:rules="rules"
			ref="ruleForms"
			label-width="110px"
			class="demo-ruleFormt"
		>
			<el-form-item label="转接人" prop="transferuser">
				<el-select
					v-model="ruleForm.transferuser"
					placeholder="请选择"
					size="small"
				>
					<el-option
						v-for="(item, index) in users"
						:key="index"
						:label="item.name"
						:value="item.id"
					></el-option>
				</el-select>
			</el-form-item>

			<el-form-item label="计划完成时间" prop="completeTime">
				<el-input
					v-model="ruleForm.completeTime"
					placeholder="请输入"
					size="small"
				></el-input>
			</el-form-item>
			<el-form-item label="备注" prop="remark" style="width:100%;">
				<el-input
					type="textarea"
					v-model="ruleForm.remark"
					size="small"
				>
				</el-input>
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
	name: "transferForm",
	props: {
		id: {
			type: String,
		},
	},
	data() {
		return {
			ruleForm: {
				transferuser: "",
				remark: "",
				completeTime: "",
			},
			rules: {
				transferuser: [
					{
						required: true,
						message: "请选择转接人",
						trigger: "blur",
					},
				],
				remark: [
					{
						required: true,
						message: "请输入备注",
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
			users: [],
		}
	},
	async created() {
		this.users = await maintain.order.getHelpers()
	},
	methods: {
		submitForm(formName) {
			this.$refs[formName].validate(async (valid) => {
				if (valid) {
					this.ruleForm.id = this.id
					await maintain.order.saveTransfer(this.ruleForm)
					this.$message.success("转接成功")
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
.transfer-form {
	.demo-ruleFormt {
		padding: 0px 20px 20px 20px;
		.el-form-item {
			width: 50%;
			display: inline-block;
			.el-input,
			.el-select {
				width: 400px;
			}
			.el-textarea {
				width: 980px;
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
		.delbtn {
			color: #f74a4a;
		}
		.el-button {
			border: none;
		}
	}
}
</style>
