<!-- @format -->

<template>
  <div class="charts-box">
    <div id="dateChart" style="height:227px;width:100%"></div>
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
        // color: ["#0071E2","#CF9C00"],
        legend: {
          bottom: "0%",
          data: ["电器", "工具", "其他"],
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
            name: "电器",
            type: "bar",
            stack: "总量",
            barWidth: 8,
            // label: {
            //   show: true,
            //   position: "insideRight",
            // },
            data: [320, 302, 301, 334, 390, 330, 320],
          },
          {
            name: "工具",
            type: "bar",
            stack: "总量",
            barWidth: 8,
            // label: {
            //   show: true,
            //   position: "insideRight",
            // },
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: "其他",
            type: "bar",
            stack: "总量",
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
  margin-bottom: 10px;
}
</style>
