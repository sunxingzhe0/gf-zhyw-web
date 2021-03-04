<template>
  <div class="inspect-check-list">
    <div v-for="(item, index) in data" :key="index">
      <div class="list-title">
        <span>{{ index + 1 }}.</span>
        <span>第{{ index + 1 }}次巡检时段：</span>
        <span>{{ item.startTime.substring(11, 16) }}</span>
        <span> ~ {{ item.endTime.substring(11, 16) }}</span>
      </div>
      <div class="list-content">
        <div class="point-info">
          <div class="list-left">{{ item.pointName }}</div>
          <div class="list-right">
            巡检时间：
            {{ item.executStartTime }}～{{ item.executEndTime }}
            <span
              class="device-status"
              :class="item.abnormal ? 'abnormal' : 'normal'"
              >{{ item.abnormal ? "异常" : "正常" }}</span
            >
          </div>
        </div>
        <div
          v-for="(_item, _index) in item.devices"
          :key="index + '-' + _index"
          class="device-info"
        >
          <div class="list-left">
            <span>{{ _item.deviceName }}</span>
            <span
              class="device-status"
              :class="_item.abnormal ? 'abnormal' : 'normal'"
              >{{ _item.abnormal ? "异常" : "正常" }}</span
            >
          </div>
          <div class="list-right">
            <div class="list-contents">
              <div
                class="content-item"
                v-for="(it, i) in _item.contents"
                :key="index + '-' + _index + '-' + i"
                :class="{ abnormal: it.status === 'Timedout' }"
              >
                <span>{{ i + 1 + "." + it.name + " " + it.content }}</span>
                <span v-if="it.ways === 'input'">{{ it.value }}</span>
                <span>执行人：{{ it.executorName }}</span>
                <span>执行时间：{{ it.executorTime }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/*
@author        qiang
@name          InspectCheckList
@desc          巡检明细（清单）组件
@props          
@emit
*/
export default {
  name: "InspectCheckList",
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/variables.scss";
.inspect-check-list {
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #ffffff;
  overflow: hidden;
  padding: 0 20px;
  background: #1a1a1a;
  .list-title {
    margin-top: 20px;
  }
  .point-info {
    display: flex;
    margin-top: 20px;
    .list-left::before {
      width: 12px;
      height: 12px;
      top: -6px;
      right: -7px;
    }
  }
  .device-info {
    display: flex;
  }
  .list-left {
    width: 200px;
    text-align: right;
    padding-right: 25px;
    position: relative;
    border-right: 1px solid rgba(255, 255, 255, 0.2);
    &::before {
      content: "";
      width: 8px;
      height: 8px;
      background: #cccccc;
      border-radius: 50%;
      top: -4px;
      right: -5px;
      position: absolute;
    }
  }
  .list-right {
    flex: 1;
    padding-left: 25px;
    padding-bottom: 20px;
    position: relative;
    border-left: 1px solid rgba(255, 255, 255, 0.2);
  }
  .list-contents {
    overflow: hidden;
    padding: 0 10px 10px;
    border-radius: 0px 6px 6px 6px;
    background: rgba(255, 255, 255, 0.1);
    span {
      margin-right: 20px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  .content-item {
    margin-top: 10px;
  }
  .device-status {
    margin-left: 10px;
  }
}
.abnormal {
  color: $--color-danger;
}
.normal {
  color: $--color-success;
}
</style>
