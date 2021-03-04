<template>
	<div class="evaluate-main" v-loading="loading">
		<basicInfo :data="data"></basicInfo>
		<el-form
			:model="ruleForm"
			ref="ruleForms"
			label-width="110px"
			class="demo-ruleForme"
		>
			<el-form-item label="评价" style="width:100%;">
				<el-rate v-model="ruleForm.fraction"></el-rate>
				<div class="rate-info" v-if="ruleForm.fraction == 1">
					<div class="fraction">1.0</div>
					<div class="text">不满意</div>
				</div>
				<div class="rate-info" v-if="ruleForm.fraction == 2">
					<div class="fraction">2.0</div>
					<div class="text">一般</div>
				</div>
				<div class="rate-info" v-if="ruleForm.fraction == 3">
					<div class="fraction">3.0</div>
					<div class="text">满意</div>
				</div>
				<div class="rate-info" v-if="ruleForm.fraction == 4">
					<div class="fraction">4.0</div>
					<div class="text">比较满意</div>
				</div>
				<div class="rate-info" v-if="ruleForm.fraction == 5">
					<div class="fraction">5.0</div>
					<div class="text">非常满意</div>
				</div>
				<el-input
					type="textarea"
					v-model="ruleForm.remark"
					placeholder="请输入"
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
import basicInfo from "./basicInfo"
export default {
	name: "evaluate",
	props: {
		id: {
			type: String,
		},
	},
	components: {
		basicInfo,
	},
	data() {
		return {
			data: null,
			ruleForm: {
				fraction: 0,
				remark: "",
			},
			loading: true,
		}
	},
	async created() {
		this.data = await maintain.order.getBasicinfo({ id: this.id })
		this.loading = false
	},
	methods: {
		submitForm(formName) {
			this.$refs[formName].validate(async (valid) => {
				if (valid) {
					if (this.ruleForm.fraction == 0) {
						this.$message.error("请选择星级评分!")
					} else {
						this.ruleForm.id = this.id
						await maintain.order.saveEvaluate(this.ruleForm)
						this.$message.success("评价成功")
						this.$emit("sumbit", true)
					}
				} else {
					return false
				}
			})
		},
	},
}
</script>
<style lang="scss">
.evaluate-main {
	.demo-ruleForme {
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
			line-height: 20px;
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
		.el-rate {
			margin-bottom: 10px;
			width: 120px;
			float: left;
		}
		.rate-info {
			width: 140px;
			color: #e89c17;
			float: left;
			line-height: 20px;
			div {
				display: inline-block;
				margin-left: 20px;
				height: 14px;
				line-height: 14px;
			}
		}
	}
}
</style>
