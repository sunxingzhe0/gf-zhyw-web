<!-- @format -->

<template>
  <div class="charts-box">
    <div id="dateChart" style="height:336px;width:100%"></div>
    <!-- <ChartsCompt :chartsOptions="chartsOptions" style="height:336px" /> -->
  </div>
</template>
<script>
// import ChartsCompt from "@/components/App/ChartsCompt";
export default {
  name: "dateChart",
  // components: {
  //   ChartsCompt,
  // },
  data() {
    return {
      chartsOptions: {
        color: ["#0071E2"],
        grid: {
          left: "12%",
          top: "10%",
          bottom: "15%",
          right: "3%",
        },
        xAxis: {
          type: "category",
          data: [
            "2020\n12/14",
            "2020\n12/15",
            "2020\n12/16",
            "2020\n12/17",
            "2020\n12/18",
            "2020\n12/19",
            "2020\n12/20",
          ],
          axisLabel: {
            show: true,
            textStyle: {
              fontSize: 10, //字体大小
              color: "#ffffff", //字体颜色
            },
          },
        },
        yAxis: {
          type: "value",
          splitLine: {
            show: false,
          },
          axisLabel: {
            show: true,
            textStyle: {
              fontSize: 12, //字体大小
              color: "#ffffff", //字体颜色
            },
          },
        },
        tooltip: {
          trigger: "axis",
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
            smooth: true,
            areaStyle: {
              color: "rgba(0, 113, 227, 0.2)",
            },
            symbolSize: 1,
            lineStyle: {
              width: 2,
            },
          },
        ],
      },
    };
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      //1.初始化
      let myCharts = this.$echarts.init(document.getElementById("dateChart"));
      //2.配置
      let option = this.chartsOptions;

      //创建图表
      myCharts.setOption(option);
    },
  },
};
</script>
<style lang="scss" scoped>
.charts-box {
  // padding: 10px;
  background: rgba(0, 0, 0, 0.6);
  margin-bottom: 20px;
}
</style>
