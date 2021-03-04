<template>
	<div class="base-info" v-if="baseInfo">
		<div class="title">被服信息</div>
		<div class="basicinfo" v-if="baseInfo.basicInfo">
			<div class="content-item">
				<div class="img">
					<div>
						<img :src="baseInfo.basicInfo.url" />
					</div>
					<div class="btns">
						<el-button type="text">下载</el-button>
						<el-button type="text">打印</el-button>
					</div>
				</div>
			</div>
			<div class="basicinfoitem">
				<span class="infolabel">被服编号:</span>
				<span>
					{{
						baseInfo.basicInfo.no ? baseInfo.basicInfo.no : "-"
					}}</span
				>
			</div>
			<div class="basicinfoitem">
				<span class="infolabel">被服名称:</span>
				<span>
					{{
						baseInfo.basicInfo.name ? baseInfo.basicInfo.name : "-"
					}}</span
				>
			</div>
			<div class="basicinfoitem">
				<span class="infolabel">规格型号:</span>
				<span>
					{{
						baseInfo.basicInfo.specification
							? baseInfo.basicInfo.specification
							: "-"
					}}码</span
				>
			</div>
			<div class="basicinfoitem">
				<span class="infolabel">被服类别:</span>
				<span>
					{{
						baseInfo.basicInfo.category == "1"
							? "智能资产"
							: baseInfo.basicInfo.category == "0"
							? "非智能资产"
							: "-"
					}}</span
				>
			</div>
			<div class="basicinfoitem">
				<span class="infolabel">被服类型：</span>
				<span>
					{{
						baseInfo.basicInfo.typeName
							? baseInfo.basicInfo.typeName
							: "-"
					}}</span
				>
			</div>
			<div class="basicinfoitem">
				<span class="infolabel">使用部门：</span>
				<span>
					{{
						baseInfo.basicInfo.usedDept
							? baseInfo.basicInfo.usedDept
							: "-"
					}}</span
				>
			</div>
			<div class="basicinfoitem">
				<span class="infolabel">管理负责人：</span>
				<span>
					{{
						baseInfo.basicInfo.chargeP
							? baseInfo.basicInfo.chargeP
							: "-"
					}}</span
				>
			</div>
			<div class="basicinfoitem">
				<span class="infolabel">管理部门：</span>
				<span>
					{{
						baseInfo.basicInfo.managementDept
							? baseInfo.basicInfo.managementDept
							: "-"
					}}</span
				>
			</div>
			<div class="basicinfoitem">
				<span class="infolabel">被服条码：</span>
				<span>
					{{
						baseInfo.basicInfo.barCode
							? baseInfo.basicInfo.barCode
							: "-"
					}}</span
				>
			</div>
			<div class="basicinfoitem">
				<span class="infolabel">RFID：</span>
				<span>
					{{
						baseInfo.basicInfo.RFID ? baseInfo.basicInfo.RFID : "-"
					}}</span
				>
			</div>
			<div class="basicinfoitem">
				<span class="infolabel">供应商：</span>
				<span>
					{{
						baseInfo.basicInfo.supplier
							? baseInfo.basicInfo.supplier
							: "-"
					}}</span
				>
			</div>
			<div class="basicinfoitem">
				<span class="infolabel">合同编号：</span>
				<span>
					{{
						baseInfo.basicInfo.contractNo
							? baseInfo.basicInfo.contractNo
							: "-"
					}}</span
				>
			</div>
			<div class="basicinfoitem">
				<span class="infolabel">最近一次洗涤时间：</span>
				<span>
					{{
						baseInfo.basicInfo.lastWashingTime
							? baseInfo.basicInfo.lastWashingTime
							: "-"
					}}</span
				>
			</div>
			<div class="basicinfoitem">
				<span class="infolabel">累积洗涤次数：</span>
				<span>
					{{
						baseInfo.basicInfo.cumulativeWashing
							? baseInfo.basicInfo.cumulativeWashing + "次"
							: "-"
					}}</span
				>
			</div>
			<div class="basicinfoitem">
				<span class="infolabel">累计洗涤费用：</span>
				<span>
					{{
						baseInfo.basicInfo.accumulatedWashing
							? baseInfo.basicInfo.accumulatedWashing + "元"
							: "-"
					}}</span
				>
			</div>
		</div>
		<div class="title">资产信息</div>
		<div class="basicinfo" v-if="baseInfo.assetInfo">
			<div class="basicinfoitem">
				<span class="infolabel">资产编号:</span>
				<span>
					{{
						baseInfo.assetInfo.assetNo
							? baseInfo.assetInfo.assetNo
							: "-"
					}}</span
				>
			</div>
			<div class="basicinfoitem">
				<span class="infolabel">启用日期:</span>
				<span>
					{{
						baseInfo.assetInfo.usedTime
							? baseInfo.assetInfo.usedTime
							: "-"
					}}</span
				>
			</div>
			<div class="basicinfoitem">
				<span class="infolabel">使用状态:</span>
				<span>
					{{
						baseInfo.assetInfo.status == 1
							? "闲置"
							: baseInfo.assetInfo.status == 2
							? "在用"
							: baseInfo.assetInfo.status == 3
							? "报废"
							: "-"
					}}</span
				>
			</div>
			<div class="basicinfoitem">
				<span class="infolabel">资产原值:</span>
				<span>
					{{
						baseInfo.assetInfo.originalValue
							? baseInfo.assetInfo.originalValue
							: "-"
					}}</span
				>
			</div>
			<div class="basicinfoitem">
				<span class="infolabel">资产原值:</span>
				<span>
					{{
						baseInfo.assetInfo.originalValue
							? baseInfo.assetInfo.originalValue + "元"
							: "-"
					}}</span
				>
			</div>
			<div class="basicinfoitem">
				<span class="infolabel">资产赋值:</span>
				<span>
					{{
						baseInfo.assetInfo.assignment
							? baseInfo.assetInfo.assignment + "元"
							: "-"
					}}</span
				>
			</div>
			<div class="basicinfoitem">
				<span class="infolabel">折扣方法:</span>
				<span>
					{{
						baseInfo.assetInfo.discountMethod
							? baseInfo.assetInfo.discountMethod
							: "-"
					}}</span
				>
			</div>
			<div class="basicinfoitem">
				<span class="infolabel">折扣率(%):</span>
				<span>
					{{
						baseInfo.assetInfo.discountRate
							? baseInfo.assetInfo.discountRate
							: "-"
					}}</span
				>
			</div>
			<div class="basicinfoitem">
				<span class="infolabel">折扣年限:</span>
				<span>
					{{
						baseInfo.assetInfo.discountPeriod
							? baseInfo.assetInfo.discountPeriod
							: "-"
					}}</span
				>
			</div>
		</div>
		<div class="title">厂家信息</div>
		<div class="basicinfo" v-if="baseInfo.factoryInfo">
			<div class="basicinfoitem">
				<span class="infolabel">生产厂商：</span>
				<span>
					{{
						baseInfo.factoryInfo.manufacturer
							? baseInfo.factoryInfo.manufacturer
							: "-"
					}}</span
				>
			</div>
			<div class="basicinfoitem">
				<span class="infolabel">出厂日期：</span>
				<span>
					{{
						baseInfo.factoryInfo.productionDate
							? baseInfo.factoryInfo.productionDate
							: "-"
					}}</span
				>
			</div>
			<div class="basicinfoitem">
				<span class="infolabel">联系人:</span>
				<span>
					{{
						baseInfo.factoryInfo.contacts
							? baseInfo.factoryInfo.contacts
							: "-"
					}}</span
				>
			</div>
			<div class="basicinfoitem">
				<span class="infolabel">联系方式:</span>
				<span>
					{{
						baseInfo.factoryInfo.contactInformation
							? baseInfo.factoryInfo.contactInformation
							: "-"
					}}</span
				>
			</div>
			<div class="basicinfoitem">
				<span class="infolabel">联系地址:</span>
				<span>
					{{
						baseInfo.factoryInfo.contactAddress
							? baseInfo.factoryInfo.contactAddress
							: "-"
					}}</span
				>
			</div>
		</div>
		<div class="title">被服图片</div>
		<div class="pictures" v-if="baseInfo.pictures">
			<div
				v-for="(file, index) in baseInfo.pictures"
				:key="index"
				class="img-item"
			>
				<img
					class="el-upload-list__item-thumbnail"
					:src="file.url"
					alt=""
				/>
				<span class="el-upload-list__item-actions">
					<i class="el-icon-zoom-in" @click="show(index)"></i>
				</span>
			</div>
		</div>
		<div class="title">档案</div>
		<div class="pictures" v-if="baseInfo.archives">
			<div
				v-for="(file, index) in baseInfo.archives"
				:key="index"
				class="img-item"
			>
				<img
					class="el-upload-list__item-thumbnail"
					:src="file.url"
					alt=""
				/>
				<span class="el-upload-list__item-actions">
					<i class="el-icon-zoom-in" @click="show(index)"></i>
				</span>
			</div>
		</div>
		<div class="title">当前注册信息</div>
		<div class="basicinfo" v-if="baseInfo.registerInfo">
			<div class="basicinfoitem">
				<span class="infolabel">使用人：</span>
				<span>
					{{
						baseInfo.registerInfo.usedUser
							? baseInfo.registerInfo.usedUser
							: "-"
					}}</span
				>
			</div>
			<div class="basicinfoitem">
				<span class="infolabel">使用部门：</span>
				<span>
					{{
						baseInfo.registerInfo.usedDept
							? baseInfo.registerInfo.usedDept
							: "-"
					}}</span
				>
			</div>
			<div class="basicinfoitem">
				<span class="infolabel">注册时间：</span>
				<span>
					{{
						baseInfo.registerInfo.registerTime
							? baseInfo.registerInfo.registerTime
							: "-"
					}}</span
				>
			</div>
		</div>
		<div class="title">全生命周期</div>
		<div class="time-line" v-if="baseInfo.lifeCycles">
			<el-timeline placement="top">
				<el-timeline-item
					v-for="(item, index) in baseInfo.lifeCycles"
					:key="index"
					:timestamp="item.time"
					color="#0071e3"
				>
					{{ item.content }}
				</el-timeline-item>
			</el-timeline>
		</div>
	</div>
