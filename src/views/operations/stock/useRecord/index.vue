<!-- @format -->

<template>
  <div>
    <div class="filter">
      <div></div>
      <el-input
        placeholder="按日期筛选"
        v-model="dateTime"
        class="dark-composite-input composite-input"
        size="mini"
        style="width:140px"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="search"
        ></el-button>
      </el-input>
    </div>
    <DateChart></DateChart>
    <div class="filter">
      <div></div>
      <el-select v-model="chartType" placeholder="请选择" size="mini">
        <el-option label="设备类型" value="1"> </el-option>
        <el-option label="物资名称" value="2"> </el-option>
      </el-select>
    </div>
    <TypeChart></TypeChart>

    <div class="filter">
      <div class="useRecord-flex">
        <span style="font-size: 14px;white-space: nowrap;">领用人：</span>
        <el-select
          v-model="useUser"
          placeholder="请选择"
          size="mini"
          style="width:100px"
        >
          <el-option
            :label="item.label"
            :value="item.value"
            v-for="(item, index) in useUserOptions"
            :key="index"
          >
          </el-option>
        </el-select>
      </div>

      <CompositeInput
        v-model="keywords"
        :options="options"
        @search="search"
        style="width:240px;margin-left:10px"
      ></CompositeInput>
    </div>

    <Lists>
      <div
        class="currency-card-item"
        v-for="(item, index) in lists"
        :key="index"
        @click="openMore(item)"
      >
        <div class="currency-item-content">
          <div class="currency-item-content-left">
            <div class="status currency-item-icon">
              <svg class="iconfont" aria-hidden="true">
                <use xlink:href="#iconlingyongjilu1"></use>
              </svg>
            </div>
          </div>
          <div class="currency-item-right">
            <div class="currency-item-top">
              <div class="currency-item-title apply-content">
                <span>{{ item.name }}</span
                >({{ item.type }})
              </div>
            </div>
            <el-row class="currency-item-msgs">
              <el-col
                :span="citem.span"
                class="currency-item-msgItem"
                v-for="(citem, cindex) in contents"
                :key="cindex"
              >
                {{ citem.title }}：{{ citem.unit }}{{ item[citem.key] }}</el-col
              >
            </el-row>
          </div>
        </div>
      </div>
    </Lists>

    <div class="pages">
      <el-pagination
        small
        background
        @size-change="getList"
        @current-change="getList"
        :current-page="pageNum"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, prev, pager, next"
        :total="total"
        :pager-count="5"
      >
      </el-pagination>
    </div>

    <DarkDialog v-model="moreDialog">
      <More></More>
    </DarkDialog>
  </div>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import { CompositeInput } from "@/components/App/FormFilters";
import DarkDialog from "@/components/App/DarkDialog";
import DateChart from "./components/DateChart";
import TypeChart from "./components/TypeChart";
import Lists from "../components/Lists";
import stock from "@/api/operations/stock";
import More from "./components/More";

export default {
  name: "OperationsStockUseRecord",
  meta: {
    title: "领用记录",
    hideMenu: true,
  },
  components: { DateChart, TypeChart, CompositeInput, Lists, DarkDialog, More },
  data() {
    return {
      keywords: {
        type: "1",
        keywords: "",
      },
      dateTime: "",
      pageNum: 1,
      pageSize: 10,
      total: 10,
      options: [
        {
          label: "物资名称",
          value: "1",
        },
      ],
      chartType: "1",

      useUserOptions: [],
      useUser: "",

      lists: [],
      contents: [
        {
          title: "领用人姓名",
          key: "applyName",
          span: 14,
        },
        {
          title: "领用人工号",
          key: "applyUserNo",
          span: 10,
        },
        {
          title: "领用数量",
          key: "number",
          span: 14,
        },
        {
          title: "申领科室",
          key: "dept",
          span: 10,
        },
        {
          title: "领用时间",
          key: "applyTime",
          span: 24,
        },
      ],
      moreDialog: {
        dialogVisible: false,
        binds: {
          title: "领用记录列表",
        },
      },
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    search() {
      this.getList();
    },

    async getList() {
      this.loading = true;
      let res = await stock.useRecord.useRecordList({});
      this.lists = res.list;
      this.total = res.total;
      this.loading = false;
    },
    openMore() {
      this.moreDialog.dialogVisible = true;
    },
  },
};
</script>
<style lang="scss" scoped>
.useRecord-flex {
  display: flex;
  align-items: center;
}
.filter {
  background-color: rgba(0, 0, 0, 0.8);
  padding: 10px;
  padding-bottom: 7px;
  display: flex;
  justify-content: space-between;
}
.pages {
  position: absolute;
  bottom: 0;
  width: 100%;
  z-index: 2;
  // background-color: rgba(0, 0, 0, 0.8);
  background: rgba(26, 26, 26, 1);
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.3);
}
</style>
