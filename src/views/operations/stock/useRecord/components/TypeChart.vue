<!-- @format -->

<template>
  <div class="charts-box">
    <div id="TypeChart" style="height:227px;width:100%"></div>
    <!-- <ChartsCompt :chartsOptions="chartsOptions" style="height:336px" /> -->
  </div>
</template>
<script>
// import ChartsCompt from "@/components/App/ChartsCompt";
export default {
  name: "TypeChart",
  // components: {
  //   ChartsCompt,
  // },
  data() {
    return {
      chartsOptions: {
        color: ["#0071E2"],
        // legend: {
        //   bottom: "0%",
        //   data: ["电器", "工具", "其他"],
        //   textStyle: {
        //     color: "#FFFFFF",
        //   },
        // },
        grid: {
          left: "12%",
          top: "10%",
          bottom: "10%",
          right: "3%",
        },
        xAxis: {
          // type: "category",
          data: [
            "设备类型1",
            "设备类型2",
            "设备类型3",
            "设备类型4",
            "设备类型5",
            "设备类型6",
          ],
          axisLabel: {
            show: false,
            // textStyle: {
            //   fontSize: 10, //字体大小
            //   color: "#ffffff", //字体颜色
            // },
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
            name: "总量",
            type: "bar",
            // stack: "总量",
             barMaxWidth: 20,
            // label: {
            //   show: true,
            //   position: "insideRight",
            // },
            data: [320, 302, 200, 320, 120, 600],
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
      let myCharts = this.$echarts.init(document.getElementById("TypeChart"));
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
