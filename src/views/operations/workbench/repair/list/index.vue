<!-- @format -->

<template>
  <AppDialog
    router
    :show.sync="show"
    :elAttrs="elAttrs"
    @close="closeHandler"
    :title="'故障报修'"
  >
    <Table
      :params="params"
      :columns="columns"
      :fetcher="fetcher"
      class="repair-list"
    >
    </Table>
  </AppDialog>
</template>
<script>
import { mapState } from "vuex";
import { AppDialog } from "@/components/App";
import workbench from "@/api/operations/workbench";
// import { DarkSelect } from "@/components/App/FormFilters";
import { Table } from "@/components/Base";
import { ReportBtns } from "@/views/operations/constant";
let pre = {
  userList:[]
}
export default {
  name: "OperationsWorkbenchRepairList",
  meta: {
    title: "全部报修登记",
    hideMenu: true,
  },
  components: {
    AppDialog,
    Table,
  },
  data() {
    return {
      ReportBtns,
      //身份模拟
      role: "dispatcher",
      elAttrs: {
        "before-close": this.beforeClose,
      },
      show: false,

      params: [
        {
          key: "registerUserName",
          type: "datetimerange",
          label: "报修人",
          options: pre.userList.map(item => {return {
            label:item.label,
            value:item.label
          }}),
          component: "el-select",
        },
        {
          component: "FlexInput",
          default: { keyword: "" },
          options: [
            {
              label: "登记人",
              value: "registerUserName",
            },
            {
              label: "报修人姓名",
              value: "repairUserName",
            },
            {
              label: "报修人工号",
              value: "repairUserNum",
            },
            {
              label: "报修人电话",
              value: "repairUserPhone",
            },
            {
              label: "报修主题",
              value: "repairTheme",
            },
          ],
        },
        {
          key: ["startTime", "endTime"],
          type: "datetimerange",
          format: "yyyy-MM-DD HH:mm:ss",
          "value-format": "yyyy-MM-DD HH:mm:ss",
          label: "创建日期",
          component: "el-date-picker",
        },
      ],
      columns: {
        repairType: {
          formatter: (row) => {
            return row.repairType == 1 ? "设备" : "非设备";
          },
        },
        state: {
          formatter: (row) => {
            return this.RepairFormStatus[row.state];
          },
        },
        repairTime: { width: 200 },
        userName: { width: 100 },
        userNo: { width: 100 },
        userPhone: { width: 120 },
        operate: {
          label: "操作",
          renderFun: this.renderOperate,
          width: 220,
          fixed: "right",
        },
      },
      fetcher: workbench.repair.registerList,
    };
  },
  async beforeRouteEnter (to, from, next) {

      [pre.userList] = await Promise.all([
        await workbench.repair.getUserOptions()
        // await workbench.repair.repairTypePhone()
      ])
    // ...
    next()
  //获取选项配置
  },
  mounted() {
    this.show = true;
    // this.$nextTick(() => {
    //   this.$_fetchTableData();
    // });
  },
  computed: {
    ...mapState({
      RepairFormStatus: (state) => state.operations.status.RepairFormStatus,
    }),
  },
  methods: {
    test(e) {
      console.log(e);
    },
    renderOperate(scope) {
      let btns = ReportBtns[scope.row.state][this.role];
      return (
        <div class="operate">
          {btns.map((item) => (
            <el-button
              type="text"
              onClick={() => this.clickHandler(scope.row, item.code)}
            >
              {item.text}
            </el-button>
          ))}
        </div>
      );
    },
    beforeClose(done) {
      console.log("before close");
      done();
    },
    closeHandler() {
      this.$emit("close");
    },
    //按钮操作
    clickHandler(item, type) {
      console.log(item, type);
    },
  },
};
</script>
<style lang="scss" scope>
@import "@/assets/css/variables.scss";
.repair-list {
  &::v-deep {
    .el-button {
      margin-left: 10px;
    }
  }
}
</style>
