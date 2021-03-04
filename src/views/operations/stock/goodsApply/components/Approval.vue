<!-- @format -->

<template>
  <el-row class="content">
    <el-col :span="8" class="item"
      ><span class="title">审批人：</span>{{ content.approvalUser }}</el-col
    >
    <el-col :span="8" class="item"
      ><span class="title">所属部门：</span>{{ content.dept }}</el-col
    >
    <el-col :span="8" class="item"
      ><span class="title">审批时间：</span>{{ content.approvalTime }}</el-col
    >
    <el-col :span="24" class="item"
      ><span class="title">审批结果：</span>{{ content.result }}</el-col
    >
    <el-col :span="24" class="item" v-if="content.resultId == 3"
      ><span class="title">驳回理由：</span>{{ content.reason }}</el-col
    >
  </el-row>
</template>
<script>
export default {
  props: ["content"],
  data() {
    return {};
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
