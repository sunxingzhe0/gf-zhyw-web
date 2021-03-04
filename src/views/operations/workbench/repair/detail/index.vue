<!-- @format -->

<template>
  <AppDialog
    router
    :show.sync="show"
    :elAttrs="elAttrs"
    @close="closeHandler"
    :title="'故障报修'"
  >

  <div class="repair-detail" v-loading="dialogLoading">
    <el-row class="main-msg">
      <el-col :span="8">单据号：{{ repairDetail.id }}</el-col>
      <el-col :span="8">创建日期：{{ repairDetail.createTime }}</el-col>
      <el-col :span="8">单据状态：{{ RepairFormStatus[repairDetail.state] }}</el-col>
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
  </AppDialog>
</template>
<script>
import { mapState } from "vuex";
// import { Table, TableMixin } from "@/components/App";
import workbench from "@/api/operations/workbench";
// import { DarkSelect } from "@/components/App/FormFilters";
import { AppDialog } from "@/components/App";
import { ReportBtns } from "@/views/operations/constant";
import { DarkMenu } from "@/components/App";
import Content from "./components/Content";
import Situation from "./components/Situation";
import Journal from "./components/Journal";

export default {
  name: "OperationsWorkbenchRepairDetail",
  meta: {
    title: "报修登记详情",
    hideMenu: true,
  },
  components: {
    AppDialog,
    DarkMenu,
    Content,
    Situation,
    Journal,
    // DarkSelect,
    // Table,
  },
  mixins: [
    // TableMixin([
    //   {
    //     fetchListFunction: workbench.repair.registerList,
    //   },
    // ]),
  ],
  data() {
    return {
      ReportBtns,
      //身份模拟
      role: "dispatcher",

      elAttrs: {
        "before-close": this.beforeClose,
      },
      show: false,

      
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

      id:this.$route.query.id

    };
  },
  mounted() {
    this.show = true;
    this.openDetail()
    
  },
  computed: {
    ...mapState({
      RepairFormStatus: (state) => state.operations.status.RepairFormStatus,
    }),
  },
  methods: {
    beforeClose(done) {
      console.log("before close");
      done();
    },
    closeHandler() {
      this.$emit("close");
    },
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
