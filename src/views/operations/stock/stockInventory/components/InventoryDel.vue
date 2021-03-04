<!-- @format -->

<template>
  <!-- <DarkDialog v-model="detailDialog"> -->
  <div class="repair-detail">
    <el-row class="main-msg" v-loading="dialogLoading">
      <el-col :span="8">盘点名称：{{InventoryDetail.name}}</el-col>
      <el-col :span="8">盘点设备：{{InventoryDetail.equipmentNumber}}种</el-col>
      <el-col :span="8">库存修复：{{InventoryDetail.stockRepair}}</el-col>
      <el-col :span="8">盘点人：{{InventoryDetail.inventoryUser}} {{InventoryDetail.dept}}</el-col>
      <el-col :span="8">盘点结果：{{InventoryDetail.result}}</el-col>
      <el-col :span="8">盘点时间：{{InventoryDetail.inventoryTime}}</el-col>
      <el-col :span="8">创建日期：{{InventoryDetail.createTime}}</el-col>
    </el-row>
    <DarkMenu
      :navs="navs"
      v-model="current"
      :noRouter="true"
      class="gray"
    ></DarkMenu>
    
    <div class="repair-detail-main">
      <StockDetail
        v-if="current == 1 "
        :id="id"
      ></StockDetail>
      <Abnormal
        v-if="current == 2 "
        :id="id"
      ></Abnormal>
      <Journal v-if="current == 3" :id="InventoryDetail.id"></Journal>
    </div>
  </div>
  <!-- </DarkDialog> -->
</template>
<script>
// import DarkDialog from "@/components/App/DarkDialog";
import stock from "@/api/operations/stock";
import { DarkMenu } from "@/components/App";
import StockDetail from "./StockDetail";
import Abnormal from "./Abnormal";
import Journal from "./Journal";
let statusNames = {
  "1": "待审核",
  "2": "已通过",
  "3": "已驳回",
};
export default {
  name: "InventoryDetail",
  components: {
    // DarkDialog,
    DarkMenu,
    StockDetail,
    Abnormal,
    Journal,
  },
  props: {
    id: {
      type: String,
    },
  },
  data() {
    return {
      dialogLoading: false,

      navs: [
        {
          path: "1",
          text: "库存详情",
        },
        {
          path: "2",
          text: "异常库存",
        },
        {
          path: "3",
          text: "操作日志",
        },
      ],
      current: "1",
      InventoryDetail: {},
    };
  },
  watch: {
    id: {
      handler() {
        this.openDetail();
        // id
      },
      immediate: true,
    },
  },
  methods: {
    statusName(key) {
      return statusNames[key];
    },
    async openDetail() {
      //弹窗获取详情
      this.current = "1";
      this.dialogLoading = true;
      this.InventoryDetail = {};
      this.InventoryDetail = await stock.stockInventory.InventoryDetail({
        id: this.id,
      });
      console.log(this.InventoryDetail);
      this.dialogLoading = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.repair-detail {
  font-size: 14px;
  color: #fff;
  .main-msg {
    padding: 10px 20px;
    line-height: 34px;
  }
}
</style>
