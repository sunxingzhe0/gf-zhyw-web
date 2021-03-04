<template>
  <div class="inspect-record" v-loading="loading">
    <div class="record-item" v-for="(item, index) in list" :key="index">
      <div class="item-left">
        <span>{{ item.time.substring(5, 10) }}</span>
        <span>{{ item.time.substring(11) }}</span>
      </div>
      <div class="item-right">
        <div class="right-inner">
          <div class="execut-info">
            执行人:{{ item.executotName }}，{{ item.executorDepartName }}，{{
              item.jobNum
            }}
          </div>
          <div class="item-status" :class="{ abnormal: item.abnormal }">
            {{ item.abnormal ? "异常" : "正常" }}
          </div>
          <el-link
            type="primary"
            class="go-detail"
            :underline="false"
            @click="
              $router.push('/operations/inspection/record/detail?id=' + item.id)
            "
            >查看</el-link
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/*
@author        qiang
@name          InspectRecord
@desc          巡检点-巡检记录
@props         pointId      string      巡检点id     
@emit
*/
import inspection from "@/api/operations/inspection";
export default {
  name: "InspectRecord",
  props: {
    pointId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      list: [],
      loading: false,
    };
  },
  created() {
    this.getInspectRecord();
  },
  methods: {
    async getInspectRecord() {
      try {
        this.loading = true;
        this.list = await inspection.point.getInspectRecord(this.pointId);
        this.loading = false;
      } catch (_) {
        this.list = [];
        this.loading = false;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.inspect-record {
  padding-top: 20px;
  .record-item {
    margin: 0 200px;
    display: flex;
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #ffffff;
  }
  .item-left {
    width: 75px;
    display: flex;
    text-align: right;
    position: relative;
    padding-right: 25px;
    white-space: nowrap;
    flex-direction: column;
    border-right: 2px solid hsla(0, 0%, 100%, 0.2);
    &::before {
      top: -6px;
      content: "";
      width: 12px;
      height: 12px;
      right: -7px;
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.2);
    }
    &::after {
      top: -4px;
      width: 8px;
      content: "";
      height: 8px;
      right: -5px;
      position: absolute;
      border-radius: 50%;
      background: #0071e3;
    }
  }
  .item-right {
    padding-bottom: 20px;
  }
  .right-inner {
    width: 600px;
    height: 56px;
    padding: 10px;
    display: flex;
    margin-left: 24px;
    position: relative;
    flex-direction: column;
    border-radius: 0px 6px 6px 6px;
    justify-content: space-between;
    background: rgba(255, 255, 255, 0.1);
  }
  .item-status {
    font-size: 12px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #b3b3b3;
  }
  .abnormal {
    color: rgba(247, 74, 74, 1);
  }
  .go-detail {
    position: absolute;
    right: 10px;
    top: 18px;
  }
}
</style>
