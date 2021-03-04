<!-- @format -->

<template>
  <Table
    :params="params"
    :columns="columns"
    :fetcher="fetcher"
    :searchBtn="false"
  >
  </Table>
</template>
<script>
/*
@author        dusheng
@name          Content
@desc          库存盘点
@emit
*/
import { Table } from "@/components/Base";
import stock from "@/api/operations/stock";
export default {
  name: "Content",
  components: {
    Table,
  },
  props: {
    pointId: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      params: [
        {
          component: "FlexInput",
          default: { keyword: "" },
          options: [
            { label: "盘点名称", value: "keyword" },
            { label: "盘点人", value: "keyword2" },
          ],
        },
        {
          key: "date",
          type: "datetimerange",
          label: "盘点日期",
          component: "el-date-picker",
        },
        // {
        //   key: "createTime",
        //   type:"daterange",
        //   label: "创建日期",
        //   component: "el-date-picker",
        // },
      ],
      columns: {
        inventoryTime: {
          "show-overflow-tooltip": true,
        },
        createTime: {
          "show-overflow-tooltip": true,
        },
        name: {
          "show-overflow-tooltip": true,
        },
        operate: {
          label: "操作",
          renderFun: this.renderOperate,
          width:140,
          fixed:"right"
        },
      },
      fetcher: this.fetcherMethod,
    };
  },
  methods: {
    fetcherMethod() {
      // params.pointId = this.pointId;
      return stock.stockInventory.stockInventoryList();
    },
    renderOperate(scope) {
      return (
        <span>
          <el-button type="text" onClick={() => this.download(scope.row)}>
            下载
          </el-button>
          <el-button type="text" onClick={() => this.download(scope.row)}>
            修复
          </el-button>
          <el-button type="text" onClick={() => this.download(scope.row)}>
            录入
          </el-button>
        </span>
      );
    },
    download(row) {
      console.log(row);
    },
    editItem(item) {
      console.log(item);
    },
  },
};
</script>
<style lang="scss" scoped></style>
