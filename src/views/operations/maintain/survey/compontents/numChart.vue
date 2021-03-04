<template>
	<div id="box"></div>
</template>
<script>
export default {
	name: "numChart",
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
			let myCharts = this.$echarts.init(document.getElementById("box"))
			//2.配置
			let option = {
				color: ["#0071E2", "#CF9C00"],
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
							"<div style='color:#fff;'><div>类型:" +
							value[0] +
							"</div><div>设备数量:" +
							value[1] +
							"</div><div>保养数量:" +
							value[2] +
							"</div></div>"
						)
					},
				},
				dataset: {
					source: [
						["product", "设备数量", "保养数量"],
						...this.data.map((_) => [_.ename, _.enum, _.mnum]),
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
					{ type: "bar", barWidth: 8 },
					{ type: "bar", barWidth: 8 },
				],
				grid: {
					left: "40px",
					bottom: "50px",
					right: "20px",
					top: "20px",
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
#box {
	width: 100%;
	height: 240px;
	background: #000000;
	padding-bottom: 10px;
}
</style>
