<template>
	<div class="basic-info-all" v-if="baseInfo" v-loading="loading">
		<div class="basic-info">
			<div class="title">
				<span>设备信息</span>
				<el-button type="text" class="editBtn" @click="edit"
					>编辑</el-button
				>
			</div>
			<div class="basic-content">
				<div class="content-item">
					<div class="img">
						<div>
							<img :src="baseInfo.basicInfo.url" />
						</div>
						<div class="btns">
							<el-button type="text" @click="download"
								>下载</el-button
							>
							<el-button type="text" @click="printing"
								>打印</el-button
							>
						</div>
					</div>
				</div>
				<div class="content-item">
					设备编码：{{ getval(baseInfo.basicInfo.no) }}
				</div>
				<div class="content-item">
					设备名称：{{ getval(baseInfo.basicInfo.name) }}
				</div>
				<div class="content-item">
					规格型号：{{ getval(baseInfo.basicInfo.specification) }}
				</div>
				<div class="content-item">
					上级设备：{{ getval(baseInfo.basicInfo.parent) }}
				</div>
				<div class="content-item">
					设备类别：{{
						getval(baseInfo.basicInfo.category) == "1"
							? "智能设备"
							: "非智能设备"
					}}
				</div>
				<div class="content-item">
					设备类型：{{ getval(baseInfo.basicInfo.type) }}
				</div>
				<div class="content-item">
					安装位置：{{ getval(baseInfo.basicInfo.position) }}
				</div>
				<div class="content-item">
					所属科室：{{ getval(baseInfo.basicInfo.dept) }}
				</div>
				<div class="content-item">
					负责人：{{ getval(baseInfo.basicInfo.chargeP) }}
				</div>
				<div class="content-item">
					维护部门：{{ getval(baseInfo.basicInfo.managementDept) }}
				</div>
				<div class="content-item">
					特种设备：{{
						getval(baseInfo.basicInfo.isSpecial) ? "是" : "否"
					}}
				</div>
			</div>
			<div style="clear: both;"></div>
		</div>
		<div class="matain-info">
			<div class="title">保养信息</div>
			<div class="matain-content">
				<div class="matain-item">
					<div>
						保养周期：{{ baseInfo.minfo.a.cycle
						}}{{ baseInfo.minfo.a.company }}
					</div>
					<div>保养等级：{{ getLevel(baseInfo.minfo.a.level) }}</div>
				</div>
				<div class="matain-item">
					<div>
						保养后运行：{{
							baseInfo.minfo.b.hour
						}}小时，初始化时间为{{
							baseInfo.minfo.b.initialization
						}}
					</div>
					<div>保养等级：{{ getLevel(baseInfo.minfo.b.level) }}</div>
				</div>
				<div class="matain-item">
					<div>累积运行：{{ baseInfo.minfo.c.accumulate }}小时</div>
					<div>保养等级：{{ getLevel(baseInfo.minfo.c.level) }}</div>
				</div>
			</div>
		</div>
		<div class="indexs-infos">
			<div class="title">关联指标</div>
			<div class="indexs-content">
				<span
					class="indexs-item"
					v-for="item in baseInfo.indexs"
					:key="item"
				>
					{{ item }}
				</span>
			</div>
		</div>
		<div class="asset-infos">
			<div class="title">资产信息</div>
			<div class="asset-content">
				<div class="asset-item">
					资产编码：{{ getval(baseInfo.assetInfo.assetNo) }}
				</div>
				<div class="asset-item">
					启用日期：{{ getval(baseInfo.assetInfo.usedTime) }}
				</div>
				<div class="asset-item">
					状态：{{
						getval(baseInfo.assetInfo.status) == "1"
							? "在用"
							: getval(baseInfo.assetInfo.status) == "2"
							? "空闲"
							: "报废"
					}}
				</div>
				<div class="asset-item">
					资产原值：{{ getval(baseInfo.assetInfo.originalValue) }}元
				</div>
				<div class="asset-item">
					资产赋值：{{ getval(baseInfo.assetInfo.assignment) }}元
				</div>
				<div class="asset-item">
					折扣方法：{{
						getval(baseInfo.assetInfo.discountMethod) == "1"
							? "平均年限法"
							: "-"
					}}
				</div>
				<div class="asset-item">
					折扣率：{{ getval(baseInfo.assetInfo.discountRate) }}%
				</div>
				<div class="asset-item">
					折扣年限：{{ getval(baseInfo.assetInfo.discountPeriod) }}年
				</div>
			</div>
		</div>
		<div class="asset-infos">
			<div class="title">厂家信息</div>
			<div class="asset-content">
				<div class="asset-item">
					生产厂商：{{ getval(baseInfo.factoryInfo.manufacturer) }}
				</div>
				<div class="asset-item block">
					出厂日期：{{ getval(baseInfo.factoryInfo.productionDate) }}
				</div>
				<div class="asset-item">
					联系人员：{{ getval(baseInfo.factoryInfo.contacts) }}
				</div>
				<div class="asset-item">
					联系方式：{{
						getval(baseInfo.factoryInfo.contactInformation)
					}}
				</div>
				<div class="asset-item">
					联系地址：{{ getval(baseInfo.factoryInfo.contactAddress) }}
				</div>
			</div>
		</div>
		<div class="asset-infos">
			<div class="title">点位信息</div>
			<div class="asset-content">
				<div class="asset-item">
					GIS坐标：{{ baseInfo.positionInfo.x }}N，{{
						baseInfo.positionInfo.y
					}}S
				</div>
			</div>
		</div>
		<div class="asset-infos">
			<div class="title">设备图片</div>
			<div class="imgs">
				<div
					class="img-item"
					v-for="(item, index) in baseInfo.pictures"
					:key="index"
				>
					<img :src="item.url" />
				</div>
			</div>
		</div>
		<div class="asset-infos">
			<div class="title">档案</div>
			<div class="imgs">
				<div
					class="img-item"
					v-for="(item, index) in baseInfo.archives"
					:key="index"
				>
					<img :src="item.url" />
				</div>
			</div>
		</div>
		<div class="asset-infos">
			<div class="title">全生命周期</div>
			<div class="time-line">
				<el-timeline>
					<el-timeline-item
						v-for="(activity, index) in lifeCycles"
						:key="index"
						:icon="activity.icon"
						:type="activity.type"
						:color="activity.color"
						:size="activity.size"
						:timestamp="activity.timestamp"
					>
						{{ activity.content }}
					</el-timeline-item>
				</el-timeline>
			</div>
		</div>
	</div>
