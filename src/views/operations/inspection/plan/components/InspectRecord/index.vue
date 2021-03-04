<template>
  <div class="inspect-records">
    <div class="inspect-header">
      <div class="inspect-title">
        巡检明细
      </div>
      <div class="inspect-filter">
        <el-select size="mini" @change="search" v-model="executStatus">
          <el-option value="">全部</el-option>
          <el-option
            v-for="(value, key) in ExecutStatus"
            :label="value"
            :value="key"
            :key="key"
          ></el-option>
        </el-select>
        <el-select size="mini" v-model="searchType" @change="search">
          <el-option label="任务时间" value="taskTime"></el-option>
          <el-option label="执行时间" value="executeTime"></el-option>
          <el-option label="任务名称" value="taskName"></el-option>
        </el-select>
        <el-input
          size="mini"
          @change="search"
          v-model="keyword"
          placeholder="请输入"
          v-if="searchType === 'taskName'"
        ></el-input>
        <el-date-picker
          v-else
          size="mini"
          @change="search"
          v-model="timerange"
          type="datetimerange"
          range-separator="至"
          end-placeholder="结束日期"
          start-placeholder="开始日期"
          :default-time="['00:00:00', '23:59:59']"
        >
        </el-date-picker>
      </div>
    </div>
    <InspectCheckList :data="dataList"></InspectCheckList>
  </div>
</template>
<script>
/*
@author        qiang
@name          InspectRecord
@desc          巡检详情-巡检记录
@props         id       string      巡检计划id 
@emit
*/
import { mapState } from "vuex";
import { InspectCheckList } from "@/components/App";
import inspection from "@/api/operations/inspection";
export default {
  name: "InspectRecord",
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  components: {
    InspectCheckList,
  },
  data() {
    return {
      keyword: "",
      dataList: [],
      executStatus: "",
      timerange: ["", ""],
      searchType: "taskTime",
    };
  },
  computed: {
    ...mapState({
      ExecutStatus: (state) => state.operations.status.ExecutStatus,
    }),
  },
  mounted() {
    this.search();
  },
  methods: {
    async search() {
      const params = {
        planId: this.id,
        status: this.executStatus,
        [this.searchType]:
          this.searchType === "taskName"
            ? this.keyword
            : this.timerange.join(","),
      };
      this.loading = true;
      try {
        this.dataList = await inspection.plan.getInspectRecord(params);
        this.loading = false;
      } catch (e) {
        this.dataList = [];
        this.loading = false;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/variables.scss";
.inspect-records {
  display: flex;
  padding: 0 20px;
  flex-direction: column;
  .inspect-header {
    display: flex;
    margin: 20px 0;
    justify-content: space-between;
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
  .inspect-filter {
    display: flex;
  }
  &::v-deep {
    .el-select {
      width: 100px;
    }
    .el-input {
      width: 200px;
      margin-left: 0;
    }
  }
}
</style>
