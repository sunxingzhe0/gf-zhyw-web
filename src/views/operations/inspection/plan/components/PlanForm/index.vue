<template>
  <div class="plan-form">
    <AppDialogForm
      :form="form"
      :rules="rules"
      @submit="submit"
      @cancel="cancel"
      :options="options"
      v-loading="loading"
      :formItems="formItems"
      @change="changeHandler"
    ></AppDialogForm>
  </div>
</template>
<script>
/*
@author       qiang
@name         PlanForm
@desc         巡检计划新增/编辑/详情表单
@props
              id      string            巡检计划id
@emit
*/
import common from "@/api/common";
import { FormItems, Rules } from "./constant";
import { TimePeriod } from "@/components/Base";
import inspection from "@/api/operations/inspection";
import { AppDialogForm, InspectPoint } from "@/components/App";
export default {
  name: "PlanForm",
  props: {
    id: {
      type: String,
      default: "",
    },
  },
  components: {
    AppDialogForm,
  },
  data() {
    const Form = {};
    const default1 = ["enable", "cycle", "level"];
    FormItems.forEach((item) => {
      item.forEach((it) => {
        if (it.key === "type") {
          Form[it.key] = "site";
        } else if (it.key === "timeType") {
          Form.dates = [];
          Form[it.key] = "day";
          it.renderFunc = this.renderDate;
        } else if (it.key === "timePeriods") {
          Form[it.key] = [""];
          it.renderFunc = this.renderTimePeriods;
        } else if (default1.includes(it.key)) {
          Form[it.key] = 1;
        } else if (it.key === "points") {
          Form[it.key] = [];
          it.renderFunc = this.renderPoints;
        } else {
          Form[it.key] = "";
        }
      });
    });
    Rules.points.push({ validator: this.pointsValidator });
    Rules.timeType.push({ validator: this.timeTypeValidator });
    Rules.timePeriods.push({ validator: this.timePeriodsValidator });
    return {
      form: Form,
      rules: Rules,
      loading: true,
      formItems: FormItems,
      options: {
        type: [
          { label: "现场巡检", value: "site" },
          { label: "设备巡检", value: "device" },
        ],
        cycle: [
          { label: "循环", value: 2 },
          { label: "单次", value: 1 },
        ],
        level: [
          { label: "低", value: 1 },
          { label: "中", value: 2 },
          { label: "高", value: 3 },
        ],
        enable: [
          { label: "启用", value: 1 },
          { label: "停用", value: 0 },
        ],
        timeType: [
          { label: "每天", value: "day" },
          { label: "每周", value: "week" },
          { label: "每月", value: "month" },
        ],
      },
      weekDays: [
        { value: 1, label: "星期一" },
        { value: 2, label: "星期二" },
        { value: 3, label: "星期三" },
        { value: 4, label: "星期四" },
        { value: 5, label: "星期五" },
        { value: 6, label: "星期六" },
        { value: 7, label: "星期日" },
      ],
      monthDays: [],
      // 以下为巡检点相关变量
      pointKeyword: "",
      pointLoading: false,
      pointList: [],
      initVal: null,
    };
  },
  created() {
    this.monthDays = new Array(31).fill("-").map((_, index) => ({
      label: index + 1 + "号",
      value: index + 1,
    }));
  },
  mounted() {
    this.initVal = JSON.stringify(this.form);
    this.loading = Boolean(this.id);
    if (this.id) this.loadDetail();
    this.loadDeparts();
  },
  methods: {
    // 巡检时间（巡检周期为循环时）
    renderDate(form) {
      const days = form.timeType === "month" ? this.monthDays : this.weekDays;
      return (
        <div>
          <el-select
            placeholder="请选择"
            value={form.timeType}
            onChange={(val) => (form.timeType = val)}
          >
            {this.options.timeType.map((item) => (
              <el-option label={item.label} value={item.value}></el-option>
            ))}
          </el-select>
          {form.timeType !== "day" && (
            <div class="form-dates">
              <el-checkbox-group value={form.dates}>
                {days.map((item) => (
                  <el-checkbox
                    name="days"
                    label={item.value}
                    onChange={() => this.updateDates(item.value)}
                  >
                    {item.label}
                  </el-checkbox>
                ))}
              </el-checkbox-group>
            </div>
          )}
        </div>
      );
    },
    updateDates(val) {
      const dates = this.form.dates;
      if (dates.includes(val)) {
        this.form.dates = dates.filter((item) => item !== val);
      } else {
        this.form.dates.push(val);
      }
    },
    timeTypeValidator(rule, value, callback) {
      if (value === "week" || value === "month") {
        if (!this.form.dates.length) {
          callback(new Error("请完善巡检时间"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    },
    // 巡检时段
    renderTimePeriods(form) {
      return (
        <div class="time-periods">
          {form.timePeriods.map((item, index, arr) => (
            <div class="time-periods-item">
              <TimePeriod
                value={item}
                elAttrs={{ clearable: false }}
                onChange={(val) => this.form.timePeriods.splice(index, 1, val)}
              ></TimePeriod>
              <div class="time-periods-btns">
                {index !== 0 && (
                  <el-button
                    plain
                    type="danger"
                    onClick={() => this.form.timePeriods.splice(index, 1)}
                  >
                    删除
                  </el-button>
                )}
                {index === arr.length - 1 && (
                  <el-button
                    plain
                    type="primary"
                    onClick={() => this.form.timePeriods.push("")}
                  >
                    添加
                  </el-button>
                )}
              </div>
            </div>
          ))}
        </div>
      );
    },
    timePeriodsValidator(rule, value, callback) {
      const val = this.form.timePeriods.filter(
        (item) => item.split("-").length < 2
      );
      if (val.length) {
        callback(new Error("请完善巡检时段"));
      } else {
        callback();
      }
    },
    // 巡检点
    renderPoints(form) {
      return (
        <div>
          <el-select
            remote
            filterable
            placeholder="请输入关键词"
            value={this.pointKeyword}
            loading={this.pointLoading}
            onChange={this.appendPoint}
            remote-method={this.loadPoints}
          >
            {this.pointList.map((item) => (
              <el-option label={item.label} value={item.value}></el-option>
            ))}
          </el-select>
          )
          {form.points.length && (
            <div class="inspect-points">
              {form.points.map((item, index) => (
                <InspectPoint point={item} data-index={index}></InspectPoint>
              ))}
            </div>
          )}
        </div>
      );
    },
    pointsValidator(rule, value, callback) {
      if (!value.length) {
        callback(new Error("请添加巡检点"));
      } else {
        callback();
      }
    },
    changeHandler({ key, val }) {
      if (key === "executorDepartId") {
        const item = this.options.executorDepartId.find(
          (item) => item.value === val
        );
        this.form.executorDepartName = item.label;
      } else if (key === "executorId") {
        const item = this.options.executorId.find((item) => item.value === val);
        this.form.executorName = item.label;
      }
    },
    async loadDeparts() {
      let res = await common.user.getAllDepts();
      res = res.map((item) => ({
        label: item.name,
        value: item.id,
        ...item,
      }));
      this.$set(this.options, "executorDepartId", res);
    },
    async loadMembers(departId) {
      console.log(departId);
      // let res = await common.user.getAllDepts();
      // res = res.map((item) => ({
      //   label: item.name,
      //   value: item.id,
      //   ...item,
      // }));
      // this.$set(this.options, "executorId", res);
    },
    async loadDetail() {
      try {
        const res = await inspection.plan.getPlanDetail(this.id);
        res.timePeriods = res.timePeriods.split(",");
        this.loadMembers(this.form.executorDepartId);
        this.initVal = JSON.stringify(this.form);
        this.form = res;
      } finally {
        this.loading = false;
      }
    },
    async loadPoints(val) {
      this.pointKeyword = val;
      if (val) {
        try {
          this.pointLoading = true;
          const res = await inspection.point.getPointList({
            pageNum: 1,
            keyword: val,
            pageSize: 10,
          });
          this.pointList = res.list.map((item) => ({
            label: `【${item.code}】${item.name}`,
            value: item.id,
            ...item,
          }));
        } catch (e) {
          this.pointList = [];
        } finally {
          this.pointLoading = false;
        }
      } else {
        this.pointList = [];
      }
    },
    appendPoint(val) {
      const item = this.pointList.find((item) => item.id === val);
      this.form.points.push(item);
    },
    async submit(form) {
      console.log(form);
    },
    async cancel() {
      if (this.initVal !== JSON.stringify(this.form)) {
        try {
          const confirm = await this.$confirm("修改还未保存，您确定要离开！");
          if (confirm === "confirm") {
            this.$router.back();
          }
        } catch (e) {
          // nothing
        }
      } else {
        this.$router.back();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.plan-form {
  overflow: auto;
  max-height: 70vh;
  &::v-deep {
    .app-dialog-body {
      overflow: hidden;
    }
    .app-dialog-form {
      padding-bottom: 72px;
      .el-form-item {
        align-items: unset;
      }
    }
    .form-row {
      margin-top: 0;
      &.footer {
        bottom: 0;
        height: 52px;
        position: absolute;
        background: #010101;
      }
      .el-form-item {
        margin-top: 20px;
      }
    }
    .form-dates {
      padding: 10px;
      margin-top: 10px;
      line-height: 34px;
      background: #1a1a1a;
      overflow: hidden;
    }
    .el-checkbox {
      float: left;
      width: 79px;
      display: block;
    }
    .el-input__prefix {
      display: none;
    }
    .time-periods {
      .time-periods-item {
        position: relative;
        margin-top: 10px;
        &:first-child {
          margin-top: 0;
        }
      }
      .time-periods-btns {
        top: 0;
        right: 0;
        position: absolute;
        transform: translateX(100%);
      }
      .el-button {
        width: 52px;
        height: 32px;
        padding: 0;
      }
    }
    .inspect-points {
      overflow: hidden;
      padding: 10px;
      margin-top: 10px;
      background: #1a1a1a;
    }
  }
}
</style>
