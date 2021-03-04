<template>
  <div class="plan-info">
    <div class="base-info-row">
      <div class="base-info-item">计划名称：{{ data.name }}</div>
      <div class="base-info-item">
        计划类型：{{ data.type === "site" ? "现场巡检" : "设备巡检" }}
      </div>
      <div class="base-info-item">
        状态：{{ data.enable ? "启用" : "禁用" }}
      </div>
    </div>
    <div class="base-info-row">
      <div class="base-info-item">计划编号：{{ data.id }}</div>
      <div class="base-info-item">执行部门：{{ data.executorDepartName }}</div>
      <div class="base-info-item">执行人：{{ data.executorName }}</div>
    </div>
    <div class="base-info-row">
      <div class="base-info-item">计划级别：{{ data.level }}</div>
      <div class="base-info-item">
        周期：{{ data.cycle === 1 ? "单次" : "循环" }}
      </div>
      <div class="base-info-item"></div>
    </div>
    <div class="base-info-row">
      <div class="base-info-item">
        巡检时间：
        <template v-if="data.cycle === 2">
          <span>{{ data.startTime }} ~ {{ data.endTime }}</span>
          <span style="margin: 0 10px">{{ timeTypes[data.timeType] }}</span>
          <span v-if="data.timeType !== 'day'">
            {{ date }}
          </span>
        </template>
        <template v-else>
          <span>{{ data.date }}</span>
        </template>
      </div>
    </div>
    <div class="base-info-row">
      <div class="base-info-item">巡检时段：{{ data.timePeriods }}</div>
    </div>
    <div class="base-info-row">
      <div class="base-info-item">计划描述：{{ data.desc }}</div>
    </div>
    <div class="base-info-row">
      <div class="base-info-item" style="display: flex">
        <span>巡检路线：</span>
        <div>
          <InspectPoint
            v-for="(item, index) in data.points"
            :point="item"
            :key="index"
          ></InspectPoint>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/*
@author        qiang
@name          PlanInfo
@desc          巡检计划=>计划内容
@props         id       string      巡检计划id 
@emit
*/
import { InspectPoint } from "@/components/App";
import inspection from "@/api/operations/inspection";
export default {
  name: "PlanInfo",
  props: {
    id: {
      type: String,
      default: "",
    },
  },
  components: {
    InspectPoint,
  },
  data() {
    return {
      data: {},
      timeTypes: {
        day: "每天",
        week: "每周",
        month: "每月",
      },
      levels: [
        { label: "低", value: 1 },
        { label: "中", value: 2 },
        { label: "高", value: 3 },
      ],
      loading: false,
    };
  },
  computed: {
    date() {
      const weekDays = [
        { value: 1, label: "星期一" },
        { value: 2, label: "星期二" },
        { value: 3, label: "星期三" },
        { value: 4, label: "星期四" },
        { value: 5, label: "星期五" },
        { value: 6, label: "星期六" },
        { value: 7, label: "星期日" },
      ];
      if (this.data.timeType === "week") {
        return this.data.dates
          .map((item) => {
            const it = weekDays.find((_it) => _it.value === item);
            return it.label || "";
          })
          .join("、");
      }
      if (this.data.timeType === "month") {
        return this.data.dates.map((item) => item + "号").join("、");
      }
      return "";
    },
  },
  mounted() {
    this.loadDetail();
  },
  methods: {
    async loadDetail() {
      try {
        const res = await inspection.plan.getPlanDetail(this.id);
        const level = this.levels.find((item) => item.value === res.level);
        res.timePeriods = res.timePeriods
          .replaceAll("-", "~")
          .replaceAll(",", "；");
        res.level = level.label;
        this.data = res;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/variables.scss";
.plan-info {
  width: 100%;
  padding: 10px 20px;
  max-height: inherit;
  &::v-deep {
    .inspect-point {
      line-height: 36px;
    }
  }
}
.base-info-row {
  display: flex;
  line-height: 36px;
}
.base-info-item {
  flex: 1;
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #e6e6e6;
}
.inspect-title {
  height: 20px;
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #ffffff;
  &::before {
    content: "";
    width: 2px;
    float: left;
    height: 20px;
    margin-right: 8px;
    background: $--color-primary;
  }
}
</style>
