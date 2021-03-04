<!-- @format -->

<template>
  <div class="workCenter">
    <div class="navs">
      <div
        class="nav-item"
        v-for="(item, index) in navs"
        :key="index"
        :class="activeRouter == item.path ? 'active' : ''"
        @click="navCurrent(item)"
      >
        <div class="navs-item-icon">
          <svg class="iconfont" aria-hidden="true">
            <use v-bind="{ 'xlink:href': item.icon }"></use>
          </svg>
        </div>
        <div class="name">{{ item.text }}</div>
      </div>
    </div>
    <Dispatch
      v-if="activeRouter == '/operations/workbench/workCenter/dispatch'"
    ></Dispatch>
    <Handle
      v-if="activeRouter == '/operations/workbench/workCenter/handle'"
    ></Handle>
    <Statistics
      v-if="activeRouter == '/operations/workbench/workCenter/statistics'"
    ></Statistics>
    <router-view></router-view>
  </div>
</template>
<script>
import { Navs } from "./navs";
import Dispatch from "./components/dispatch";
import Handle from "./components/handle";
import Statistics from "./components/statistics";
export default {
  components: { Dispatch, Handle, Statistics },
  name: "OperationsWorkbenchWorkCenter",
  meta: {
    sort: 3,
    title: "工单中心",
    hideMenu: true,
    keepAlive: true,
    // redirect: "/operations/workbench/workCenter/dispatch",
  },
  data() {
    return {
      navs: Navs,
      activeRouter: "/operations/workbench/workCenter/dispatch",

      formDialog: {
        dialogVisible: false,
        binds: {
          title: "工单登记",
        },
      },
      // isRegister: false, //因为第一个nav为弹窗，跟另外三个需要区分
    };
  },
  computed: {
    // activeRouter() {
    //   return this.navs.find((nitem) => {
    //     return this.$route.matched
    //       .map((item) => item.path)
    //       .includes(nitem.path);
    //   })?.path;
    // },
  },
  mounted() {},
  methods: {
    navCurrent(item) {
      if (item.path == "/operations/workbench/workCenter/CallWorkOrder") {
        this.$router.push(item.path);
        return 
      }
      this.activeRouter = item.path;
      // console.log(item.path);
      // if (item.path == "register") {
      //   // this.isRegister = true;
      //   this.openCall();
      //   return;
      // }
      // this.isRegister = false;
      // this.$router.push(item.path);
    },
    openCall() {
      this.formDialog.dialogVisible = true;
    },
  },
};
</script>
<style lang="scss" scoped>
.workCenter {
  height: calc(100% - 110px);
}
.navs {
  display: flex;
  align-items: center;
  padding: 20px;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.8);
  .nav-item {
    width: 80px;
    height: 50px;

    background: rgba(77, 77, 77, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 2px;
    padding: 0 10px;
    cursor: pointer;
    .iconfont {
      font-size: 24px;
    }
    .name {
      font-size: 14px;
      line-height: 16px;
      padding-left: 6px;
    }
    &.active {
      background-color: #0071e3;
    }
  }
}
</style>
