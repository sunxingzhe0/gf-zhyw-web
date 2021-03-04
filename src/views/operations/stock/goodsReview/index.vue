<template>
  <div>
    <DarkMenu :navs="navs"></DarkMenu>
    <router-view></router-view>
  </div>
</template>
<script>
import { Navs } from "./navs";
import { DarkMenu } from "@/components/App";
export default {
  name: "OperationsStockGoodsReview",
  meta: {
    sort: 3,
    title: "物资审核",
    hideMenu: true,
    redirect: "/operations/stock/goodsReview/apply"
  },
  components: { DarkMenu },
  data() {
    return {
      navs: Navs
    };
  },
};
</script>
<style lang="scss" scoped></style>
