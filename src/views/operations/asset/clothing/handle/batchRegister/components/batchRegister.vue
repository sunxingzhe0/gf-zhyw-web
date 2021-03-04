<template>
	<el-form :model="fromData" ref="instalFrom" class="install-form">
		<el-table
			:data="fromData.tableData"
			style="width: 100%"
			class="install-table"
			height="510px"
		>
			<el-table-column
				prop="name"
				label="名称"
				:show-overflow-tooltip="true"
			>
			</el-table-column>
			<el-table-column
				prop="status"
				label="状态"
				:show-overflow-tooltip="true"
			>
				<template slot-scope="scope">
					<span>{{ DeviceStatus[scope.row.status] }}</span>
				</template>
			</el-table-column>
			<el-table-column
				prop="typeName"
				label="类型"
				:show-overflow-tooltip="true"
			>
			</el-table-column>
			<el-table-column
				prop="deptName"
				label="使用部门"
				:show-overflow-tooltip="true"
			>
			</el-table-column>
			<el-table-column
				prop="RFID"
				label="RFID"
				:show-overflow-tooltip="true"
			>
			</el-table-column>
			<el-table-column prop="usedUser" label="使用人" width="180">
				<template slot-scope="scope">
					<el-form-item
						:prop="'tableData.' + scope.$index + '.usedUser'"
						:rules="fromaDataRules.usedUser"
					>
						<el-select
							v-model="scope.row.usedUser"
							size="mini"
							placeholder="请选择"
						></el-select>
					</el-form-item>
				</template>
			</el-table-column>
			<el-table-column prop="usedDept" label="使用部门" width="180">
				<template slot="header"
					><span style="color:red;margin-right:5px;">*</span
					>使用部门</template
				>
				<template slot-scope="scope">
					<el-select
						v-model="scope.row.usedDept"
						size="mini"
						placeholder="请选择"
					></el-select>
				</template>
			</el-table-column>
			<el-table-column prop="registerTime" label="注册时间" width="180">
				<template slot="header"
					><span style="color:red;margin-right:5px;">*</span
					>注册时间</template
				>
				<template slot-scope="scope">
					<el-select
						type="datetime"
						v-model="scope.row.registerTime"
						size="mini"
						placeholder="请选择"
						style="width: 100%;"
					></el-select>
				</template>
			</el-table-column>
		</el-table>
		<el-form-item class="footer-btn">
			<el-button
				size="small"
				type="primary"
				@click="submitForm('instalFrom')"
				>提交</el-button
			>
		</el-form-item>
	</el-form>
</template>
<script>
import asset from "@/api/operations/asset"
export default {
	props: {
		tableData: Array,
	},
	data() {
		return {
			fromData: {
				tableData: this.tableData,
			},
			fromaDataRules: {
				usedDept: [
					{
						required: true,
						message: "请选择",
						trigger: "blur",
					},
				],
				registerTime: [
					{
						required: true,
						message: "请选择",
						trigger: "blur",
					},
				],
			},
			DeviceStatus: null,
		}
	},
	created() {
		this.DeviceStatus = this.$store.state.operations.status.DeviceStatus
	},
	methods: {
		submitForm(formName) {
			this.$refs[formName].validate(async (valid) => {
				if (valid) {
					let data = this.tableData.map((item) => {
						let items = {
							id: item.id,
							usedUser: item.usedUser,
							usedDept: item.usedDept,
							registerTime: item.registerTime,
						}
						return items
					})
					asset.clothing.clothingBatchRegister(data)
					this.$message.success("操作成功")
				} else {
					return false
				}
			})
		},
	},
}
</script>
<style lang="scss">
.install-table {
	.el-form-item {
		margin: 0px !important;
		padding: 0 !important;
		display: inline-block;
	}
}
.install-form {
	.footer-btn {
		text-align: center;
		border-top: 1px solid rgba(255, 255, 255, 0.3);
		.el-form-item__content {
			margin-left: 0px !important;
		}
		.el-button {
			width: 56px;
		}
	}
}
</style>
