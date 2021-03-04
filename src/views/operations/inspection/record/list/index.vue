<template>
  <AppDialog router :show="show" title="巡检记录列表">
    <Table
      ref="refTable"
      :params="params"
      :columns="columns"
      :fetcher="fetcher"
      class="record-list"
    >
      <!-- :searchBtn="false" -->
      <template slot="tableHeader">
        <div class="fast-input">
          <el-button @click="fastInputDay(0)">今日</el-button>
          <el-button @click="fastInputDay(-1)">昨日</el-button>
          <el-button @click="fastInputDay(-7)">近7日</el-button>
          <el-button @click="fastInputDay(-30)">近30日</el-button>
        </div>
      </template>
    </Table>
  </AppDialog>
</template>
<script>
/*
@author        qiang
@name          OperationsInspectionRecordList
@desc          巡检记录列表
@props
@emit
*/
import dayjs from "dayjs";
import { Table } from "@/components/Base";
import { AppDialog } from "@/components/App";
import inspection from "@/api/operations/inspection";
export default {
  name: "OperationsInspectionRecordList",
  meta: {
    title: "巡检记录列表",
    hideMenu: true,
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
          default: {},
          component: "FlexInput",
          options: [
            { label: "巡检点编号", value: "pointCode" },
            { label: "巡检点名称", value: "pointName" },
            { label: "RFID", value: "RFID" },
            { label: "GIS定位", value: "GIS" },
            { label: "执行人姓名", value: "executorName" },
            { label: "执行人科室", value: "executorDepart" },
            { label: "执行人工号", value: "executorJobNum" },
          ],
        },
        {
          label: "创建时间",
          type: "datetimerange",
          key: ["startTime", "endTime"],
          elAttrs: {
            "end-placeholder": "结束时间",
            "start-placeholder": "开始时间",
            "value-format": "yyyy-MM-dd HH:mm:ss",
            "default-time": ["00:00:00", "23:59:59"],
          },
          component: "el-date-picker",
        },
      ],
      columns: {
        index: { width: 50 },
        pointCode: { width: 100 },
        pointName: { width: 150, "show-overflow-tooltip": true },
        areaStr: { width: 150, "show-overflow-tooltip": true },
        RFID: { width: 200, "show-overflow-tooltip": true },
        inspectType: {
          width: 100,
          formatter(row) {
            return row.inspectType === "site" ? "现场巡检" : "设备巡检";
          },
        },
        GIS: { width: 130, "show-overflow-tooltip": true },
        phtotNum: { width: 80 },
        inspectionTaskName: { width: 150, "show-overflow-tooltip": true },
        executorName: {
          width: 120,
          formatter(row) {
            return row.executorName + "，" + row.executorDepartName;
          },
          "show-overflow-tooltip": true,
        },
        createdTime: { width: 180, "show-overflow-tooltip": true },
        abnormal: {
          formatter(row) {
            return row.abnormal ? "异常" : "正常";
          },
        },
      },
      fetcher: inspection.record.getRecordList,
    };
  },
  mounted() {
    this.show = true;
  },
  methods: {
    fastInputDay(dis) {
      let now = dayjs();
      let key = JSON.stringify(["startTime", "endTime"]);
      let start = dayjs().format("YYYY-MM-DD") + " 00:00:00";
      if (dis) {
        start = dayjs(now)
          .add(dis, "d")
          .format("YYYY-MM-DD HH:mm:ss");
      }
      this.$refs.refTable.setParamsVal({
        [key]: [start, now.format("YYYY-MM-DD HH:mm:ss")],
      });
      this.$refs.refTable.loadData();
    },
    clickHandler(item) {
      this.$router.push("/operations/inspection/record/detail?id=" + item.id);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/variables.scss";
.record-list::v-deep {
  .table-header {
    padding-left: 20px;
  }
  .table-header-row {
    flex: unset;
  }
  .table-header-btns {
    flex-direction: row-reverse;
  }
  .fast-input {
    margin-left: 10px;
    .el-button {
      height: 32px;
      line-height: 8px;
      width: 68px;
      padding-left: 0;
      padding-right: 0;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid #4d4d4d;
    }
  }
}
</style>
