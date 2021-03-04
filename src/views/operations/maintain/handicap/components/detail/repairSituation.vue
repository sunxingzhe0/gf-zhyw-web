<template>
	<div class="repairContent" v-loading="loading" v-if="data">
		<div class="distribute">
			<template v-for="(item, index) in data.distribute">
				<div :key="index" class="template-main">
					<div class="basicinfoitem">
						<span class="infolabel">执行人:</span>
						<span>
							{{ item.name }}，{{ item.no }}，{{
								item.phone
							}}</span
						>
					</div>
					<div class="basicinfoitem" :key="index">
						<span class="infolabel">所属部门:</span>
						<span> {{ item.dept }}</span>
					</div>
				</div>
			</template>
		</div>
		<div class="assist">
			<template v-for="(item, indexs) in data.assist">
				<div :key="indexs" class="template-main">
					<div class="basicinfoitem">
						<span class="infolabel">协助人:</span>
						<span>
							{{ item.name }}，{{ item.no }}，{{
								item.phone
							}}</span
						>
					</div>
					<div class="basicinfoitem">
						<span class="infolabel">所属部门:</span>
						<span> {{ item.dept }}</span>
					</div>
				</div>
			</template>
		</div>
		<div class="basicinfoitem content">
			<span class="infolabel">维修时间:</span>
			<span> {{ data.repairTime }}</span>
		</div>
		<div class="basicinfoitem contents">
			<span class="infolabel">报修内容:</span>
			<span>
				{{ data.repairContent }}
				<div class="info-img">
					<div v-for="(item, index) in data.filelist" :key="index">
						<img :src="item.url" />
					</div>
				</div>
			</span>
		</div>
		<div class="basicinfoitem contents">
			<span class="infolabel">评价内容:</span>
			<span>
				<div class="score">
					<div class="rate-info" v-if="data.evaluate.score == 1">
						<div class="text">不满意</div>
						<div class="fraction">1.0</div>
					</div>
					<div class="rate-info" v-if="data.evaluate.score == 2">
						<div class="text">一般</div>
						<div class="fraction">2.0</div>
					</div>
					<div class="rate-info" v-if="data.evaluate.score == 3">
						<div class="text">满意</div>
						<div class="fraction">3.0</div>
					</div>
					<div class="rate-info" v-if="data.evaluate.score == 4">
						<div class="text">比较满意</div>
						<div class="fraction">4.0</div>
					</div>
					<div class="rate-info" v-if="data.evaluate.score == 5">
						<div class="text">非常满意</div>
						<div class="fraction">5.0</div>
					</div>
					<el-rate
						class="rate-score"
						v-model="data.evaluate.score"
						disabled
					></el-rate>
					<div class="time">{{ data.evaluate.time }}</div>
					<div class="remark">{{ data.evaluate.remark }}</div>
				</div>
			</span>
		</div>
	</div>
</template>
<script>
import maintain from "@/api/operations/maintain"
export default {
	name: "repairSituation",
	data() {
		return {
			data: null,
			loading: true,
		}
	},
	props: {
		id: {
			type: String,
			default: "",
		},
	},
	async created() {
		this.data = await maintain.handicap.getRepairSituation({ id: this.id })
		this.loading = false
	},
}
</script>
<style lang="scss">
.repairContent {
	width: 100%;
	.distribute,
	.assist {
		.template-main {
			width: 66.6%;
			display: flex;
		}
	}
	.basicinfoitem {
		width: 50%;
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
		display: flex;
		.infolabel {
			width: 90px;
		}
		.info-img {
			display: flex;
			flex-wrap: wrap;
			width: 100%;
			margin-top: 10px;
			div {
				width: 71.4px;
				height: 71.4px;
				background: rgba(0, 0, 0, 0.5);
				border: 1px solid #0071e3;
				margin-right: 10px;
				img {
					width: 100%;
					height: 100%;
				}
			}
			div:nth-of-type(7n) {
				margin: 0;
			}
		}
		.score {
			display: inline-block;
			.rate-info {
				width: 120px;
				color: #e89c17;
				float: left;
				line-height: 20px;
				div {
					display: inline-block;
					margin-right: 20px;
					height: 14px;
					line-height: 14px;
				}
			}
			.remark {
				width: 100%;
				margin-top: 10px;
				display: inline-block;
			}
			.time {
				width: 140px;
				float: left;
				margin-left: 14%;
			}
			.rate-score {
				float: left;
			}
		}
	}
	.content {
		width: 100%;
		overflow: none;
		white-space: normal;
	}
}
</style>
