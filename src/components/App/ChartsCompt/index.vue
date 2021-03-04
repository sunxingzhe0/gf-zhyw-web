<template>
  <!-- 容器 -->
  <div id="box" style="height:240px"></div>
</template>

<script>
export default {
  //接收父组件传过来来的值--配置对象
  props: {
    chartsOptions: {
      type: Object,
    },
  },
  methods: {
    drawLine() {
      //1.初始化
      let myCharts = this.$echarts.init(document.getElementById("box"));
      //2.配置
      let option = this.chartsOptions;

      //创建图表
      myCharts.setOption(option);
    },
  },
  mounted() {
    //渲染
    this.drawLine();
  },
  watch: {
    options: {
      handler() {
        this.drawLine();
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped></style>
