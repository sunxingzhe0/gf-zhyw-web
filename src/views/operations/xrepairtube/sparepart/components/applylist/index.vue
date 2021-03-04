<template>
  <div class="list-box">
    <div class="filters">
      <CompositeInput
        v-model="keywords"
        :options="options"
        @search="search"
        style="width:320px;margin-right:5px"
      ></CompositeInput>
      <el-button
        size="mini"
        type="primary"
        class="fault-btn more"
        @click="seeMore"
        >更多</el-button
      >
    </div>
    <!-- 列表 -->
    <div class="lists">
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
              <div class="title">
                <div class="title-msg">{{ item.title }}</div>
                <span>x{{ item.num }}</span>
              </div>
              <div class="status-name">{{ item.stateName }}</div>
            </div>
            <div class="msg">
              <p>
                <span>姓名：{{ item.name }}</span>
                <span>工号：{{ item.code }}</span>
              </p>
              <p>
                <span>电话：{{ item.tel }}</span>
                <span>申领科室：{{ item.department }}</span>
              </p>
              <p class="time">申领时间：{{ item.createTime }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 分页 -->
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
    <!-- 备件申领列表弹窗 -->
    <DarkDialog v-model="applyListDialog">
      <Record />
    </DarkDialog>
  </div>
</template>

<script>
import { CompositeInput } from "@/components/App/FormFilters";
import DarkDialog from "@/components/App/DarkDialog";
import Record from "@/views/operations/xrepairtube/workorder/handle/components/record/index";
export default {
  components: {
    CompositeInput,
    DarkDialog,
    Record,
  },
  data() {
    return {
      keywords: {
        type: "",
        keywords: "",
      },
      //备件申领列表弹窗标题
      applyListDialog: {
        dialogVisible: false,
        binds: {
          title: "物资申领记录",
        },
      },
      //下拉框配置项
      options: [
        {
          label: "12311111",
          value: "1",
        },
      ],
      lists: [
        {
          title: "工具+扳手；工具+铝合金梯子；工具+扳手。",
          num: 3,
          stateName: "待处理",
          name: "方星剑",
          code: "0021314",
          tel: "18545678965",
          department: "外科一",
          createTime: "2020-12-31 00：00：00",
        },
        {
          title: "工具+扳手；工具+铝合金梯子；工具+扳手。",
          num: 3,
          stateName: "待处理",
          name: "方星剑",
          code: "0021314",
          tel: "18545678965",
          department: "外科一",
          createTime: "2020-12-31 00：00：00",
        },
        {
          title: "工具+扳手；工具+铝合金梯子；工具+扳手。",
          num: 3,
          stateName: "待处理",
          name: "方星剑",
          code: "0021314",
          tel: "18545678965",
          department: "外科一",
          createTime: "2020-12-31 00：00：00",
        },
      ],
      //当前页和最大页
      currentPage: 1,
      maxPage: 5,
    };
  },
  methods: {
    search() {
      console.log("搜索");
    },
    handleSizeChange() {},
    handleCurrentChange() {},
    seeMore() {
      this.applyListDialog.dialogVisible = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.filters {
  display: flex;
  .date-input {
    width: 160px;
    border-left: none;
    padding: 0;
  }
  .fault-btn {
    width: 60px;
    margin-left: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .more {
    background: none;
    border: 1px solid #0170e5;
    color: #0170e5;
  }
}
.list-box {
  padding: 20px;
  .lists {
    min-height: 100px;
    margin-top: 20px;
    .item {
      width: 100%;
      padding: 10px;
      margin-bottom: 20px;
      background: rgba(51, 51, 51, 0.6);
      box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
      cursor: pointer;
      .top {
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        color: #ffffff;
        line-height: 14px;
      }
      .content {
        display: flex;
        margin-top: 10px;
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
          .title {
            display: flex;
            width: 80%;
            .title-msg {
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              margin-right: 10px;
            }
            > span {
              color: #a7a4a5;
            }
          }
          .status-name {
            width: 20%;
            text-align: center;
          }
        }
        .msg {
          font-size: 12px;
          p {
            margin: 8px 0;
            display: flex;
            color: #a7a4a5;
            > span {
              width: 50%;
            }
          }
        }
      }
    }
  }
}
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
</style>
