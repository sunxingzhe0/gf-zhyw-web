<!-- @format -->

<template>
  <!-- <DarkDialog v-model="detailDialog"> -->
  <div class="repair-detail">
    <el-row class="main-msg" v-loading="dialogLoading">
      <el-col :span="8">标题：{{ allotDetail.title }}</el-col>
      <el-col :span="8">调拨类型：{{ allotDetail.allotType }}</el-col>
      <el-col :span="8">单据状态：{{ statusName(allotDetail.status) }}</el-col>
      <el-col :span="8">出货仓库：{{ allotDetail.outStore }}</el-col>
      <el-col :span="8">入货仓库：{{ allotDetail.inStore }}</el-col>
      <el-col :span="8">申请仓库：{{ allotDetail.applyStore }}</el-col>
      <el-col :span="8">创建人：{{ allotDetail.createUser }}</el-col>
      <el-col :span="8">创建日期：{{ allotDetail.createTime }}</el-col>
      <el-col :span="8">调拨理由：{{ allotDetail.reason }}</el-col>
    </el-row>
    <div class="progress-box">
      <div class="progress">
        <template v-for="(item, index) in allotDetail.progress">
          <div
            class="progress-item"
            :class="item.status == 1 ? 'active' : ''"
            :key="index"
          >
            <!-- {{ item }} -->
            <div class="progress-icon">
              <svg class="iconfont" aria-hidden="true">
                <use xlink:href="#iconshenhe"></use>
              </svg>
            </div>
            <div class="progress-msg">
              <div class="title">{{ item.title }}</div>
              <div>{{ item.userName }}</div>
              <div v-show="item.status != 2">{{ item.actionTime }}</div>
            </div>
          </div>
          <i
            class="el-icon-arrow-right"
            :class="item.status == 1 ? 'active' : ''"
            :key="'i' + index"
            v-show="index != allotDetail.progress.length - 1"
          ></i>
        </template>
      </div>
    </div>
    <DarkMenu
      :navs="navs"
      v-model="current"
      :noRouter="true"
      class="gray"
    ></DarkMenu>

    <div class="repair-detail-main">
      <Content v-if="current == 1" :id="id"></Content>
      <Journal v-if="current == 2" :id="allotDetail.id"></Journal>
    </div>

    <div class="dialog-bottom">
      <el-button size="mini" type="primary">同意</el-button>
      <el-button size="mini" type="danger" plain>拒绝</el-button>
    </div>
  </div>
  <!-- </DarkDialog> -->
</template>
<script>
// import DarkDialog from "@/components/App/DarkDialog";
import stock from "@/api/operations/stock";
import { DarkMenu } from "@/components/App";
import Content from "./Content";
// import Abnormal from "./Abnormal";
import Journal from "./Journal";
let statusNames = {
  "1": "待审核",
  "2": "已通过",
  "3": "已驳回",
  "4": "待出货",
  "5": "出货中",
  "6": "已完成",
};
export default {
  name: "allotDetail",
  components: {
    // DarkDialog,
    DarkMenu,
    Content,
    // Abnormal,
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
          text: "调拨内容",
        },
        {
          path: "2",
          text: "操作日志",
        },
      ],
      current: "1",
      allotDetail: {},
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
      this.allotDetail = {};
      this.allotDetail = await stock.stockAllot.allotDetail({
        id: this.id,
      });
      console.log(this.allotDetail);
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
    &::v-deep {
      .el-col {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
.progress-box {
  padding: 0 20px;
  padding-bottom: 20px;
  .progress {
    background-color: rgba(26, 26, 26, 0.8);
    width: 100%;
    height: 98px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .progress-item {
      display: flex;
      align-items: center;
      justify-content: center;
      .progress-icon {
        font-size: 18px;
        background: rgba(255, 255, 255, 0.1);
        color: #808080;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      &.active {
        .progress-icon {
          background: rgba(0, 113, 227, 0.1);
          color: #0071e3;
        }
        .progress-msg {
          color: #0071e3;
          .title {
            color: #0071e3;
          }
        }
      }

      .progress-msg {
        padding-left: 20px;
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: flex-start;
        color: #b3b3b3;
        font-size: 12px;
        line-height: 22px;
        .title {
          font-size: 14px;
          line-height: 24px;
          color: #fff;
        }
      }
    }
    .el-icon-arrow-right {
      font-size: 26px;
      color: #4d4d4d;
    }
  }
}
.dialog-bottom {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-top: 1px solid hsla(0, 0%, 100%, 0.3);
}
</style>
