<template>
  <div class="work-order">
    <div class="charts-box">
      <div class="filters">
        <CompositeInput
          v-model="keywords"
          :options="options"
          @search="search"
          style="width:240px;margin-right:5px"
        ></CompositeInput>

        <!-- <el-input
          placeholder="按日期筛选"
          v-model="dateTime"
          class="dark-composite-input composite-input date-input"
          size="mini"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="dateSearch"
          ></el-button>
        </el-input> -->
        <el-button
          size="mini"
          type="primary"
          class="fault-btn"
          @click="isShowFaultRepair"
          >故障报修
        </el-button>
        <el-button size="mini" type="primary" class="btn-more" @click="showMore"
          >更多
        </el-button>
      </div>
      <ChartsCompt :chartsOptions="chartsOptions" />
    </div>
    <DarkMenu :navs="navs"></DarkMenu>
    <router-view></router-view>
    <!-- 故障报修弹窗 -->
    <div class="dialog" v-if="faultRepair.dialogVisible">
      <DarkDialog v-model="faultRepair">
        <AddForm />
      </DarkDialog>
    </div>
    <!-- 维修工单列表弹窗 -->
    <DarkDialog v-model="workOrderList">
      <MoreList />
    </DarkDialog>
  </div>
</template>
<script>
import { CompositeInput } from "@/components/App/FormFilters";
import ChartsCompt from "@/components/App/ChartsCompt";
import { Navs } from "./navs";
import DarkMenu from "@/components/App/DarkMenu";
import DarkDialog from "@/components/App/DarkDialog";
import AddForm from "./components/addform";
import MoreList from "./components/morelist";
export default {
  name: "OperationsXrepairtubeWorkorder",
  meta: {
    sort: 3,
    title: "维修工单",
    redirect: "/operations/xrepairtube/workorder/handle",
    hideMenu: true,
  },
  components: {
    DarkMenu,
    CompositeInput,
    ChartsCompt,
    DarkDialog,
    AddForm,
    MoreList,
  },
  data() {
    return {
      //菜单
      navs: Navs,
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
      //chartsData
      chartsOptions: {
        color: ["#0071E2", "#CF9C00"],
        legend: {
          left: "center",
          bottom: "bottom",
          textStyle: {
            fontSize: 12, //字体大小
            color: "#ffffff", //字体颜色
            lineHeigt: 12,
          },
          itemWidth: 12,
          itemHeight: 12,
        },
        tooltip: {
          trigger: "item",
          backgroundColor: "rgba(0,0,0,0.5)",
          textStyle: {
            color: "#ffffff",
          },
        },
        dataset: {
          source: [
            ["product", "数量类型", "保养类型"],
            ["1", 43.3, 85.8, 93.7],
            ["2", 86.4, 65.2, 82.5],
            ["3", 86.4, 65.2, 82.5],
            ["4", 86.4, 65.2, 82.5],
            ["5", 86.4, 65.2, 82.5],
            ["6", 86.4, 65.2, 82.5],
            ["7", 86.4, 65.2, 82.5],
            ["8", 86.4, 65.2, 82.5],
          ],
        },
        xAxis: {
          type: "category",
          axisLabel: {
            show: true,
            textStyle: {
              fontSize: 14, //字体大小
              color: "#ffffff", //字体颜色
            },
          },
        },
        yAxis: {
          splitLine: { show: false },
          axisLabel: {
            show: true,
            textStyle: {
              fontSize: 14, //字体大小
              color: "#ffffff", //字体颜色
            },
          },
        },
        series: [
          { type: "bar", barWidth: 8 },
          { type: "bar", barWidth: 8 },
        ],
        grid: {
          left: "30px",
          bottom: "50px",
          right: "0px",
          top: "40px",
        },
      },
      //故障报修弹窗标题
      faultRepair: {
        dialogVisible: false,
        binds: {
          title: "故障报修",
          width: "680px",
        },
      },
      //维修工单列表弹窗标题
      workOrderList: {
        dialogVisible: false,
        binds: {
          title: "维修工单列表",
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
    showMore() {
      this.workOrderList.dialogVisible = true;
    },
  },
};
</script>
<style lang="scss" scoped>
.work-order {
  .charts-box {
    padding: 10px;
    background: #000;
    margin-bottom: 10px;
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
      .btn-more {
        color: #0071e3;
        background: rgba($color: #000000, $alpha: 0);
        &:hover {
          background: #0071e3;
          color: #fff;
        }
      }
    }
  }
  .dialog {
    width: 400px;
    height: 400px;
  }
}
</style>
