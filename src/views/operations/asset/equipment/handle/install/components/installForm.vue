<template>
	<el-form
		:model="installForm"
		ref="installForm"
		label-width="100px"
		class="install-form"
		:rules="rules"
	>
		<el-form-item label="安装位置:" prop="position">
			<el-input
				v-model="installForm.position"
				placeholder="请输入"
			></el-input>
		</el-form-item>
		<el-form-item label="GIS坐标:">
			<el-input
				v-model="installForm.x"
				style="width:50%;"
				placeholder="请输入"
			></el-input>
			<el-input
				v-model="installForm.y"
				style="width:50%;"
				placeholder="请输入"
			></el-input>
		</el-form-item>
		<el-form-item label="安装时间:" prop="installTime">
			<el-date-picker
				v-model="installForm.installTime"
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
				position: "",
				x: "",
				y: "",
				installTime: "",
			},
			rules: {
				position: [{ required: true, message: "请输入安装位置" }],
				installTime: [{ required: true, message: "请选择安装时间" }],
			},
		}
	},
	methods: {
		submitForm(formName) {
			this.$refs[formName].validate(async (valid) => {
				if (valid) {
					this.placementForm.id = this.id
					await asset.equimpment.equipmentInstall(this.placementForm)
					this.$message.success("安装成功")
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
		.el-date-editor {
			width: 100%;
		}
	}
	.footer-btn {
		padding: 0px;
		padding-top: 20px;
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
