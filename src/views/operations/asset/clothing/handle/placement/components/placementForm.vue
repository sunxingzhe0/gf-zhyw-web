<template>
	<el-form
		:model="placementForm"
		ref="placementForm"
		label-width="100px"
		class="placement-form"
		:rules="rules"
	>
		<el-form-item label="RFID:" prop="RFID">
			<el-input
				v-model="placementForm.RFID"
				placeholder="请输入"
			></el-input>
		</el-form-item>
		<el-form-item class="footer-btn">
			<el-button
				type="primary"
				@click="submitForm('placementForm')"
				size="small"
				>是</el-button
			>
			<el-button
				@click="resetForm('placementForm')"
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
			placementForm: {
				RFID: "",
			},
			rules: {
				RFID: [{ required: true, message: "请输入" }],
			},
		}
	},
	methods: {
		submitForm(formName) {
			this.$refs[formName].validate(async (valid) => {
				if (valid) {
					this.placementForm.id = this.id
					await asset.clothing.Placement(this.placementForm)
					this.$message.success("贴置成功")
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
.placement-form {
	.el-form-item {
		padding: 20px;
		margin: 0px;
		.el-form-item__label {
			color: #fff;
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
