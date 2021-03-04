<template>
	<div class="basic-info">
		<div class="title">被服信息</div>
		<el-form
			:model="ruleForm"
			:rules="rules"
			ref="basicinfo-ruleForm"
			label-width="100px"
			class="demo-ruleForm-basicinfo"
		>
			<el-form-item label="被服编号:" prop="no" v-if="id">
				<span>{{ ruleForm.no ? ruleForm.no : "-" }}</span>
			</el-form-item>
			<el-form-item label="被服名称:" prop="name">
				<el-input v-model="ruleForm.name" size="small"></el-input>
			</el-form-item>
			<el-form-item label="规格型号:" prop="specification">
				<el-input
					v-model="ruleForm.specification"
					size="small"
				></el-input>
			</el-form-item>
			<el-form-item label="被服类别:" prop="category">
				<span>{{
					ruleForm.category == "1"
						? "智能资产"
						: ruleForm.category == "0"
						? "非智能资产"
						: "-"
				}}</span>
			</el-form-item>
			<el-form-item label="被服类型:" prop="type">
				<el-select
					v-model="ruleForm.type"
					placeholder="请选择"
					size="small"
				>
					<el-option label="类型1" value="1"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="所属部门:" prop="usedDept">
				<el-select
					v-model="ruleForm.usedDept"
					size="small"
					placeholder="请选择"
				>
					<el-option label="部门1" value="1"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="管理负责人:" prop="chargeP">
				<el-select
					v-model="ruleForm.chargeP"
					size="small"
					placeholder="请选择"
				>
					<el-option label="负责人1" value="1"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="管理部门:" prop="managementDept">
				<el-select
					v-model="ruleForm.managementDept"
					size="small"
					placeholder="请选择"
				>
					<el-option label="部门1" value="1"></el-option
				></el-select>
			</el-form-item>
			<el-form-item label="被服条码:" prop="barCode">
				<span>{{ ruleForm.barCode ? ruleForm.barCode : "-" }}</span>
				<el-button style="margin-left:10px;" type="text"
					>变更</el-button
				>
			</el-form-item>
			<el-form-item label="RFID:" prop="RFID">
				<span>{{ ruleForm.RFID ? ruleForm.RFID : "-" }}</span>
			</el-form-item>
			<el-form-item label="供应商:" prop="supplier">
				<span>{{ ruleForm.supplier ? ruleForm.supplier : "-" }}</span>
			</el-form-item>
			<el-form-item label="合同编号:" prop="contractNo">
				<span>{{
					ruleForm.contractNo ? ruleForm.contractNo : "-"
				}}</span>
			</el-form-item>
			<el-form-item
				label="最近一次洗涤时间:"
				prop="lastWashingTime"
				class="setlabel"
			>
				<span>{{
					ruleForm.lastWashingTime ? ruleForm.lastWashingTime : "-"
				}}</span>
			</el-form-item>
			<el-form-item label="累积洗涤次数:" prop="cumulativeWashing">
				<span>{{
					ruleForm.cumulativeWashing
						? ruleForm.cumulativeWashing
						: "-"
				}}</span>
			</el-form-item>
			<el-form-item label="累计洗涤费用:" prop="accumulatedWashing">
				<span>{{
					ruleForm.accumulatedWashing
						? ruleForm.accumulatedWashing
						: "-"
				}}</span>
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
				no: "",
				name: "",
				specification: "", //规格型号
				category: "", //被服类别
				type: "",
				usedDept: "", //使用部门
				chargeP: "", //负责人
				managementDept: "", //管理部门
				isSpecial: true, //是否是特种被服
				barCode: "", //条码
				manufacturer: "", //生产商
				productionDate: "", //出厂日期
				supplier: "", //供应商
				contractNo: "", //合同编号
				RFID: "",
				lastWashingTime: "", //最近一次洗涤时间
				cumulativeWashing: "", //累积洗涤次数
				accumulatedWashing: "", //累计洗涤费用
			},
			rules: {
				no: [
					{
						required: true,
						message: "请输入被服编码",
						trigger: "blur",
					},
				],
				name: [
					{
						required: true,
						message: "请输入被服名称",
						trigger: "blur",
					},
				],
				category: [
					{
						required: true,
						message: "请输入被服类别",
						trigger: "blur",
					},
				],
				type: [
					{
						required: true,
						message: "请输入被服类型",
						trigger: "blur",
					},
				],
				usedDept: [
					{
						required: true,
						message: "请输入使用部门",
						trigger: "blur",
					},
				], //使用部门
				chargeP: [
					{
						required: true,
						message: "请输入管理负责人",
						trigger: "blur",
					},
				], //负责人
				// managementDept: [
				// 	{
				// 		required: true,
				// 		message: "请输入管理部门",
				// 		trigger: "blur",
				// 	},
				// ], //管理部门
			},
		}
	},
}
</script>
<style lang="scss">
.basic-info {
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
	.demo-ruleForm-basicinfo {
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
		.setlabel {
			color: #fff;
			.el-form-item__label {
				width: 130px !important;
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
