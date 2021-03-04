<!-- @format -->

<template>
  <div class="voice">
    <div class="filters">
      <div class="sort">
        <span>来电时间</span>
        <span class="sort-icon">
          <i class="el-icon-arrow-up"></i>
          <i class="el-icon-arrow-down"></i
        ></span>
      </div>
      <CompositeInput
        v-model="keywords"
        :options="options"
        @search="search"
        style="width:240px"
      ></CompositeInput>
    </div>
    <div class="lists" v-loading="loading">
      <div class="item" v-for="(item, index) in lists" :key="index">
        <div class="content">
          <div class="left">
            <div class="status item-icon">
              <svg class="iconfont" aria-hidden="true">
                <use xlink:href="#icontell"></use>
              </svg>
            </div>
          </div>
          <div class="right">
            <div class="top">
              <div class="title">{{ item.phone }}</div>
              <div
                class="status-name"
                :class="item.state == '未登记' ? '' : 'disable'"
              >
                {{ VoiceStatus[item.state] }}
              </div>
            </div>
            <el-row class="msgs">
              <el-col
                :span="citem.span"
                class="msg-item"
                v-for="(citem, cindex) in contents"
                :key="cindex"
              >
                {{ citem.title }}：{{ item[citem.key] }}</el-col
              >
            </el-row>
          </div>
        </div>
        <div class="bottom">
          <el-button type="text" @click="openCallRepair" v-if="item.state == 'unregistered'">报修</el-button>
          <el-button type="text" v-if="item.state == 'unregistered'">作废</el-button>
          <el-button type="text" @click="openDetail(item)" v-if="item.state == 'registered'">查看报修单</el-button>
        </div>
      </div>
    </div>

    <!-- <DarkDialog v-model="detailDialog">
      <RepairReport :id="id"></RepairReport>
    </DarkDialog>
    <DarkDialog v-model="formDialog" class="dialog-680">
      <CallRepair></CallRepair>
    </DarkDialog> -->
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { CompositeInput } from "@/components/App/FormFilters";
// import DarkDialog from "@/components/App/DarkDialog";
import workbench from "@/api/operations/workbench";
// import DarkDialog from "@/components/App/DarkDialog";
// import RepairReport from "../register/components/RepairReport";
// import CallRepair from "../register/components/CallRepair";
// import { DarkMenu } from "@/components/App";
export default {
  name: "OperationsWorkbenchRepairVoice",
  components: {
    CompositeInput,
    // DarkDialog,
    // RepairReport,
    // CallRepair,
    // DarkDialog,
    // DarkMenu,
  },
  meta: {
    sort: 3,
    title: "语音坐席",
    hideMenu: true,
  },
  data() {
    return {
      loading: false,
      keywords: {
        type: "",
        keywords: "",
      },
      options: [
        {
          label: "来电电话",
          value: "phoneNumber",
        },
        {
          label: "来电内容",
          value: "phoneContent",
        },
      ],
      lists: [],
      contents: [
        {
          title: "所属科室",
          key: "dept",
          span: 24,
        },
        {
          title: "来电时间",
          key: "createTime",
          span: 24,
        },
        {
          title: "来电内容",
          key: "content",
          span: 24,
        },
      ],

      id: "",
      // detailDialog: {
      //   dialogVisible: false,
      //   binds: {
      //     title: "报修单详情页",
      //   },
      // },
      // formDialog: {
      //   dialogVisible: false,
      //   binds: {
      //     title: "故障报修",
      //   },
      // },
    };
  },
  computed: {
    ...mapState({
      VoiceStatus: (state) => state.operations.status.VoiceStatus,
    }),
  },
  mounted() {
    this.registerList();
  },
  methods: {
    search() {
      this.registerList();
    },
    async registerList() {
      // 获取列表
      this.loading = true;
      this.lists = [];
      let res = await workbench.repair.voiceList({
        [this.keywords.type]:this.keywords.keywords
      });
      console.log(res);
      this.lists = res;
      this.loading = false;
    },

    openDetail(item) {
      this.id = item.id;
      this.$router.push("/operations/workbench/repair/detail?id="+item.id);
    },
    openCallRepair() {
      // 故障报修
      this.$router.push({
        path:"/operations/workbench/repair/register",
        query:{
          repairType:'Phone',
          repairSource:"02365478963"
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.voice {
  padding: 20px;
  .filters {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .sort {
    font-size: 14px;
    line-height: 28px;
    display: flex;
    color: #cdcdcd;
    span {
      display: flex;
      flex-flow: column;
      justify-content: center;
      padding-left: 5px;
    }
    .sort-icon {
      ::v-deep {
        i {
          height: 10px;
          color: #0071e3;
          font-size: 12px;
          cursor: pointer;
          // transform: scale(0.66);
        }
      }
    }
  }
  .lists {
    padding-top: 20px;
    min-height: 100px;
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
        }
        .msgs {
          padding: 5px 0px;
          color: #b3b3b3;
          font-size: 12px;
          line-height: 22px;
          // .msg-item {
          // }
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
}
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
