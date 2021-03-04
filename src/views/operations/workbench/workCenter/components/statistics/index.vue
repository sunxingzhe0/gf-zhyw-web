<!-- @format -->
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
    <OrderChart></OrderChart>
    <OrderChartP></OrderChartP>
  </div>
</template>
<script>
import { CompositeInput } from "@/components/App/FormFilters";
import OrderChart from "../../components/OrderChart";
import OrderChartP from "../../components/OrderChartP";
// import workbench from "@/api/operations/workbench";
export default {
  components: {
    CompositeInput,
    OrderChart,
    OrderChartP,
  },
  name: "OperationsWorkbenchWorkCenterStatistics",
  meta: {
    sort: 3,
    title: "工单统计",
    hideMenu: true,
  },
  data() {
    return {
      keywords: {
        type: "",
        keywords: "",
      },
      dateTime: "",
      options: [
        {
          label: "选项1",
          value: "1",
        },
      ],

      loading: false,
    };
  },
  mounted() {
    // this.getList();
  },
  methods: {
    search() {},
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
          width: 50%;
          height: 12px;
          padding: 0;
          line-height: 12px;
          font-size: 12px;
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
