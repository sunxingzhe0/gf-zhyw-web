<!-- @format -->

<template>
  <div class="charts-box">
    <div id="chart" style="height:240px;width:100%"></div>
    <!-- <ChartsCompt :chartsOptions="chartsOptions" style="height:336px" /> -->
  </div>
</template>
<script>
// import ChartsCompt from "@/components/App/ChartsCompt";
export default {
  name: "chart",
  // components: {
  //   ChartsCompt,
  // },
  data() {
    return {
      chartsOptions: {
        color: ["#0071E3","#CF9C00","#DC44BE"],
        legend: {
          bottom: "0%",
          data: ["出库量", "入库量", "总库存"],
          textStyle: {
            color: "#FFFFFF",
          },
        },
        grid: {
          left: "12%",
          top: "10%",
          bottom: "24%",
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
            name: "出库量",
            type: "bar",
            barWidth: 8,
            // label: {
            //   show: true,
            //   position: "insideRight",
            // },
            data: [320, 302, 301, 334, 390, 330, 320],
          },
          {
            name: "入库量",
            type: "bar",
            barWidth: 8,
            // label: {
            //   show: true,
            //   position: "insideRight",
            // },
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: "总库存",
            type: "bar",
            barWidth: 8,
            // label: {
            //   show: true,
            //   position: "insideRight",
            // },
            data: [220, 182, 191, 234, 290, 330, 310],
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
      let myCharts = this.$echarts.init(document.getElementById("chart"));
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
  // margin-bottom: 10px;
}
</style>
