<!-- @format -->

<template>
  <div class="inDialog">
    <el-row class="content">
      <el-col :span="8" class="item"
        ><span class="title">入库类型：</span
        >{{ detail.inType == 1 ? "采购" : "报溢" }}</el-col
      >
      <el-col :span="8" class="item"
        ><span class="title">收货仓库：</span>{{ detail.inStore }}</el-col
      >
      <el-col :span="8" class="item"  v-if="isReview"
        ><span class="title">单据状态：</span
        >{{ statusName(detail.status) }}</el-col
      >
      <el-col :span="8" class="item" v-if="!isReview"
        ><span class="title">入库数量：</span>{{ detail.number }}</el-col
      >
      <el-col :span="8" class="item" v-if="!isReview"
        ><span class="title">总价：</span>￥{{ detail.allPrice }}</el-col
      >
      <el-col :span="8" class="item"
        ><span class="title">入库人：</span>{{ detail.inUser }}</el-col
      >
      <el-col :span="8" class="item"
        ><span class="title">入库时间：</span>{{ detail.inTime }}</el-col
      >
      <el-col :span="8" class="item"
        ><span class="title">关联单据：</span>{{ detail.order }}</el-col
      >
      <el-col :span="8" class="item"
        ><span class="title">审核人：</span>{{ detail.reviewUser }}</el-col
      >
      <el-col :span="8" class="item"
        ><span class="title">审核时间：</span>{{ detail.reviewTime }}</el-col
      >
      <el-col :span="8" class="item" v-if="detail.inType == 2"
        ><span class="title">报溢理由：</span>{{ detail.reason }}</el-col
      >
    </el-row>
    <div class="table-title">物资清单：</div>
    <div class="c__list">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号" width="80" v-if="headers.length">
        </el-table-column>
        <el-table-column
          v-for="(item, index) in headers"
          :key="index"
          :prop="item.field"
          :label="item.fieldName"
          :width="item.width"
          show-overflow-tooltip
        >
        </el-table-column>
      </el-table>
    </div>
    <div class="total" v-if="isReview">
      <div class="left">共{{tableData.length}}种</div>
      <div class="right">
        <span>合计{{detail.number}}</span>
        <span>￥{{detail.allPrice}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import stock from "@/api/operations/stock";
let statusNames = {
  "1": "待审核",
  "2": "已通过",
  "3": "已驳回",
};
export default {
  props: ["id",'isReview'],
  data() {
    return {
      detail: {},
      tableData: [],
      headers: [],
      columns:{
        index:{
          hidden:true
        },
        number:{
          width:100
        },
        price:{
          width:100
        }
      },
    };
  },

  watch: {
    id: {
      handler() {
        this.goodsInRecord();
        // id
      },
      immediate: true,
    },
  },
  methods: {
    statusName(key) {
      return statusNames[key];
    },
    async goodsInRecord() {
      let res = await stock.goodsIn.goodsInRecord({ id: this.id });
      console.log(res);
      this.detail = res;
      this.tableData = res.goods.list;
      this.headers = res.goods.headers.map(item => {
        return {
          ...item,
          ...this.columns[item.field]
        }
      }).filter(item => !item.hidden);
    },
  },
};
</script>
<style lang="scss" scoped>
.inDialog {
  color: #fff;
  padding: 20px;
  .table-title {
    font-size: 14px;
    line-height: 34px;
  }
  .c__list{
    width: 100%;
  }
  .total{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    span{
      display: inline-block;
      width: 100px;
      padding: 10px;
    }
  }
}
.content {
  font-size: 14px;
  line-height: 24px;
  margin-top: -10px;
  .item {
    display: flex;
    padding: 5px 0;
    .title {
      flex-shrink: 0;
      display: inline-block;
    }
  }
}
</style>
