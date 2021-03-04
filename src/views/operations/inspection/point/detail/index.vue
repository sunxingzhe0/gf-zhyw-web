<template>
  <AppDialog class="point-detail" router title="巡检点详情" :show.sync="show">
    <div class="base-info">
      <div class="base-info-row">
        <div class="base-info-row-item">编号：{{ baseInfo.code }}</div>
        <div class="base-info-row-item">名称：{{ baseInfo.name }}</div>
        <div class="base-info-row-item">所属区域：{{ baseInfo.area }}</div>
      </div>
      <div class="base-info-row">
        <div class="base-info-row-item">RFID：{{ baseInfo.rfid }}</div>
        <div class="base-info-row-item">
          GIS定位：
          <template v-if="baseInfo.gisLat && baseInfo.gisLog">
            {{ baseInfo.gisLat + "," + baseInfo.gisLog }}
          </template>
        </div>
        <div class="base-info-row-item">拍照数量：{{ baseInfo.photoNum }}</div>
      </div>
    </div>
    <DarkMenu :navs="navs" :noRouter="true" v-model="activeNav"> </DarkMenu>
    <InspectProjects
      :pointId="pointId"
      v-if="activeNav === '0'"
    ></InspectProjects>
    <InspectRecord :pointId="pointId" v-if="activeNav === '1'"></InspectRecord>
    <OperateLog :pointId="pointId" v-if="activeNav === '2'"></OperateLog>
  </AppDialog>
</template>
<script>
/*
@author        qiang
@name          PointDetail
@desc          巡检点详情
@query         pointId    string    巡检点id
@props         
@emit           
*/
import inspection from "@/api/operations/inspection";
import { AppDialog, DarkMenu } from "@/components/App";
import { OperateLog, InspectRecord, InspectProjects } from "../components";
export default {
  name: "PointDetail",
  meta: {
    keepAlive: true,
    name: "巡检点详情",
    title: "巡检点详情",
  },
  components: {
    DarkMenu,
    AppDialog,
    OperateLog,
    InspectRecord,
    InspectProjects,
  },
  computed: {
    dialogShow: {
      get() {
        return this.show;
      },
      set() {
        this.activeNav = "0";
        this.$emit("update:show", false);
      },
    },
  },
  data() {
    return {
      navs: [
        { text: "检查项目", path: "0" },
        { text: "巡检记录", path: "1" },
        { text: "操作日志", path: "2" },
      ],
      show: false,
      pointId: "",
      baseInfo: {}, // 基本信息
      activeNav: "0",
    };
  },
  mounted() {
    this.show = true;
    this.pointId = this.$route.query.pointId;
    if (this.pointId) this.getBaseInfo();
  },
  methods: {
    // 获取巡检点基本信息
    async getBaseInfo() {
      try {
        this.loading = true;
        const res = await inspection.point.getBaseInfo(this.pointId);
        res.area = res.area.map((item) => item.name).join(",");
        this.baseInfo = res;
        this.loading = false;
      } catch (_) {
        this.loading = false;
      }
    },
    // 获取巡检点巡检记录

    // 获取巡检点操作日志
  },
};
</script>
<style lang="scss" scoped>
.point-detail {
  &::v-deep {
    .app-dialog-body {
      display: flex;
      flex-direction: column;
    }

    .inspect-record,
    .inspect-projects {
      flex: 1;
      overflow: auto;
    }
  }
}
.base-info {
  flex-shrink: 0;
  overflow: hidden;
  padding: 0 20px 20px;
  .base-info-row {
    overflow: hidden;
    margin-top: 20px;
  }
  .base-info-row-item {
    float: left;
    width: 33.3%;
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #e6e6e6;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
.dark-el-menu.el-menu {
  padding: 0 20px;
  justify-content: flex-start;
  background: rgba(26, 26, 26, 0.8);
  &::v-deep {
    .el-menu-item {
      margin-right: 40px;
    }
  }
}
</style>
