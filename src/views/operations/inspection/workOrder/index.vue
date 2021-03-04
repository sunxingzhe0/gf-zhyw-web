<template>
  <div class="page-work-order">
    <CardList
      title="巡检工单"
      :params="params"
      :fetcher="fetcher"
      :renderFunc="renderFunc"
      :headerBtns="headerBtns"
    ></CardList>
    <router-view></router-view>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { CardList } from "@/components/App";
import inspection from "@/api/operations/inspection";
import { WorkOrderBtns } from "@/views/operations/constant";

export default {
  name: "OperationsInspectionWorkOrder",
  meta: {
    title: "巡检工单",
    hideMenu: true,
  },
  components: {
    CardList,
  },
  data() {
    return {
      params: [],
      headerBtns: [],
      fetcher: inspection.workOrder.getWorkOrderList,
    };
  },
  computed: {
    ...mapState({
      workOrderStatus: (state) => state.operations.status.WorkOrderStatus,
    }),
  },
  methods: {
    renderFunc(item) {
      const role = "leader";
      const done = ["Closed", "Completed"];
      const statusClass = done.includes(item.status)
        ? "status-text"
        : "status-text white";
      return (
        <div class="card-item plan-item">
          <div class="card-content">
            <div class="card-icon">
              <svg class="iconfont" aria-hidden="true">
                <use xlinkHref="#iconxunjianjilu"></use>
              </svg>
            </div>
            <div class="card-infos">
              <div class="card-info">
                <span class="card-title" title={item.deviceName}>
                  {item.deviceName}
                </span>
                <span class={statusClass}>
                  {this.workOrderStatus[item.status]}
                </span>
              </div>
              <div class="card-info">
                <span>{item.pointName}</span>
              </div>
              <div class="card-info">
                <span>类型：{item.type}</span>
                <span>编号：{item.code}</span>
              </div>
              <div class="card-info">
                <span>设备类型：{item.deviceType}</span>
              </div>
              <div class="card-info">
                <span>登记时间：{item.createdTime}</span>
              </div>
            </div>
          </div>
          <div class="card-footer">
            {WorkOrderBtns[item.status][role].map((_item) => (
              <span
                onClick={() => this.clickHandler(item, _item.type)}
                class={_item.className}
              >
                {_item.text}
              </span>
            ))}
          </div>
        </div>
      );
    },
    clickHandler(item, type) {
      console.log(item, type);
    },
  },
};
</script>
<style lang="scss" scoped>
.page-work-order {
  &::v-deep {
    .el-select {
      width: 80px;
      .el-input {
        width: 100%;
        margin-left: 0;
      }
    }
    .el-input {
      width: 120px;
      margin-left: 12px;
    }
    .el-button {
      width: 54px;
      height: 28px;
      margin-left: 10px;
    }
    .el-input__inner {
      padding-left: 8px;
    }
    .el-date-editor {
      .el-input__inner {
        height: 28px;
        font-size: 12px;
        line-height: 26px;
      }
      .el-input__suffix {
        display: flex;
        align-items: center;
      }
      .el-icon-date {
        display: none;
      }
      .el-input__icon::before {
        content: "\e778";
        font-family: element-icons !important;
        speak: none;
        font-style: normal;
        font-weight: 400;
        font-variant: normal;
        text-transform: none;
        line-height: 1;
        vertical-align: baseline;
        display: inline-block;
        -webkit-font-smoothing: antialiased;
      }
    }
    .gis-group {
      display: flex;
      .el-input {
        width: 50%;
        margin: 0;
      }
    }

    .status-text {
      font-size: 14px;
    }
    .white {
      color: #fff;
    }
  }
}
</style>
