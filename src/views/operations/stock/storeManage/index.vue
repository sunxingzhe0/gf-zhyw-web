<!-- @format -->

<template>
  <div>
    <div class="storeManage-filters">
      <div class="left" @click="openMore">
        <span>仓库管理</span>
      </div>
      <div class="right">
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
                <use xlink:href="#iconcangkuguanli-1"></use>
              </svg>
            </div>
          </div>
          <div class="currency-item-right">
            <div class="currency-item-top">
              <div class="currency-item-title">
                {{ item.name }}
              </div>
              <div class="status" :class="item.status == 2 ? 'disable' : ''">
                {{ statusName(item.status) }}
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
        <div class="currency-item-bottom">
          <el-button type="text" @click="editItem(item)">编辑</el-button>
        </div>
      </div>
    </Lists>
    <div class="pages">
      <el-pagination
        small
        background
        @size-change="getList"
        @current-change="getList"
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
      <More @addNew="addNew" @edit="editItem(item)"></More>
    </DarkDialog>
    <DarkDialog v-model="editDialog">
      <Edit
        v-if="editDialog.dialogVisible"
        :id="editId"
        :item="eItem"
        @close="editDialog.dialogVisible = false"
      ></Edit>
    </DarkDialog>
    <!-- <DarkDialog v-model="recordDialog">
      <Record :id="id" v-if="recordDialog.dialogVisible"></Record>
    </DarkDialog> -->
  </div>
</template>
<script>
import Lists from "../components/Lists";
import DarkDialog from "@/components/App/DarkDialog";
import Edit from "./components/Edit";
import More from "./components/More";
// import Record from "./components/Record";
// import { CompositeInput } from "@/components/App/FormFilters";
import stock from "@/api/operations/stock";
let statusNames = {
  "1": "启用",
  "2": "停用",
};
export default {
  name: "OperationsStockStoreManage",
  meta: {
    title: "仓库管理",
    hideMenu: true,
  },
  components: { Lists, DarkDialog, More, Edit },
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
          title: "仓库编码",
          key: "code",
          span: 24,
        },
        {
          title: "仓库地址",
          key: "address",
          span: 24,
        },
        {
          title: "物资种类",
          key: "goodsTypeNumber",
          span: 14,
        },
        {
          title: "库存总量",
          key: "stockTotal",
          span: 10,
        },
      ],

      editDialog: {
        dialogVisible: false,
        binds: {
          title: "编辑仓库",
        },
      },
      editId: "",
      eItem: "",

      moreDialog: {
        dialogVisible: false,
        binds: {
          title: "仓库管理列表",
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
    editItem(item) {
      this.editId = item.id;
      this.eItem = item;
      this.editDialog.binds.title = "编辑仓库";
      this.editDialog.dialogVisible = true;
      // console.log(item);editDialog: {
      // dialogVisible: false,
    },
    statusName(key) {
      return statusNames[key];
    },
    search() {
      this.getList();
    },
    addNew() {
      this.editId = "";
      this.editDialog.binds.title = "新增仓库";
      this.editDialog.dialogVisible = true;
    },
    openDetail(item) {
      this.id = item.id;
      this.recordDialog.dialogVisible = true;
    },
    async getList() {
      this.loading = true;
      let res = await stock.storeManage.storeList({});
      this.lists = res.list;
      this.total = res.total;
      this.loading = false;
    },
    openMore() {
      this.moreDialog.dialogVisible = true;
    },
  },
};
</script>
<style lang="scss" scoped>
.storeManage-filters {
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
.disable {
  color: #808080;
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
