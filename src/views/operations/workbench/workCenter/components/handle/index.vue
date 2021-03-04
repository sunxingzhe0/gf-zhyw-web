<!-- @format -->
<!-- @format -->

<template>
  <div class="dispatch">
    <div class="filters">
      <CompositeInput
        v-model="keywords"
        :options="options"
        @search="search"
        style="width:240px;margin-right:20px"
      ></CompositeInput>

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
    <DarkMenu
      :navs="WorkOrderStatusTab"
      v-model="current"
      :noRouter="true"
      style="padding: 0 10px"
    ></DarkMenu>

    <div class="lists" v-loading="loading">
      <div class="item" v-for="(item, index) in lists" :key="index">
        <div class="top">
          <div class="title">{{ orderCategory[item.orderCategory] }}({{ item.code }})</div>
          <div class="status-name">
            {{ WorkOrderStatus[item.workOrderStatus] }}
          </div>
        </div>
        <div class="content">
          <div class="left">
            <div class="status item-icon">
              <svg class="iconfont" aria-hidden="true">
                <use xlink:href="#icondanzi"></use>
              </svg>
            </div>
          </div>
          <div class="right">
            <div class="pub-flex-sb">
              <div>{{ item.assetsName }}({{ item.assetsType }})</div>
              <div class="from">来源：{{ RepairSource[item.repairType] }}</div>
            </div>
            <div class="msgs">登记时间：{{ item.createTime }}</div>
          </div>
        </div>
        <div class="bottom">
          <el-button
            type="text"
            :style="bitem.color ? 'color:'+bitem.color : ''"
            v-for="(bitem, bindex) in WorkOrderBtns[item.workOrderStatus][role]"
            :class="bitem.className"
            @click.stop="clickHandler(item, bitem)"
            :key="bindex"
            >{{ bitem.text }}</el-button
          >
          <!-- <el-button type="text" @click="openDelegate(item)">派单</el-button>
          <el-divider direction="vertical" class="divider"></el-divider>
          <el-button type="text" @click="openExchange(item)">转单</el-button>
          <el-divider direction="vertical" class="divider"></el-divider>
          <el-button type="text" @click="openHelp(item)">协助</el-button>
          <el-divider direction="vertical" class="divider"></el-divider>
          <el-button type="text" @click="openEvaluate(item)">评价</el-button>
          <el-divider direction="vertical" class="divider"></el-divider> -->
        </div>
      </div>
    </div>

    <div class="pages">
      <el-pagination
        small
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, prev, pager, next"
        :total="total"
        :pager-count="5"
      >
      </el-pagination>
    </div>

    <!-- 派单 -->
    <DarkDialog v-model="DelegateDialog">
      <Delegate :id="id" @close="() => {DelegateDialog.dialogVisible = false}"></Delegate>
    </DarkDialog>
    <!-- 转单 -->
    <DarkDialog v-model="ExchangeDialog">
      <Exchange :id="id"></Exchange>
    </DarkDialog>
    <!-- 协助 -->
    <DarkDialog v-model="HelpDialog">
      <Help :id="id"></Help>
    </DarkDialog>
    <!-- 评价 -->
    <DarkDialog v-model="EvaluateDialog">
      <Evaluate :id="id"></Evaluate>
    </DarkDialog>
    
  </div>
