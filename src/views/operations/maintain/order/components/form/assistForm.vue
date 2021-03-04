<template>
	<div class="assist-form">
		<el-form
			:model="ruleForm"
			:rules="rules"
			ref="ruleForms"
			label-width="110px"
			class="demo-ruleForms"
		>
			<el-form-item label="协助人" prop="assistuser">
				<el-select
					v-model="ruleForm.assistuser"
					placeholder="请选择"
					size="small"
				>
					<el-option
						v-for="(item, index) in assistusers"
						:key="index"
						:label="item.name"
						:value="item.id"
					></el-option> </el-select
				><el-button
					class="delbtn"
					type="text"
					:disabled="ruleForm.assistuser == ''"
					@click="remove"
					>删除</el-button
				>
				<el-form-item style="height:28px;">
					<el-popover placement="right" width="400" trigger="click">
						<assistuser
							:assistusers="assistusers"
							:users="users"
							@setusers="setusers"
						></assistuser>
						<el-button
							slot="reference"
							type="text"
							icon="el-icon-plus"
							>添加</el-button
						>
					</el-popover>
				</el-form-item>
			</el-form-item>

			<el-form-item label="计划完成时间" prop="completeTime">
				<el-input
					v-model="ruleForm.completeTime"
					placeholder="请输入"
					size="small"
				></el-input>
			</el-form-item>
			<el-form-item label="备注" prop="remark">
				<el-input
					type="textarea"
					v-model="ruleForm.remark"
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
import assistuser from "./assistuser"
export default {
	name: "assistForm",
	props: {
		id: {
			type: String,
		},
	},
	components: {
		assistuser,
	},
	data() {
		return {
			data: null,
			ruleForm: {
				assistuser: "",
				remark: "",
				completeTime: "",
			},
			rules: {
				assistuser: [
					{
						required: true,
						message: "请选择协助人",
						trigger: "blur",
					},
				],
				remark: [
					{
						required: true,
						message: "请输入备注",
						trigger: "blur",
					},
				],
				completeTime: [
					{
						required: true,
						message: "请输入完成时间",
						trigger: "blur",
					},
				],
			},
			assistusers: [], //协助人
			users: [],
		}
	},
	async created() {
		this.users = await maintain.order.getHelpers()
	},
	methods: {
		submitForm(formName) {
			this.$refs[formName].validate(async (valid) => {
				if (valid) {
					this.ruleForm.id = this.id
					await maintain.order.saveAssist(this.ruleForm)
					this.$message.success("协助成功")
					this.$emit("sumbit", true)
				} else {
					return false
				}
			})
		},
		setusers(val) {
			this.assistusers = this.users.filter((x) => val.includes(x.id))
		},
		remove() {
			this.assistusers = this.assistusers.filter((x) => {
				if (x.id != this.ruleForm.assistuser) {
					return x
				}
			})
			this.ruleForm.assistuser = ""
		},
	},
}
</script>

<style lang="scss">
.assist-form {
	.demo-ruleForms {
		padding: 0px 20px 20px 20px;
		.el-form-item {
			.el-input,
			.el-select {
				width: 400px;
			}
			.el-textarea {
				width: 80%;
			}
		}
		.el-form-item__label {
			color: #fff;
			font-size: 14px;
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
	}
}
</style>
