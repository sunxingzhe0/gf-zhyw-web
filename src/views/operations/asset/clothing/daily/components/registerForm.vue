<template>
	<div class="register-info">
		<div class="title">被服信息</div>
		<div class="basicinfo" v-if="item">
			<div class="basicinfoitem">
				<span class="infolabel">被服编号:</span>
				<span> {{ item.no ? item.no : "-" }}</span>
			</div>
			<div class="basicinfoitem">
				<span class="infolabel">被服名称:</span>
				<span> {{ item.name ? item.name : "-" }}</span>
			</div>
			<div class="basicinfoitem">
				<span class="infolabel">规格型号:</span>
				<span>
					{{ item.specification ? item.specification : "-" }}码</span
				>
			</div>
			<div class="basicinfoitem">
				<span class="infolabel">被服类别:</span>
				<span> {{ item.category ? item.category : "-" }}</span>
			</div>
			<div class="basicinfoitem">
				<span class="infolabel">被服类型：</span>
				<span> {{ item.typeName ? item.typeName : "-" }}</span>
			</div>
			<div class="basicinfoitem">
				<span class="infolabel">使用部门：</span>
				<span> {{ item.usedDept ? item.usedDept : "-" }}</span>
			</div>
			<div class="basicinfoitem">
				<span class="infolabel">管理负责人：</span>
				<span> {{ item.chargeP ? item.chargeP : "-" }}</span>
			</div>
			<div class="basicinfoitem">
				<span class="infolabel">管理部门：</span>
				<span>
					{{ item.managementDept ? item.managementDept : "-" }}</span
				>
			</div>
			<div class="basicinfoitem">
				<span class="infolabel">被服条码：</span>
				<span> {{ item.barCode ? item.barCode : "-" }}</span>
			</div>
			<div class="basicinfoitem">
				<span class="infolabel">RFID：</span>
				<span> {{ item.RFID ? item.RFID : "-" }}</span>
			</div>
			<div class="basicinfoitem">
				<span class="infolabel">生产厂商：</span>
				<span> {{ item.manufacturer ? item.manufacturer : "-" }}</span>
			</div>
			<div class="basicinfoitem">
				<span class="infolabel">出厂日期：</span>
				<span>
					{{ item.productionDate ? item.productionDate : "-" }}</span
				>
			</div>
			<div class="basicinfoitem">
				<span class="infolabel">供应商：</span>
				<span> {{ item.supplier ? item.supplier : "-" }}</span>
			</div>
			<div class="basicinfoitem">
				<span class="infolabel">合同编号：</span>
				<span> {{ item.contractNo ? item.contractNo : "-" }}</span>
			</div>
		</div>
		<div class="title">领用信息</div>
		<el-form
			:model="ruleForm"
			:rules="rules"
			ref="registerForm"
			label-width="100px"
			class="demo-ruleForm-register"
		>
			<el-form-item label="领用人身份:" prop="usedIdentity">
				<el-select
					v-model="ruleForm.usedIdentity"
					size="small"
					placeholder="请选择"
				>
					<el-option label="病人" value="1"></el-option>
					<el-option label="医生" value="2"></el-option>
					<el-option label="护士" value="3"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="领用人姓名:" prop="usedName">
				<el-input v-model="ruleForm.usedName" size="small"></el-input>
			</el-form-item>
			<el-form-item label="领用人性别:" prop="usedSex">
				<el-input v-model="ruleForm.usedSex" size="small"></el-input>
			</el-form-item>
			<el-form-item label="领用时间:" prop="usedTime">
				<el-date-picker
					v-model="ruleForm.usedTime"
					size="small"
					type="datetime"
					placeholder="选择日期时间"
				>
				</el-date-picker>
			</el-form-item>
			<el-form-item class="footerbtn">
				<el-button
					type="primary"
					size="small"
					@click="submitForm('registerForm')"
					>提交</el-button
				>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
import asset from "@/api/operations/asset"
export default {
	props: {
		item: Object,
	},
	data() {
		return {
			ruleForm: {
				usedIdentity: "1", //身份
				usedName: "",
				usedSex: "", //性别
				usedTime: "", //领用时间
			},
			rules: {
				usedName: [
					{
						required: true,
						message: "请输入领用人姓名",
						trigger: "blur",
					},
				],
				usedIdentity: [
					{
						required: true,
						message: "请选择领用人身份",
						trigger: "blur",
					},
				],
				usedSex: [
					{
						required: true,
						message: "请输入领用人性别",
						trigger: "blur",
					},
				],
				usedTime: [
					{
						required: true,
						message: "请选择领用时间",
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
					await asset.clothing.registerClothing(this.ruleForm)
					this.$message.success("注册成功")
					this.$emit("submit")
				} else {
					return false
				}
			})
		},
	},
}
</script>
<style lang="scss">
.register-info {
	.title {
		font-size: 16px;
		font-weight: 500;
		color: #fff;
		position: relative;
		margin: 0px 20px;
		padding: 20px 0px;
		padding-left: 10px;
		line-height: 16px;
		&::before {
			content: "";
			position: absolute;
			left: 0;
			top: 20px;
			width: 2px;
			height: 16px;
			background: #0071e3;
		}
	}
	.demo-ruleForm-register {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		padding-right: 44px;
		padding-left: 20px;
		box-sizing: border-box;
		.el-form-item {
			width: 32.3%;
			margin-right: 1%;
			.el-select,
			.el-date-editor {
				width: 100%;
			}
		}
		.el-form-item:nth-of-type(3n) {
			margin-right: 0px;
		}
		.el-form-item__label {
			color: #fff;
		}
		.footerbtn {
			width: 100%;
			text-align: center;
			padding: 20px 0px;
			margin: 0;
			height: 72px;
			.el-form-item__content {
				line-height: 14px;
				.el-button {
					width: 100px;
				}
			}
		}
	}
	.basicinfo {
		width: 100%;
		padding: 0px 20px;
		.basicinfoitem {
			width: 25%;
			display: inline-block;
			font-size: 14px;
			color: #fff;
			margin-bottom: 20px;
			overflow: hidden;
			white-space: nowrap;
			.infolabel {
				margin-right: 10px;
			}
			.index {
				margin-right: 10px;
			}
		}
		.contents {
			width: 100%;
			overflow: none;
			white-space: normal;
		}
	}
}
</style>
