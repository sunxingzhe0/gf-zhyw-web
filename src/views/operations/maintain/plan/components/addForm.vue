<template>
	<el-form
		:model="ruleForm"
		:rules="rules"
		ref="planForm"
		label-width="90px"
		class="demo-ruleForm-plan demo-scorll-y"
		v-loading="formload"
	>
		<el-form-item label="计划名称:" prop="name">
			<el-input
				v-model="ruleForm.name"
				placeholder="请输入"
				size="small"
			></el-input>
		</el-form-item>
		<el-form-item label="维护部门:" prop="dept">
			<el-select
				v-model="ruleForm.dept"
				placeholder="请选择"
				size="small"
				class="form-select"
			>
				<el-option
					v-for="(item, index) in depts"
					:key="index"
					:label="item.name"
					:value="item.id"
				></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="执行人:" prop="executor">
			<el-select
				v-model="ruleForm.executor"
				placeholder="请选择"
				size="small"
				class="form-select"
			>
				<el-option
					v-for="(item, index) in executors"
					:key="index"
					:label="item.name"
					:value="item.id"
				></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="状态:" prop="status">
			<el-select
				v-model="ruleForm.status"
				placeholder="请选择"
				size="small"
				class="form-select"
			>
				<el-option label="启用" :value="true"></el-option>
				<el-option label="停用" :value="false"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="保养规则:" prop="mrules" style="width:100%;">
			<el-form-item>
				<maintainInfo @getRules="getRules" ref="minfo"></maintainInfo>
			</el-form-item>
		</el-form-item>
		<el-form-item label="关联设备:" class="emlist">
			<el-form-item class="list-form-item" v-if="formId">
				<equipmentList :formId="formId"></equipmentList>
			</el-form-item>
		</el-form-item>
		<el-form-item class="footer-btn">
			<el-button type="primary" @click="submitForm" size="small">{{
				isedit ? "保存" : "提交"
			}}</el-button>
		</el-form-item>
	</el-form>
</template>
<script>
import equipmentList from "./equipmentList"
import maintainInfo from "./maintainInfo"
import maintain from "@/api/operations/maintain"
export default {
	name: "addForm",
	components: {
		equipmentList,
		maintainInfo,
	},
	props: {
		formId: {
			type: String,
			default: "",
		},
		isedit: Boolean,
	},
	data() {
		return {
			ruleForm: {
				name: "",
				dept: "",
				executor: "",
				status: true,
				mrules: [],
			},
			rules: {
				name: [
					{
						required: true,
						message: "请输入保养名称",
						trigger: "blur",
					},
				],
				dept: [
					{
						required: true,
						message: "请选择维护部门",
						trigger: "blur",
					},
				],
				executor: [
					{
						required: true,
						message: "请选择执行人",
						trigger: "blur",
					},
				],
				status: [
					{
						type: "boolean",
						required: true,
						message: "请选择状态",
						trigger: "blur",
					},
				],
				mrules: [
					{
						type: "array",
						required: true,
						message: "请选择保养规则",
						trigger: "blur",
					},
				],
			},
			formload: false,
			depts: [], //部门
			executors: [], //执行人
		}
	},
	async created() {
		this.executors = await maintain.plan.getExecutors()
		this.depts = await maintain.plan.getDepts()
	},
	watch: {
		async isedit() {
			if (this.isedit) {
				this.formload = true
				await this.setform()
				this.formload = false
			} else {
				this.$refs["planForm"].resetFields()
				this.$refs.minfo.$refs.planMaintainInfo.resetFields()
				this.$refs.minfo.rules = []
			}
		},
	},
	methods: {
		async setform() {
			let res = await maintain.plan.detail.getPlanInfo({
				planid: this.formId,
			})
			this.ruleForm = {
				name: res.name,
				dept: res.dept,
				executor: res.executor,
				status: res.status,
				mrules: res.mrules,
			}
			let rules = []
			res.mrules.filter((item) => {
				this.$refs.minfo.forminfo[item.value.id] = item.value
				rules.push(item.value.id)
			})
			this.$refs.minfo.rules = rules
		},
		submitForm() {
			const p1 = new Promise((resolve) => {
				this.$refs["planForm"].validate((valid) => {
					if (valid) resolve()
				})
			})
			const p2 = new Promise((resolve) => {
				this.$refs["minfo"].$refs["planMaintainInfo"].validate(
					(valid) => {
						if (valid) resolve()
					}
				)
			})
			Promise.all([p1, p2]).then(async () => {
				let id = ""
				if (this.formId) {
					this.$message.success("保存成功")
				} else {
					let res = await maintain.plan.savePlan(this.ruleForm)
					id = res.id
					this.$message.success(res.message)
				}
				this.$emit("submit", id)
			})
		},
		getRules(val) {
			this.ruleForm.mrules = val
		},
	},
}
</script>
<style lang="scss">
@import "@/assets/css/variables.scss";
@import "@/assets/css/app.scss";
.demo-ruleForm-plan {
	padding: 20px;
	position: relative;
	box-sizing: border-box;
	& > .el-form-item {
		width: 30.3%;
		display: inline-block;
		margin-right: 3%;
		.form-select {
			width: 100%;
		}
		.el-form-item__label {
			color: #fff;
		}
	}
	& > .el-form-item:nth-of-type(3n) {
		margin-right: 0px;
	}
	.el-input-group__append,
	.el-input-group__prepend {
		width: 70px !important;
		color: $--color-primary;
		background: transparent;
		border-color: #4d4d4d;
	}
	.contetlist {
		.item {
			display: flex;
			height: 40px;
		}
		span {
			max-width: 300px;
			display: inline-block;
			margin-right: 20px;
			overflow: hidden;
			width: 56px;
		}
	}
	.footer-btn {
		width: 100%;
		text-align: center;
		padding-top: 20px;
		border-top: 1px solid rgba(255, 255, 255, 0.3);
		margin: 0px;
	}
	.emlist {
		width: 100%;
		.el-form-item__label {
			float: none;
		}
		.el-form-item__content {
			margin-left: 0px !important;
			.list-form-item {
				width: 100%;
				margin: 0px;
			}
		}
	}
}
.demo-scorll-y {
	width: 100%;
	max-height: 600px;
	overflow-y: auto;
	overflow-x: hidden;
}
.demo-scorll-y::-webkit-scrollbar {
	/*滚动条整体样式*/
	width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
	height: 1px;
}
.demo-scorll-y::-webkit-scrollbar-thumb {
	/*滚动条里面小方块*/
	border-radius: 10px;
	box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
	background: #535353;
}
.demo-scorll-y::-webkit-scrollbar-track {
	/*滚动条里面轨道*/
	box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
	border-radius: 10px;
	background: transparent;
}
</style>
