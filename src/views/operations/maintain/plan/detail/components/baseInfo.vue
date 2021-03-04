<template>
	<div class="planinfo-main" v-loading="loading">
		<div class="basicinfo" v-if="baseInfo">
			<div class="basicinfoitem">
				<span class="infolabel">计划名称:</span>
				<span> {{ baseInfo.name }}</span>
			</div>
			<div class="basicinfoitem">
				<span class="infolabel">计划编号:</span>
				<span> {{ baseInfo.id }}</span>
			</div>
			<div class="basicinfoitem">
				<span class="infolabel">维护部门:</span>
				<span> {{ baseInfo.dept }}</span>
			</div>
			<div class="basicinfoitem">
				<span class="infolabel">执行人:</span>
				<span> {{ baseInfo.executor }}</span>
			</div>
			<div class="basicinfoitem">
				<span class="infolabel">状态:</span>
				<span> {{ baseInfo.status ? "启用" : "停用" }}</span>
			</div>
			<div class="basicinfoitem">
				<span class="infolabel">创建人:</span>
				<span> {{ baseInfo.createuserName }}</span>
			</div>
			<div class="basicinfoitem">
				<span class="infolabel">创建时间:</span>
				<span> {{ baseInfo.createTime }}</span>
			</div>
			<div class="basicinfoitem contents">
				<span class="infolabel">保养规则:</span>
				<span>
					<div v-for="(item, index) in baseInfo.mrules" :key="index">
						{{ getrule(item, index) }}
					</div>
				</span>
			</div>
			<div class="basicinfoitem more">
				<span class="infolabel"
					>关联设备 ({{ equipments.length }}):</span
				>
				<span>
					<equipments :equipments="equipments"></equipments>
				</span>
			</div>
		</div>
	</div>
</template>
<script>
import maintain from "@/api/operations/maintain"
import equipments from "./equipments"
export default {
	data() {
		return {
			baseInfo: null,
			equipments: [],
			loading: false,
		}
	},
	components: {
		equipments,
	},
	mounted() {
		let planId = this.$route.query.planId
		if (planId) {
			this.getBaseInfo(planId)
			this.getEquipments(planId)
		}
	},
	methods: {
		// 获取计划基本信息
		async getBaseInfo(planId) {
			this.loading = true
			this.baseInfo = await maintain.plan.detail.getPlanInfo({
				planid: planId,
			})
			this.loading = false
		},
		getrule(item, index) {
			let text = index + 1 + "."
			if (item.value.id == "a") {
				text += "保养周期: " + item.value.cycle + item.value.company
			} else if (item.value.id == "b") {
				text +=
					"保养后运行: " +
					item.value.hour +
					"小时, 初始化时间为" +
					item.value.initialization
			} else if (item.value.id == "c") {
				text += "累积运行: " + item.value.accumulate + "小时"
			}
			return text
		},
		//关联设备
		async getEquipments(planId) {
			this.equipments = await maintain.plan.detail.getEquipmentTree({
				planid: planId,
			})
		},
	},
}
</script>
<style lang="scss">
.planinfo-main {
	.basicinfo {
		width: 100%;
		.basicinfoitem {
			width: 33.3%;
			display: inline-block;
			font-size: 14px;
			color: #fff;
			margin-bottom: 20px;
			overflow: hidden;
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
			display: flex;
			span:last-child {
				flex: 1;
				div {
					line-height: 22px;
				}
			}
		}
		.more {
			width: 100%;
			& > span:last-child {
				width: 100%;
				padding-left: 55px;
				display: block;
			}
		}
	}
}
</style>
