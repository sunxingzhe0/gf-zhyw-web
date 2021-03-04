<!-- @format -->

<template>
  <div class="main">
    <div class="filters dark-form">
      <div class="left">
        <DarkSelect
          v-model="query"
          :selectKey="'user'"
          :options="optionsUser"
          style="margin-right:20px"
          @search="search"
          title="申领人"
        ></DarkSelect>
        <el-input
          placeholder="请输入"
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
        <!-- <CompositeInput
          v-model="query"
          :inputKey="'keywords'"
          :selectKey="'type'"
          :options="options"
          @search="search"
          class="middle"
          style="width:300px;margin-right:20px"
        ></CompositeInput> -->
      </div>
      <div class="right">
        <DarkSelect
          v-model="query"
          :selectKey="'date'"
          :options="optionsTime"
          @search="search"
          title="申领日期"
        ></DarkSelect>
        <el-button style="margin-left:10px" type="primary" plain size="mini"
          >申领条件</el-button
        >
      </div>
    </div>
    <Table v-model="query" :columns="columns" :tableData="tableData"> </Table>
  </div>
</template>
<script>
import { Table, TableMixin } from "@/components/App";
import xrepairtube from "@/api/operations/xrepairtube";
import { DarkSelect } from "@/components/App/FormFilters";

export default {
  components: {
    Table,
    DarkSelect,
  },
  props: ["id"],
  mixins: [
    TableMixin([
      {
        fetchListFunction: xrepairtube.workorder.getRecord,
      },
    ]),
  ],
  data() {
    return {
      // keywords: {
      // },
      options: [
        {
          label: "申领内容",
          value: "1",
        },
      ],
      optionsUser: [
        {
          label: "王尼玛",
          value: "1",
        },
      ],
      optionsTime: [
        {
          label: "2020-12-31 16:40:00",
          value: "2020-12-31 16:40:00",
        },
      ],
      query: {
        pageSize: 10,
        pageNum: 1,
        type: "1",
        keywords: "",
        user: "",
        date: "",
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
