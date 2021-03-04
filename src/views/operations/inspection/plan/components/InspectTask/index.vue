<template>
  <div class="inspect-task">
    <div class="inspect-header">
      <div class="inspect-title">
        巡检明细
      </div>
      <div class="inspect-filter">
        <el-select size="mini" v-model="type" @change="search">
          <el-option label="全部" value=""></el-option>
          <el-option label="设备" :value="1"></el-option>
          <el-option label="现场" :value="2"></el-option>
        </el-select>
        <el-select size="mini" v-model="level" @change="search">
          <el-option label="全部" value=""></el-option>
          <el-option label="高" :value="3"></el-option>
          <el-option label="中" :value="2"></el-option>
          <el-option label="低" :value="1"></el-option>
        </el-select>
        <el-select size="mini" v-model="timeType" @change="search">
          <el-option label="开始时间" value="startTime"></el-option>
          <el-option label="结束时间" value="endTime"></el-option>
        </el-select>
        <el-date-picker
          size="mini"
          v-model="time"
          type="datetime"
          @change="search"
          placeholder="请选择"
        >
        </el-date-picker>
      </div>
    </div>
    <div class="inspect-body" v-loading="loading">
      <InspectTaskCard
        v-for="(item, index) in list"
        @click="toDetail(item.id)"
        :key="index"
        :item="item"
      ></InspectTaskCard>
      <div class="empty"></div>
    </div>
    <div class="inspect-footer">
      <el-pagination
        :total="total"
        :page-size="pageSize"
        :current-page="pageNum"
        :page-sizes="[9, 18, 27, 36]"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes, prev, pager, next, jumper"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
/*
@author        qiang
@name          InspectTask
@desc          巡检计划详情-巡检任务
@props         id     string    巡检计划id 
@emit
*/
import { InspectTaskCard } from "@/components/App";
import inspection from "@/api/operations/inspection";
export default {
  name: "InspectTask",
  props: {},
  components: {
    InspectTaskCard,
  },
  data() {
    return {
      type: "",
      time: "",
      list: [],
      total: 0,
      level: "",
      pageNum: 1,
      pageSize: 9,
      timeType: "",
      loading: false,
    };
  },
  created() {
    this.search();
  },
  methods: {
    async search() {
      try {
        this.loading = true;
        const params = {
          type: this.type,
          planId: this.id,
          level: this.level,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          [this.timeType]: this.time,
        };
        const res = await inspection.task.getTaskList(params);
        this.total = res.total;
        this.list = res.list;
        this.loading = false;
      } catch (e) {
        this.list = [];
        this.loading = false;
      }
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.search();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.search();
    },
    toDetail(id) {
      this.$router.push("/operations/inspection/task/detail?taskId=" + id);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/variables.scss";
.inspect-task {
  padding: 68px 20px 72px;
  &::v-deep {
    .el-select {
      width: 100px;
    }
    .el-input {
      width: 200px;
      margin-left: 0;
    }
    .inspect-task-card {
      margin-top: 10px;
    }
  }
  .inspect-header {
    top: 36px;
    z-index: 1;
    display: flex;
    position: absolute;
    padding-top: 20px;
    background: #020202;
    width: calc(100% - 40px);
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
  .inspect-body {
    display: flex;
    flex-wrap: wrap;
    min-height: 20vh;
    justify-content: space-between;
  }
  .empty {
    width: 380px;
    height: 0;
  }
  .inspect-footer {
    bottom: 0;
    padding: 20px 0;
    position: absolute;
    background: #040404;
    width: calc(100% - 40px);
  }
}
</style>
