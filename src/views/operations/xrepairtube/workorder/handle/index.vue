<template>
  <!-- 待处理 -->
  <div class="page-handle">
    <WaitList :listData="listData" @showOrderInfo="showOrderInfo" />
    <div class="pagination" v-if="$store.state.operations.isShowPage">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="10"
        layout="total, prev, pager, next"
        :total="30"
        :pager-count="maxPage"
      >
      </el-pagination>
    </div>
    <!-- 维修工单详情弹窗 -->
    <DarkDialog v-model="orderDetails">
      <div class="repair-detail">
        <el-row class="main-msg">
          <el-col :span="8">单据号：{{ workOrderInfo.id }}</el-col>
          <el-col :span="8">创建日期：{{ workOrderInfo.createTime }}</el-col>
          <el-col :span="8">单据状态：{{ workOrderInfo.status }}</el-col>
        </el-row>
        <DarkMenu
          @select="selectMenu"
          :navs="orderNavs"
          :current="current"
          :noRouter="true"
          class="gray"
        ></DarkMenu>
        <div class="repair-detail-main">
          <Content
            v-if="current == 1"
            :content="workOrderInfo.content"
          ></Content>
          <RepairInfo
            v-else-if="current == 2"
            :maintenance="workOrderInfo.maintenance"
          ></RepairInfo>
          <Tracks v-else-if="current == 3"></Tracks>
          <Record v-else></Record>
        </div>
        <div class="botton-btns">
          <button>派单</button>
          <button @click="dispatchOrder">重派工</button>
          <button>转单</button>
          <button>协助</button>
          <button>挂起</button>
        </div>
      </div>
    </DarkDialog>
    <!-- 详情-维修派工弹窗 -->
    <DarkDialog v-model="dispatchOrderTitle">
      <RepairDispatch />
    </DarkDialog>
  </div>
</template>
<script>
import WaitList from "../components/waitlist";
import { DarkMenu, DarkDialog } from "@/components/App";
//引入内容
import { workOrderInfo } from "./info";
//引入内容组件
import Content from "./components/content/index";
import RepairInfo from "./components/repairinfo";
import Tracks from "./components/track/index";
import Record from "./components/record/index";
import RepairDispatch from "./components/repairdispatch";
export default {
  name: "OperationsXrepairtubeWorkorderHandle",
  meta: {
    sort: 3,
    title: "待处理",
    hideMenu: true,
  },
  components: {
    WaitList,
    DarkDialog,
    DarkMenu,
    Content,
    RepairInfo,
    Tracks,
    Record,
    RepairDispatch,
  },
  data() {
    return {
      listData: [
        {
          title: "保养（02154）",
          stateName: "待处理",
          name: "空调（大型家电）",
          source: "来电",
          createTime: "2020-12-31 00：00：00",
          btns: ["派单"],
        },
        {
          title: "保养（02154）",
          stateName: "待处理",
          name: "空调（大型家电）",
          source: "来电",
          createTime: "2020-12-31 00：00：00",
          btns: ["派单"],
        },
        {
          title: "保养（02154）",
          stateName: "待处理",
          name: "空调（大型家电）",
          source: "来电",
          createTime: "2020-12-31 00：00：00",
          btns: ["派单"],
        },
      ],
      currentPage: 1,
      maxPage: 5,
      //维修工单详情标题
      orderDetails: {
        dialogVisible: false,
        binds: {
          title: "维修工单详情",
        },
      },
      //工单详情菜单
      orderNavs: [
        {
          path: "1",
          text: "工单内容",
        },
        {
          path: "2",
          text: "维修情况",
        },
        {
          path: "3",
          text: "工单跟踪",
        },
        {
          path: "4",
          text: "备件记录",
        },
      ],
      //工单详情弹窗当前选中项
      current: "1",
      //工单详情内容
      workOrderInfo: {},

      //维修派工-标题
      dispatchOrderTitle: {
        dialogVisible: false,
        binds: {
          title: "维修派工",
        },
      },
    };
  },
  created() {
    this.workOrderInfo = workOrderInfo;
  },
  methods: {
    handleSizeChange() {},
    handleCurrentChange() {},
    //工单详情菜单切换
    selectMenu(val) {
      console.log(val);
      this.current = val;
    },
    //显示列表详情弹窗
    showOrderInfo() {
      this.orderDetails.dialogVisible = true;
    },
    //维修派工详情弹窗
    dispatchOrder() {
      this.orderDetails.dialogVisible = false;
      this.dispatchOrderTitle.dialogVisible = true;
    },
  },
};
</script>
<style lang="scss" scoped>
.page-handle {
  padding: 20px;
  .pagination {
    position: absolute;
    bottom: 0;
    left: 0;
    border-top: 1px solid #555555;
    background: rgba($color: #000000, $alpha: 0.5);
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 5px 20px 0 20px;
    ::v-deep.el-pagination button {
      background-color: rgba($color: #fff, $alpha: 0.2);
      margin: 0 2px;
      border-radius: 2px;
      color: #fff;
    }
    ::v-deep.el-pager li {
      background-color: rgba($color: #fff, $alpha: 0.2);
      border-radius: 2px;
      color: #fff;
      margin: 0 2px;
    }
    ::v-deep.el-pager li.active {
      background: #0470e3;
    }
  }
  //维修工单详情
  .repair-detail {
    font-size: 14px;
    color: #fff;
    .main-msg {
      padding: 20px;
      line-height: 14px;
      padding-bottom: 13px;
    }
    .botton-btns {
      display: flex;
      justify-content: center;
      padding: 20px 0;
      border-top: 1px solid rgba($color: #fff, $alpha: 0.2);
      button {
        border: 1px solid #0470e3;
        border-radius: 3px;
        color: #0470e3;
        outline: none;
        background: rgba($color: #000000, $alpha: 0);
        padding: 8px 22px;
        margin: 0 5px;
        &:hover {
          background: #0470e3;
          color: #fff;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
