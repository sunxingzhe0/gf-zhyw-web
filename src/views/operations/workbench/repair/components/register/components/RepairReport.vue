<!-- @format -->

<template>
  <!-- <DarkDialog v-model="detailDialog"> -->
  <div class="repair-detail" v-loading="dialogLoading">
    <el-row class="main-msg">
      <el-col :span="8">单据号：{{ repairDetail.id }}</el-col>
      <el-col :span="8">创建日期：{{ repairDetail.createTime }}</el-col>
      <el-col :span="8">单据状态：{{ repairDetail.status }}</el-col>
    </el-row>
    <DarkMenu
      :navs="navs"
      v-model="current"
      :noRouter="true"
      class="gray"
    ></DarkMenu>
    <div class="repair-detail-main">
      <Content
        v-if="current == 1 && repairDetail.content"
        :content="repairDetail.content"
      ></Content>
      <Situation
        v-if="current == 2 && repairDetail.situation"
        :content="repairDetail.situation"
      ></Situation>
      <Journal v-if="current == 3" :id="repairDetail.id"></Journal>
    </div>
  </div>
  <!-- </DarkDialog> -->
</template>
<script>
// import DarkDialog from "@/components/App/DarkDialog";
import workbench from "@/api/operations/workbench";
import { DarkMenu } from "@/components/App";
import Content from "./Content";
import Situation from "./Situation";
import Journal from "./Journal";
export default {
  name: "RepairReport",
  components: {
    // DarkDialog,
    DarkMenu,
    Content,
    Situation,
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
          text: "报修内容",
        },
        {
          path: "2",
          text: "维修情况",
        },
        {
          path: "3",
          text: "报修日志",
        },
      ],
      current: "1",
      repairDetail: {},
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
    async openDetail() {
      //弹窗获取详情
      this.current = "1";
      this.dialogLoading = true;
      this.repairDetail = {};
      this.repairDetail = await workbench.repair.registerDetail({
        id: this.id,
      });
      console.log(this.repairDetail);
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
