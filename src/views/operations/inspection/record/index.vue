<template>
  <div class="page-report">
    <CardList
      title="巡检记录"
      :params="params"
      ref="refCardList"
      :fetcher="fetcher"
      :renderFunc="renderFunc"
      :headerBtns="headerBtns"
    ></CardList>
    <router-view></router-view>
  </div>
</template>
<script>
/*
@author        qiang
@name          OperationsInspectionRecord
@desc          巡检报障
@props
@emit
*/
import { CardList } from "@/components/App";
import inspection from "@/api/operations/inspection";
export default {
  name: "OperationsInspectionRecord",
  meta: {
    title: "巡检记录",
    hideMenu: true,
  },
  components: {
    CardList,
  },
  data() {
    return {
      params: [
        {
          label: "",
          elAttrs: {
            size: "mini",
          },
          key: "abnormal",
          options: [
            { label: "全部", value: "" },
            { label: "正常", value: false },
            { label: "异常", value: true },
          ],
          className: "keyword",
          component: "el-select",
        },
      ],
      headerBtns: [
        {
          text: "",
          icon: "iconliebiao",
          className: "icon-list",
          onClick: () => {
            this.$router.push("/operations/inspection/record/list");
          },
        },
      ],
      fetcher: inspection.record.getRecordList,
    };
  },
  methods: {
    renderFunc(item) {
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
                <span class="card-title" title={item.pointName}>
                  {item.pointName}
                </span>
                <span>{item.createdTime}</span>
              </div>
              <div class="card-info">
                {`${item.executorName} | ${item.executorDepartName} | ${
                  item.abnormal ? " 异常" : " 正常"
                }`}
              </div>
            </div>
          </div>
          <div class="card-footer">
            <span onClick={() => this.clickHandler(item)}>详情</span>
          </div>
        </div>
      );
    },
    clickHandler(item) {
      this.$router.push("/operations/inspection/record/detail?id=" + item.id);
    },
  },
};
</script>
<style lang="scss" scoped>
.page-report {
  &::v-deep {
    .el-input {
      width: 140px;
    }
    .el-button {
      height: 28px;
      margin-left: 10px;
    }
    .el-input__inner {
      padding-left: 8px;
    }
    .icon-list {
      width: 28px;
      height: 28px;
      background: rgba(51, 51, 51, 0.6);
      border: 1px solid #4d4d4d;
      border-radius: 2px;
      padding: 0;
    }
    .iconfont {
      font-size: 16px;
      color: #cccccc;
    }
    .info-content {
      justify-content: flex-start;
    }
    .content-label {
      white-space: nowrap;
      float: left;
    }
  }
}
</style>
