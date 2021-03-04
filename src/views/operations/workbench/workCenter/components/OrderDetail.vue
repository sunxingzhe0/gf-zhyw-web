<!-- @format -->

<template>
  <el-row class="content">
    <el-col
      class="item"
      v-for="(item, index) in lists"
      :key="index"
      :span="item.span"
      ><span class="title">{{ item.name }}{{ item.name ? "：" : "" }}</span
      >{{ content[item.key] }}</el-col
    >
    <el-col class="item" :span="24">
      <div class="img-list">
        <div
          class="content-image"
          v-for="(item, index) in content.images"
          :key="index"
        >
          <el-image class="el-image" :src="item" :preview-src-list="[item]">
          </el-image>
        </div>
      </div>
    </el-col>
    <el-col
      class="item"
      v-for="(item, index) in nextLists"
      :key="'n' + index"
      :span="item.span"
      ><span class="title">{{ item.name }}{{ item.name ? "：" : "" }}</span
      >{{ content[item.key] }}</el-col
    >
  </el-row>
</template>
<script>
export default {
  props: ["content"],
  data() {
    return {
      
      lists: [
        {
          name: "单据号",
          key: "orderId",
          span: 8,
        },
        {
          name: "单据状态",
          key: "orderStatusName",
          span: 8,
        },
        {
          name: "创建时间",
          key: "createTime",
          span: 8,
        },
        {
          name: "工单主题",
          key: "title",
          span: 8,
        },
        {
          name: "工单类型",
          key: "type",
          span: 8,
        },
        {
          name: "工单级别",
          key: "level",
          span: 8,
        },
        
        {
          name: "设备名称",
          key: "equipmentName",
          span: 8,
        },
        {
          name: "设备类型",
          key: "equipmentType",
          span: 8,
        },
        {
          name: "所在区域",
          key: "area",
          span: 8,
        },
        {
          name: "报修内容",
          key: "detail",
          span: 24,
        },
      ],
      nextLists: [
        {
          name: "发起人",
          key: "startUser",
          span: 8,
        },
        {
          name: "创建时间",
          key: "startTime",
          span: 8,
        },
        {
          name: "计划完成时间",
          key: "planCompleteTime",
          span: 8,
        },
        {
          name: "报修人",
          key: "repairUser",
          span: 8,
        },
        {
          name: "报修科室",
          key: "dept",
          span: 8,
        },
        {
          name: "报修时间",
          key: "repairTime",
          span: 8,
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
.content {
  font-size: 14px;
  line-height: 24px;
  color: #fff;
  // margin-top: -10px;
  padding: 20px;
  padding-top: 10px;
  padding-bottom: 0;
  .item {
    // display: flex;
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
  }
}
</style>
