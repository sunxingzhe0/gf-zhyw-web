<template>
  <div class="inspect-task-card" @click="$emit('click')">
    <div class="card-title">
      <span class="title-text">
        {{ item.name }}
        <span class="level-text" :class="'level-' + item.level">{{
          item.level | levelFilter
        }}</span>
      </span>
      <span>{{ item.type === "site" ? "现场巡检" : "设备巡检" }}</span>
    </div>
    <div class="card-row">{{ item.startTime }} ~ {{ item.endTime }}</div>
    <div class="card-row">
      <div class="row-label">完成度：</div>
      <div class="progress-bar">
        <p class="progress-inner-bar" :style="{ width: completion }"></p>
      </div>
      <div class="progress-text" :class="{ 'high-light': item.progress }">
        {{ completion }}
      </div>
    </div>
    <div class="card-row">
      <div class="row-label">当前进度：</div>
      <div class="progress-bar">
        <p class="progress-inner-bar" :style="{ width: progress }"></p>
      </div>
      <div class="progress-text" :class="{ 'high-light': item.progress }">
        {{ progress }}
      </div>
    </div>
    <div class="card-row status-row">
      <span :class="{ total: item.total }">巡检总数：{{ item.total }}</span>
      <span :class="{ completed: item.completed }"
        >已完成：{{ item.completed }}</span
      >
      <span :class="{ notPerformed: item.notPerformed }"
        >未执行：{{ item.notPerformed }}</span
      >
      <span :class="{ executing: item.executing }"
        >进行中：{{ item.executing }}</span
      >
    </div>
    <div class="card-row status-row">
      <span :class="{ timeoutCompleted: item.timeoutCompleted }"
        >超时完成：{{ item.timeoutCompleted }}</span
      >
      <span :class="{ closed: item.closed }">已关闭：{{ item.closed }}</span>
      <span :class="{ terminated: item.terminated }"
        >已终止：{{ item.terminated }}</span
      >
      <span :class="{ timedout: item.timedout }"
        >已超时：{{ item.timedout }}</span
      >
    </div>
  </div>
</template>
<script>
/*
@author        qiang
@name          InspectTaskCard
@desc          巡检任务卡片
@props         item     object<{
                  id                  number      巡检任务id
                  taskNo              string      巡检任务编号
                  name                string      巡检任务名称
                  type                number      巡检类型（device-设备巡检 site-现场巡检）
                  level               number      巡检计划级别（1-低 2-中 3-高）
                  startTime           string      巡检任务开始时间
                  endTime             string      巡检任务结束时间
                  completion          number      巡检任务完成度
                  progress            number      巡检任务当前进度
                  total               number      巡检总数
                  completed           number      已完成计数
                  notPerformed        number      未执行计数
                  executing           number      进行中计数
                  timeoutCompleted    number      超时完成计数
                  closed              numebr      已关闭计数
                  terminated          numebr      已终止计数
                  timedout            number      已超时计数
               }> 
@emit
*/
export default {
  name: "InspectTaskCard",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    completion() {
      return (this.item.completion * 100).toFixed(2) + "%";
    },
    progress() {
      return (this.item.progress * 100).toFixed(2) + "%";
    },
  },
  filters: {
    levelFilter(val) {
      switch (val) {
        case 1:
          return "低";
        case 2:
          return "中";
        default:
          return "高";
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.inspect-task-card {
  width: 380px;
  height: 144px;
  background: #1a1a1a;
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 500;
  padding: 10px;
  display: flex;
  color: #ffffff;
  flex-direction: column;
  justify-content: space-between;
  .card-title {
    display: flex;
    justify-content: space-between;
  }
  .title-text {
    display: flex;
    font-size: 14px;
    align-items: center;
  }
  .card-row {
    display: flex;
    align-items: center;
  }
  .row-label {
    width: 60px;
  }
  .progress-bar {
    height: 8px;
    width: 240px;
    position: relative;
    border-radius: 4px;
    background: #333333;
  }
  .progress-inner-bar {
    margin: 0;
    height: 8px;
    border-radius: 4px;
    transition: all ease 0.3s;
    background: rgba(0, 113, 227, 1);
  }
  .progress-text {
    flex: 1;
    text-align: right;
  }
  .status-row {
    color: #808080;
    span {
      width: 25%;
      float: left;
    }
  }
  .level-text {
    font-size: 10px;
    font-family: PingFang SC;
    font-weight: 500;
    width: 14px;
    height: 14px;
    margin-left: 10px;
  }
  .level-1 {
    color: #0ab2c1;
    background: rgba(10, 178, 193, 0.2);
  }
  .level-2 {
    color: rgba(215, 103, 21, 1);
    background: rgba(215, 103, 21, 0.2);
  }
  .level-3 {
    color: rgba(247, 74, 74, 1);
    background: rgba(247, 74, 74, 0.2);
  }
  .high-light {
    color: rgba(0, 113, 227, 1);
  }
  .total,
  .closed,
  .terminated,
  .timeoutCompleted {
    color: #fff;
  }
  .completed {
    color: #42d36b;
  }
  .timedout,
  .executing,
  .notPerformed {
    color: #f74a4a;
  }
}
</style>
