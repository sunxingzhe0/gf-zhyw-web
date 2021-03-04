<!-- @format -->

<template>
  <el-row class="content">
    <el-col :span="8" class="item"
      ><span class="title">执行人：</span>{{ content.actionUser }}</el-col
    >
    <el-col :span="16" class="item"
      ><span class="title">所属部门：</span>{{ content.actionUserDept }}</el-col
    >
    <template v-for="(item, index) in content.helpUsers">
      <el-row :key="index">
        <el-col :span="8" class="item"
          ><span class="title">协助人{{ index + 1 }}：</span
          >{{ item.user }}</el-col
        >
        <el-col :span="16" class="item"
          ><span class="title">所属部门：</span>{{ item.dept }}</el-col
        >
      </el-row>
    </template>

    <el-col :span="24" class="item"
      ><span class="title">维修时间：</span>{{ content.actionTime }}</el-col
    >
    <el-col :span="24" class="item"
      ><span class="title">报修内容：</span>{{ content.detail }}</el-col
    >
    <el-col class="item" :span="24"
      ><div class="title" style="opacity:0">内容图片：</div>
      <div class="img-list">
        <div
          class="content-image"
          v-for="(item, index) in content.images"
          :key="index"
        >
          <el-image class="el-image" :src="item" :preview-src-list="[item]">
          </el-image>
        </div></div
    ></el-col>
    <el-col :span="8" class="item"
      ><span class="title">评价内容：</span
      ><span class="rate-text">{{ content.rateText }}</span
      ><span class="rate-text">{{ content.rate }}</span
      ><el-rate v-model="content.rate" style="margin-top:3px"> </el-rate
    ></el-col>

    <el-col :span="8" class="item">{{ content.rateTime }}</el-col>

    <el-col class="item" :span="24"
      ><div class="title" style="opacity:0">内容图片：</div>
      {{ content.remark }}
    </el-col>
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
    .img-list {
      display: flex;
    }
    .content-image {
      margin-right: 10px;
      width: 74px;
      height: 74px;
      border: 1px solid #0071e3;
      .el-image {
        width: 100%;
        height: 100%;
      }
    }
    .rate-text {
      color: #e89c17;
      padding-right: 20px;
    }
  }
}
</style>
