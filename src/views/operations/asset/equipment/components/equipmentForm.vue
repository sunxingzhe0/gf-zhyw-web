<template>
	<div class="equipment-form">
		<div class="form-item" v-loading="loading">
			<basicInfo ref="basicInfo" :id="id"></basicInfo>
			<maintain-info ref="minfo"></maintain-info>
			<indexs :indexs="indexs" ref="indexs"></indexs>
			<assetInfo :id="id" ref="assetInfo"></assetInfo>
			<factoryInfo ref="factoryInfo"></factoryInfo>
			<positionInfo ref="positionInfo"></positionInfo>
			<pictureForm :id="id" ref="pictureForm"></pictureForm>
			<archives :id="id" ref="archives"></archives>
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
/*
@author
@name
@desc          设备表单
@query
@props         id          string                          设备id
@emit          submit      function(params null)           表单提交
*/
import {
	basicInfo,
	assetInfo,
	factoryInfo,
	positionInfo,
	pictureForm,
	archives,
	MaintainInfo,
	indexs,
} from "./form/index"
import asset from "@/api/operations/asset"
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
		positionInfo,
		pictureForm,
		archives,
		MaintainInfo,
		indexs,
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
	data() {
		return {
			indexs: [],
			loading: false,
		}
	},
	methods: {
		async sumbit() {
			const p1 = new Promise((resolve) => {
				this.$refs["basicInfo"].$refs["basicinfo-ruleForm"].validate(
					(valid) => {
						if (valid) resolve()
					}
				)
			})
			const p2 = new Promise((resolve) => {
				this.$refs["minfo"].$refs["maintainInfo"].validate((valid) => {
					if (valid) resolve()
				})
			})
			Promise.all([p1, p2]).then(async () => {
				await asset.equipment.editEquimpent()
				this.$message.success("操作成功")
				this.$emit("submit")
			})
		},
		back() {
			this.reset()
			this.$emit("submit")
		},
		async getinfo() {
			this.loading = true
			let res = await asset.equipment.getEquipmentInfo({ id: this.id })
			this.basicInfo(res.basicInfo)
			this.assetInfo(res.assetInfo)
			this.factoryInfo(res.factoryInfo)
			this.minfo(res.minfo) //保养信息
			this.$refs["minfo"].rules = ["a", "b", "c"]
			this.positionInfo(res.positionInfo) //点位信息
			this.$refs.pictureForm.pictures = res.pictures //设备图片
			this.$refs.pictureForm.isDown = false
			this.indexs = res.indexs
			//档案
			this.$refs.archives.archives = res.archives
			this.$refs.archives.isDown = false
			this.loading = false
		},
		//重置默认值
		reset() {
			//基本信息
			this.$refs["basicInfo"].$refs["basicinfo-ruleForm"].resetFields()
			//保养信息
			this.$refs["minfo"].forminfo = {
				a: { id: "a", cycle: "", company: "天" },
				b: { id: "b", hour: "", initialization: "" },
				c: { id: "c", accumulate: "" },
			}
			this.$refs["minfo"].rules = []
			//关联指标
			this.indexs = []
			//资产信息
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
			//厂家信息
			this.$refs["factoryInfo"].ruleForm = {
				contacts: "", //联系人
				contactInformation: "", //联系方式
				contactAddress: "", //联系地址
			}
			//点位信息
			this.$refs["positionInfo"].ruleForm = {
				x: "",
				y: "",
			}
			//设备图片
			this.$refs.pictureForm.pictures = []
			this.$refs.pictureForm.isDown = true
			//档案
			this.$refs.archives.archives = []
			this.$refs.archives.isDown = true
		},
		basicInfo(val) {
			//设备信息
			if (val) {
				this.$refs["basicInfo"].ruleForm = {
					no: val.no,
					name: val.name,
					specification: val.specification, //规格型号
					category: val.category, //设备类别
					type: val.type,
					position: val.position, //安装位置
					installTime: val.installTime, //安装时间
					dept: val.dept, //所属部门
					chargeP: val.chargeP, //负责人
					managementDept: val.managementDept, //维护部门
					lastMaintainTime: val.lastMaintainTime, //最后一次保养时间
					afterRepairOperation: val.afterRepairOperation, //检修后运行
					cumulativeOperation: val.cumulativeOperation, //累积运行
					isSpecial: val.isSpecial, //是否是特种设备
					barCode: val.barCode, //条码
					supplier: val.supplier, //供应商
					contractNo: val.contractNo, //合同编号
					parent: val.parent, //上级设备
					RFID: val.RFID, //设备RFID
					ip: val.ip, //设备IP
				}
			}
		},
		assetInfo(val) {
			//资产信息
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
			//厂家信息
			if (val) {
				this.$refs["factoryInfo"].ruleForm = {
					manufacturer: val.manufacturer, //生产厂商
					productionDate: val.productionDate, //生产厂商
					contacts: val.contacts, //联系人
					contactInformation: val.contactInformation, //联系方式
					contactAddress: val.contactAddress, //联系地址
				}
			}
		},
		//保养信息
		minfo(val) {
			if (val) {
				this.$refs["minfo"].forminfo = {
					a: {
						id: "a",
						cycle: val.a.cycle,
						company: val.a.company,
						level: val.a.level,
					},
					b: {
						id: "b",
						hour: val.b.hour,
						initialization: val.b.initialization,
						level: val.a.level,
					},
					c: {
						id: "c",
						accumulate: val.c.accumulate,
						level: val.a.level,
					},
				}
			}
		},
		//点位信息
		positionInfo(val) {
			if (val) {
				this.$refs["positionInfo"].ruleForm = {
					x: val.x,
					y: val.y,
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
