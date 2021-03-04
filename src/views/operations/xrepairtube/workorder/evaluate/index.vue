<template>
  <!-- 待评价 -->
  <div class="page-evaluate">
    <WaitList :listData="listData" />
    <div class="pagination" v-if="$store.state.operations.isShowPage">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="10"
        layout="total, prev, pager, next"
        :total="30"
        :pager-count="maxPage"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import WaitList from "../components/waitlist";
export default {
  name: "OperationsXrepairtubeWorkorderEvaluate",
  meta: {
    sort: 3,
    title: "待评价",
    hideMenu: true,
  },
  components: {
    WaitList,
  },
  data() {
    return {
      listData: [
        {
          title: "保养（02154）",
          stateName: "待评价",
          name: "空调（大型家电）",
          source: "来电",
          createTime: "2020-12-31 00：00：00",
        },
        {
          title: "保养（02154）",
          stateName: "待评价",
          name: "空调（大型家电）",
          source: "来电",
          createTime: "2020-12-31 00：00：00",
        },
        {
          title: "保养（02154）",
          stateName: "待评价",
          name: "空调（大型家电）",
          source: "来电",
          createTime: "2020-12-31 00：00：00",
        },
      ],
      currentPage: 1,
      maxPage: 5,
    };
  },
  methods: {
    handleSizeChange() {},
    handleCurrentChange() {},
  },
};
</script>
<style lang="scss" scoped>
.page-evaluate {
  padding: 20px;
  .pagination {
    position: absolute;
    bottom: 0;
    left: 0;
    border-top: 1px solid #555555;
    background: rgba($color: #000000, $alpha: 0.5);
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 5px 20px 0 20px;
    ::v-deep.el-pagination button {
      background-color: rgba($color: #fff, $alpha: 0.2);
      margin: 0 2px;
      border-radius: 2px;
      color: #fff;
    }
    ::v-deep.el-pager li {
      background-color: rgba($color: #fff, $alpha: 0.2);
      border-radius: 2px;
      color: #fff;
      margin: 0 2px;
    }
    ::v-deep.el-pager li.active {
      background: #0470e3;
    }
  }
}
</style>
