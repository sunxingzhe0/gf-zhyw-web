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
      :navs="DispatchStatusTab"
      v-model="current"
      :noRouter="true"
    ></DarkMenu>

    <div class="lists" v-loading="loading">
      <div class="item" v-for="(item, index) in lists" :key="index">
        <div class="content">
          <div class="left">
            <div class="status item-icon">
              <svg class="iconfont" aria-hidden="true">
                <use xlink:href="#icondanzi"></use>
              </svg>
            </div>
          </div>
          <div class="right">
            <div class="top">
              <div class="title">{{ item.orderTheme }}</div>
              <div
                class="status-name"
                :class="item.dispatchStatus == 'Distributed' ? 'disable' : ''"
              >
                {{ DispatchStatus[item.dispatchStatus] }}
              </div>
            </div>
            <el-row class="msgs">
              <el-col :span="24" class="msg-item">
                设备类型：{{ item.assetsType }}
              </el-col>
              <el-col :span="24" class="msg-item">
                工单内容：{{ item.orderDescribe }}
              </el-col>
              <el-col :span="24" class="msg-item">
                创建日期：{{ item.createTime }}
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="bottom">
          <el-button
            type="text"
            @click="dispatchOrder(item)"
            v-if="item.dispatchStatus == 'ToBeDistributed'"
            >派单</el-button
          >
          <el-button
            type="text"
            @click="reDispatchOrder(item)"
            v-if="item.dispatchStatus == 'Distributing'"
            >重派单</el-button
          >
          <el-button type="text" @click="endOrder(item)">终止</el-button>
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
      <Delegate :id="id"></Delegate>
    </DarkDialog>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { CompositeInput } from "@/components/App/FormFilters";
import { DarkMenu } from "@/components/App";
import workbench from "@/api/operations/workbench";
import Delegate from "../../components/Delegate";
import DarkDialog from "@/components/App/DarkDialog";
export default {
  components: { CompositeInput, DarkMenu, Delegate, DarkDialog },
  name: "OperationsWorkbenchWorkCenterDispatch",
  meta: {
    sort: 3,
    title: "调度派工",
    hideMenu: true,
  },
  data() {
    return {
      keywords: {
        type: "assetsName",
        keywords: "",
      },
      dateTime: "",
      pageNum: 1,
      pageSize: 10,
      total: 10,
      options: [
        {
          label: "设备名称",
          value: "assetsName",
        },
        {
          label: "设备类型",
          value: "assetsType",
        },
        {
          label: "编号",
          value: "no",
        },
      ],

      current: "",
      loading: false,
      lists: [],

      id: "",
      DelegateDialog: {
        dialogVisible: false,
        binds: {
          title: "派单",
        },
      },
    };
  },
  watch: {
    current: {
      handler() {
        this.getList();
      },
      // immediate:true
    },
  },

  computed: {
    ...mapState({
      DispatchStatus: (state) => state.operations.status.DispatchStatus,
    }),
    DispatchStatusTab() {
      return Object.entries(this.DispatchStatus).map(([value, label]) => {
        return {
          path: value,
          text: label,
        };
      });
    },
  },
  mounted() {
    // this.getList();
    this.current = this.DispatchStatusTab[0].path;
  },
  methods: {
    search() {
      this.pageNum = 1;
      this.getList();
    },
    async getList() {
      this.loading = true;
      let res = await workbench.workCenter.dispatchList({
        [this.keywords.type]: this.keywords.keywords,
        dispatchStatus: this.current,
      });
      this.lists = res.list;
      this.total = res.total;
      this.loading = false;
    },
    //打开派单弹窗
    dispatchOrder(item) {
      this.id = item.id;
      this.DelegateDialog.dialogVisible = true;
    },
    reDispatchOrder(item) {
      this.id = item.id;
      this.DelegateDialog.dialogVisible = true;
    },
    endOrder(item) {
      this.id = item.id;
      // this.DelegateDialog.dialogVisible = true
    },
    handleSizeChange() {
      this.getList();
    },
    handleCurrentChange() {
      this.getList();
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
      .top {
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        color: #ffffff;
        line-height: 14px;
        .disable {
          color: #808080;
        }
        .time {
          font-size: 12px;
          color: #b3b3b3;
        }
      }
      .msgs {
        padding: 5px 0px;
        color: #b3b3b3;
        font-size: 12px;
        line-height: 22px;
        .text-btns {
          flex-shrink: 0;
          .text-btn {
            padding: 0;
          }
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
