<!-- @format -->

<template>
  <div class="work-order">
    <div class="filters">
      <div class="left">报修统计</div>
      <div class="right">
        <el-input
          placeholder="按日期筛选"
          v-model="dateTime"
          class="dark-composite-input composite-input"
          size="mini"
          style="width:140px;margin-right:20px"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="dateSearch"
          ></el-button>
        </el-input>
        <el-button size="mini" @click="viewMore" :class="'icon-list'">
          <svg class="iconfont" aria-hidden="true">
            <use :xlink:href="'#iconliebiao'"></use>
          </svg>
        </el-button>
      </div>
    </div>
    <DateChart> </DateChart>
    <EquChart> </EquChart>
    <!-- <DarkDialog v-model="moreDialog">
      <More></More>
    </DarkDialog> -->
  </div>
</template>
<script>
// import { CompositeInput } from "@/components/App/FormFilters";
import DateChart from "./components/DateChart";
import EquChart from "./components/EquChart";
// import More from "../register/components/More";
// import DarkDialog from "@/components/App/DarkDialog";
// import { Navs } from "./navs";
// import DarkMenu from "@/components/App/DarkMenu";
// import AddForm from "./components/addForm";
export default {
  name: "OperationsWorkbenchRepairStatistics",
  meta: {
    sort: 3,
    title: "报修统计",
    hideMenu: true,
  },
  components: {
    // DarkMenu,
    // CompositeInput,
    DateChart,
    EquChart,
    // More,
    // DarkDialog,
    // AddForm,
  },
  data() {
    return {
      //菜单
      // navs: Navs,
      keywords: {
        type: "",
        keywords: "",
      },
      //筛选时间
      dateTime: "",
      //下拉框配置项
      options: [
        {
          label: "12311111",
          value: "1",
        },
      ],
      // moreDialog: {
      //   dialogVisible: false,
      //   binds: {
      //     title: "报修记录",
      //   },
      // },
      //故障报修弹窗标题
      faultRepair: {
        dialogVisible: false,
        binds: {
          title: "故障报修",
          width: "680px",
        },
      },
    };
  },
  methods: {
    //搜索
    search() {
      console.log("搜索");
    },
    //按日期搜索
    dateSearch() {
      console.log("按日期搜索");
    },
    //故障报修
    isShowFaultRepair() {
      this.faultRepair.dialogVisible = true;
    },
    viewMore() {
      this.$router.push("/operations/workbench/repair/list");
    },
  },
};
</script>
<style lang="scss" scoped>
.work-order {
  .filters {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: rgba(26, 26, 26, 0.8);
    .right {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
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
  // .charts-box {
  //   padding: 10px;
  //   background: rgba(0, 0, 0, 0.6);
  //   margin-bottom: 20px;
  // }
  .dialog {
    width: 400px;
    height: 400px;
  }
}
</style>
