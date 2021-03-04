<template>
  <div id="app" class="app">
    <AppHeader></AppHeader>
    <BreadCrumb></BreadCrumb>
    <InnerView>
      <SideBar></SideBar>
      <template v-if="BIMFACE">
        <BimFace></BimFace>
      </template>
      <transition :name="transition">
        <keep-alive :include="keepAlives">
          <router-view class="child-view"></router-view>
        </keep-alive>
      </transition>
    </InnerView>
  </div>
</template>
<script>
import Meta from "@/router/meta.json";
import { InnerView } from "./components/Layout";
import { SideBar, BimFace, AppHeader, BreadCrumb } from "./components/App";
export default {
  components: {
    SideBar,
    BimFace,
    AppHeader,
    InnerView,
    BreadCrumb,
  },
  name: "App",
  data() {
    return {
      keepAlives: [],
      lastRouteIndex: 0,
      BIMFACE: process.env.BIMFACE,
      transition: "right-slide-in",
    };
  },
  created() {
    this.keepAlives = Object.values(Meta)
      .filter((item) => item.meta.keepAlive)
      .map((item) => item.name);
  },
  watch: {
    $route(val) {
      const index = val?.meta?.index || 0;
      // if (val.meta.index >= this.lastRouteIndex) {
      //   this.transition = "right-slide-in";
      // } else {
      //   this.transition = "left-slide-in";
      // }
      this.lastRouteIndex = index;
    },
  },
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}
html,
body,
#app {
  margin: 0;
  width: 100%;
  height: 100%;
}
#app {
  display: flex;
}
.app {
  background: radial-gradient(rgba(0, 0, 0, 0.5) 0%, #000 70%, #000 100%);
  flex-direction: column;
}
.iconfont {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.child-view {
  width: 100%;
  height: 100%;
  position: relative;
  transition: all 0.8s cubic-bezier(0.55, 0, 0.1, 1);
}

.right-slide-in-enter {
  opacity: 0;
  transform: translate(20%, 0);
}
.right-slide-in-leave-active {
  opacity: 0;
}

.left-slide-in-enter {
  opacity: 0;
  transform: translate(-20%, 0);
}
.left-slide-in-leave-active {
  opacity: 0;
}
.content {
  outline: red;
}
</style>
