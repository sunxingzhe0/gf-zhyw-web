<!-- @format -->

<template>
  <!-- <DarkDialog v-model="detailDialog"> -->
  <div class="stockInventory-enter">
    <el-row class="main-msg" v-loading="dialogLoading">
      <el-col :span="8">盘点名称：{{ InventoryDetail.name }}</el-col>
      <el-col :span="8"
        >盘点设备：{{ InventoryDetail.equipmentNumber }}种</el-col
      >
      <el-col :span="8"
        >盘点人：{{ InventoryDetail.inventoryUser }}
        {{ InventoryDetail.dept }}</el-col
      >
      <el-col :span="8">创建日期：{{ InventoryDetail.createTime }}</el-col>
      <el-col :span="8" class="dark-form"
        ><span>库存校对：</span>
        <el-input
          placeholder="关键字"
          v-model="query.keywords"
          style="width:260px;margin-right:20px"
          size="small"
        >
          <el-select
            v-model="query.type"
            slot="prepend"
            class="prepend"
            placeholder="请选择"
          >
            <el-option label="全部" value=""></el-option>
            <el-option
              :label="item.label"
              :value="item.value"
              v-for="(item, index) in options"
              :key="index"
            ></el-option> </el-select></el-input
      ></el-col>
      <el-col :span="8">盘点时间：{{ InventoryDetail.inventoryTime }}</el-col>
    </el-row>

    <Table v-model="query" :columns="columns" :tableData="tableData">
      <template v-slot:slot_inventoryNumber="{ row }">
        <el-input
          size="mini"
          v-model="row.inventoryNumber"
          placeholder="请输入"
        ></el-input>
      </template>
    </Table>

    <div class="dialog-bottom">
      <el-button size="mini" type="primary" plain>暂存</el-button>
      <el-button size="mini" type="primary">提交</el-button>
    </div>
  </div>
  <!-- </DarkDialog> -->
</template>
<script>
import { Table, TableMixin } from "@/components/App";
// import DarkDialog from "@/components/App/DarkDialog";
import stock from "@/api/operations/stock";
let statusNames = {
  "1": "待审核",
  "2": "已通过",
  "3": "已驳回",
};
export default {
  name: "InventoryDetail",
  components: {
    Table,
  },
  mixins: [
    TableMixin([
      {
        fetchListFunction: stock.stockInventory.InventoryStockList,
        // fetchListFunction: async () => {
        //   const res = await workbench.repair.registerList();
        //   console.log(res);
        //   return res;
        // },
      },
    ]),
  ],
  props: {
    id: {
      type: String,
    },
  },
  data() {
    return {
      dialogLoading: false,
      options: [
        {
          label: "物资名称",
          value: "1",
        },
      ],
      query: {
        pageSize: 10,
        pageNum: 1,
        type: "1",
        keywords: "",
      },
      columns: {
        index: {
          hidden: true,
        },
        price: {
          formatter(row) {
            return "￥" + row.price;
          },
        },
        inventoryNumber: {
          prop: "slot_inventoryNumber",
        },
      },

      navs: [
        {
          path: "1",
          text: "库存详情",
        },
        {
          path: "2",
          text: "异常库存",
        },
        {
          path: "3",
          text: "操作日志",
        },
      ],
      current: "1",
      InventoryDetail: {},
    };
  },
  watch: {
    id: {
      handler() {
        this.openDetail();
        // id
      },
      immediate: true,
    },
  },
  methods: {
    statusName(key) {
      return statusNames[key];
    },
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
    search() {},
  },
};
</script>
<style lang="scss" scoped>
.stockInventory-enter {
  font-size: 14px;
  color: #fff;
  // padding-bottom: 20px;
  .main-msg {
    padding: 10px 20px;
    line-height: 34px;
  }
}

.dialog-bottom {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-top: 1px solid hsla(0, 0%, 100%, 0.3);
  margin-top: 10px;
}
</style>
<style lang="scss">
.stockInventory-enter {
  .c__list .el-table {
    height: calc(70vh - 260px) !important;
  }
}
</style>
