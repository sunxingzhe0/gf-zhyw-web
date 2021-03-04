<template>
  <div class="task-info" v-loading="loading">
    <template v-if="data">
      <div class="info-row">
        <div class="info-item">名称：{{ data.name }}</div>
        <div class="info-item">
          计划类型：{{ data.type === "site" ? "现场巡检" : "设备巡检" }}
        </div>
        <div class="info-item">
          状态：{{ data.state === "1" ? "启用" : "禁用" }}
        </div>
      </div>
      <div class="info-row">
        <div class="info-item">任务编号：{{ data.taskNo }}</div>
        <div class="info-item">
          执行部门：{{ data.executorDepartName || "-" }}
        </div>
        <div class="info-item">执行人：{{ data.executorName }}</div>
      </div>
      <div class="info-row">
        <div class="info-item">计划级别：{{ data.level | levelFilter }}</div>
        <div class="info-item">开始时间：{{ data.startTime }}</div>
        <div class="info-item">结束时间：{{ data.endTime }}</div>
      </div>
      <div class="info-row">
        <div class="info-item">进度：{{ TaskStatus[data.patrolState] }}</div>
        <div class="info-item" style="flex: 2">
          巡检时段：{{ data.rangeTime }}
        </div>
      </div>
      <div class="info-row">
        <div class="info-item">任务描述：{{ data.description }}</div>
      </div>
      <div class="info-row">
        <div class="info-item">
          <div class="item-label">巡检进度：</div>
          <div class="item-value">
            <div class="item-row">
              <div>巡检总数：{{ data.deviceCount }}</div>
              <div>
                <span>已完成：{{ data.completed }}</span>
                <span>超时完成：{{ data.timeoutCompleted }}</span>
                <span>已超时：{{ data.timedout }}</span>
                <span>进行中：{{ data.executing }}</span>
                <span>未执行：{{ data.notPerformed }}</span>
              </div>
            </div>
            <div class="item-row">
              <div class="row-label">完成度：</div>
              <div class="progress-bar">
                <p
                  class="progress-inner-bar"
                  :style="{ width: completion }"
                ></p>
              </div>
              <div
                class="progress-text"
                :class="{ 'high-light': data.completion }"
              >
                {{ completion }}
              </div>
            </div>
            <div class="item-row">
              <div class="row-label">当前进度：</div>
              <div class="progress-bar">
                <p class="progress-inner-bar" :style="{ width: progress }"></p>
              </div>
              <div
                class="progress-text"
                :class="{ 'high-light': data.progress }"
              >
                {{ progress }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <Empty v-else></Empty>
  </div>
</template>
<script>
/*
@author        qiang
@name          BaseInfo
@desc          巡检任务-基本信息
@props         taskId       string      巡检任务id 
@emit
*/
import { mapState } from "vuex";
import { Empty } from "@/components/App";
import inspection from "@/api/operations/inspection";
export default {
  name: "BaseInfo",
  props: {
    taskId: {
      type: String,
      required: true,
    },
  },
  components: {
    Empty,
  },
  data() {
    return {
      data: null,
      loading: false,
    };
  },
  computed: {
    ...mapState({
      TaskStatus: (state) => state.operations.status.TaskStatus,
    }),
    completion() {
      if (!this.data) return "0%";
      return (this.data.completion * 100).toFixed(2) + "%";
    },
    progress() {
      if (!this.data) return "0%";
      return (this.data.progress * 100).toFixed(2) + "%";
    },
  },
  mounted() {
    this.getTaskInfo();
  },
  methods: {
    async getTaskInfo() {
      try {
        this.loading = true;
        this.data = await inspection.task.getTaskInfo({ taskId: this.taskId });
        this.loading = false;
      } catch (_) {
        this.data = null;
        this.loading = false;
      }
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
@import "@/assets/css/variables.scss";
.task-info {
  width: 100%;
  padding: 10px 20px;
  max-height: inherit;
}
.info-row {
  display: flex;
  line-height: 36px;
}
.info-item {
  flex: 1;
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #e6e6e6;
}
.row-label {
  width: 70px;
}
.item-value {
  width: 1089px;
  height: 118px;
  float: right;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: rgba(26, 26, 26, 80%);
}
.item-row {
  height: 14px;
  display: flex;
  font-size: 12px;
  align-items: center;
  justify-content: space-between;
  &:first-child {
    font-size: 14px;
  }
  span {
    margin-left: 20px;
  }
}
.progress-bar {
  flex: 1;
  height: 8px;
  position: relative;
  border-radius: 4px;
  margin: 0 15px 0 0px;
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
  text-align: right;
}
.high-light {
  color: rgba(0, 113, 227, 1);
}
</style>
