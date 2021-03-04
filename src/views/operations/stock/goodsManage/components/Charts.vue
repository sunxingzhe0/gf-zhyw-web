<!-- @format -->

<template>
  <div class="charts-box">
    <div id="OrderChart" style="height:264px;width:100%"></div>
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
        color: ["#0071E3", "#37CFCD",'#E88729'],
        title: {},
        tooltip: {
          trigger: "item",
          formatter: "{b} :  <br/>{c} ({d}%)",
          backgroundColor: "rgba(0,0,0,0.5)",
          textStyle: {
            color: "#fff",
          },
        },
        legend: {
          bottom: "6 %",
          data: ["待审核", "已通过", "已驳回"],
          textStyle: {
            color: "#FFFFFF",
          },
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "76%",
            center: ["50%", "42%"],
            data: [
              { value: 800, name: "待审核" },
              { value: 200, name: "已通过" },
              { value: 300, name: "已驳回" },
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
}
</style>
