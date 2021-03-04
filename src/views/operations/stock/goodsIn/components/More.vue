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
        <el-button size="small" type="primary" plain>近七天</el-button>
        <el-button size="small" type="primary" plain style="margin-right:10px">
          近30日
        </el-button>
        <div class="label" style="line-height:28px;color:#fff">入库时间：</div>
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
        <!-- <el-date-picker v-model="query.date" type="date" placeholder="请选择" size="small"></el-date-picker> -->
        <el-button size="small" type="primary" @click="$emit('addNew')">
          新增
        </el-button>
      </div>
    </div>
    <Table v-model="query" :columns="columns" :tableData="tableData">
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

export default {
  components: {
    Table,
    // DarkSelect,
  },
  props: ["id"],
  mixins: [
    TableMixin([
      {
        fetchListFunction: stock.goodsIn.goodsInList,
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
        user: "",
        dateRange: "",
        store: "1",
      },
      columns: {
        index: {
          hidden: true,
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
