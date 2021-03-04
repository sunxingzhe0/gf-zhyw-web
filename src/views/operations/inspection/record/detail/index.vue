<template>
  <AppDialog router :show="show" title="巡检记录详情" v-loading="loading">
    <div class="record-detail">
      <div class="base-info">
        <div class="base-info-row">
          <div class="base-info-item">巡检点编号：{{ baseInfo.pointCode }}</div>
          <div class="base-info-item">巡检点名称：{{ baseInfo.pointName }}</div>
          <div class="base-info-item">所属区域：{{ baseInfo.areaStr }}</div>
        </div>
        <div class="base-info-row">
          <div class="base-info-item">RFID：{{ baseInfo.RFID }}</div>
          <div class="base-info-item">GIS定位：{{ baseInfo.GIS }}</div>
          <div class="base-info-item">
            巡检类型：{{
              baseInfo.inspectType === "site" ? "现场巡检" : "设备巡检"
            }}
          </div>
        </div>
        <div class="base-info-row">
          <div class="base-info-item">
            巡检任务：{{ baseInfo.inspectionTaskName }}
          </div>
          <div class="base-info-item">
            执行人：{{
              `${baseInfo.executorName}，${baseInfo.executorDepartName}，${baseInfo.executorJobNum}`
            }}
          </div>
          <div class="base-info-item">巡检时间：{{ baseInfo.createdTime }}</div>
        </div>
      </div>
      <div class="inspect-info">
        <div class="inspect-projects">
          <div class="inspect-title">
            检查项目
          </div>
          <el-tree
            :indent="40"
            :data="projects"
            :props="projectProps"
            icon-class="el-icon-arrow-right"
            :render-content="renderProjects"
          >
          </el-tree>
        </div>
        <div class="geo-infos">
          <div class="inspect-title">
            地理位置
          </div>
        </div>
      </div>
      <div class="inspect-info flex-column">
        <div class="detail-filter">
          <div class="inspect-title">
            巡检明细
          </div>
          <div class="inspect-detail-filters">
            <el-select
              size="mini"
              placeholder="执行状态"
              v-model="executStatus"
            >
              <el-option value="">全部</el-option>
              <el-option
                v-for="(value, key) in ExecutStatus"
                :label="value"
                :value="key"
                :key="key"
              ></el-option>
            </el-select>
            <el-select
              size="mini"
              placeholder="设备状态"
              v-model="deviceStatus"
            >
              <el-option value="" label="全部"></el-option>
              <el-option value="normal" label="正常"></el-option>
              <el-option value="abnormal" label="异常"></el-option>
            </el-select>
          </div>
        </div>
        <InspectCheckList :data="detailList"></InspectCheckList>
      </div>
    </div>
  </AppDialog>
</template>
<script>
/*
@author        qiang
@name          OperationsInspectionRecordDetail
@desc          巡检记录详情
@props
@query         id   string    巡检记录id
@emit
*/
import { mapState } from "vuex";
import inspection from "@/api/operations/inspection";
import { AppDialog, InspectCheckList } from "@/components/App";
export default {
  name: "OperationsInspectionRecordDetail",
  meta: {
    title: "巡检记录详情",
  },
  components: {
    AppDialog,
    InspectCheckList,
  },
  data() {
    return {
      id: "",
      show: false,
      loading: true,
      baseInfo: {},
      projects: [],
      detailList: [],
      listLoading: false,
      projectProps: {
        label: "deviceName",
        children: "contents",
      },
      executStatus: "",
      deviceStatus: "",
    };
  },
  computed: {
    ...mapState({
      ExecutStatus: (state) => state.operations.status.ExecutStatus,
    }),
  },
  mounted() {
    this.id = this.$route.query.id;
    this.show = true;
    this.init();
  },
  methods: {
    init() {
      Promise.all([this.getRecordDetail(), this.getDetailList(false)]).finally(
        () => (this.loading = false)
      );
    },
    async getRecordDetail() {
      const res = await inspection.record.getRecordDetail(this.id);
      this.baseInfo = res.baseInfo;
      this.projects = res.projects;
    },
    async getDetailList(loading = true) {
      const params = {
        id: this.id,
        executStatus: this.executStatus,
        deviceStatus: this.deviceStatus,
      };
      this.listLoading = loading;
      try {
        this.detailList = await inspection.record.getDetailList(params);
      } finally {
        this.listLoading = false;
      }
    },
    renderProjects(h, { data, node }) {
      if (node.level === 1) {
        return (
          <span>
            【{data.deviceCode}】 {data.deviceName},{data.deviceMode}
          </span>
        );
      } else {
        return <span>{data.content}</span>;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/variables.scss";
.record-detail {
  width: 100%;
  overflow: auto;
  padding: 10px 20px;
  max-height: inherit;
  &::v-deep {
    .el-tree {
      margin-left: 60px;
      background: rgb(21, 21, 21);
    }
    .el-icon-arrow-right {
      color: $--color-primary;
      font-weight: bolder;
      &.is-leaf {
        color: transparent;
      }
    }
    .el-tree-node__content {
      font-size: 14px;
      line-height: 24px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #e6e6e6;
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
.inspect-info {
  display: flex;
  justify-content: space-between;
  &.flex-column {
    flex-direction: column;
  }
  .geo-infos,
  .inspect-detail,
  .inspect-projects {
    flex: 1;
    height: auto;
    padding: 20px;
    overflow: hidden;
    background: rgba(26, 26, 26, 0.8);
  }
  .geo-infos {
    height: 340px;
    margin-left: 20px;
  }
  .detail-filter {
    display: flex;
    margin: 20px 0;
    justify-content: space-between;
  }
}
.abnormal {
  color: $--color-danger;
}
.normal {
  color: $--color-success;
}
</style>
