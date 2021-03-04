<template>
	<el-form :model="fromData" ref="placementFrom" class="placement-form">
		<el-table
			:data="fromData.tableData"
			style="width: 100%"
			class="placement-table"
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
			<el-table-column prop="RFID" label="RFID" width="180">
				<template slot="header"
					><span style="color:red;margin-right:5px;">*</span
					>RFID</template
				>
				<template slot-scope="scope">
					<el-form-item
						:prop="'tableData.' + scope.$index + '.RFID'"
						:rules="fromaDataRules.RFID"
					>
						<el-input
							v-model="scope.row.RFID"
							size="mini"
							placeholder="请输入"
						></el-input>
					</el-form-item>
				</template>
			</el-table-column>
			<el-table-column prop="GIS" label="GIS坐标" width="180">
				<template slot-scope="scope">
					<el-form-item
						:prop="'tableData.' + scope.$index + '.x'"
						:rules="fromaDataRules.x"
						style="width:50%;"
					>
						<el-input
							v-model="scope.row.x"
							size="mini"
							placeholder="请输入"
						></el-input>
					</el-form-item>
					<el-form-item
						:prop="'tableData.' + scope.$index + '.y'"
						:rules="fromaDataRules.y"
						style="width:50%;"
					>
						<el-input
							v-model="scope.row.y"
							size="mini"
							placeholder="请输入"
						></el-input>
					</el-form-item>
				</template>
			</el-table-column>
			<el-table-column prop="position" label="安装位置" width="180">
				<template slot-scope="scope">
					<el-input
						v-model="scope.row.position"
						size="mini"
						placeholder="请输入"
					></el-input>
				</template>
			</el-table-column>
			<el-table-column prop="installTime" label="安装时间" width="180">
				<template slot-scope="scope">
					<el-date-picker
						type="datetime"
						v-model="scope.row.installTime"
						size="mini"
						placeholder="请选择"
						style="width: 100%;"
					></el-date-picker>
				</template>
			</el-table-column>
		</el-table>
		<el-form-item class="footer-btn">
			<el-button
				size="small"
				type="primary"
				@click="submitForm('placementFrom')"
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
		var validateRFID = (rule, value, callback) => {
			if (!value) {
				callback(new Error("请输入"))
			} else {
				callback()
			}
		}
		return {
			fromData: {
				tableData: this.tableData,
			},
			fromaDataRules: {
				RFID: [
					{
						validator: validateRFID,
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
					let equipments = this.tableData.map((item) => {
						let items = {
							id: item.id,
							RFID: item.RFID,
							position: item.position,
							x: item.x,
							y: item.y,
							installTime: item.installTime,
						}
						return items
					})
					await asset.equipments.equipmentBatchPlacement(equipments)
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
.placement-table {
	.el-form-item {
		margin: 0px;
		padding: 0;
		display: inline-block;
	}
}
.placement-form {
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
