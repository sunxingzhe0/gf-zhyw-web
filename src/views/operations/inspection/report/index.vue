<template>
  <div class="page-report">
    <CardList
      title="巡检报障"
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
@name          OperationsInspectionReport
@desc          巡检报障
@props
@emit
*/
import { mapState } from "vuex";
import { CardList } from "@/components/App";
import workbench from "@/api/operations/workbench";
import inspection from "@/api/operations/inspection";
import { ReportBtns } from "@/views/operations/constant";
export default {
  name: "OperationsInspectionReport",
  meta: {
    title: "巡检报障",
    hideMenu: true,
    keepAlive: true,
  },
  components: {
    CardList,
  },
  data() {
    return {
      params: [
        {
          elAttrs: {
            size: "mini",
            placeholder: "关键字搜索",
            "suffix-icon": "el-icon-search",
          },
          key: "keyword",
          className: "keyword",
          component: "el-input",
        },
      ],
      headerBtns: [
        {
          text: "故障报修",
          onClick: () => {
            this.$router.push(
              "/operations/workbench/repair/register?source=Inspection"
            );
          },
        },
        {
          text: "",
          icon: "iconliebiao",
          className: "icon-list",
          onClick: () => {
            this.$router.push("/operations/inspection/report/list");
          },
        },
      ],
      fetcher: inspection.report.getReportList,
    };
  },
  computed: {
    ...mapState({
      RepairFormStatus: (state) => state.operations.status.RepairFormStatus,
    }),
  },
  activated() {
    debugger;
    this.$refs.refCardList.loadData();
  },
  methods: {
    renderFunc(item) {
      const role = "dispatcher";
      const btns = ReportBtns[item.status][role];
      return (
        <div class="card-item plan-item">
          <div class="card-content">
            <div class="card-icon">
              <svg class="iconfont" aria-hidden="true">
                <use xlinkHref="#iconxnjianbaozhang"></use>
              </svg>
            </div>
            <div class="card-infos">
              <div class="card-info">
                <span class="card-title" title={item.reportTitle}>
                  {item.reportTitle}
                </span>
                <span>{this.RepairFormStatus[item.status]}</span>
              </div>
              <div class="card-info">登记人：{item.registerName}</div>
              <div class="card-info">
                <span>报修人姓名：{item.reportName}</span>
                <span>报修人工号：{item.reportJobNum}</span>
              </div>
              <div class="card-info">
                <span>报修人电话：{item.reportPhone}</span>
                <span>报修科室：{item.reportDepartName}</span>
              </div>
              <div class="card-info">报修时间：{item.createdTime}</div>
            </div>
          </div>
          <div class="card-footer">
            {btns.map((_item) => (
              <span onClick={() => this.clickHandler(item, _item.code)}>
                {_item.text}
              </span>
            ))}
          </div>
        </div>
      );
    },
    async clickHandler(item, code) {
      switch (code) {
        case "Detail":
          this.$router.push(
            "/operations/workbench/repair/detail?id=" + item.id
          );
          break;
        case "WorkOrder":
          console.error("数据交互未实现");
          this.$router.push("/operations/workbench/workCenter/register");
          break;
        case "Reminders": {
          await workbench.repair.remind(item.id);
          this.$message.success("操作成功！");
          break;
        }
        case "Terminate":
        case "Withdraw":
        case "End": {
          try {
            const Emums = {
              End: "完结",
              Withdraw: "撤回",
              Terminate: "终止",
            };
            const confirm = await this.$confirm(
              `您确定要${Emums[code]}该报修单吗？`
            );
            if (confirm !== "confirm") return;
            await workbench.repair.operate(code);
            this.$message.success("操作成功！");
            this.$refs.refCardList.loadData();
          } catch (e) {
            // nothing
          }
        }
      }
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
    .el-radio {
      margin-right: 0;
      white-space: unset;
      display: flex;
    }
    .el-radio__inner {
      width: 12px;
      height: 12px;
      height: 12px;
      margin-top: 2px;
      background-color: transparent;
    }
    .el-radio__label {
      font-size: 12px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #ffffff;
      line-height: 16px;
      margin-bottom: 4px;
      white-space: unset;
      padding-left: 5px;
      border-color: #999999;
    }
  }
}
</style>
