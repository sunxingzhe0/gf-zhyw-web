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
    <el-col class="item" :span="24"
      ><div class="title" style="opacity:0">内容图片：</div>
      <div class="img-list">
        <div
          class="content-image"
          v-for="(item, index) in content.imgs"
          :key="index"
        >
          <el-image class="el-image" :src="item" :preview-src-list="[item]">
          </el-image>
        </div></div
    ></el-col>
  </el-row>
</template>

<script>
export default {
  props: ["content"],
  data() {
    return {
      lists: [
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
          name: "发起人",
          key: "sponsor",
          span: 8,
        },
        {
          name: "工单级别",
          key: "level",
          span: 8,
        },
        {
          name: "创建时间",
          key: "createTime",
          span: 8,
        },
        {
          name: "计划完成时间",
          key: "planTime",
          span: 8,
        },
        {
          name: "实际完成时间",
          key: "actualTime",
          span: 8,
        },
        {
          name: "报修人",
          key: "repairman",
          span: 8,
        },
        {
          name: "报修科室",
          key: "department",
          span: 8,
        },
        {
          name: "报修时间",
          key: "repairTime",
          span: 8,
        },
        {
          name: "报修时长",
          key: "repairDuration",
          span: 8,
        },
        {
          name: "设备名称",
          key: "machineName",
          span: 8,
        },
        {
          name: "设备类型",
          key: "machineType",
          span: 8,
        },
        {
          name: "所在区域",
          key: "location",
          span: 8,
        },
        {
          name: "报修内容",
          key: "repairContent",
          span: 24,
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
  margin-top: -10px;
  padding: 20px;
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
  }
}
</style>
