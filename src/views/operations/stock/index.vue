<template>
  <InnerView>
    <RightContentTitle text="库存管理"></RightContentTitle>
    <!-- <div class="right-content-title">调度工作台</div> -->
    <div class="view-scroll-y">
      <RightNavs :navs="navs"></RightNavs>
      <router-view></router-view>
    </div>
  </InnerView>
</template>
<script>
import { Navs } from "./navs";
import { InnerView , RightContentTitle } from "@/components/Layout";
import RightNavs from "@/components/App/RightNavs";
export default {
  name: "OperationsStock",
  meta: {
    sort: 4,
    title: "库存管理",
    redirect: "/operations/stock/goodsManage"
  },
  components: { InnerView, RightNavs,RightContentTitle },
  data() {
    return {
      navs: Navs
    };
  },
  mounted() {
  },
  methods: {
    // linkTo(link) {
    //   this.$router.push(link);
    // }
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
