<template>
  <div class="sparepart">
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
        <el-button
          size="mini"
          type="primary"
          class="fault-btn"
          @click="applyBtn"
          >备件申请
        </el-button>
      </div>
      <ChartsCompt :chartsOptions="chartsOptions" />
    </div>
    <!-- 列表 -->
    <ApplyList />
    <!-- 备件申请弹窗 -->
    <DarkDialog v-model="applyDialog">
      <ApplyForm />
    </DarkDialog>
  </div>
</template>
<script>
import { CompositeInput } from "@/components/App/FormFilters";
import ChartsCompt from "@/components/App/ChartsCompt";
import ApplyList from "./components/applylist";
import DarkDialog from "@/components/App/DarkDialog";
import ApplyForm from "./components/applyform";
export default {
  name: "OperationsXrepairtubeSparepart",
  meta: {
    sort: 3,
    title: "备件申领",
    hideMenu: true,
  },
  components: {
    CompositeInput,
    ChartsCompt,
    ApplyList,
    DarkDialog,
    ApplyForm,
  },
  data() {
    return {
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
          data: ["待审核", "已通过", "已驳回"],
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "70%",
            center: ["50%", "50%"],
            data: [
              { value: 100, name: "待审核" },
              { value: 310, name: "已通过" },
              { value: 500, name: "已驳回" },
            ],
            label: {
              show: false,
              position: "center",
            },
          },
        ],
      },
      //备件申请弹窗标题
      applyDialog: {
        dialogVisible: false,
        binds: {
          title: "故障报修",
          width: "680px",
        },
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
    handleSizeChange() {},
    handleCurrentChange() {},
    //备件申请
    applyBtn() {
      this.applyDialog.dialogVisible = true;
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
.sparepart {
  .charts-box {
    padding: 10px;
    background: #000;
    margin-bottom: 10px;
  }
}
</style>
