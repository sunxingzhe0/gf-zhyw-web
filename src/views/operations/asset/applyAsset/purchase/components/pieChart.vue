<template>
	<div id="purchasePie"></div>
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
				document.getElementById("purchasePie")
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
					orient: "vertical",
					left: "center",
					bottom: "bottom",
					textStyle: {
						fontSize: 14, //字体大小
						color: "#ffffff", //字体颜色
						lineHeigt: 14,
					},
					itemWidth: 14,
					itemHeight: 14,
					data: ["待采买", "采买中", "已采买"],
				},
				series: [
					{
						name: "访问来源",
						type: "pie",
						radius: "70%",
						center: ["50%", "50%"],
						data: [
							...this.data.map((_) => ({
								value: _.value,
								name: _.name,
							})),
						],
						label: {
							show: false,
							position: "center",
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
#purchasePie {
	width: 100%;
	height: 274px;
	margin-top: 10px;
	background: transparent;
	padding-bottom: 10px;
}
</style>
