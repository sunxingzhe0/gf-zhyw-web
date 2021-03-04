<template>
  <Table :fetcher="fetcher" :columns="columns" :searchBtn="false"></Table>
</template>
<script>
/*
@author        qiang
@name          OperateLog
@desc          巡检点详情-操作日志
@props         pointId      string      巡检点id
@emit
*/
import { Table } from "@/components/Base";
import inspection from "@/api/operations/inspection";
export default {
  name: "OperateLog",
  props: {
    pointId: {
      type: String,
      required: true,
    },
  },
  components: {
    Table,
  },
  data() {
    return {
      columns: {
        index: { width: 200 },
        content: { width: 350 },
        executotName: { width: 350 },
        createdTime: { width: 300 },
      },
      fetcher: inspection.point.getOperateLog,
    };
  },
};
</script>
<style lang="scss" scoped></style>
