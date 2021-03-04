<!-- @format -->

<template>
  <!-- <DarkDialog v-model="detailDialog"> -->
  <div class="repair-detail" v-loading="dialogLoading">
    <el-row class="main-msg">
      <el-col :span="8">单据号：{{ applyDetail.id }}</el-col>
      <el-col :span="8">创建日期：{{ applyDetail.createTime }}</el-col>
      <el-col :span="8">单据状态：{{ statusName(applyDetail.status) }}</el-col>
    </el-row>
    <DarkMenu
      :navs="navs"
      v-model="current"
      :noRouter="true"
      class="gray"
    ></DarkMenu>
    <div class="repair-detail-main">
      <Detail
        v-if="current == 1 && applyDetail.content"
        :content="applyDetail.content"
      ></Detail>
      <Approval
        v-if="current == 2 && applyDetail.approval"
        :content="applyDetail.approval"
      ></Approval>
      <Journal v-if="current == 3" :id="applyDetail.id"></Journal>
    </div>
  </div>
  <!-- </DarkDialog> -->
</template>
<script>
// import DarkDialog from "@/components/App/DarkDialog";
import stock from "@/api/operations/stock";
import { DarkMenu } from "@/components/App";
import Detail from "./Detail";
import Approval from "./Approval";
import Journal from "./Journal";
let statusNames = {
  "1": "待审核",
  "2": "已通过",
  "3": "已驳回",
};
export default {
  name: "ApplyDetail",
  components: {
    // DarkDialog,
    DarkMenu,
    Detail,
    Approval,
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
          text: "申领内容",
        },
        {
          path: "2",
          text: "审批情况",
        },
        {
          path: "3",
          text: "申领日志",
        },
      ],
      current: "1",
      applyDetail: {},
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
      this.applyDetail = {};
      this.applyDetail = await stock.goodsApply.applyDetail({
        id: this.id,
      });
      console.log(this.applyDetail);
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
    padding: 20px;
    line-height: 14px;
    padding-bottom: 13px;
  }
  // background: rgba(255, 255, 255, 0.1);
  // width: 100%;
  // height: 50px;
  .repair-detail-main {
    padding: 20px;
  }
}
</style>
