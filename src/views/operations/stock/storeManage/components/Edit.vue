<!-- @format -->

<template>
  <!-- <DarkDialog v-model="detailDialog"> -->
  <div class="repair-detail">
    <DarkMenu
      :navs="navs"
      v-model="current"
      :noRouter="true"
      class="gray"
      v-if="id && item"
    ></DarkMenu>
    <EditForm
      v-if="current == 1"
      :id="id"
      :item="item"
      @close="$emit('close')"
    ></EditForm>
    <StoreStock v-if="current == 2" :id="id"></StoreStock>
  </div>
  <!-- </DarkDialog> -->
</template>
<script>
// import DarkDialog from "@/components/App/DarkDialog";
import stock from "@/api/operations/stock";
import { DarkMenu } from "@/components/App";
import EditForm from "./EditForm";
import StoreStock from "./StoreStock";
// import Journal from "./Journal";
// let statusNames = {
//   "1": "待审核",
//   "2": "已通过",
//   "3": "已驳回",
// };
export default {
  name: "InventoryDetail",
  components: {
    // DarkDialog,
    DarkMenu,
    EditForm,
    StoreStock,
    // Journal,
  },
  props: ["id", "item"],
  data() {
    return {
      dialogLoading: false,

      navs: [
        {
          path: "1",
          text: "仓库信息",
        },
        {
          path: "2",
          text: "库存信息",
        },
      ],
      current: "1",
      InventoryDetail: {},
    };
  },
  // watch: {
  //   id: {
  //     handler() {
  //       this.openDetail();
  //       // id
  //     },
  //     immediate: true,
  //   },
  // },
  methods: {
    // statusName(key) {
    //   return statusNames[key];
    // },
    async openDetail() {
      //弹窗获取详情
      this.current = "1";
      this.dialogLoading = true;
      this.InventoryDetail = {};
      this.InventoryDetail = await stock.stockInventory.InventoryDetail({
        id: this.id,
      });
      console.log(this.InventoryDetail);
      this.dialogLoading = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.repair-detail {
  font-size: 14px;
  color: #fff;
  .main-msg {
    padding: 10px 20px;
    line-height: 34px;
  }
}
</style>
