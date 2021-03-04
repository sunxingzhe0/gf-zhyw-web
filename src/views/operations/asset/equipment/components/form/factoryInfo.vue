<template>
	<div class="factory-info">
		<div class="title">厂家信息</div>
		<el-form
			:model="ruleForm"
			:rules="rules"
			ref="assetinfo-ruleForm"
			label-width="100px"
			class="demo-ruleForm-factoryinfo"
		>
			<el-form-item label="生产厂商:" prop="manufacturer">
				<el-input
					v-model="ruleForm.manufacturer"
					size="small"
				></el-input>
			</el-form-item>
			<el-form-item label="出厂日期:" prop="productionDate">
				<el-date-picker
					v-model="ruleForm.productionDate"
					type="date"
					size="small"
					placeholder="选择日期"
				>
				</el-date-picker>
			</el-form-item>
			<div style="width:33.3%;"></div>
			<el-form-item label="联系人:" assetNo="contacts">
				<el-input v-model="ruleForm.contacts" size="small"></el-input>
			</el-form-item>
			<el-form-item label="联系方式:" assetNo="contactInformation">
				<el-input
					v-model="ruleForm.contactInformation"
					size="small"
				></el-input>
			</el-form-item>
			<el-form-item label="联系地址:" assetNo="contactAddress">
				<el-input
					v-model="ruleForm.contactAddress"
					size="small"
				></el-input>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
export default {
	data() {
		return {
			ruleForm: {
				manufacturer: "", //生产厂商
				productionDate: "", //生产厂商
				contacts: "", //联系人
				contactInformation: "", //联系方式
				contactAddress: "", //联系地址
			},
			rules: {},
		}
	},
}
</script>
<style lang="scss">
.factory-info {
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
	.demo-ruleForm-factoryinfo {
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
	}
}
</style>