</template>
<script>
import {mapState} from 'vuex'
import { CompositeInput } from "@/components/App/FormFilters";
import { DarkMenu } from "@/components/App";
import workbench from "@/api/operations/workbench";
import DarkDialog from "@/components/App/DarkDialog";
import Delegate from "../../components/Delegate";
import Exchange from "../../components/Exchange";
import Help from "../../components/Help";
import Evaluate from "../../components/Evaluate";
import { WorkOrderBtns } from "@/views/operations/constant";
export default {
  components: {
    CompositeInput,
    DarkMenu,
    DarkDialog,
    Delegate,
    Exchange,
    Help,
    Evaluate
  },
  name: "OperationsWorkbenchWorkCenterHandle",
  meta: {
    sort: 3,
    title: "工单处理",
    hideMenu: true,
  },
  data() {
    return {
      WorkOrderBtns,
      //身份模拟
      role: "member",

      keywords: {
        type: "orderTheme",
        keywords: "",
      },
      dateTime: "",
      pageNum: 1,
      pageSize: 10,
      total: 10,
      options: [
        {
          label: "主题",
          value: "orderTheme",
        },
        {
          label: "描述",
          value: "orderDescribe",
        },
      ],

      current: "",
      navs: [
        {
          path: "1",
          text: "待处理",
        },
        {
          path: "2",
          text: "待接单",
        },
        {
          path: "3",
          text: "进行中",
        },
        {
          path: "4",
          text: "挂起中",
        },
        {
          path: "5",
          text: "待审核",
        },
        {
          path: "6",
          text: "待评价",
        },
        {
          path: "7",
          text: "已完成",
        },
      ],

      loading: false,
      lists: [],

      id: "",
      DelegateDialog: {
        dialogVisible: false,
        binds: {
          title: "派单",
        },
      },
      ExchangeDialog: {
        dialogVisible: false,
        binds: {
          title: "转单",
        },
      },
      HelpDialog: {
        dialogVisible: false,
        binds: {
          title: "协助",
        },
      },
      EvaluateDialog: {
        dialogVisible: false,
        binds: {
          title: "评价",
        },
      },
    };
  },
  watch: {
    current: {
      handler() {
        this.getList();
      },
      // immediate: true,
    },
  },
  mounted() {
    // this.getList();
    this.current = this.WorkOrderStatusTab[0].path;
  },
  computed: {
    ...mapState({
      WorkOrderStatus: (state) => state.operations.status.WorkOrderStatus,
      RepairSource: (state) => state.operations.status.RepairSource,
      orderCategory: (state) => state.operations.status.orderCategory,
      orderType: (state) => state.operations.status.orderType,
      attrType: (state) => state.operations.status.attrType,
    }),
    WorkOrderStatusTab() {
      return Object.entries(this.WorkOrderStatus).map(([value, label]) => {
        return {
          path: value,
          text: label,
        };
      }).filter(item => item.text !='转单中' &&  item.text !='已关闭');
    },
  },
  methods: {
    // statusName(status) {
    //   return this.navs.find((item) => item.path == status).text;
    // },
    search() {
      this.pageNum = 1;
      this.getList();
    },
    async getList() {
      this.loading = true;
      let res = await workbench.workCenter.handleList({
        status: this.current,
      });
      this.lists = res.list;
      this.total = res.total;
      this.loading = false;
    },
    //打开派单弹窗
    Dispatch(item) {
      this.id = item.id;
      this.DelegateDialog.dialogVisible = true;
    },
    //打开转单弹窗
    Exchange(item) {
      this.id = item.id;
      this.ExchangeDialog.dialogVisible = true;
    },

    //打开协助弹窗
    Help(item) {
      this.id = item.id;
      this.HelpDialog.dialogVisible = true;
    },
    //打开评价弹窗
    Evaluate(item) {
      this.id = item.id;
      this.EvaluateDialog.dialogVisible = true;
    },

    handleSizeChange() {
      this.getList();
    },
    handleCurrentChange() {
      this.getList();
    },

    clickHandler(item,bitem){
      console.log(bitem.code);
      if(this[bitem.code]){
        this[bitem.code](item)
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.dispatch {
  height: calc(100% - 90px);
}
.filters {
  display: flex;
  padding: 10px;
}
.lists {
  padding: 20px;
  min-height: 100px;
  height: calc(100% - 132px);
  overflow-y: auto;
  display: block;
  &::-webkit-scrollbar {
    display: none;
  }
  .item {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    background: rgba(51, 51, 51, 0.6);
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
    cursor: pointer;
    .content {
      display: flex;
      padding: 10px 0;
      border-top: 1px solid hsla(0, 0%, 100%, 0.2);
    }
    .left {
      flex-shrink: 0;
      .item-icon {
        width: 36px;
        height: 36px;
        background: #0071e3;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
      }
      .disable {
        background: #999999;
      }
    }
    .right {
      padding-left: 10px;
      width: 100%;
      .pub-flex-sb {
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        line-height: 20px;
        .from {
          font-size: 12px;
          color: #b3b3b3;
        }
      }
    }
    .top {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      color: #ffffff;
      line-height: 14px;
      padding-bottom: 10px;
      .disable {
        color: #808080;
      }
    }
    .msgs {
      // padding: 5px 0px;
      color: #b3b3b3;
      font-size: 12px;
      line-height: 16px;
      .text-btns {
        flex-shrink: 0;
        .text-btn {
          padding: 0;
        }
      }
    }
    .bottom {
      text-align: center;
      font-size: 12px;
      color: #0071e3;
      padding-top: 10px;
      line-height: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-top: 1px solid hsla(0, 0%, 100%, 0.2);
      ::v-deep {
        .el-button--text {
          width: 100%;
          height: 14px;
          line-height: 14px;
          padding: 0;
          // line-height: 12px;
          font-size: 12px;
          position: relative;
          &::after {
            content: "";
            height: 14px;
            position: absolute;
            right: 0;
            width: 1px;
            background: hsla(0, 0%, 100%, 0.2);
          }
          &:last-child {
            &::after {
              content: "";
              display: none;
            }
          }
        }
        .el-button + .el-button {
          margin-left: 0;
        }
      }
    }
    // .bottom {
    //   text-align: center;
    //   font-size: 12px;
    //   color: #0071e3;
    //   padding-top: 10px;
    //   line-height: 12px;
    //   display: flex;
    //   justify-content: center;
    //   align-items: center;
    //   border-top: 1px solid hsla(0, 0%, 100%, 0.2);
    //   ::v-deep {
    //     .el-button--text {
    //       width: 50%;
    //       height: 12px;
    //       padding: 0;
    //       line-height: 12px;
    //       font-size: 12px;
    //     }
    //   }
    // }
  }
}
.pages {
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 12px;
}
</style>
