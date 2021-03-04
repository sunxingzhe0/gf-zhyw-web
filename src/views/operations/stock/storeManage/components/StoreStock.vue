<!-- @format -->

<template>
  <div class="repair-more main" v-loading="loading">
    <div class="filters dark-form">
      <div class="left">
        <el-input
          placeholder="关键字"
          v-model="query.keywords"
          style="width:300px;margin-right:20px"
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
            ></el-option>
          </el-select>
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="search"
          ></el-button>
        </el-input>
      </div>
    </div>
    <Table v-model="query" :columns="columns" :tableData="tableData">
      <template v-slot:fixed="{ row }">
        <el-button type="text" @click="editItem(row)">编辑</el-button>
      </template>
    </Table>

    <DarkDialog v-model="editDialog" class="dialog-680">
      <GoodsManageEdit
        v-if="editDialog.dialogVisible"
        :id="editId"
        :item="eItem"
        @close="editDialog.dialogVisible = false"
      ></GoodsManageEdit>
    </DarkDialog>
  </div>
</template>
<script>
import { Table, TableMixin } from "@/components/App";
// import workbench from "@/api/operations/workbench";
import DarkDialog from "@/components/App/DarkDialog";
import stock from "@/api/operations/stock";
import GoodsManageEdit from "@/views/operations/stock/goodsManage/components/Edit";
// import { DarkSelect } from "@/components/App/FormFilters";

export default {
  components: {
    Table,
    DarkDialog,
    GoodsManageEdit,
    // DarkSelect,
  },
  props: ["id"],
  mixins: [
    TableMixin([
      {
        fetchListFunction: stock.goodsManage.goodsList,
        // fetchListFunction: async () => {
        //   const res = await workbench.repair.registerList();
        //   console.log(res);
        //   return res;
        // },
      },
    ]),
  ],
  data() {
    return {
      // keywords: {
      // },
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
        storeId: this.id,
      },
      columns: {
        index: {
          hidden: true,
        },
      },

      editDialog: {
        dialogVisible: false,
        binds: {
          title: "编辑物资",
          'append-to-body':true
        },
      },
      editId: "",
      eItem: "",
    };
  },
  mounted() {
    // console.log(Edit);
  },
  methods: {
    editItem(item) {
      this.editId = item.id;
      this.eItem = item;
      this.editDialog.dialogVisible = true;
    },
    search() {
      console.log(this.query);
    },
  },
};
</script>
<style lang="scss" scope>
@import "@/assets/css/variables.scss";
.main {
  padding-bottom: 20px;
  .filters {
    display: flex;
    padding: 20px;
    align-items: center;
    justify-content: space-between;
    & > div {
      display: flex;
      align-items: center;
    }
  }
}
</style>

<style lang="scss">
.repair-more {
  .c__list .el-table {
    height: calc(70vh - 190px) !important;
  }
}
</style>
