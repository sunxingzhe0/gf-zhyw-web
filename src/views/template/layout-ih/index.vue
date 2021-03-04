<template>
  <InnerView class="layot-ih">
    <SideBar></SideBar>
    <InnerView class="main-view">
      <AppHeader></AppHeader>
      <RouteView>
        <BreadCrumb></BreadCrumb>
        <h3>此处是主体内容区域，实际开发请删除本文本</h3>
        <transition :name="transition">
          <router-view class="child-view"></router-view>
        </transition>
      </RouteView>
    </InnerView>
  </InnerView>
</template>
<script>
import { RouteView, InnerView } from "@/components/Layout";
import { SideBar, AppHeader, BreadCrumb } from "@/components/App";
export default {
  name: "layout-ih",
  components: {
    SideBar,
    AppHeader,
    RouteView,
    InnerView,
    BreadCrumb
  },
  data() {
    return {
      transition: "",
      lastRouteIndex: 0
    };
  },
  watch: {
    $route(val) {
      const index = val?.meta?.index || 0;
      if (val.meta.index >= this.lastRouteIndex) {
        this.transition = "right-slide-in";
      } else {
        this.transition = "left-slide-in";
      }
      this.lastRouteIndex = index;
    }
  }
};
</script>
<style lang="scss" scoped>
.layot-ih {
  display: flex;
}
.main-view {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
