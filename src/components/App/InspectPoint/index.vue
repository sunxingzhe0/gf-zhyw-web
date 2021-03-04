<template>
  <div class="inspect-point">
    <div class="point-item">
      <span
        class="el-icon-arrow-right"
        :class="{ unfold: unfold }"
        @click="unfoldDevice"
      ></span>
      <span>[{{ point.code }}]{{ point.name }}</span>
    </div>
    <div class="point-devices" v-show="unfold" v-loading="loading">
      <div class="point-device" v-for="(item, index) in devices" :key="index">
        【{{ item.code }}】{{ item.name + " " + item.model }}
      </div>
    </div>
  </div>
</template>
<script>
/*
@author        qiang
@name          InspectPoint
@desc          可懒加载设备列表的单个巡检点组件，可以展开加载该巡检点下的设备
@props         point      object      当前巡检点 
@emit
*/
import inspection from "@/api/operations/inspection";
export default {
  name: "InspectPoint",
  props: {
    point: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      devices: [],
      unfold: false, // 是否展开
      loading: false, // 巡检点loading
    };
  },
  methods: {
    unfoldDevice() {
      console.log(1);
      this.unfold = !this.unfold;
      this.loadDevices();
    },
    async loadDevices() {
      if (this.devices.length) return;
      try {
        this.loading = true;
        const res = await inspection.point.getRelateDevice({
          pageNum: 1,
          pageSize: 20,
          pointId: this.point.id,
        });
        this.devices = res.list;
      } catch (e) {
        this.devices = [];
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.inspect-point {
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #ffffff;
  line-height: 24px;
}
.point-item {
  .el-icon-arrow-right {
    font-weight: bold;
    cursor: pointer;
    margin-right: 10px;
    transition: all ease 0.4s;
  }
  .unfold {
    transform: rotate(90deg);
  }
}
</style>