</template>
<script>
/*
@author        cui
@name          
@desc          被服基本信息
@query         
@props         baseInfo    object    被服基本信息
@emit           
*/
export default {
	props: {
		baseInfo: Object,
	},
	methods: {
		show() {},
	},
}
</script>
<style lang="scss">
.base-info {
	height: 500px;
	overflow-y: auto;
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
	.basicinfo {
		width: 100%;
		padding: 0px 20px;
		.content-item {
			float: left;
			width: 33.3%;
			color: #fff;
			font-size: 14px;
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
		.basicinfoitem {
			width: 33.3%;
			display: inline-block;
			font-size: 14px;
			color: #fff;
			margin-bottom: 20px;
			overflow: hidden;
			white-space: nowrap;
			.infolabel {
				margin-right: 10px;
			}
			.index {
				margin-right: 10px;
			}
		}
		.contents {
			width: 100%;
			overflow: none;
			white-space: normal;
		}
	}
	.pictures {
		display: flex;
		flex-wrap: wrap;
		padding: 0px 20px;
		.img-item {
			width: 100px;
			height: 74px;
			background: #ffffff;
			border: 1px solid #0071e3;
			margin-right: 20px;
			position: relative;
			img {
				width: 100%;
				height: 100%;
			}
			.el-upload-list__item-actions {
				position: absolute;
				width: 100%;
				height: 100%;
				left: 0;
				top: 0;
				text-align: center;
				color: #fff;
				opacity: 0;
				font-size: 20px;
				background-color: rgba(0, 0, 0, 0.8);
				// transition: opacity 0.3s;
				display: flex;
				align-items: center;
				justify-content: center;
			}
			&:hover {
				.el-upload-list__item-actions {
					opacity: 1;
					i {
						font-size: 20px;
						color: #0071e3;
						cursor: pointer;
					}
				}
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
.base-info::-webkit-scrollbar {
	/*滚动条整体样式*/
	width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
	height: 1px;
}
.base-info::-webkit-scrollbar-thumb {
	/*滚动条里面小方块*/
	border-radius: 10px;
	box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
	background: #535353;
}
.base-info::-webkit-scrollbar-track {
	/*滚动条里面轨道*/
	box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
	border-radius: 10px;
	background: transparent;
}
</style>
