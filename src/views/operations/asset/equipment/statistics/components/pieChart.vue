<template>
	<div id="type-piechart"></div>
</template>
<script>
export default {
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
				document.getElementById("type-piechart")
			)
			//2.配置
			let option = {
				color: ["#0071E2", "#37CFCD", "#E88729"],
				tooltip: {
					trigger: "item",
					formatter: "{b} <br/> {c} ({d}%)",
					backgroundColor: "rgba(0,0,0,0.5)",
					textStyle: {
						color: "#fff",
					},
				},
				legend: {
					show: false,
					data: [...this.data.map((_) => _.name)],
				},
				series: [
					{
						name: "访问来源",
						type: "pie",
						radius: "70%",
						center: ["50%", "50%"],
						data: [
							...this.data.map((_) => ({
								value: _.clothingNum,
								name: _.name,
							})),
						],
						emphasis: {
							itemStyle: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: "rgba(0, 0, 0, 0.5)",
							},
						},
					},
				],
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
#type-piechart {
	width: 100%;
	height: 274px;
	margin-top: 10px;
	background: transparent;
	padding-bottom: 10px;
}
</style>
