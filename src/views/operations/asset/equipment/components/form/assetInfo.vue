<template>
	<div class="asset-info">
		<div class="title">资产信息</div>
		<el-form
			:model="ruleForm"
			:rules="rules"
			ref="assetinfo-ruleForm"
			label-width="100px"
			class="demo-ruleForm-assetinfo"
		>
			<el-form-item label="资产编号:" assetNo="no" v-if="id">
				<el-input
					v-model="ruleForm.assetNo"
					size="small"
					:disabled="id ? true : false"
				></el-input>
			</el-form-item>
			<el-form-item label="启用日期:" assetNo="usedTime">
				<el-date-picker
					v-model="ruleForm.usedTime"
					type="date"
					placeholder="选择日期"
					size="small"
				>
				</el-date-picker>
			</el-form-item>
			<el-form-item label="资产状态:" assetNo="status">
				<el-select v-model="ruleForm.status" size="small">
					<el-option label="在用" value="1"></el-option>
					<el-option label="空闲" value="2"></el-option>
					<el-option label="报废" value="3"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="资产原值:" assetNo="originalValue">
				<el-input v-model="ruleForm.originalValue" size="small">
					<span slot="suffix">元</span>
				</el-input>
			</el-form-item>
			<el-form-item label="资产赋值:" assetNo="assignment">
				<el-input v-model="ruleForm.assignment" size="small">
					<span slot="suffix">元</span>
				</el-input>
			</el-form-item>
			<el-form-item label="折扣方法:" assetNo="discountMethod">
				<el-select v-model="ruleForm.discountMethod" size="small">
					<el-option label="平均年限法" value="1"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="折扣率:" assetNo="discountRate">
				<el-input v-model="ruleForm.discountRate" size="small">
				</el-input>
			</el-form-item>
			<el-form-item label="折扣年限:" assetNo="discountPeriod">
				<el-input v-model="ruleForm.discountPeriod" size="small">
				</el-input>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
export default {
	props: {
		id: String,
	},
	data() {
		return {
			ruleForm: {
				assetNo: "", //资产编码
				usedTime: "", //启用日期
				status: "1", //状态
				originalValue: "", //资产原值
				assignment: "", //资产赋值
				discountMethod: "1", //折扣方法
				discountRate: "", //折扣率
				discountPeriod: "", //折扣年限
			},
			rules: {},
		}
	},
}
</script>
<style lang="scss">
.asset-info {
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
	.demo-ruleForm-assetinfo {
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
