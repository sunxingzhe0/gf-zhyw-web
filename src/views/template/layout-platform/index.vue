<template>
  <InnerView class="layot-platform">
    <AppHeader></AppHeader>
    <RouteView>
      <BreadCrumb></BreadCrumb>
      <h3>此处是主体内容区域，实际开发请删除本文本</h3>
      <transition :name="transition">
        <router-view class="child-view"></router-view>
      </transition>
    </RouteView>
  </InnerView>
</template>
<script>
import { AppHeader, BreadCrumb } from "@/components/App";
import { RouteView, InnerView } from "@/components/Layout";
export default {
  name: "App",
  components: {
    RouteView,
    InnerView,
    AppHeader,
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
.layot-platform {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
