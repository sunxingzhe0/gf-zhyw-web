<template>
  <div class="task-info" v-loading="loading">
    <div class="info-row">
      <div class="info-item high-light">巡检工单：{{ baseInfo.orderId }}</div>
      <div class="info-item">创建日期：{{ baseInfo.createTime }}</div>
      <div class="info-item">
        单据状态：{{ WorkOrderStatus[baseInfo.orderStatus] }}
      </div>
    </div>
    <div class="inspect-title">
      执行情况
    </div>
    <div v-for="(item, index) in executeInfo" :key="index">
      <div class="info-row">
        <div class="info-item">{{ item.type + "人：" + item.name }}</div>
        <div class="info-item">所属部门：{{ item.dept }}</div>
        <div class="info-item">
          {{ item.type + "时间：" + item.operationTime }}
        </div>
      </div>
      <div class="info-row" v-if="item.userType !== 1">
        <div class="info-item">备注：{{ item.remarks || "-" }}</div>
      </div>
    </div>
    <div class="log-info">
      <div class="log-item" v-for="(item, index) in logInfo" :key="index">
        <div class="item-left">{{ item.operationTime }}</div>
        <div class="item-right">
          <span>{{ item.name }}</span>
          <span>{{ item.operationDetails }}</span>
        </div>
      </div>
    </div>
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
import inspection from "@/api/operations/inspection";
export default {
  name: "BaseInfo",
  props: {
    taskId: {
      type: String,
      required: true,
    },
  },
  components: {},
  data() {
    return {
      logInfo: [],
      baseInfo: {},
      loading: false,
      executeInfo: [],
    };
  },
  computed: {
    ...mapState({
      WorkOrderStatus: (state) => state.operations.status.WorkOrderStatus,
    }),
  },
  mounted() {
    this.getRelateWorkOrder();
  },
  methods: {
    async getRelateWorkOrder() {
      try {
        let type = "执行";
        this.loading = true;
        const res = await inspection.task.getRelateWorkOrder({
          taskId: this.taskId,
        });
        this.executeInfo = res.executeInfo.map((item) => {
          if (item.userType === 2) type = "转单";
          if (item.userType === 3) type = "协助";
          return { type, ...item };
        });
        this.baseInfo = res.baseInfo;
        this.logInfo = res.logInfo;
        this.loading = false;
      } catch (_) {
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
  .inspect-title {
    height: 20px;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #ffffff;
    margin: 14px 0;
    &::before {
      content: "";
      width: 2px;
      float: left;
      height: 20px;
      margin-right: 8px;
      background: $--color-primary;
    }
  }
  .log-item {
    display: flex;
  }
  .log-info {
    width: 1160px;
    background: #1a1a1a;
    opacity: 0.8;
    padding: 20px;
    font-size: 12px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #ffffff;
    margin-top: 10px;
    .item-left {
      width: 200px;
      text-align: right;
      padding-right: 22px;
      position: relative;
      padding-bottom: 20px;
      border-right: 2px solid rgba(255, 255, 255, 0.2);
      &::before {
        content: "";
        position: absolute;
        width: 8px;
        height: 8px;
        background: #cccccc;
        border-radius: 50%;
        right: -5px;
        top: 0;
      }
    }
    .item-right {
      display: flex;
      padding-left: 22px;
      padding-bottom: 20px;
      span {
        &:first-child {
          width: 60px;
        }
      }
    }
  }
  .high-light {
    color: rgba(0, 113, 227, 1);
  }
}
</style>
