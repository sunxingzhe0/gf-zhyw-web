<template>
  <InnerView>
    <div class="right-content-title">维修管理</div>
    <div class="view-scroll-y" ref="scrollBox">
      <RightNavs :navs="navs"></RightNavs>
      <router-view></router-view>
    </div>
  </InnerView>
</template>
<script>
import { InnerView } from "@/components/Layout";
import { Navs } from "./navs";
import RightNavs from "@/components/App/RightNavs";
export default {
  name: "OperationsXrepairtube",
  meta: {
    sort: 3,
    title: "维修管理",
    redirect: "/operations/xrepairtube/workorder"
  },
  components: { InnerView, RightNavs },
  data() {
    return {
      navs: Navs
    };
  },
  mounted() {
    console.log(RightNavs);
    this.$refs.scrollBox.addEventListener("scroll", this.scrollEvent, false);
  },
  methods: {
    //滚动触发
    scrollEvent() {
      if (this.$refs.scrollBox.scrollTop > 330) {
        this.$store.commit("operations/CHANGE_PAGE", true);
      } else {
        this.$store.commit("operations/CHANGE_PAGE", false);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.view-scroll-y {
  height: calc(100% - 48px);
  overflow-y: auto;
}

.view-scroll-y::-webkit-scrollbar {
  display: none;
}
</style>
