<template>
	<div id="proportionChart"></div>
</template>
<script>
export default {
	name: "proportionChart",
	props: {
		data: {
			type: Array,
		},
	},
	data() {
		return {}
	},
	methods: {
		drawLine() {
			//1.初始化
			let myCharts = this.$echarts.init(
				document.getElementById("proportionChart")
			)
			//2.配置
			let option = {
				color: ["#0071E2", "#CF9C00", "#37CFCD", "#B86DED", "#76E524"],
				legend: {
					left: "center",
					bottom: "bottom",
					textStyle: {
						fontSize: 12, //字体大小
						color: "#ffffff", //字体颜色
						lineHeigt: 12,
					},
					itemWidth: 12,
					itemHeight: 12,
				},
				tooltip: {
					trigger: "item",
					backgroundColor: "rgba(0,0,0,0.5)",
					formatter: function(params) {
						let value = params.value
						return (
							"<div style='color:#fff;'><div>年份:" +
							value[0] +
							"</div><div>保养工单:" +
							value[1] +
							"</div><div>维修工单:" +
							value[2] +
							"</div><div>已完成:" +
							value[3] +
							"</div><div>超期数量:" +
							value[4] +
							"</div><div>比例:" +
							value[5] +
							"</div></div>"
						)
					},
				},
				dataset: {
					source: [
						[
							"product",
							"保养工单",
							"维修工单",
							"已完成",
							"超期数量",
							"比例",
						],
						...this.data.map((_) => [
							_.time,
							_.mnum,
							_.wnum,
							_.end,
							_.overdue,
							_.proportion,
						]),
					],
				},
				xAxis: {
					type: "category",
					axisLabel: {
						show: true,
						textStyle: {
							fontSize: 14, //字体大小
							color: "#ffffff", //字体颜色
						},
					},
				},
				yAxis: {
					splitLine: { show: false },
					axisLabel: {
						show: true,
						textStyle: {
							fontSize: 14, //字体大小
							color: "#ffffff", //字体颜色
						},
					},
				},
				series: [
					{ type: "bar", barWidth: 4 },
					{ type: "bar", barWidth: 4 },
					{ type: "bar", barWidth: 4 },
					{ type: "bar", barWidth: 4 },
					{ type: "bar", barWidth: 4 },
				],
				grid: {
					left: "50px",
					bottom: "50px",
					right: "0px",
					top: "30px",
				},
			}
			//创建图表
			myCharts.setOption(option)
		},
	},
	mounted() {
		//渲染
		this.drawLine()
	},
	watch: {
		data: {
			handler() {
				this.drawLine()
			},
			deep: true,
		},
	},
}
</script>
<style>
#proportionChart {
	width: 100%;
	height: 240px;
	background: #000000;
	margin-top: 10px;
	padding-bottom: 10px;
}
</style>
