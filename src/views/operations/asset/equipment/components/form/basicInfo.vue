<template>
	<div class="basic-info">
		<div class="title">设备信息</div>
		<el-form
			:model="ruleForm"
			:rules="rules"
			ref="basicinfo-ruleForm"
			label-width="85px"
			class="demo-ruleForm-basicinfo"
		>
			<el-form-item label="设备编码:" prop="no" v-if="id">
				<el-input
					v-model="ruleForm.no"
					size="small"
					:disabled="id ? true : false"
				></el-input>
			</el-form-item>
			<el-form-item label="设备名称:" prop="name">
				<el-input v-model="ruleForm.name" size="small"></el-input>
			</el-form-item>
			<el-form-item label="规格型号:" prop="specification">
				<el-input
					v-model="ruleForm.specification"
					size="small"
				></el-input>
			</el-form-item>
			<el-form-item label="上级设备:" prop="parent">
				<el-input v-model="ruleForm.parent" size="small"></el-input>
			</el-form-item>
			<el-form-item label="设备类别:" prop="category">
				<span>{{
					ruleForm.category == "1" ? "智能设备" : "非智能设备"
				}}</span>
			</el-form-item>
			<el-form-item label="设备类型:" prop="type">
				<el-select
					v-model="ruleForm.type"
					placeholder="请选择"
					size="small"
				>
				</el-select>
			</el-form-item>
			<el-form-item label="安装位置:" prop="position">
				<span>{{ ruleForm.position ? ruleForm.position : "-" }}</span>
			</el-form-item>
			<el-form-item label="安装时间:" prop="installTime">
				<span>{{ ruleForm.installTime }}</span>
			</el-form-item>
			<el-form-item label="所属部门:" prop="dept">
				<el-input v-model="ruleForm.dept" size="small"></el-input>
			</el-form-item>
			<el-form-item label="负责人:" prop="chargeP">
				<el-input v-model="ruleForm.chargeP" size="small"></el-input>
			</el-form-item>
			<el-form-item label="维护部门:" prop="managementDept">
				<el-input
					v-model="ruleForm.managementDept"
					size="small"
				></el-input>
			</el-form-item>
			<el-form-item label="特种设备:" prop="isSpecial">
				<el-radio-group v-model="ruleForm.isSpecial" size="small">
					<el-radio :label="true">是</el-radio>
					<el-radio :label="false">否</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="RFID:" prop="RFID">
				<span>{{ ruleForm.RFID }}</span>
			</el-form-item>
			<el-form-item label="设备条码:" prop="barCode">
				<span>{{ ruleForm.barCode }}</span
				><el-button style="margin-left:10px;" type="text"
					>变更</el-button
				>
			</el-form-item>
			<el-form-item label="设备IP:" prop="ip">
				<span>{{ ruleForm.ip }}</span
				><el-button style="margin-left:10px;" type="text"
					>变更</el-button
				>
			</el-form-item>
			<el-form-item label="供应商:" prop="supplier">
				<span>{{ ruleForm.supplier }}</span>
			</el-form-item>
			<el-form-item label="合同编号:" prop="contractNo">
				<span>{{ ruleForm.contractNo }}</span>
			</el-form-item>
			<el-form-item
				label="最后一次保养时间:"
				prop="lastMaintainTime"
				class="setlabel"
			>
				<span>{{
					ruleForm.lastMaintainTime ? ruleForm.lastMaintainTime : "-"
				}}</span>
			</el-form-item>
			<el-form-item
				label="检修后运行:"
				prop="afterRepairOperation"
				class="setlabel"
			>
				<span>{{
					ruleForm.afterRepairOperation
						? ruleForm.afterRepairOperation
						: "-"
				}}</span>
			</el-form-item>
			<el-form-item label="积累运行:" prop="cumulativeOperation">
				<span>{{
					ruleForm.cumulativeOperation
						? ruleForm.cumulativeOperation
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
				category: "", //设备类别
				type: "",
				position: "", //安装位置
				installTime: "", //安装时间
				dept: "", //所属部门
				chargeP: "", //负责人
				managementDept: "", //维护部门
				lastMaintainTime: "", //最后一次保养时间
				afterRepairOperation: "", //检修后运行
				cumulativeOperation: "", //累积运行
				isSpecial: true, //是否是特种设备
				barCode: "", //条码
				supplier: "", //供应商
				contractNo: "", //合同编号
				parent: "", //上级设备
				RFID: "", //设备RFID
				ip: "", //设备IP
			},
			rules: {
				no: [
					{
						required: true,
						message: "请输入设备编码",
						trigger: "blur",
					},
				],
				name: [
					{
						required: true,
						message: "请输入设备名称",
						trigger: "blur",
					},
				],
				category: [
					{
						required: true,
						message: "请输入设备类别",
						trigger: "blur",
					},
				],
				type: [
					{
						required: true,
						message: "请输入设备类型",
						trigger: "blur",
					},
				],
				position: [
					{
						required: true,
						message: "请输入安装位置",
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
			color: #fff;
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
			text-align: left;
		}
	}
}
</style>
