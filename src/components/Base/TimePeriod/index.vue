<template>
  <div class="time-period">
    <el-time-select
      placeholder="开始时间"
      v-model="startTime"
      :picker-options="{
        start: '00:00',
        step: '00:01',
        end: '23:59',
      }"
      :disabled="disabled"
      v-bind="{ ...elAttrs }"
    >
    </el-time-select>
    <span class="splice-span">~</span>
    <el-time-select
      placeholder="结束时间"
      v-model="endTime"
      :picker-options="{
        start: '00:00',
        step: '00:01',
        end: '23:59',
        minTime: startTime,
      }"
      :disabled="disabled"
      v-bind="{ ...elAttrs }"
    >
    </el-time-select>
  </div>
</template>

<script>
/*
@author        qiang
@name          TimePeriod
@desc          时间段选择组件,开始时间与结束时间以 - 分割
@props         value        string                  时间段[09:00-12:00]
               conf         object<{                时间选择配置
                   start        string["00:00"]     开始时间
                   step         string["00:01"]     时间间隔
                   end          string["23:59"]     结束时间
               }>  
               disabled     boolean                 是否禁用
               elAttrs      object                  参考el-time-select配置      
@emit          input        string                  时间段[09:00-12:00] 
               change       string                  时间段[09:00-12:00] 
*/

export default {
  name: "TimePeriod",
  props: {
    conf: {
      type: Object,
      default: () => ({ start: "00:00", step: "00:01", end: "23:59" }),
    },
    value: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    elAttrs: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    startTime: {
      get() {
        const arr = this.value.split("-");
        return arr[0] || "";
      },
      set(val) {
        const value = `${val}-${this.endTime || ""}`;
        this.$emit("input", value);
        this.$emit("change", value);
      },
    },
    endTime: {
      get() {
        const arr = this.value.split("-");
        return arr[1] || "";
      },
      set(val) {
        const value = `${this.startTime || ""}-${val}`;
        this.$emit("input", value);
        this.$emit("change", value);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.time-period {
  height: 32px;
  display: flex;
  border: 1px solid #4d4d4d;
  background: hsla(0, 0%, 100%, 0.1);
  .splice-span {
    width: 20px;
    color: #fff;
    text-align: center;
    background: hsla(0, 0%, 100%, 0.1);
  }
  .el-date-editor--time-select {
    flex: 1;
    &::v-deep {
      .el-input__inner {
        border: none;
      }
    }
  }
}
</style>
