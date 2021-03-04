<template>
  <div class="page-task">
    <CardList
      title="巡检任务"
      ref="refCardList"
      :fetcher="fetcher"
      :renderFunc="renderFunc"
      :headerBtns="headerBtns"
    >
      <DarkMenu
        slot="header"
        :navs="navs"
        @select="seach"
        :noRouter="true"
        v-model="current"
      ></DarkMenu>
    </CardList>
    <router-view></router-view>
  </div>
</template>
<script>
/*
@author        qiang
@name          OperationsInspectionTask
@desc          巡检任务
@props
@emit
*/
import dayjs from "dayjs";
import inspection from "@/api/operations/inspection";
import { DarkMenu, CardList, InspectTaskCard } from "@/components/App";
export default {
  name: "OperationsInspectionTask",
  meta: {
    title: "巡检任务",
    hideMenu: true,
  },
  components: {
    DarkMenu,
    CardList,
  },
  data() {
    return {
      endTime: "",
      startTime: "",
      current: "NotPerformed",
      fetcher: this.getTaskList,
      navs: [
        { text: "未执行", path: "NotPerformed" },
        { text: "进行中", path: "Executing" },
        { text: "已完成", path: "Completed" },
      ],
      headerBtns: [
        { text: "近7日", onClick: () => this.pickTime(7) },
        { text: "近30日", onClick: () => this.pickTime(30) },
      ],
    };
  },
  methods: {
    getTaskList(params) {
      return inspection.task.getTaskList({
        startTime: this.startTime,
        endTime: this.endTime,
        status: this.current,
        ...params,
      });
    },
    renderFunc(item) {
      const path = "/operations/inspection/task/detail?taskId=" + item.id;
      return (
        <InspectTaskCard
          item={item}
          onClick={() => this.$router.push(path)}
        ></InspectTaskCard>
      );
    },
    pickTime(dis) {
      this.startTime = dayjs()
        .add(-dis, "d")
        .format("YYYY-MM-DD hh:mm:ss");
      this.endTime = dayjs().format("YYYY-MM-DD hh:mm:ss");
      this.$refs.refCardList.pageNumChange(1);
    },
    seach() {
      this.$refs.refCardList.pageNumChange(1);
    },
  },
};
</script>
<style lang="scss" scoped>
.page-task {
  .el-menu {
    left: 0;
    top: 47px;
    width: 100%;
    position: absolute;
    background: rgba(0, 0, 0, 0.8);
  }
  &::v-deep {
    .card-list-body {
      padding-top: 46px;
    }
    .inspect-task-card {
      cursor: pointer;
      margin-bottom: 20px;
      background: rgba(51, 51, 51, 0.6);
    }
  }
}
</style>
