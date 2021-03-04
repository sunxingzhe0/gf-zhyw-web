<!-- @format -->

<template>
  <div class="taskReminder-main">
    <el-menu
      ref="refElMenu"
      mode="horizontal"
      @select="selectMenu"
      class="dark-el-menu el-menu"
      :default-active="current"
    >
      <el-menu-item
        v-for="(item, index) in navs"
        :index="item.path"
        :key="index"
      >
        <el-badge :value="4" class="item">{{ item.text }} </el-badge>
      </el-menu-item>
      <!--  -->
    </el-menu>
    <div class="filters">
      <el-input
        placeholder="按日期筛选"
        v-model="dateTime"
        class="dark-composite-input composite-input"
        size="mini"
        style="width:100%"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="search"
        ></el-button>
      </el-input>
    </div>

    <div class="lists" v-loading="loading">
      <div class="item" v-for="(item, index) in lists" :key="index">
        <div class="content">
          <div class="left">
            <div
              class="status item-icon"
              :class="item.status == '2' ? 'disable' : ''"
            >
              <svg class="iconfont" aria-hidden="true">
                <use xlink:href="#iconnotice"></use>
              </svg>
            </div>
          </div>
          <div class="right">
            <div class="top">
              <div class="title">待审核工单</div>
              <div class="time">
                {{ item.createTime }}
              </div>
            </div>
            <div class="msgs">
              <div>{{ item.content }}</div>
              <div class="text-btns">
                <el-button
                  type="text"
                  class="text-btn"
                  @click="openDetail(item)"
                  >查看</el-button
                >
                <el-button type="text" class="text-btn">删除</el-button>
              </div>
            </div>
          </div>
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
  </div>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import { CompositeInput } from "@/components/App/FormFilters";
import workbench from "@/api/operations/workbench";
export default {
  name: "OperationsWorkbenchTaskReminder",
  meta: {
    sort: 3,
    title: "任务提醒",
    hideMenu: true,
  },
  data() {
    return {
      loading: false,
      dateTime: "",
      pageNum: 1,
      pageSize: 10,
      total: 10,
      navs: [
        {
          path: "1",
          text: "工单审核",
        },
        {
          path: "2",
          text: "接单提醒",
        },
        {
          path: "3",
          text: "执行提醒",
        },
        {
          path: "4",
          text: "保养提醒",
        },
        {
          path: "5",
          text: "巡检提醒",
        },
      ],
      current: "1",
      lists: [],
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    openDetail() {
      this.$message.info("跳转至维修工单详情页");
    },
    selectMenu(val) {
      this.current = val;
      this.pageNum = 1;
      this.getList();
    },
    search() {
      this.pageNum = 1;
      this.getList();
    },
    async getList() {
      this.loading = true;
      let res = await workbench.taskReminder.taskReminderList({
        type: this.current,
      });
      this.lists = res.list;
      this.total = res.total;
      this.loading = false;
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
.taskReminder-main {
  height: calc(100% - 110px);
}
.dark-el-menu.el-menu {
  border-bottom: none;
  height: 36px;
  line-height: 36px;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;
  padding: 0 13px;
  &::before,
  &::after {
    display: none;
  }
  &::v-deep {
    .el-menu-item {
      height: 36px;
      line-height: 36px;
      font-size: 14px;
      padding: 0 0;
      .el-badge {
        display: block;
        .el-badge__content {
          right: 8px;
          top: 10px;
          font-size: 10px;
          height: 16px;
          padding: 0 5px;
          line-height: 16px;
          border: none;
        }
      }
    }
    .el-menu-item:not(.is-disabled):hover,
    .el-menu-item:not(.is-disabled):focus {
      background-color: rgba(0, 0, 0, 0.8);
      color: #0071e3;
    }
    .el-menu-item.is-active {
      color: #0071e3;
    }
  }
}
.filters {
  padding: 20px;
}
.lists {
  padding: 20px;
  padding-top: 0;
  min-height: 100px;
  height: calc(100% - 152px);
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
      // border-bottom: 1px solid rgba(255, 255, 255, 0.2);
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
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        .text-btns {
          flex-shrink: 0;
          .text-btn {
            padding: 0;
          }
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
