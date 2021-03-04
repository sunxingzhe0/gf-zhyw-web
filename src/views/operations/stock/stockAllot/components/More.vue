<!-- @format -->

<template>
  <div class="repair-more main" v-loading="loading">
    <div class="filters dark-form">
      <div class="left">
        <el-input
          placeholder="关键字"
          v-model="query.keywords"
          style="width:300px;margin-right:20px"
          size="small"
        >
          <el-select
            v-model="query.type"
            slot="prepend"
            class="prepend"
            placeholder="请选择"
          >
            <el-option label="全部" value=""></el-option>
            <el-option
              :label="item.label"
              :value="item.value"
              v-for="(item, index) in options"
              :key="index"
            ></el-option>
          </el-select>
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="search"
          ></el-button>
        </el-input>
      </div>
      <div class="right">
        <div class="label" style="line-height:28px;color:#fff">创建时间：</div>
        <el-date-picker
          v-model="query.dateRange"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          style="width:360px;margin-right:10px"
          size="small"
        >
        </el-date-picker>
      </div>
    </div>
    <Table v-model="query" :columns="columns" :tableData="tableData">
      <template v-slot:fixed="{ row }">
        <el-button type="text" v-if="row.status == 1">同意</el-button>
        <el-button type="text" v-if="row.status == 1">拒绝</el-button>
        <el-button type="text" v-if="row.status == 4">出货</el-button>
        <el-button type="text" v-if="row.status == 5">签收</el-button>
      </template>
      <!-- <template v-slot:fixed="{ row }">
        <el-button type="text" @click="$emit('edit',row)">编辑</el-button>
      </template> -->
    </Table>
  </div>
</template>
<script>
import { Table, TableMixin } from "@/components/App";
// import workbench from "@/api/operations/workbench";
import stock from "@/api/operations/stock";
// import { DarkSelect } from "@/components/App/FormFilters";

let statusNames = {
  "1": "待审核",
  "2": "已通过",
  "3": "已驳回",
  "4": "待出货",
  "5": "出货中",
  "6": "已完成",
};
export default {
  components: {
    Table,
    // DarkSelect,
  },
  props: ["allotType"],
  mixins: [
    TableMixin([
      {
        fetchListFunction: stock.stockAllot.allotList,
        // fetchListFunction: async (e) => {
        //   console.log(e);
        //   const res = await stock.stockAllot.allotList({
        //     // ...this.query,
        //     // allotType: this.allotType,
        //   });
        //   console.log(res);
        //   return res;
        // },
      },
    ]),
  ],
  data() {
    return {
      // keywords: {
      // },
      options: [
        {
          label: "调拨名称",
          value: "1",
        },
      ],
      query: {
        pageSize: 10,
        pageNum: 1,
        type: "1",
        keywords: "",
        dateRange: "",
        allotType: this.allotType,
      },
      columns: {
        index: {
          hidden: true,
        },
        status: {
          formatter(row) {
            return statusNames[row.status];
          },
        },
      },
    };
  },
  mounted() {},
  methods: {
    search() {
      console.log(this.query);
    },
  },
};
</script>
<style lang="scss" scope>
@import "@/assets/css/variables.scss";
.main {
  padding-bottom: 20px;
  .filters {
    display: flex;
    padding: 20px;
    align-items: center;
    justify-content: space-between;
    & > div {
      display: flex;
      align-items: center;
    }
  }
}
</style>

<style lang="scss">
.repair-more {
  .c__list .el-table {
    height: calc(70vh - 190px) !important;
  }
}
</style>
