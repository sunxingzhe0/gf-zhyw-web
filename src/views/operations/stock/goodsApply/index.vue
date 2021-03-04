<!-- @format -->

<template>
  <div>
    <div class="filters">
      <div class="left" @click="openMore">
        <span>物资申请</span>
      </div>
      <div class="right">
        <CompositeInput
          v-model="keywords"
          :options="options"
          @search="search"
          style="width:240px;margin-right: 10px;"
        ></CompositeInput>
        <el-button
          size="mini"
          type="primary"
          style="padding:7px 4px"
          @click="addNew"
          >申领物资</el-button
        >
      </div>
    </div>
    <Charts></Charts>

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
                <use xlink:href="#iconwuzishenqing1"></use>
              </svg>
            </div>
          </div>
          <div class="currency-item-right">
            <div class="currency-item-top">
              <div class="currency-item-title">
                <span>{{ item.content }}</span
                >x{{ item.number }}
              </div>
              <div class="status">{{ statusName(item.status) }}</div>
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
      <More></More>
    </DarkDialog>
    <DarkDialog v-model="editDialog" class="dialog-680">
      <Edit
        v-if="editDialog.dialogVisible"
        :id="editId"
        :item="eItem"
        @close="editDialog.dialogVisible = false"
      ></Edit>
    </DarkDialog>

    <DarkDialog v-model="detailDialog">
      <ApplyDetail :id="id"></ApplyDetail>
    </DarkDialog>
  </div>
</template>
<script>
import Charts from "./components/Charts";
import Lists from "../components/Lists";
import DarkDialog from "@/components/App/DarkDialog";
import Edit from "./components/Edit";
import More from "./components/More";
import ApplyDetail from "./components/ApplyDetail";
import { CompositeInput } from "@/components/App/FormFilters";
import stock from "@/api/operations/stock";
let statusNames = {
  "1": "待审核",
  "2": "已通过",
  "3": "已驳回",
};
export default {
  name: "OperationsStockGoodsApply",
  meta: {
    title: "物资申请",
    hideMenu: true,
  },
  components: {
    CompositeInput,
    DarkDialog,
    Charts,
    Lists,
    Edit,
    More,
    ApplyDetail,
  },
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
          title: "姓名",
          key: "name",
          span: 14,
        },
        {
          title: "工号",
          key: "jobNo",
          span: 10,
        },
        {
          title: "电话",
          key: "phone",
          span: 14,
        },
        {
          title: "申领科室",
          key: "dept",
          span: 10,
        },
        {
          title: "申领时间",
          key: "applyTime",
          span: 24,
        },
      ],

      editDialog: {
        dialogVisible: false,
        binds: {
          title: "申领物资",
        },
      },
      editId: "",
      eItem: "",

      moreDialog: {
        dialogVisible: false,
        binds: {
          title: "物资申领记录",
        },
      },

      id: "",
      detailDialog: {
        dialogVisible: false,
        binds: {
          title: "物资申领详情",
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
    statusName(key) {
      return statusNames[key];
    },
    search() {
      this.getList();
    },
    addNew() {
      this.editDialog.dialogVisible = true;
    },
    async getList() {
      this.loading = true;
      let res = await stock.goodsApply.applyList({});
      this.lists = res.list;
      this.total = res.total;
      this.loading = false;
    },
    openMore() {
      this.moreDialog.dialogVisible = true;
    },

    openDetail(item) {
      //弹窗获取详情
      this.id = item.id;
      this.detailDialog.dialogVisible = true;
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
.currency-card-item .currency-item-top .currency-item-title {
  font-size: 14px;
  color: #b3b3b3;
  span {
    color: #ffffff;
    display: inline-block;
    max-width: 230px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
