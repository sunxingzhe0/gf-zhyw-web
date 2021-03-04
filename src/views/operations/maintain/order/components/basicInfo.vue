<template>
	<div class="basicinfo-detail" v-if="data">
		<div class="basicinfoitem">
			<span class="infolabel">单据号:</span>
			<span> {{ data.no }}</span>
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
		<div class="basicinfoitem">
			<span class="infolabel">创建日期:</span>
			<span> {{ data.time }}</span>
		</div>
		<div class="basicinfoitem">
			<span class="infolabel">主题:</span>
			<span> {{ data.theme }}</span>
		</div>
		<div class="basicinfoitem">
			<span class="infolabel">类型:</span>
			<span> {{ data.type }}</span>
		</div>
		<div class="basicinfoitem">
			<span class="infolabel">级别:</span>
			<span>
				{{
					data.level == 1
						? "低"
						: data.level == 2
						? "中"
						: data.level == 3
						? "高"
						: "-"
				}}</span
			>
		</div>
		<div class="basicinfoitem">
			<span class="infolabel">设备名称:</span>
			<span> {{ data.ename }}</span>
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
			<span class="infolabel">保养内容:</span>
			<span> {{ data.content }}</span>
		</div>
		<div class="basicinfoitem contents">
			<span class="infolabel">保养计划描述:</span>
			<span> {{ data.remark }}</span>
		</div>
		<div class="basicinfoitem">
			<span class="infolabel">任务创建:</span>
			<span>
				{{ data.createuser }}, {{ data.userno }},
				{{ data.userphone }}</span
			>
		</div>
		<div class="basicinfoitem">
			<span class="infolabel">创建时间:</span>
			<span> {{ data.taskCreateTime }}</span>
		</div>
		<div class="basicinfoitem">
			<span class="infolabel">计划完成时间:</span>
			<span> {{ data.completeTime }}</span>
		</div>
	</div>
</template>
<script>
export default {
	name: "basicInfo",
	props: {
		data: {
			type: Object,
		},
	},
}
</script>
<style lang="scss">
.basicinfo-detail {
	width: 100%;
	padding: 20px 20px;
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
</style>
