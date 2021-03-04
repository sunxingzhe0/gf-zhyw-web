<!-- @format -->

<template>
  <div>
    <div class="statistics-filter">
      <div @click="openMore()">库存统计</div>
      <div class="statistics-filter-right">
        <el-button size="mini" type="primary" plain>近七天</el-button>
        <el-button size="mini" type="primary" plain style="margin-right:10px">
          近30日
        </el-button>
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
    </div>
    <Chart></Chart>

    <Lists>
      <div
        class="currency-card-item"
        v-for="(item, index) in lists"
        :key="index"
      >
        <div class="currency-item-content">
          <div class="currency-item-content-left">
            <div class="status currency-item-icon">
              <svg class="iconfont" aria-hidden="true">
                <use xlink:href="#icondianpukucuntongji"></use>
              </svg>
            </div>
          </div>
          <div class="currency-item-right">
            <div class="currency-item-top">
              <div class="currency-item-title apply-content">
                <span>{{ item.name }}</span
                >({{ item.model }})
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
import Chart from "./components/Chart";
import Lists from "../components/Lists";
import stock from "@/api/operations/stock";
import More from "./components/More";

export default {
  name: "OperationsStockUseRecord",
  meta: {
    title: "领用记录",
    hideMenu: true,
  },
  components: { Chart, Lists, DarkDialog, More },
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
          title: "物资编码",
          key: "code",
          span: 14,
        },
        {
          title: "生产商",
          key: "manufacturer",
          span: 10,
        },
        {
          title: "设备类型",
          key: "equipmentType",
          span: 14,
        },
        {
          title: "物资单位",
          key: "unit",
          span: 10,
        },
        {
          title: "库存数量",
          key: "number",
          span: 14,
        },
        {
          title: "入库数量",
          key: "inNumber",
          span: 10,
        },
        {
          title: "出库数量",
          key: "OutNumber",
          span: 24,
        },
      ],
      moreDialog: {
        dialogVisible: false,
        binds: {
          title: "库存统计列表",
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
      let res = await stock.statistics.statisticsList({});
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
.statistics-filter {
  // background-color: rgba(0, 0, 0, 0.8);
  padding: 10px;
  padding-bottom: 7px;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  .statistics-filter-right {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  &::v-deep {
    .el-button--primary {
      border-radius: 0;
      padding: 7 14px;
    }
    .el-button--primary.is-plain:focus,
    .el-button--primary.is-plain:hover {
      background: rgba(0, 113, 227, 0.2);
      color: #0071e3;
    }
  }
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
