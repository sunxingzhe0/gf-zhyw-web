<template>
	<div class="repairContent" v-loading="loading" v-if="data">
		<div class="basicinfoitem">
			<span class="infolabel">报修主题:</span>
			<span> {{ data.title }}</span>
		</div>
		<div class="basicinfoitem">
			<span class="infolabel">报修人:</span>
			<span>
				{{ data.repairName }}，{{ data.repairNo }}，{{
					data.repairPhone
				}}</span
			>
		</div>
		<div class="basicinfoitem">
			<span class="infolabel">报修科室:</span>
			<span> {{ data.repairDept }}</span>
		</div>
		<div class="basicinfoitem">
			<span class="infolabel">报修时间:</span>
			<span> {{ data.repairTime }}</span>
		</div>
		<div class="basicinfoitem">
			<span class="infolabel">关联保养记录:</span>
			<span> {{ data.record }}</span>
		</div>
		<div class="basicinfoitem">
			<span class="infolabel">设备类型:</span>
			<span> {{ data.etype }}</span>
		</div>
		<div class="basicinfoitem">
			<span class="infolabel">所在区域:</span>
			<span> {{ data.area }}</span>
		</div>
		<div class="basicinfoitem">
			<span class="infolabel">设备名称:</span>
			<span> {{ data.ename }}</span>
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
	</div>
</template>
<script>
import maintain from "@/api/operations/maintain"
export default {
	name: "repairContent",
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
		this.data = await maintain.handicap.getDetail({ id: this.id })
		this.loading = false
	},
}
</script>
<style lang="scss">
.repairContent {
	width: 100%;
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
	}
	.content {
		width: 66%;
		text-overflow: ellipsis;
	}
}
</style>
