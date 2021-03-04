<!-- @format -->

<template>
  <div class="charts-box">
    <div id="OrderChart" style="height:330px;width:100%"></div>
    <!-- <ChartsCompt :chartsOptions="chartsOptions" style="height:336px" /> -->
  </div>
</template>
<script>
// import ChartsCompt from "@/components/App/ChartsCompt";
export default {
  name: "OrderChart",
  // components: {
  //   ChartsCompt,
  // },
  data() {
    return {
      chartsOptions: {
        color: ["#0071E3", "#37CFCD"],
        title: {
          text: "工单调度总览",
          left: "center",
          top:'10%',
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
          data: ["待派发", "已派发"],
          textStyle: {
            color: "#FFFFFF",
          },
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "50%"],
            data: [
              { value: 335, name: "待派发" },
              { value: 600, name: "已派发" },
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
      let myCharts = this.$echarts.init(document.getElementById("OrderChart"));
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