</template>
<script>
import asset from "@/api/operations/asset"
export default {
	data() {
		return {
			lifeCycles: [],
			id: this.$route.query.equipmentId,
			baseInfo: null,
			loading: false,
		}
	},
	created() {
		this.getBaseInfo()
	},
	methods: {
		edit() {
			this.$router.push({
				path: "/operations/asset/equipment/edit",
				query: {
					equipmentId: this.id,
				},
			})
		},
		async printing() {
			await asset.equipment.equipmentPrinting({
				id: this.id,
			})
			this.$message.success("打印成功")
		},
		async download() {
			await asset.equipment.equipmentDownload({
				id: this.id,
			})
			this.$message.success("下载成功")
		},
		// 获取被服基本信息
		async getBaseInfo() {
			this.baseInfo = await asset.equipment.getEquipmentInfo({
				id: this.id,
			})
			this.lifeCycles = this.baseInfo.lifeCycles
			this.loading = false
		},
		getval(val) {
			return val ? val : "-"
		},
		getLevel(val) {
			if (val == "1") {
				return "日常保养"
			} else if (val == "2") {
				return "一级保养"
			} else if (val == "3") {
				return "二级保养"
			} else if (val == "4") {
				return "三级保养"
			} else if (val == "5") {
				return "定期检修"
			} else {
				return "-"
			}
		},
	},
}
</script>
<style lang="scss">
.basic-info-all {
	max-height: 610px;
	overflow-y: auto;
	.title {
		font-size: 16px;
		font-weight: 500;
		color: #fff;
		position: relative;
		padding: 20px 0px;
		padding-left: 10px;
		line-height: 16px;
		margin-left: 20px;
		&::before {
			content: "";
			position: absolute;
			left: 0;
			top: 20px;
			width: 2px;
			height: 16px;
			background: #0071e3;
		}
		.editBtn {
			margin-left: 20px;
			padding: 0px;
		}
	}
	.basic-info {
		.basic-content {
			padding: 0px 20px;
			.content-item {
				float: left;
				width: 33.3%;
				color: #fff;
				font-size: 14px;
				margin-bottom: 20px;
				.img {
					display: flex;
					img {
						width: 116px;
						height: 116px;
						margin-right: 20px;
					}
					.el-button {
						display: block;
						margin: 0px;
					}
					.btns {
						padding-top: 20px;
					}
				}
			}
		}
	}
	.matain-content {
		padding: 0px 20px;
		.matain-item {
			display: flex;
			flex-wrap: wrap;
			div {
				width: 33.3%;
				color: #fff;
				font-size: 14px;
				margin-bottom: 20px;
			}
		}
	}
	.indexs-content {
		margin: 0px 20px;
		padding: 10px;
		background: rgba(26, 26, 26, 0.8);
		.indexs-item {
			display: inline-block;
			background: #333333;
			padding: 7px 10px;
			margin-right: 10px;
			color: #fff;
			font-size: 14px;
		}
	}
	.asset-infos {
		.asset-content {
			padding: 0px 20px;
			display: flex;
			flex-wrap: wrap;
			.asset-item {
				width: 33.3%;
				color: #fff;
				font-size: 14px;
				margin-bottom: 20px;
			}
			.block {
				width: 66.6%;
			}
		}
	}
	.imgs {
		padding: 0px 20px;
		display: flex;
		flex-wrap: wrap;
		.img-item {
			width: 74px;
			height: 74px;
			background: #ffffff;
			border: 1px solid #0071e3;
			margin-right: 20px;
			img {
				width: 100%;
				height: 100%;
			}
		}
	}
	.time-line {
		margin: 0px 20px;
		padding: 20px;
		background: rgba(26, 26, 26, 0.8);
		padding-bottom: 0px;
		.el-timeline {
			margin-left: 120px;
		}
		.el-timeline-item__content {
			color: #fff;
			font-size: 14px;
		}
		.el-timeline-item__node {
			background-color: #0071e3;
		}
		.el-timeline-item__node--normal {
			width: 6px;
			height: 6px;
		}
		.el-timeline-item__tail {
			left: 1px;
			border-left: 2px solid #333333;
		}
		.el-timeline-item__timestamp {
			color: #fff;
			font-size: 14px;
			position: absolute;
			left: -160px;
			top: 0px;
			margin-top: 0px;
		}
	}
}
.basic-info-all::-webkit-scrollbar {
	/*滚动条整体样式*/
	width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
	height: 1px;
}
.basic-info-all::-webkit-scrollbar-thumb {
	/*滚动条里面小方块*/
	border-radius: 10px;
	box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
	background: #535353;
}
.basic-info-all::-webkit-scrollbar-track {
	/*滚动条里面轨道*/
	box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
	border-radius: 10px;
	background: transparent;
}
</style>
