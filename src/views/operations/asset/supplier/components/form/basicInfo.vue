<template>
	<div class="basic">
		<el-form
			:model="ruleForm"
			:rules="rules"
			ref="basicForm"
			label-width="100px"
		>
			<el-form-item
				label="公司编号:"
				prop="supplierNo"
				class="f3"
				v-if="isedit"
			>
				<el-input
					placeholder="请输入"
					size="small"
					v-model="ruleForm.supplierNo"
					:disabled="isedit ? true : false"
				></el-input>
			</el-form-item>
			<el-form-item label="公司名称:" prop="supplierName" class="f3">
				<el-input
					placeholder="请输入"
					size="small"
					v-model="ruleForm.supplierName"
				></el-input>
			</el-form-item>
			<el-form-item label="公司电话:" prop="supplierPhone" class="f3">
				<el-input
					placeholder="请输入"
					size="small"
					v-model="ruleForm.supplierPhone"
				></el-input>
			</el-form-item>
			<el-form-item
				label="统一社会信用代码:"
				prop="creditCode"
				label-width="160px"
				class="f6"
			>
				<el-input
					placeholder="请输入"
					size="small"
					v-model="ruleForm.creditCode"
				></el-input>
			</el-form-item>
			<el-form-item label="公司状态:" prop="supplierStatus" class="f3">
				<el-select
					placeholder="请选择"
					size="small"
					v-model="ruleForm.supplierStatus"
				>
					<el-option label="启用" value="1"></el-option>
					<el-option label="禁用" value="0"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="公司地址:" prop="supplierAddress">
				<v-region v-model="selected"></v-region>
				<el-input
					size="small"
					placeholder="请输入详细地址"
					v-model="ruleForm.supplierAddress"
					class="input-text"
				></el-input>
			</el-form-item>
			<template v-for="(item, index) in ruleForm.userInfo">
				<div :key="index" class="user-content">
					<el-form-item
						label="联系人:"
						class="f3"
						:rules="rules.user"
						:prop="'userInfo.' + index + '.user'"
					>
						<el-input
							placeholder="请输入"
							size="small"
							v-model="item.user"
						></el-input>
					</el-form-item>
					<el-form-item
						label="联系电话:"
						:rules="rules.phone"
						class="f3"
						:prop="'userInfo.' + index + '.phone'"
					>
						<el-input
							placeholder="请输入"
							size="small"
							v-model="item.phone"
						></el-input>
					</el-form-item>
				</div>
			</template>
			<div class="addbtn">
				<el-button
					type="text"
					size="small"
					icon="el-icon-plus"
					@click="addUser"
					>添加</el-button
				>
			</div>
			<el-form-item label="公司简介">
				<el-input
					type="textarea"
					rows="3"
					size="small"
					placeholder="请输入"
					v-model="ruleForm.summary"
				></el-input>
			</el-form-item>
			<el-form-item label="营业执照" prop="businessLicense">
				<el-upload
					class="avatar-uploader"
					action=""
					:show-file-list="false"
					:on-change="beforeAvatarUpload"
					:auto-upload="false"
					accept=".jpg,.png,.jpeg,JPG,JPEG,PDF,pdf"
				>
					<img v-if="imageUrl" :src="imageUrl" class="avatar" />
					<svg
						v-else
						class="iconfont el-icon-plus avatar-uploader-icon"
						aria-hidden="true"
					>
						<use xlink:href="#iconyingyezhizhao"></use>
					</svg>
				</el-upload>
			</el-form-item>
			<el-form-item label="其他资质">
				<el-upload
					class="upload-demo"
					action=""
					:on-change="changeFile"
					:file-list="ruleForm.others"
					list-type="picture"
					:auto-upload="false"
					accept=".jpg,.png,.jpeg,JPG,JPEG,PDF,pdf"
				>
					<el-button
						type="text"
						size="small"
						icon="el-icon-plus"
						class="other-btn"
						>添加</el-button
					>
				</el-upload>
			</el-form-item>
			<el-form-item class="footerbtn">
				<el-button
					type="primary"
					size="small"
					@click="submitForm('basicForm')"
					v-if="!isedit"
					>提交</el-button
				>
				<el-button
					type="primary"
					size="small"
					@click="submitForm('basicForm')"
					v-else
					>保存</el-button
				>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
