<template>
  <AppDialog router :show="show" title="巡检报修单列表">
    <Table
      class="report-list"
      :params="params"
      :columns="columns"
      :fetcher="fetcher"
    ></Table>
  </AppDialog>
</template>
<script>
/*
@author        qiang
@name          OperationsInspectionReportList
@desc          巡检报修单列表
@props
@emit
*/
import { mapState } from "vuex";
import { Table } from "@/components/Base";
import { AppDialog } from "@/components/App";
import workbench from "@/api/operations/workbench";
import inspection from "@/api/operations/inspection";
import { ReportBtns } from "@/views/operations/constant";
export default {
  name: "OperationsInspectionReportList",
  meta: {
    title: "巡检报修单列表",
    hideMenu: true,
    keepAlive: true,
  },
  components: {
    Table,
    AppDialog,
  },
  data() {
    return {
      show: false,
      params: [
        {
          key: "mine",
          label: "报修人",
          component: "el-select",
          options: [
            { label: "全部", value: "" },
            { label: "我的", value: 1 },
          ],
        },
        {
          default: {},
          component: "FlexInput",
          options: [
            { label: "报修主题", value: "reportTitle" },
            { label: "登记人", value: "registerName" },
            { label: "报修人姓名", value: "reportName" },
            { label: "报修人工号", value: "reportJobNum" },
            { label: "报修人电话", value: "reportPhone" },
          ],
        },
        {
          key: "time",
          label: "创建时间",
          type: "datetimerange",
          elAttrs: {
            "end-placeholder": "结束时间",
            "start-placeholder": "开始时间",
            "default-time": ["00:00:00", "23:59:59"],
          },
          component: "el-date-picker",
        },
      ],
      searchBtn: false,
      columns: {
        index: { width: 96 },
        registerName: { width: 100 },
        reportName: { width: 120 },
        reportJobNum: { width: 120 },
        reportPhone: { width: 140 },
        reportDepartName: { width: 120 },
        reportTitle: { width: 140, "show-overflow-tooltip": true },
        createdTime: { width: 200 },
        status: {
          formatter: this.statusFormatter,
        },
        operate: {
          width: 200,
          label: "操作",
          fixed: "right",
          className: "operate-column",
          renderFun: this.renderBtns,
        },
      },
      fetcher: inspection.report.getReportList,
    };
  },
  computed: {
    ...mapState({
      RepairFormStatus: (state) => state.operations.status.RepairFormStatus,
    }),
  },
  mounted() {
    this.show = true;
  },
  methods: {
    statusFormatter(row) {
      return this.RepairFormStatus[row.status];
    },
    renderBtns(scope) {
      const role = "dispatcher";
      const btns = ReportBtns[scope.row.status][role];
      return (
        <div class="operate">
          {btns.map((item) => (
            <el-link
              type="primary"
              underline={false}
              onClick={() => this.clickHandler(scope.row, item.code)}
            >
              {item.text}
            </el-link>
          ))}
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
.report-list::v-deep {
  .operate-column {
    background: #161616;
  }
  .operate {
    text-align: right;
    .el-link {
      margin-left: 8px;
      &:first-child {
        margin: 0;
      }
    }
  }
}
</style>
