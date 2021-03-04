<template>
	<div class="handicap-detail" v-loading="loading">
		<div class="basicinfo" v-if="data">
			<div class="basicinfoitem">
				<span class="infolabel">单据号:</span>
				<span> {{ data.no }}</span>
			</div>
			<div class="basicinfoitem">
				<span class="infolabel">创建日期:</span>
				<span> {{ data.time }}</span>
			</div>
			<div class="basicinfoitem">
				<span class="infolabel">单据状态:</span>
				<span>
					{{
						data.status == 1
							? "待处理"
							: data.status == 2
							? "待接单"
							: data.status == 3
							? "进行中"
							: data.status == 4
							? "挂起中"
							: data.status == 5
							? "待审核"
							: data.status == 6
							? "待评价"
							: data.status == 7
							? "已完成"
							: ""
					}}</span
				>
			</div>
		</div>
		<div class="dialognav">
			<div class="tabs-header">
				<template v-for="(item, index) in navs">
					<div
						:class="
							item.name == activeName
								? 'tab-item is-active'
								: 'tab-item'
						"
						:key="index"
						@click="handleClick(item.name)"
					>
						{{ item.label }}
					</div>
				</template>
			</div>
			<div class="tabs-content">
				<div v-if="activeName == 'first'" class="tab-pane">
					<repairContent :id="id"></repairContent>
				</div>
				<div v-if="activeName == 'second'" class="tab-pane">
					<repairSituation :id="id"></repairSituation>
				</div>
				<div v-if="activeName == 'third'" class="tab-pane">
					<log :id="id"></log>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import maintain from "@/api/operations/maintain"
import repairContent from "./detail/repairContent"
import repairSituation from "./detail/repairSituation"
import log from "./detail/log"
export default {
	name: "handicapDetail",
	props: {
		id: {
			type: String,
		},
	},
	components: {
		repairContent,
		repairSituation,
		log,
	},
	data() {
		return {
			loading: true,
			data: null,
			navs: [
				{ label: "报修内容", name: "first" },
				{ label: "维修情况", name: "second" },
				{ label: "报修日志", name: "third" },
			],
			activeName: "first",
		}
	},
	async created() {
		this.data = await maintain.order.getBasicinfo({ id: this.id })
		this.loading = false
	},
	methods: {
		handleClick(name) {
			this.activeName = name
		},
	},
}
</script>
<style lang="scss">
.handicap-detail {
	.basicinfo {
		width: 100%;
		padding: 20px 20px;
		padding-bottom: 0px;
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
		.content {
			width: 66%;
			text-overflow: ellipsis;
		}
	}
	.dialognav {
		.tabs-header {
			padding: 0px 20px;
			box-sizing: border-box;
			background: rgba(26, 26, 26, 0.8);
			.tab-item {
				display: inline-block;
				cursor: pointer;
				line-height: 36px;
				color: #fff;
				margin-right: 38px;
			}
			.is-active {
				color: #0071e3;
				position: relative;
				width: auto;
				&::after {
					content: "";
					position: absolute;
					left: 0;
					bottom: 0;
					width: 100%;
					height: 2px;
					background: #0071e3;
				}
			}
		}

		.tab-pane {
			padding: 20px 20px;
			height: 500px;
			overflow-y: auto;
		}
		.tab-pane::-webkit-scrollbar {
			width: 0;
		}
	}
}
</style>
