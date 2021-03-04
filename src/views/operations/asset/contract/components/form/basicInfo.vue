<template>
	<div class="basics">
		<el-form
			:model="ruleForm"
			:rules="rules"
			ref="basicForms"
			label-width="100px"
		>
			<el-form-item
				label="合同编号:"
				prop="contractNo"
				class="f3"
				v-if="isedit"
			>
				<el-input
					placeholder="请输入"
					size="small"
					v-model="ruleForm.contractNo"
					:disabled="isedit ? true : false"
				></el-input>
			</el-form-item>
			<el-form-item label="合同名称:" prop="contractName" class="f3">
				<el-input
					placeholder="请输入"
					size="small"
					v-model="ruleForm.contractName"
				></el-input>
			</el-form-item>
			<el-form-item label="合同甲方:" prop="firstParty" class="f3">
				<el-input
					placeholder="请输入"
					size="small"
					v-model="ruleForm.firstParty"
				></el-input>
			</el-form-item>
			<el-form-item label="合同供应商:" prop="supplierName" class="f3">
				<el-select
					placeholder="请输入"
					size="small"
					v-model="ruleForm.supplierName"
				></el-select>
			</el-form-item>
			<el-form-item label="合同金额:" prop="contractPrice" class="f3">
				<el-input
					placeholder="请输入"
					size="small"
					v-model="ruleForm.contractPrice"
				>
					<span slot="suffix" class="compoy">元</span>
				</el-input>
			</el-form-item>
			<el-form-item label="智能科室:" prop="deptName" class="f3">
				<el-input
					placeholder="请输入"
					size="small"
					v-model="ruleForm.deptName"
				></el-input>
			</el-form-item>
			<el-form-item label="联系人:" class="f3" prop="userName">
				<el-input
					placeholder="请输入"
					size="small"
					v-model="ruleForm.userName"
				></el-input>
			</el-form-item>
			<el-form-item label="联系电话:" class="f3" prop="userPhone">
				<el-input
					placeholder="请输入"
					size="small"
					v-model="ruleForm.userPhone"
				></el-input>
			</el-form-item>
			<el-form-item label="合同状态:" prop="contractStatus" class="f3">
				<el-select
					placeholder="请选择"
					size="small"
					v-model="ruleForm.contractStatus"
				>
					<el-option label="有效" value="1"></el-option>
					<el-option label="无效" value="0"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="是否招标:" prop="contractBidding" class="f3">
				<el-select
					placeholder="请选择"
					size="small"
					v-model="ruleForm.contractBidding"
				>
					<el-option label="是" value="1"></el-option>
					<el-option label="否" value="0"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="开始时间:" prop="startTime" class="f3">
				<el-date-picker
					v-model="ruleForm.startTime"
					type="date"
					placeholder="选择日期"
					size="small"
				>
				</el-date-picker>
			</el-form-item>
			<el-form-item label="结束时间:" prop="endTime" class="f3">
				<el-date-picker
					v-model="ruleForm.endTime"
					type="date"
					placeholder="选择日期"
					size="small"
				>
				</el-date-picker>
			</el-form-item>
			<el-form-item
				label="合同简介:"
				prop="briefIntroduction"
				class="f10"
			>
				<el-input
					size="small"
					type="textarea"
					rows="3"
					v-model="ruleForm.briefIntroduction"
					placeholder="请输入合同简介"
				></el-input>
			</el-form-item>
			<el-form-item label="合同附件" prop="enclosure" class="f10">
				<el-upload
					class="upload-demo"
					action=""
					:on-change="changeFile"
					:auto-upload="false"
					:show-file-list="false"
				>
					<el-button type="text" icon="el-icon-plus">添加</el-button>
				</el-upload>
				<el-table :data="tableData" class="file-style">
					<el-table-column prop="filename" label="附件名称">
					</el-table-column>
					<el-table-column prop="flietype" label="附件类型">
					</el-table-column>
					<el-table-column prop="fliesize" label="附件大小">
					</el-table-column>
					<el-table-column fixed="right" label="操作" width="50">
						<template slot-scope="scope">
							<el-button
								@click="handleClick(scope.row.id)"
								type="text"
								size="small"
								>下载</el-button
							>
						</template>
					</el-table-column>
				</el-table>
			</el-form-item>
			<el-form-item class="footerbtn">
				<el-button
					type="primary"
					size="small"
					@click="submitForm('basicForms')"
					v-if="!isedit"
					>提交</el-button
				>
				<el-button
					type="primary"
					size="small"
					@click="submitForm('basicForms')"
					v-else
					>保存</el-button
				>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
