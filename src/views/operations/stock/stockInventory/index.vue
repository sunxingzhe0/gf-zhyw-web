<!-- @format -->

<template>
  <div class="stockInventory">
    <div class="inventory-selects">
      <div class="flex-between">
        <div class="inventory-selects-label">盘点时段</div>
        <el-date-picker
          v-model="datetimerange"
          type="datetimerange"
          range-separator="至"
          size="mini"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </div>
      <div class="flex-between">
        <div class="inventory-selects-label">设备类型</div>
        <el-cascader
          :options="typeOptions"
          collapse-tags
          :props="{ multiple: true }"
          :show-all-levels="false"
          style="width:100%"
          size="mini"
          clearable
        ></el-cascader>
      </div>
      <div class="start-inventory">
        <el-button type="text">开始盘点</el-button>
      </div>
    </div>
    <div class="inventory-filter">
      <CompositeInput
        v-model="keywords"
        :options="options"
        @search="search"
      ></CompositeInput>
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
                <use xlink:href="#iconkucunpandian1"></use>
              </svg>
            </div>
          </div>
          <div class="currency-item-right">
            <div class="currency-item-top">
              <div class="currency-item-title">{{ item.name }}</div>
            </div>
            <el-row class="currency-item-msgs">
              <el-col
                :span="citem.span"
                class="currency-item-msgItem"
                v-for="(citem, cindex) in contents"
                :key="cindex"
              >
                {{ citem.title }}{{ citem.title ? "：" : "" }}{{ citem.unit
                }}{{ item[citem.key] }}</el-col
              >
            </el-row>
          </div>
        </div>
        <div class="currency-item-bottom">
          <el-button type="text">修复</el-button>
          <el-divider direction="vertical" class="divider"></el-divider>
          <el-button type="text" @click.stop="openEnter(item)">录入</el-button>
        </div>
      </div>
      <div class="viewMore" @click="viewMore">viewMore</div>
    </Lists>
    <div class="fixed-bottom-pagination">
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
      <More></More>
    </DarkDialog>
    <DarkDialog v-model="detailDialog">
      <InventoryDel v-if="detailDialog.dialogVisible" :id="id"></InventoryDel>
    </DarkDialog>

    <DarkDialog v-model="enterDialog">
      <Enter v-if="enterDialog.dialogVisible" :id="id"></Enter>
    </DarkDialog>
    
  </div>
</template>
<script>
import { CompositeInput } from "@/components/App/FormFilters";
import More from "./components/More";
import DarkDialog from "@/components/App/DarkDialog";
import stock from "@/api/operations/stock";
import Lists from "../components/Lists";
import InventoryDel from "./components/InventoryDel";
import Enter from "./components/Enter";

export default {
  name: "OperationsStockStockInventory",
  meta: {
    title: "库存盘点",
    hideMenu: true,
  },
  components: { CompositeInput, More, DarkDialog, Lists ,InventoryDel,Enter},
  data() {
    return {
      keywords: {
        type: "",
        keywords: "",
      },
      options: [
        {
          label: "物资名称",
          value: "1",
        },
      ],
      datetimerange: [],
      typeOptions: [
        {
          value: "0",
          label: "新风机",
          children: [
            {
              value: "1",
              label: "美的",
            },
            {
              value: "2",
              label: "三菱",
            },
            {
              value: "3",
              label: "格力",
            },
          ],
        },
        {
          value: "4",
          label: "空凋",
        },
        {
          value: "5",
          label: "电表",
        },
      ],

      moreDialog: {
        dialogVisible: false,
        binds: {
          title: "库存盘点列表",
        },
      },

      pageNum: 1,
      pageSize: 10,
      total: 10,
      lists: [],
      contents: [
        {
          title: "",
          key: "inventoryTime",
          span: 24,
        },

        {
          title: "设备种类",
          key: "equipmentType",
          span: 14,
        },
        {
          title: "库存修复",
          key: "stockRepair",
          span: 10,
        },
        {
          title: "盘点人",
          key: "inventoryUser",
          span: 14,
        },
        {
          title: "所属科室",
          key: "dept",
          span: 10,
        },
        {
          title: "创建日期",
          key: "createTime",
          span: 24,
        },
      ],

      id:"",
      detailDialog: {
        dialogVisible: false,
        binds: {
          title: "盘点详情",
        },
      },

      enterDialog: {
        dialogVisible: false,
        binds: {
          title: "盘点录入",
        },
      },
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    search() {},
    viewMore() {
      this.moreDialog.dialogVisible = true;
    },
    async getList() {
      this.loading = true;
      let res = await stock.stockInventory.stockInventoryList({});
      this.lists = res.list;
      this.total = res.total;
      this.loading = false;
    },
    openDetail(item){
      this.id = item.id
      this.detailDialog.dialogVisible = true;
    },
    //盘点录入弹窗
    openEnter(item){
      this.id = item.id
      this.enterDialog.dialogVisible = true;
    }
  },
};
</script>
<style lang="scss" scoped>
.stockInventory {
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  .inventory-selects {
    background: rgba(51, 51, 51, 0.6);
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
    padding: 0 10px;
    margin: 20px;
    .flex-between {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      .inventory-selects-label {
        white-space: nowrap;
        font-size: 14px;
        line-height: 34px;
      }
      &::v-deep {
        .el-input__inner {
          border: none;
          background-color: rgba(0, 0, 0, 0);
          text-align: right;
        }
        .el-cascader__tags {
          justify-content: flex-end;
        }
      }
    }
    .start-inventory {
      line-height: 34px;
      display: flex;
      justify-content: center;
    }
  }
}
.inventory-filter {
  // padding-top: 20px;
  padding: 0 20px;
}
.fixed-bottom-pagination {
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
