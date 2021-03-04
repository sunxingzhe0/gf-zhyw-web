<!-- @format -->

<template>
  <div class="charts-box">
    <div id="OrderChartP" style="height:330px;width:100%"></div>
    <!-- <ChartsCompt :chartsOptions="chartsOptions" style="height:336px" /> -->
  </div>
</template>
<script>
// import ChartsCompt from "@/components/App/ChartsCompt";
export default {
  name: "OrderChartP",
  // components: {
  //   ChartsCompt,
  // },
  data() {
    return {
      chartsOptions: {
        color: ["#0AD2C1", "#2D83E3", "#EC5330", "#11CF50", "#B15FF1"],
        title: {
          text: "工单处理进展情况",
          left: "center",
          top: "10%",
          textStyle: {
            color: "#fff",
            fontSize: "16px",
            fontWeight: "normal",
          },
        },
        tooltip: {
          trigger: "item",
          formatter: "{b} :  <br/>{c} ({d}%)",
          backgroundColor: "rgba(0,0,0,0.5)",
          textStyle: {
            color: "#fff",
          },
        },
        legend: {
          bottom: "10 %",
          data: [
            "待处理",
            "待接单",
            "进行中",
            "挂起中",
            "待审核",
            "待评价",
            "已完成",
          ],
          textStyle: {
            color: "#FFFFFF",
          },
          show: false,
        },
        series: [
          {
            name: "",
            type: "pie",
            radius: "55%",
            center: ["50%", "50%"],
            data: [
              { value: 335, name: "待处理" },
              { value: 600, name: "待接单" },
              { value: 120, name: "进行中" },
              { value: 180, name: "挂起中" },
              { value: 200, name: "待审核" },
              { value: 100, name: "待评价" },
              { value: 150, name: "已完成" },
            ],
            label: {
              show: false,
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
      let myCharts = this.$echarts.init(document.getElementById("OrderChartP"));
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
