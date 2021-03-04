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
        <el-button size="small" type="primary" plain>一键平仓</el-button>
      </div>
    </div>
    <Table v-model="query" :columns="columns" :tableData="tableData">
      <template v-slot:slot_inventoryNumber="{ row }"
        ><span class="green-text"> {{ row.inventoryNumber }}</span></template
      >
      <template v-slot:slot_abnormalNumber="{ row }"
        ><span class="green-text">{{ computeNumber(row) }}</span></template
      >
      <template v-slot:fixed="{ row }">
        <el-button type="text" v-if="row">报溢</el-button>
      </template>
    </Table>
  </div>
</template>
<script>
import { Table, TableMixin } from "@/components/App";
// import workbench from "@/api/operations/workbench";
import stock from "@/api/operations/stock";
// import { DarkSelect } from "@/components/App/FormFilters";

export default {
  components: {
    Table,
    // DarkSelect,
  },
  props: ["id"],
  mixins: [
    TableMixin([
      {
        fetchListFunction: stock.stockInventory.AbnormalStockList,
        // fetchListFunction: async () => {
        //   const res = await workbench.repair.registerList();
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
          label: "物资名称",
          value: "1",
        },
      ],
      query: {
        pageSize: 10,
        pageNum: 1,
        type: "1",
        keywords: "",
      },
      columns: {
        index: {
          hidden: true,
        },
        price: {
          formatter(row) {
            return "￥" + row.price;
          },
        },
        inventoryNumber: {
          prop: "slot_inventoryNumber",
        },
        abnormalNumber: {
          prop: "slot_abnormalNumber",
        },
      },
    };
  },
  mounted() {},
  methods: {
    //计算差异
    computeNumber(row) {
      let res = row.number - row.inventoryNumber;
      return res > 0 ? "+" + res : res;
    },
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
.green-text{
  color: #08D208;
}
</style>

<style lang="scss">
.repair-more {
  .c__list .el-table {
    height: calc(70vh - 190px) !important;
  }
}
</style>
