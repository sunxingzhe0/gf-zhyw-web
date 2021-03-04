<!-- @format -->

<template>
  <div>
    <DarkMenu
      :navs="navs"
      v-model="current"
      :noRouter="true"
      class="gray"
    ></DarkMenu>
    <ApplyMore v-if="current == 1"></ApplyMore>
    <InStoreMore v-if="current == 2"></InStoreMore>
    <OutStoreMore v-if="current == 3"></OutStoreMore>
  </div>
</template>
<script>
import { DarkMenu } from "@/components/App";
import ApplyMore from "./ApplyMore";
import InStoreMore from "./InStoreMore";
import OutStoreMore from "./OutStoreMore";
export default {
  name: "OperationsStockGoodsReview",
  meta: {
    sort: 3,
    title: "物资审核",
    hideMenu: true,
    redirect: "/operations/stock/goodsReview/apply",
  },
  components: { DarkMenu, ApplyMore, InStoreMore, OutStoreMore },
  props: {
    propsCurrent: {
      type: String,
      default: "1",
    },
  },
  watch: {
    propsCurrent: {
      handler(val) {
        console.log(val);
        this.current = val;
      },
      immediate: true,
    },
  },
  data() {
    return {
      current: "1",
      navs: [
        {
          path: "1",
          text: "申领审核",
        },
        {
          path: "2",
          text: "入库审核",
        },
        {
          path: "3",
          text: "出库审核",
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped></style>
