<!-- @format -->

<template>
  <div>
    <div class="filters">
      <div class="left" @click="openMore">
        <span>物资管理</span>
      </div>
      <div class="right">
        <CompositeInput
          v-model="keywords"
          :options="options"
          @search="search"
          style="width:240px;margin-right: 10px;"
        ></CompositeInput>
        <el-button size="mini" type="primary" @click="addNew">新增</el-button>
      </div>
    </div>
    <Charts></Charts>

    <Lists>
      <div
        class="currency-card-item"
        v-for="(item, index) in lists"
        :key="index"
      >
        <div class="currency-item-content">
          <div class="currency-item-content-left">
            <div class="status currency-item-icon">
              <svg class="iconfont" aria-hidden="true">
                <use xlink:href="#iconwuziguanli"></use>
              </svg>
            </div>
          </div>
          <div class="currency-item-right">
            <div class="currency-item-top">
              <div class="currency-item-title">{{ item.name }}({{ item.model }})</div>
            </div>
            <el-row class="currency-item-msgs">
              <el-col
                :span="citem.span"
                class="currency-item-msgItem"
                v-for="(citem, cindex) in contents"
                :key="cindex"
              >
                {{ citem.title }}：{{ citem.unit }}{{ item[citem.key] }}</el-col
              >
            </el-row>
          </div>
        </div>
        <div class="currency-item-bottom">
          <el-button type="text" @click="editItem(item)">编辑</el-button>
        </div>
      </div>
    </Lists>
    <div class="pages">
      <el-pagination
        small
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, prev, pager, next"
        :total="total"
        :pager-count="5"
      >
      </el-pagination>
    </div>

    <DarkDialog v-model="moreDialog">
      <More @edit="editItem"></More>
    </DarkDialog>
    <DarkDialog v-model="editDialog" class="dialog-680">
      <Edit
        v-if="editDialog.dialogVisible"
        :id="editId"
        :item="eItem"
        @close="editDialog.dialogVisible = false"
      ></Edit>
    </DarkDialog>
  </div>
</template>
<script>
import Charts from "./components/Charts";
import Lists from "../components/Lists";
import DarkDialog from "@/components/App/DarkDialog";
import Edit from "./components/Edit";
import More from "./components/More";
import { CompositeInput } from "@/components/App/FormFilters";
import stock from "@/api/operations/stock";
export default {
  name: "OperationsStockGoodsManage",
  meta: {
    title: "物资管理",
    hideMenu: true,
  },
  components: { CompositeInput, DarkDialog, Charts, Lists, Edit, More },
  data() {
    return {
      loading: false,
      keywords: {
        type: "",
        keywords: "",
      },
      options: [
        {
          label: "选项1",
          value: "1",
        },
      ],
      pageNum: 1,
      pageSize: 10,
      total: 10,
      lists: [],
      contents: [
        {
          title: "物资编码",
          key: "code",
          span: 14,
        },
        {
          title: "生产商",
          key: "manufacturer",
          span: 10,
        },
        {
          title: "设备类型",
          key: "equipmentType",
          span: 14,
        },
        {
          title: "物资单位",
          key: "unit",
          span: 10,
        },
        {
          title: "库存数量",
          key: "number",
          span: 14,
        },
        {
          title: "物资单价",
          key: "price",
          unit: "￥",
          span: 10,
        },
      ],

      editDialog: {
        dialogVisible: false,
        binds: {
          title: "新增物资",
        },
      },
      editId: "",
      eItem: "",

      moreDialog: {
        dialogVisible: false,
        binds: {
          title: "全部物资列表",
        },
      },
    };
  },
  mounted() {
    this.getList();
  },
  computed: {
    // eItem() {
    //   return this.lists?.find((item) => item.id == this.editId);
    // },
  },
  methods: {
    search() {
      this.getList();
    },
    addNew() {
      this.editId = "";
      this.eItem = {};
      this.editDialog.binds.title = "新增物资";
      this.editDialog.dialogVisible = true;
    },
    editItem(item) {
      this.editId = item.id;
      this.eItem = item;
      this.editDialog.binds.title = "编辑物资";
      this.editDialog.dialogVisible = true;
    },
    async getList() {
      this.loading = true;
      let res = await stock.goodsManage.goodsList({});
      this.lists = res.list;
      this.total = res.total;
      this.loading = false;
    },
    openMore() {
      this.moreDialog.dialogVisible = true;
    },
    handleSizeChange() {},
    handleCurrentChange() {},
  },
};
</script>
<style lang="scss" scoped>
.filters {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.8);
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  .left {
    line-height: 28px;
  }
  .right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}

.pages {
  position: absolute;
  bottom: 0;
  width: 100%;
  z-index: 2;
  // background-color: rgba(0, 0, 0, 0.8);
  background: rgba(26, 26, 26, 1);
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.3);
}
</style>
