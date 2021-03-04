<template>
  <AppDialog router title="巡检计划详情" :show.sync="show">
    <div class="plan-detail">
      <DarkMenu :navs="navs" :noRouter="true" v-model="current"></DarkMenu>
      <div class="plan-detail-content">
        <keep-alive>
          <PlanInfo v-if="current === '0'" :id="planId"></PlanInfo>
          <InspectTask v-if="current === '2'" :id="planId"></InspectTask>
          <InspectRecord v-if="current === '1'" :id="planId"></InspectRecord>
        </keep-alive>
      </div>
    </div>
  </AppDialog>
</template>
<script>
/*
@author        qiang
@name          PlanDetail
@desc          巡检计划详情
@props
@query         planId       string      巡检计划id，没有时为新增 
@emit
*/
import { DarkMenu, AppDialog } from "@/components/App";
import { PlanInfo, InspectTask, InspectRecord } from "../components";
export default {
  name: "PlanDetail",
  meta: {
    title: "巡检计划详情",
    hideMenu: true,
  },
  components: {
    PlanInfo,
    DarkMenu,
    AppDialog,
    InspectTask,
    InspectRecord,
  },
  data() {
    return {
      navs: [
        { text: "巡检内容", path: "0" },
        { text: "巡检记录", path: "1" },
        { text: "巡检任务", path: "2" },
      ],
      planId: "",
      show: false,
      current: "0",
    };
  },
  mounted() {
    this.show = true;
    this.planId = this.$route.query.planId;
  },
};
</script>
<style lang="scss" scoped>
.plan-detail {
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
.plan-detail-content {
  flex: 1;
  overflow: auto;
}
</style>
