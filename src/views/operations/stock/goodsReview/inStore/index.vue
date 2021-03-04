<!-- @format -->

<template>
  <div>
    <div class="filters">
      <div class="left">
        <CompositeInput
          v-model="keywords"
          :options="options"
          @search="search"
          style="width:100%;"
        ></CompositeInput>
      </div>
      <div class="right">
        <el-button size="mini" type="primary" plain @click="openMore"
          >更多</el-button
        >
      </div>
    </div>
    <Charts></Charts>

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
                <use xlink:href="#iconshenhe"></use>
              </svg>
            </div>
          </div>
          <div class="currency-item-right">
            <div class="currency-item-top">
              <div class="currency-item-title">{{ item.name }}({{ item.model }})</div>
              <div>{{ statusName(item.status) }}</div>
            </div>
            <el-row class="currency-item-msgs">
              <el-col
                :span="citem.span"
                class="currency-item-msgItem"
                v-for="(citem, cindex) in contents"
                :key="cindex"
              >
                {{ citem.title }}：{{ citem.unit }}{{ citem.format ?  citem.format(item[citem.key]) : item[citem.key] }}</el-col
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
      <Record :id="id" :isReview="true"></Record>
      <div class="dialog-bottom" v-if="activeItem.status == 1">
        <el-button size="mini" type="primary">同意</el-button>
        <el-button size="mini" type="danger" plain>拒绝</el-button>
      </div>
    </DarkDialog>
    <DarkDialog v-model="moreDialog">
      <MoreReview :propsCurrent="'2'"></MoreReview>
    </DarkDialog>
  </div>
</template>
<script>
import Charts from "../../goodsManage/components/Charts";
import { CompositeInput } from "@/components/App/FormFilters";
import DarkDialog from "@/components/App/DarkDialog";
import Record from "../../goodsIn/components/Record";
import MoreReview from "../components/MoreReview";

import Lists from "../../components/Lists";
import stock from "@/api/operations/stock";
let statusNames = {
  "1": "待审核",
  "2": "已通过",
  "3": "已驳回",
};
export default {
  name: "OperationsStockgoodsReviewInStore",
  meta: {
    title: "入库",
    hideMenu: true,
  },
  components: {
    Charts,
    CompositeInput,
    Lists,
    DarkDialog,
    Record,
    MoreReview,
  },
  data() {
    return {
      keywords: {
        type: "",
        keywords: "",
      },
      options: [
        {
          label: "选项1",
          value: "1",
        },
      ],

      pageNum: 1,
      pageSize: 10,
      total: 10,
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
          title: "类型",
          key: "inType",
          span: 14,
          format(type){
            return type == 1 ? '采购' : '报溢'
          },
        },
        {
          title: "入库单价",
          key: "price",
          unit: "￥",
          span: 10,
        },
        {
          title: "入库数量",
          key: "number",
          span: 14,
        },
        {
          title: "操作人",
          key: "actionUser",
          span: 10,
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
          title: "物资审核",
        },
      },

      id: "",
      activeItem: {},
      detailDialog: {
        dialogVisible: false,
        binds: {
          title: "物资入库单",
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
      let res = await stock.goodsReview.inStoreReviewList({});
      this.lists = res.list;
      this.total = res.total;
      this.loading = false;
    },
    openDetail(item) {
      //弹窗获取详情
      this.id = item.id;
      this.activeItem = item;
      this.detailDialog.dialogVisible = true;
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
  padding: 10px;
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
.dialog-bottom {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-top: 1px solid hsla(0, 0%, 100%, 0.3);
}
</style>
