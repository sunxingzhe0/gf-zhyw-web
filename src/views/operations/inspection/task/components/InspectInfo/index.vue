<template>
  <div class="inspect-info flex-column">
    <div class="detail-filter">
      <div class="inspect-title">
        巡检明细
      </div>
      <div class="inspect-detail-filters">
        <el-select size="mini" placeholder="执行状态" v-model="executStatus">
          <el-option value="">全部</el-option>
          <el-option
            v-for="(value, key) in ExecutStatus"
            :label="value"
            :value="key"
            :key="key"
          ></el-option>
        </el-select>
        <el-select size="mini" placeholder="设备状态" v-model="deviceStatus">
          <el-option value="" label="全部"></el-option>
          <el-option value="normal" label="正常"></el-option>
          <el-option value="abnormal" label="异常"></el-option>
        </el-select>
      </div>
    </div>
    <InspectCheckList :data="detailList"></InspectCheckList>
  </div>
</template>
<script>
/*
@author        qiang
@name          InspectInfo
@desc          巡检任务-巡检明细
@props         taskId       string      巡检任务id
@emit
*/
import { mapState } from "vuex";
import inspection from "@/api/operations/inspection";
import { InspectCheckList } from "@/components/App";
export default {
  name: "InspectInfo",
  props: {
    taskId: {
      type: String,
      required: true,
    },
  },
  components: {
    InspectCheckList,
  },
  data() {
    return {
      loading: true,
      detailList: [],
      executStatus: "",
      deviceStatus: "",
    };
  },
  computed: {
    ...mapState({
      ExecutStatus: (state) => state.operations.status.ExecutStatus,
    }),
  },
  created() {
    this.show = true;
    this.getDetailList();
  },
  methods: {
    async getDetailList(loading = true) {
      const params = {
        taskId: this.taskId,
        executStatus: this.executStatus,
        deviceStatus: this.deviceStatus,
      };
      this.listLoading = loading;
      try {
        this.detailList = await inspection.task.getDetailList(params);
      } finally {
        this.listLoading = false;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/variables.scss";

.inspect-info {
  display: flex;
  justify-content: space-between;
  &.flex-column {
    flex-direction: column;
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
  .inspect-detail {
    flex: 1;
    height: auto;
    padding: 20px;
    overflow: hidden;
    background: rgba(26, 26, 26, 0.8);
  }
  .detail-filter {
    display: flex;
    padding: 20px;
    justify-content: space-between;
    position: sticky;
    top: 0;
    z-index: 1;
    background: #010101;
  }
  .abnormal {
    color: $--color-danger;
  }
  .normal {
    color: $--color-success;
  }
  &::v-deep {
    .inspect-check-list {
      margin: 0 20px;
      padding: 0 20px;
    }
  }
}
</style>