export default {
	props: {
		forminfo: Object,
		isedit: Boolean,
	},
	watch: {
		isedit() {
			if (this.isedit == false) {
				this.$refs["basicForms"].resetFields()
				this.tableData = []
			}
		},
		forminfo(val) {
			if (val && this.isedit) {
				this.setinfo()
			}
		},
	},
	created() {
		this.setinfo()
	},
	data() {
		//定义一个全局的变量，谁用谁知道
		var validPhone = (rule, value, callback) => {
			if (!value) {
				callback(new Error("请输入联系电话"))
			} else {
				const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
				if (reg.test(value)) {
					callback()
				} else {
					return callback(new Error("请输入正确的11位联系电话"))
				}
			}
		}
		return {
			ruleForm: {
				contracttNo: "", //合同编号
				contracttName: "", //合同名称
				firstParty: "", //合同甲方
				supplierName: "", //供应商
				deptName: "", //部门
				userName: "", //联系人
				userPhone: "", //联系电话
				contractPrice: "", //合同金额
				startTime: "", //开始时间
				endTime: "", //结束时间
				contractStatus: "1", //状态
				briefIntroduction: "", //简介
				enclosure: [], //附件
				contractBidding: "1", //是否招标
			},
			rules: {
				contracttNo: [
					{
						required: true,
						message: "请输入合同编号",
						trigger: "blur",
					},
				],
				contracttName: [
					{
						required: true,
						message: "请输入合同名称",
						trigger: "blur",
					},
				],
				deptName: [
					{
						required: true,
						message: "请输入智能科室",
						trigger: "blur",
					},
				],
				userPhone: [
					{
						validator: validPhone,
						trigger: "blur",
					},
				],
				userName: [
					{
						required: true,
						message: "请输入联系人",
						trigger: "blur",
					},
				],
			},
			tableData: [],
		}
	},
	methods: {
		handleClick() {
			this.$message.success("下载成功")
		},
		changeFile(file, fileList) {
			this.tableData = []
			fileList.map((item) => {
				let obj = {
					filename: item.raw.name,
					flietype: item.raw.type,
					fliesize: item.raw.size,
					raw: item.raw,
				}
				this.tableData.push(obj)
			})
		},
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.$emit("submit", this.ruleForm)
				} else {
					return false
				}
			})
		},
		setinfo() {
			let val = this.forminfo
			if (val && this.isedit) {
				this.ruleForm = {
					id: val.id,
					contractNo: val.contractNo, //合同编号
					contractName: val.contractName, //合同名称
					firstParty: val.firstParty, //合同甲方
					supplierName: val.supplierName, //供应商
					deptName: val.deptName, //部门
					userName: val.userName, //联系人
					userPhone: val.userPhone, //联系电话
					contractPrice: val.contractPrice, //合同金额
					startTime: val.startTime, //开始时间
					endTime: val.endTime, //结束时间
					contractStatus: val.contractStatus, //状态
					briefIntroduction: val.briefIntroduction, //简介
					enclosure: val.enclosure, //附件
					contractBidding: val.contractBidding, //是否招标
				}
				this.tableData = val.enclosure
			}
		},
	},
}
</script>
<style lang="scss">
.basics {
	.el-form-item__label {
		color: #fff;
	}
	.el-select,
	.el-date-editor {
		width: 100%;
	}
	.f3 {
		width: 32.5%;
		display: inline-block;
	}
	.f6 {
		width: 66.6%;
		display: inline-block;
	}
	.f3:nth-of-type(3n) {
		margin-right: 20px;
	}
	.f10 {
		margin-right: 30px;
	}
	.el-form-item__content {
		line-height: 14px;
	}
	.file-style {
		background: rgba(0, 0, 0, 0.9);
		td {
			padding: 1px 0;
		}
		th {
			border: none;
		}
		.is-hidden {
			background-color: transparent;
		}
	}
	.footerbtn {
		border-top: 1px solid rgba(255, 255, 255, 0.3);
		text-align: center;
		padding: 20px 0px;
		margin: 0;
		height: 72px;
		.el-form-item__content {
			line-height: 14px;
			.el-button {
				width: 72px;
			}
		}
	}
	.compoy {
		line-height: 32px;
	}
}
</style>