import Vue from "vue"
import vRegion from "v-region"
Vue.use(vRegion)
export default {
	props: {
		forminfo: Object,
		isedit: Boolean,
	},
	watch: {
		isedit(val) {
			if (val == false) {
				this.$refs["basicForm"].resetFields()
				this.imageUrl = ""
				this.ruleForm.summary = ""
				this.ruleForm.userInfo = [
					{
						user: "", //联系人
						phone: "", //联系电话
					},
				]
				this.ruleForm.others = []
			}
		},
		forminfo(val) {
			if (val) {
				this.setinfo()
			}
		},
	},
	created() {
		if (this.isedit && this.forminfo) {
			this.setinfo()
		}
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
				supplierName: "", //供应商名称
				supplierNo: "", //供应商编码
				supplierAddress: "", // 供应商地址
				supplierPhone: "", //电话
				supplierStatus: "", //状态
				creditCode: "", //信用码
				userInfo: [
					{
						user: "", //联系人
						phone: "", //联系电话
					},
				],
				summary: "", //简介
				businessLicense: "", //营业执照
				others: [],
			},
			selected: {
				province: "",
				city: "",
				area: "",
				town: "",
			},
			imageUrl: "",
			rules: {
				supplierName: [
					{
						required: true,
						message: "请输入公司名称",
						trigger: "blur",
					},
				],
				supplierNo: [
					{
						required: true,
						message: "请输入公司编码",
						trigger: "blur",
					},
				],
				supplierPhone: [
					{
						required: true,
						message: "请输入公司电话",
						trigger: "blur",
					},
				],
				supplierAddress: [
					{
						required: true,
						message: "请输入公司地址",
						trigger: "blur",
					},
				],
				creditCode: [
					{
						required: true,
						message: "请输入信用代码",
						trigger: "blur",
					},
				],
				user: [
					{
						required: true,
						message: "请输入联系人",
						trigger: "blur",
					},
				],
				phone: [
					{
						required: true,
						validator: validPhone,
						trigger: "blur",
					},
				],
				businessLicense: [
					{
						required: true,
						message: "请选择营业执照上传",
						trigger: "blur",
					},
				],
			},
		}
	},
	methods: {
		regionChange(data) {
			this.ruleForm.supplierAddress = data
		},
		beforeAvatarUpload(file) {
			this.imageUrl = window.URL.createObjectURL(file.raw)
			this.ruleForm.businessLicense = file.raw
		},
		changeFile(file, fileList) {
			console.log(file)
			this.ruleForm.others = fileList
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
		addUser() {
			this.ruleForm.userInfo.push({
				user: "", //联系人
				phone: "", //联系电话
			})
		},
		setinfo() {
			this.ruleForm = {
				supplierName: this.forminfo.supplierName, //供应商名称
				supplierNo: this.forminfo.supplierNo, //供应商编码
				supplierAddress: this.forminfo.supplierAddress, // 供应商地址
				supplierPhone: this.forminfo.supplierPhone, //电话
				supplierStatus: this.forminfo.supplierStatus, //状态
				creditCode: this.forminfo.creditCode, //信用码
				userInfo: this.forminfo.userInfo, //联系人
				summary: this.forminfo.summary, //简介
				others: this.forminfo.others,
				id: this.forminfo.id,
			}
			this.imageUrl = this.forminfo.businessLicense //营业执照
		},
	},
}
</script>
<style lang="scss">
.basic {
	.el-form-item__label {
		color: #fff;
	}
	.el-select {
		width: 100%;
	}
	.f3 {
		width: 33.3%;
		display: inline-block;
	}
	.f6 {
		width: 66.6%;
		display: inline-block;
	}
	.v-region {
		width: 40%;
		display: inline-block;
	}
	div.rg-select {
		width: 32%;
	}
	div.rg-select div.rg-select__el {
		line-height: 16px;
		border: 1px solid #4d4d4d;
		border-radius: 0px;
		div.rg-select__content {
			color: #fff;
		}
	}
	.input-text {
		width: 60%;
		display: inline-block;
		padding-left: 5px;
	}
	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
		padding: 20px;
		height: 118px;
	}
	.avatar-uploader .el-upload:hover {
		border-color: #409eff;
	}
	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 110px;
		height: 78px;
		line-height: 78px;
		text-align: center;
	}
	.avatar {
		width: 110px;
		height: 78px;
		display: block;
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
	.addbtn {
		padding-left: 100px;
		padding-bottom: 20px;
		.el-button {
			padding: 0;
		}
	}
	.other-btn {
		padding: 0;
	}
	.upload-demo {
		.el-upload-list,
		.list--picture {
			display: flex;
			flex-wrap: wrap;
			.el-upload-list__item {
				width: 160px;
				height: 118px;
				overflow: hidden;
				margin-top: 0px;
				margin-top: 20px;
				padding: 0;
				a {
					width: 0px;
					margin: 0;
					display: none;
				}
				img {
					width: 100%;
					height: 100%;
					margin-left: 0;
				}
				i {
					font-size: 20px;
					color: red;
					right: 0px;
					top: 0px;
					z-index: 2;
				}
			}
			.el-upload-list__item + .el-upload-list__item {
				margin-left: 20px;
			}
			.el-upload-list__item:nth-of-type(7n) {
				margin-left: 0px;
			}
		}
	}
}
</style>
