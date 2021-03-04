<template>
	<div class="equipment-form">
		<div class="form-item">
			<basicInfo ref="basicInfo" :id="id"></basicInfo>
			<assetInfo ref="assetInfo" :id="id"></assetInfo>
			<factoryInfo ref="factoryInfo"></factoryInfo>
			<pictureForm :id="id" ref="pictureForm"></pictureForm>
			<archives :id="id" ref="archives"></archives>
			<usedInfo ref="usedInfo"></usedInfo>
		</div>
		<div class="footer-btns">
			<el-button type="primary" size="small" @click="sumbit" v-if="!id"
				>提交</el-button
			>
			<el-button type="primary" size="small" @click="sumbit" v-else
				>保存</el-button
			>
			<el-button size="small" @click="back" plain class="backbtn"
				>返回</el-button
			>
		</div>
	</div>
</template>
<script>
import asset from "@/api/operations/asset"
import {
	basicInfo,
	assetInfo,
	factoryInfo,
	pictureForm,
	usedInfo,
	archives,
} from "./form/index"
export default {
	props: {
		id: {
			type: String,
		},
	},
	components: {
		basicInfo,
		assetInfo,
		factoryInfo,
		pictureForm,
		usedInfo,
		archives,
	},
	watch: {
		id(val) {
			if (val) {
				this.getinfo()
			} else {
				this.reset()
			}
		},
	},
	mounted() {
		if (this.id) {
			this.getinfo()
		} else {
			this.reset()
		}
	},
	methods: {
		sumbit() {
			this.$refs["basicInfo"].$refs["basicinfo-ruleForm"].validate(
				async (valid) => {
					if (valid) {
						let data = {
							assetInfo: this.$refs.assetInfo.ruleForm,
							basicInfo: this.$refs.basicInfo.ruleForm,
							factoryInfo: this.$refs.factoryInfo.ruleForm,
							pictureForm: this.$refs.pictureForm.pictures,
						}
						if (this.id) {
							data.id = this.id
						}
						await asset.clothing.editClothing(data)
						this.reset()
						this.$message.success(this.id ? "编辑成功" : "新增成功")
						this.$emit("submit")
					} else {
						return false
					}
				}
			)
		},
		back() {
			this.reset()
			this.$emit("submit")
		},
		async getinfo() {
			let res = await asset.clothing.getClothingInfo({ id: this.id })
			this.basicInfo(res.basicInfo)
			this.assetInfo(res.assetInfo)
			this.factoryInfo(res.factoryInfo)
			this.$refs.pictureForm.pictures = res.pictures
			this.$refs.archives.archives = res.archives
			this.$refs.usedInfo.usedData = res.usedData
		},
		reset() {
			this.$refs["basicInfo"].$refs["basicinfo-ruleForm"].resetFields()
			this.$refs["assetInfo"].ruleForm = {
				assetNo: "", //资产编码
				usedTime: "", //启用日期
				status: "1", //状态
				originalValue: "", //资产原值
				assignment: "", //资产赋值
				discountMethod: "1", //折扣方法
				discountRate: "", //折扣率
				discountPeriod: "", //折扣年限
			}
			this.$refs["factoryInfo"].ruleForm = {
				manufacturer: "", //生产厂商
				productionDate: "", //出厂日期
				contacts: "", //联系人
				contactInformation: "", //联系方式
				contactAddress: "", //联系地址
			}
			this.$refs.pictureForm.pictures = []
			this.$refs.archives.archives = []
			this.$refs.usedInfo.usedData = []
		},
		basicInfo(val) {
			//设备信息
			if (val) {
				this.$refs["basicInfo"].ruleForm = {
					no: val.no,
					name: val.name,
					specification: val.specification, //规格型号
					category: val.category, //被服类别
					type: val.type,
					usedDept: val.usedDept, //使用部门
					chargeP: val.chargeP, //负责人
					managementDept: val.managementDept, //管理部门
					RFID: val.RFID,
					barCode: val.barCode, //条码
					manufacturer: val.manufacturer, //生产商
					productionDate: val.productionDate, //出厂日期
					supplier: val.supplier, //供应商
					contractNo: val.contractNo, //合同编号
					lastWashingTime: val.lastWashingTime, //最近一次洗涤时间
					cumulativeWashing: val.cumulativeWashing, //累积洗涤次数
					accumulatedWashing: val.accumulatedWashing, //累计洗涤费用
				}
			}
		},
		assetInfo(val) {
			if (val) {
				this.$refs["assetInfo"].ruleForm = {
					assetNo: val.assetNo, //资产编码
					usedTime: val.usedTime, //启用日期
					status: val.status, //状态
					originalValue: val.originalValue, //资产原值
					assignment: val.assignment, //资产赋值
					discountMethod: val.discountMethod, //折扣方法
					discountRate: val.discountRate, //折扣率
					discountPeriod: val.discountPeriod, //折扣年限
				}
			}
		},
		factoryInfo(val) {
			if (val) {
				this.$refs["factoryInfo"].ruleForm = {
					manufacturer: val.manufacturer, //生产厂商
					productionDate: val.productionDate, //出厂日期
					contacts: val.contacts, //联系人
					contactInformation: val.contactInformation, //联系方式
					contactAddress: val.contactAddress, //联系地址
				}
			}
		},
	},
}
</script>
<style lang="scss">
.equipment-form {
	height: 650px;
	position: relative;
	.form-item {
		width: 100%;
		height: calc(100% - 72px);
		overflow-y: auto;
		padding-bottom: 20px;
		.el-form-item__content {
			color: #fff;
		}
	}
	.form-item::-webkit-scrollbar {
		/*滚动条整体样式*/
		width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
		height: 1px;
	}
	.form-item::-webkit-scrollbar-thumb {
		/*滚动条里面小方块*/
		border-radius: 10px;
		box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
		background: #535353;
	}
	.form-item::-webkit-scrollbar-track {
		/*滚动条里面轨道*/
		box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
		border-radius: 10px;
		background: transparent;
	}
	.footer-btns {
		position: absolute;
		bottom: 0;
		left: 0;
		text-align: center;
		height: 72px;
		width: 100%;
		border-top: 1px solid rgba(255, 255, 255, 0.3);
		padding: 20px 0px;
		box-sizing: border-box;
		.el-button {
			width: 74px;
		}
		.backbtn {
			border: 1px solid #fff;
			color: #fff;
			background: transparent;
		}
	}
}
</style>
