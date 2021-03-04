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

        <!-- <el-date-picker
          v-model="dateTime"
          type="date"
          size="mini"
          class="dark-composite-input composite-input date-input"
          placeholder="按日期筛选"
          prefix-icon="1"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="dateSearch"
          ></el-button>
        </el-date-picker> -->

        <el-input
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
        </el-input>
      </div>
      <ChartsCompt :chartsOptions="chartsOptions" />
    </div>
    <DarkMenu :navs="navs"></DarkMenu>
    <router-view></router-view>
  </div>
</template>
<script>
import { CompositeInput } from "@/components/App/FormFilters";
import ChartsCompt from "@/components/App/ChartsCompt";
import { Navs } from "./navs";
import DarkMenu from "@/components/App/DarkMenu";

export default {
  name: "OperationsXrepairtubeDispatch",
  meta: {
    sort: 3,
    title: "调度派工",
    redirect: "/operations/xrepairtube/dispatch/allorder",
    hideMenu: true,
  },
  components: {
    DarkMenu,
    CompositeInput,
    ChartsCompt,
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
        color: ["#0071E2", "#37CFCD", "#E88729"],
        tooltip: {
          trigger: "item",
          formatter: "{b} <br/> {c} ({d}%)",
          backgroundColor: "rgba(0,0,0,0.5)",
          textStyle: {
            color: "#fff",
          },
        },
        legend: {
          orient: "vertical",
          left: "center",
          bottom: "bottom",
          textStyle: {
            fontSize: 14, //字体大小
            color: "#ffffff", //字体颜色
            lineHeigt: 14,
          },
          itemWidth: 14,
          itemHeight: 14,
          data: ["待派发", "已派发"],
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "70%",
            center: ["50%", "50%"],
            data: [
              { value: 335, name: "待派发" },
              { value: 500, name: "已派发" },
            ],
            label: {
              show: false,
              position: "center",
            },
          },
        ],
      },
      grid: {
        height: 120,
      },
    };
  },
  methods: {
    search() {
      console.log("搜索");
    },
    dateSearch() {
      console.log("按日期搜索");
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
    }
  }
}
</style>
