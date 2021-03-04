<template>
  <div class="device-realte">
    <div class="device-filter">
      <el-cascader
        size="mini"
        clearable
        :props="{
          value: 'id',
          label: 'name',
          checkStrictly: true,
        }"
        v-model="deviceType"
        :options="deviceTypes"
      ></el-cascader>
      <FlexInput size="mini" v-model="params" :options="searchOptions">
        <i
          slot="suffix"
          class="el-input__icon el-icon-search"
          @click="search"
        ></i>
      </FlexInput>
    </div>
    <div class="device-wrapper">
      <div class="device-tree">
        <div class="tree-header">
          <span class="tree-title">未关联设备</span>
        </div>
        <!-- <el-tree :props="props" :load="loadNode" lazy show-checkbox> </el-tree> -->
      </div>
      <div class="device-tree">
        <div class="tree-header">
          <span class="tree-title">已关联设备</span>
          <span class="tree-btn">批量设置巡检内容</span>
        </div>
        <el-tree
          show-checkbox
          :data="relateDeviceTree"
          :render-content="renderTree"
          :props="{ children: 'deviceInfoList' }"
        >
        </el-tree>
      </div>
    </div>
    <el-dialog title="添加巡检内容" :visible.sync="editShow">
      <el-table :data="gridData">
        <el-table-column
          property="date"
          label="日期"
          width="150"
        ></el-table-column>
        <el-table-column
          property="name"
          label="姓名"
          width="200"
        ></el-table-column>
        <el-table-column property="address" label="地址"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
/*
@author        qiang
@name          Device
@desc          巡检点关联设备
@props         pointId      string      巡检点id
@emit
*/
// import { FlexInput } from "@/components/App";
import inspection from "@/api/operations/inspection";

export default {
  name: "Device",
  components: {
    // FlexInput,
  },
  props: {
    pointId: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      params: {},
      deviceType: "",
      deviceTypes: [],
      searchOptions: [
        { label: "设备编码", value: "deviceCode" },
        { label: "设备名称", value: "deviceName" },
      ],
      deviceTree: [],
      relateDeviceTree: [],
      editShow: false, // 设置巡检内容
      batchShow: false, // 批量设置巡检内容
    };
  },
  mounted() {
    this.getDeviceTypes();
    this.search();
  },
  methods: {
    search() {
      this.getDeviceTypeTree();
      this.getRelateDeviceTree();
    },
    async getDeviceTypes() {
      this.deviceTypes = await inspection.point.getDeviceTypeTree();
    },
    async getDeviceTypeTree() {
      // this.deviceTree = await inspection.point.getDeviceTypeTree();
    },
    async getRelateDeviceTree() {
      try {
        this.relateLoading = true;
        const params = {
          ...this.params,
          pointId: this.pointId,
          deviceType: this.deviceType,
        };
        this.relateDeviceTree = await inspection.point.getRelateDeviceTree(
          params
        );
        this.relateLoading = false;
      } catch (e) {
        this.relateLoading = false;
        this.relateDeviceTree = [];
      }
    },
    renderTree(h, { data }) {
      if (data.deviceTypeId) {
        // 设备类型
        return (
          <div class="custom-tree-node">
            <span>{data.deviceTypeName}</span>
            <el-link
              type="primary"
              underline={false}
              style="margin-left: 20px"
              onClick={() => this.addInspectContent(data)}
            >
              ＋添加巡检内容
            </el-link>
          </div>
        );
      } else {
        // 设备
        return (
          <div class="custom-tree-node">
            {data.deviceName + "(" + data.deviceCode + ")"}
          </div>
        );
      }
    },
    addInspectContent(data) {
      console.log(data);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/variables.scss";
.device-realte {
  &::v-deep {
    .el-input {
      margin-left: 0;
    }
    .el-select {
      width: 80px;
    }
    .el-cascader {
      width: 80px;
      .el-input {
        width: 100%;
      }
    }
    .el-icon-search {
      height: 26px;
      margin-top: 1px;
      color: $--color-primary;
      background: linear-gradient(90deg, #2a2a2a, rgba(255, 255, 255, 0) 100%);
    }
  }
  .flex-input {
    margin-left: 10px;
    .el-input {
      width: 140px;
    }
  }
}
.device-filter {
  display: flex;
  margin: 20px;
}
</style>
