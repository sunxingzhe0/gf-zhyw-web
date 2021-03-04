<template>
  <AppDialog router :show="show" :title="title" :elAttrs="elAttrs">
    <DarkMenu :navs="navs" :noRouter="true" v-model="activeNav"> </DarkMenu>
    <keep-alive>
      <BaseInfo
        v-if="activeNav === '0'"
        @cancel="closeHandler"
        :pointId="pointId"
      ></BaseInfo>
      <Device v-else :pointId="pointId"></Device>
    </keep-alive>
  </AppDialog>
</template>
<script>
/*
@author        qiang
@name          PointOperator
@desc          巡检点新增/巡检点编辑
@query         pointId    string    巡检点id，没有时为新增
@props         
@emit           
*/
import { AppDialog, DarkMenu } from "@/components/App";
import { Device, BaseInfo } from "../components";
export default {
  name: "PointEdit",
  components: {
    Device,
    BaseInfo,
    DarkMenu,
    AppDialog,
  },
  data() {
    return {
      elAttrs: {
        "before-close": this.beforeClose,
      },
      show: false,
      pointId: "",
      activeNav: "0",
    };
  },
  computed: {
    navs() {
      return [
        { text: "基本信息", path: "0" },
        { text: "设备关联", path: "1", disabled: Boolean(!this.pointId) },
      ];
    },
    title() {
      return this.pointId ? "编辑巡检点" : "新增巡检点";
    },
  },
  mounted() {
    this.pointId = this.$route.query.pointId;
    this.show = true;
  },
  methods: {
    beforeClose(done) {
      console.log("before close");
      done();
    },
    closeHandler() {
      this.$router.back();
    },
  },
};
</script>
<style lang="scss" scoped>
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
