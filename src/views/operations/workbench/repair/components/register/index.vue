<!-- @format -->

<template>
  <div class="register">
    <div class="filters">
      <CompositeInput
        v-model="keywords"
        :options="options"
        @search="search"
        style="width:240px;margin-right:20px"
      ></CompositeInput>
      <div class="flex">
        <el-button size="mini" type="primary" @click="openCallRepair"
          >报修</el-button
        >
        <el-button size="mini" @click="viewMore" :class="'icon-list'">
          <svg class="iconfont" aria-hidden="true">
            <use :xlink:href="'#iconliebiao'"></use>
          </svg>
        </el-button>
      </div>
      <!-- <el-button size="mini" type="primary" plain @click="viewMore"
        >更多</el-button
      > -->
    </div>
    <div class="lists" v-loading="loading">
      <div
        class="item"
        v-for="(item, index) in lists"
        :key="index"
        @click="openDetail(item)"
      >
        <div class="content">
          <div class="left">
            <div class="status item-icon">
              <svg class="iconfont" aria-hidden="true">
                <use xlink:href="#iconbaoxiu"></use>
              </svg>
            </div>
          </div>
          <div class="right">
            <div class="top">
              <div class="title">{{ item.repairTheme }}</div>
              <div
                class="status-name"
                :class="
                  item.state == 'Completed' || item.state == 'Closed'
                    ? 'disable'
                    : ''
                "
              >
                {{ RepairFormStatus[item.state] }}
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
          <el-button
            type="text"
            :style="bitem.color ? 'color:' + bitem.color : ''"
            v-for="(bitem, bindex) in ReportBtns[item.state][role]"
            :class="bitem.className"
            @click.stop="clickHandler(item, bitem)"
            :key="bindex"
            >{{ bitem.text }}</el-button
          >
        </div>
        <!-- <div class="bottom">转工单</div> -->
      </div>
    </div>
    <!-- <DarkDialog v-model="detailDialog">
      <RepairReport :id="id"></RepairReport>
    </DarkDialog> -->
    <!-- <DarkDialog v-model="moreDialog">
      <More></More>
    </DarkDialog> -->
    <!-- <DarkDialog v-model="formDialog" class="dialog-680">
      <CallRepair></CallRepair>
    </DarkDialog> -->
  </div>
</template>
<script>
import { mapState } from "vuex";
import { CompositeInput } from "@/components/App/FormFilters";
// import DarkDialog from "@/components/App/DarkDialog";
import workbench from "@/api/operations/workbench";
// import { DarkMenu } from "@/components/App";
// import Content from "./components/Content";
// import Situation from "./components/Situation";
// import Journal from "./components/Journal";
// import RepairReport from "./components/RepairReport";
// import More from "./components/More";
// import CallRepair from "./components/CallRepair";
import { ReportBtns } from "@/views/operations/constant";
export default {
  name: "OperationsWorkbenchRepairRegister",
  components: {
    CompositeInput,
    // DarkDialog,
    // RepairReport,
    // DarkMenu,
    // Content,
    // Situation,
    // Journal,
    // More,
    // CallRepair,
  },
  meta: {
    sort: 3,
    title: "报修登记",
    hideMenu: true,
  },
  data() {
    return {
      ReportBtns,
      //身份模拟
      role: "dispatcher",

      loading: false,
      dialogLoading: false,
      keywords: {
        type: "registerUserName",
        keywords: "",
      },
      options: [
        {
          label: "登记人",
          value: "registerUserName",
        },
        {
          label: "报修人姓名",
          value: "repairUserName",
        },
        {
          label: "报修人工号",
          value: "repairUserNum",
        },
        {
          label: "报修人电话",
          value: "repairUserPhone",
        },
        {
          label: "报修主题",
          value: "repairTheme",
        },
      ],
      lists: [],
      contents: [
        {
          title: "登记人",
          key: "registerUserName",
          span: 24,
        },
        {
          title: "报修人姓名",
          key: "repairUserName",
          span: 14,
        },
        {
          title: "报修人工号",
          key: "repairUserNum",
          span: 10,
        },
        {
          title: "报修人电话",
          key: "repairUserPhone",
          span: 14,
        },
        {
          title: "报修科室",
          key: "dept",
          span: 10,
        },
        {
          title: "报修时间",
          key: "createTime",
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
      // moreDialog: {
      //   dialogVisible: false,
      //   binds: {
      //     title: "报修记录",
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
      RepairFormStatus: (state) => state.operations.status.RepairFormStatus,
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
      let datas = this.keywords.type
        ? { [this.keywords.type]: this.keywords.keywords }
        : {};
      let res = await workbench.repair.registerList({
        ...datas,
        pageNum: 1,
        pageSize: 10,
      });
      console.log(res);
      this.lists = res.list;
      this.loading = false;
    },
    async openDetail(item) {
      //弹窗获取详情
      this.id = item.id;
      this.$router.push("/operations/workbench/repair/detail?id=" + item.id);
    },
    viewMore() {
      this.$router.push("/operations/workbench/repair/list");
    },
    openCallRepair() {
      // 故障报修
      this.$router.push("/operations/workbench/repair/register");
      // this.formDialog.dialogVisible = true;
    },
    //按钮操作
    clickHandler(item, type) {
      console.log(item, type);
      if (type.code == "WorkOrder") {
        this.$router.push("/operations/workbench/workCenter/CallWorkOrder");
      }
      if (type.code == "Detail") {
        this.$router.push(
          "/operations/xrepairtube/workorder/detail?id=" + item.id
        );
      }
      if (type.code == "Terminate" || type.code == "End") {
        this.$confirm("确定对报修单进行" + type.text + "操作？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(async () => {
          workbench.repair
            .registerStatusChange({
              id: item.id,
              state: type.code == "Terminate" ? "Closed" : "Completed",
            })
            .then((res) => {
              console.log(res);
              this.$message.success("操作成功！");
              this.registerList();
            });
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.register {
  padding: 20px;
  .flex {
    display: flex;
  }
  .filters {
    display: flex;
    justify-content: space-between;
    &::v-deep {
      .icon-list {
        width: 28px;
        height: 28px;
        background: rgba(51, 51, 51, 0.6);
        border: 1px solid #4d4d4d;
        border-radius: 2px;
        padding: 0;
      }
      .iconfont {
        font-size: 16px;
        color: #cccccc;
      }
      .info-content {
        justify-content: flex-start;
      }
      .content-label {
        white-space: nowrap;
        float: left;
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
            color: #999;
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
