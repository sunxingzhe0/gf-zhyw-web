<!-- @format -->

<template>
  <el-row class="content">
    <el-col :span="8" class="item"
      ><span class="title">关联工单：</span>{{ content.order }}</el-col
    >
    <el-col :span="8" class="item"
      ><span class="title">申领科室：</span>{{ content.dept }}</el-col
    >
    <el-col :span="8" class="item"
      ><span class="title">申领人：</span>{{ content.applyUser }}</el-col
    >
    <el-col :span="24" class="item"
      ><span class="title">申领时间：</span>{{ content.applyTime }}</el-col
    >
    <el-col :span="24" class="item"
      ><span class="title">申领内容：</span
      >{{ formatContent(content.contents, content.number) }}</el-col
    >
    <el-col :span="24" class="item"
      ><span class="title">申领理由：</span>{{ content.reason }}</el-col
    >
  </el-row>
</template>
<script>
export default {
  props: ["content"],
  data() {
    return {};
  },
  methods: {
    formatContent(arr, number) {
      let arrStr = arr.map((item) => {
        return item.type + "+" + item.name + " *" + number;
      });
      return arrStr.join(" ");
    },
  },
};
</script>
<style lang="scss" scoped>
.content {
  font-size: 14px;
  line-height: 24px;
  margin-top: -10px;
  .item {
    display: flex;
    padding: 5px 0;
    .title {
      flex-shrink: 0;
      display: inline-block;
    }
  }
}
</style>
