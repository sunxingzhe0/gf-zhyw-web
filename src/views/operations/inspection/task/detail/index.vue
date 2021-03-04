<template>
  <AppDialog router title="巡检任务详情" :show.sync="show">
    <div class="task-detail">
      <DarkMenu :navs="navs" :noRouter="true" v-model="current"></DarkMenu>
      <div class="task-detail-content">
        <keep-alive>
          <BaseInfo v-if="current === '0'" :taskId="taskId"></BaseInfo>
          <InspectInfo v-if="current === '1'" :taskId="taskId"></InspectInfo>
          <InspectOrder v-if="current === '2'" :taskId="taskId"></InspectOrder>
        </keep-alive>
      </div>
    </div>
  </AppDialog>
</template>
<script>
/*
@author        qiang
@name          TaskDetail
@desc          巡检任务详情
@query         taskId       string      巡检任务id 
@props
@emit
*/
import { DarkMenu, AppDialog } from "@/components/App";
import { BaseInfo, InspectInfo, InspectOrder } from "../components";
export default {
  name: "show",
  meta: {
    hideMenu: true,
    title: "巡检任务详情",
  },
  components: {
    DarkMenu,
    BaseInfo,
    AppDialog,
    InspectInfo,
    InspectOrder,
  },
  data() {
    return {
      taskId: "",
      show: false,
      navs: [
        { text: "基本信息", path: "0" },
        { text: "巡检情况", path: "1" },
        { text: "巡检工单", path: "2" },
      ],
      current: "0",
    };
  },
  created() {
    this.taskId = this.$route.query.taskId;
  },
  mounted() {
    this.show = true;
  },
};
</script>
<style lang="scss" scoped>
.task-detail {
  display: flex;
  flex-direction: column;
  max-height: inherit;
  &::v-deep {
    .el-menu {
      justify-content: flex-start;
      padding-left: 20px;
      background: #1a1a1a;
    }
    .el-menu-item {
      color: #fff;
      margin-right: 40px;
      &:hover {
        background: transparent !important;
      }
    }
  }
}
.task-detail-content {
  flex: 1;
  overflow: auto;
}
</style>
