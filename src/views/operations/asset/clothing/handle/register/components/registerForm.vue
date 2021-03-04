<template>
	<el-form
		:model="installForm"
		ref="installForm"
		label-width="100px"
		class="install-form"
		:rules="rules"
	>
		<el-form-item label="使用人:" prop="usedUser">
			<el-select
				v-model="installForm.usedUser"
				placeholder="请选择"
			></el-select>
		</el-form-item>
		<el-form-item label="使用部门:" prop="usedDept">
			<el-select v-model="installForm.usedDept" placeholder="请选择">
				<el-option label="部门1" value="1"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="注册时间:" prop="registerTime">
			<el-date-picker
				v-model="installForm.registerTime"
				type="datetime"
				placeholder="请选择"
			>
			</el-date-picker>
		</el-form-item>
		<el-form-item class="footer-btn">
			<el-button
				type="primary"
				@click="submitForm('installForm')"
				size="small"
				>是</el-button
			>
			<el-button
				@click="resetForm('installForm')"
				size="small"
				class="infobtn"
				>否</el-button
			>
		</el-form-item>
	</el-form>
</template>
<script>
import asset from "@/api/operations/asset"
export default {
	props: {
		id: String,
	},
	data() {
		return {
			installForm: {
				usedUser: "",
				usedDept: "",
				registerTime: "",
			},
			rules: {
				usedDept: [{ required: true, message: "请选择使用部门" }],
				registerTime: [{ required: true, message: "请选择注册时间" }],
			},
		}
	},
	methods: {
		submitForm(formName) {
			this.$refs[formName].validate(async (valid) => {
				if (valid) {
					this.installForm.id = this.id
					await asset.clothing.Register(this.installForm)
					this.$message.success("注册成功")
					this.$emit("submit")
				} else {
					return false
				}
			})
		},
		resetForm(formName) {
			this.$refs[formName].resetFields()
		},
	},
}
</script>
<style lang="scss">
.install-form {
	.el-form-item {
		padding: 20px 40px;
		margin: 0px;
		.el-form-item__label {
			color: #fff;
		}
		.el-date-editor,
		.el-select {
			width: 100%;
		}
	}
	.footer-btn {
		text-align: center;
		border-top: 1px solid rgba(255, 255, 255, 0.3);
		.el-form-item__content {
			margin-left: 0px !important;
		}
		.el-button {
			width: 56px;
		}
		.el-button + .el-button {
			margin-left: 20px;
		}
		.infobtn {
			background: transparent;
			border: 1px solid #ffffff;
			border-radius: 2px;
			color: #fff;
			&:hover,
			&:focus {
				background: transparent;
				color: #fff;
			}
		}
	}
}
</style>
