<!-- @format -->

<template>
  <div>
    <div class="filters">
      <div class="left" @click="openMore">
        <span>物资入库</span>
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
    <Lists>
      <div
        class="currency-card-item"
        v-for="(item, index) in lists"
        :key="index"
        @click="openDetail(item)"
      >
        <div class="currency-item-content">
          <div class="currency-item-content-left">
            <div class="status currency-item-icon">
              <svg class="iconfont" aria-hidden="true">
                <use xlink:href="#iconwuziruku"></use>
              </svg>
            </div>
          </div>
          <div class="currency-item-right">
            <div class="currency-item-top">
              <div class="currency-item-title">
                {{ item.name }}({{ item.model }})
              </div>
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
        <!-- <div class="currency-item-bottom">
          <el-button type="text" @click="editItem(item)">编辑</el-button>
        </div> -->
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
      <More @addNew="addNew"></More>
    </DarkDialog>
    <DarkDialog v-model="editDialog">
      <Edit
        v-if="editDialog.dialogVisible"
        @close="editDialog.dialogVisible = false"
      ></Edit>
    </DarkDialog>
    <DarkDialog v-model="recordDialog">
      <Record :id="id" v-if="recordDialog.dialogVisible"></Record>
    </DarkDialog>
  </div>
</template>
<script>
import Lists from "../components/Lists";
import DarkDialog from "@/components/App/DarkDialog";
import Edit from "./components/Edit";
import More from "./components/More";
import Record from "./components/Record";
import { CompositeInput } from "@/components/App/FormFilters";
import stock from "@/api/operations/stock";
export default {
  name: "OperationsStockGoodsIn",
  meta: {
    title: "物资入库",
    hideMenu: true,
  },
  components: { CompositeInput, DarkDialog, Lists, More, Edit, Record },
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
          title: "收货仓库",
          key: "store",
          span: 14,
        },
        {
          title: "入库单价",
          key: "price",
          unit: "￥",
          span: 10,
        },
        {
          title: "入库数量",
          key: "number",
          span: 14,
        },
        {
          title: "操作人",
          key: "actionUser",
          span: 10,
        },
        {
          title: "入库时间",
          key: "inTime",
          span: 24,
        },
        {
          title: "创建时间",
          key: "createTime",
          span: 24,
        },
      ],

      editDialog: {
        dialogVisible: false,
        binds: {
          title: "物资入库",
        },
      },
      editId: "",
      eItem: "",

      moreDialog: {
        dialogVisible: false,
        binds: {
          title: "物资入库列表",
        },
      },

      id: "",
      recordDialog: {
        dialogVisible: false,
        binds: {
          title: "物资入库记录",
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
      this.editDialog.dialogVisible = true;
    },
    openDetail(item) {
      this.id = item.id;
      this.recordDialog.dialogVisible = true;
    },
    async getList() {
      this.loading = true;
      let res = await stock.goodsIn.goodsInList({});
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
  padding-bottom: 0;
  // background-color: rgba(0, 0, 0, 0.8);
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
