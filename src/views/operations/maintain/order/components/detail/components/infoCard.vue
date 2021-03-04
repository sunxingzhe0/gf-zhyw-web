<template>
	<div class="card-info" v-if="data">
		<div class="title">{{ data.title }}</div>
		<div class="basicinfo-cardinfo">
			<template v-for="(item, index) in data.data">
				<div
					:class="
						item.ishang ? 'basicinfoitem content' : 'basicinfoitem'
					"
					:key="index"
				>
					<span class="infolabel">{{ item.label }}:</span>
					<span v-if="item.alternatives">{{
						item.alternatives.map((i) => {
							if (i.value == item.value) {
								return i.label
							}
						})[Number(Number(item.value) - 1)]
					}}</span>
					<div
						class="score"
						v-else-if="
							item.isscore && typeof item.value == 'object'
						"
					>
						<div class="rate-info" v-if="item.value[0].value == 1">
							<div class="text">不满意</div>
							<div class="fraction">1.0</div>
						</div>
						<div class="rate-info" v-if="item.value[0].value == 2">
							<div class="text">一般</div>
							<div class="fraction">2.0</div>
						</div>
						<div class="rate-info" v-if="item.value[0].value == 3">
							<div class="text">满意</div>
							<div class="fraction">3.0</div>
						</div>
						<div class="rate-info" v-if="item.value[0].value == 4">
							<div class="text">比较满意</div>
							<div class="fraction">4.0</div>
						</div>
						<div class="rate-info" v-if="item.value[0].value == 5">
							<div class="text">非常满意</div>
							<div class="fraction">5.0</div>
						</div>
						<el-rate
							v-model="item.value[0].value"
							disabled
						></el-rate>
						<div class="remark">{{ item.value[1].value }}</div>
					</div>
					<span v-else>
						{{ item.value ? item.value : "-"
						}}{{ item.company ? item.company : "" }}</span
					>
				</div>
			</template>
		</div>
	</div>
</template>
<script>
export default {
	name: "infoCard",
	props: {
		data: {
			type: Object,
		},
	},
}
</script>
<style lang="scss">
.card-info {
	.title {
		font-size: 16px;
		font-weight: 500;
		color: #fff;
		position: relative;
		padding-left: 10px;
		line-height: 16px;
		&::before {
			content: "";
			position: absolute;
			left: 0;
			top: 0px;
			width: 2px;
			height: 16px;
			background: #0071e3;
		}
	}
	.basicinfo-cardinfo {
		width: 100%;
		padding-top: 20px;
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
				vertical-align: top;
			}
			.index {
				margin-right: 10px;
			}
		}
		.content {
			width: 100%;
			white-space: normal;
			line-height: 25px;
		}
		.score {
			display: inline-block;
			.rate-info {
				width: 100px;
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
				width: 20%;
				margin-top: 10px;
				display: inline-block;
			}
		}
	}
}
</style>
