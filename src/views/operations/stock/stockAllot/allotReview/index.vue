<!-- @format -->

<template>
  <div>
    <div class="filters">
      <div class="left">
        <CompositeInput
          v-model="keywords"
          :options="options"
          @search="search"
          style="width:220px;"
        ></CompositeInput>
      </div>
      <div class="right">
        <el-button size="mini" type="primary" plain @click="openMore"
          >更多</el-button
        >
      </div>
    </div>

    <Lists>
      <div
        class="currency-card-item"
        v-for="(item, index) in lists"
        :key="index"
        @click="openDetail(item)"
      >
        <div class="currency-item-content">
          <div class="currency-item-content-left">
            <div class="status currency-item-icon">
              <svg class="iconfont" aria-hidden="true">
                <use xlink:href="#icontiaobodan"></use>
              </svg>
            </div>
          </div>
          <div class="currency-item-right">
            <div class="currency-item-top">
              <div class="currency-item-title">
                {{ item.title }}
              </div>
              <div>{{ statusName(item.status) }}</div>
            </div>
            <el-row class="currency-item-msgs">
              <el-col
                :span="citem.span"
                class="currency-item-msgItem"
                v-for="(citem, cindex) in contents"
                :key="cindex"
              >
                {{ citem.title }}：{{ citem.unit
                }}{{
                  citem.format ? citem.format(item[citem.key]) : item[citem.key]
                }}</el-col
              >
            </el-row>
          </div>
        </div>
        <div class="currency-item-bottom">
          <el-button type="text">同意</el-button>
          <el-divider direction="vertical" class="divider"></el-divider>
          <el-button type="text" style="color:#F74A4A">拒绝</el-button>
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
    <DarkDialog v-model="detailDialog">
      <AllotDetail :id="id"></AllotDetail>
    </DarkDialog>
    <DarkDialog v-model="moreDialog">
      <More :allotType="'1'"></More>
    </DarkDialog>
  </div>
</template>
<script>
// import Charts from "../../goodsManage/components/Charts";
import { CompositeInput } from "@/components/App/FormFilters";
import DarkDialog from "@/components/App/DarkDialog";
import AllotDetail from "../components/AllotDetail";
import More from "../components/More";

import Lists from "../../components/Lists";
import stock from "@/api/operations/stock";
let statusNames = {
  "1": "待审核",
  "2": "已通过",
  "3": "已驳回",
  "4": "待出货",
  "5": "出货中",
  "6": "已完成",
};
export default {
  name: "OperationsStockGoodsReviewAllotReview",
  meta: {
    title: "调拨审核",
  },
  components: {
    // Charts,
    CompositeInput,
    Lists,
    DarkDialog,
    AllotDetail,
    More,
  },
  data() {
    return {
      keywords: {
        type: "",
        keywords: "",
      },
      options: [
        {
          label: "调拨标题",
          value: "1",
        },
      ],

      pageNum: 1,
      pageSize: 10,
      total: 10,
      lists: [],
      contents: [
        // title: () => "调拨" + Random.csentence(3, 5), // 库存调拨标题
        // allotType: "正常转移", // 库存调拨类型
        // applyStore: () => "仓库" + Random.csentence(3, 5), // 申请仓库
        // outStore: () => "仓库" + Random.csentence(3, 5), // 出货仓库
        // inStore: () => "仓库" + Random.csentence(3, 5), // 入货仓库
        // allotNumber: () => Random.natural(1, 100), // 调拨物资数量
        // reason: () => Random.csentence(20, 30), //调拨理由
        // createTime: () => Random.datetime(), //创建时间[2020-12-12 12:12:12]
        // "status|1": ["1", "2", "3", "4", "5", "6"], // 状态 1待审核 2已通过 3已驳回 4待出货 5出货中 6已完成
        {
          title: "调拨类型",
          key: "allotType",
          span: 14,
        },
        {
          title: "申请仓库",
          key: "applyStore",
          span: 10,
        },
        {
          title: "出货仓库",
          key: "outStore",
          span: 14,
        },
        {
          title: "入货仓库",
          key: "inStore",
          span: 10,
        },
        {
          title: "调拨物资数量",
          key: "allotNumber",
          span: 24,
        },
        {
          title: "调拨理由",
          key: "reason",
          span: 24,
        },
        {
          title: "创建时间",
          key: "createTime",
          span: 24,
        },
      ],

      moreDialog: {
        dialogVisible: false,
        binds: {
          title: "调拨审核列表",
        },
      },

      id: "",
      activeItem: {},
      detailDialog: {
        dialogVisible: false,
        binds: {
          title: "调拨申请单详情",
        },
      },
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    statusName(key) {
      return statusNames[key];
    },
    search() {
      this.getList();
    },
    async getList() {
      this.loading = true;
      let res = await stock.stockAllot.allotList({
        allotType: "1",
      });
      this.lists = res.list;
      this.total = res.total;
      this.loading = false;
    },
    openDetail(item) {
      //弹窗获取详情
      this.id = item.id;
      this.activeItem = item;
      this.detailDialog.dialogVisible = true;
      console.log(this.detailDialog.dialogVisible);
    },
    openMore() {
      this.moreDialog.dialogVisible = true;
    },
  },
};
</script>
<style lang="scss" scoped>
.filters {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  padding-bottom: 0;
  // background-color: rgba(0, 0, 0, 0.8);
  // border-top: 1px solid rgba(255, 255, 255, 0.3);
  .left {
    padding-right: 10px;
  }
  // .right {
  //   display: flex;
  //   align-items: center;
  //   justify-content: flex-end;
  // }
}
.currency-card-item .currency-item-top .currency-item-title.apply-content {
  span {
    max-width: 200px;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
