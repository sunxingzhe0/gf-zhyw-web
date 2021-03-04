<!-- @format -->

<template>
  <div class="Journal repair-detail-journal" v-loading="loading">
    <Table v-model="query" :columns="columns" :tableData="tableData"> </Table>
  </div>
</template>
<script>
import { Table, TableMixin } from "@/components/App";
import workbench from "@/api/operations/workbench";

export default {
  components: {
    Table,
  },
  props: ["id"],
  mixins: [
    TableMixin([
      {
        fetchListFunction: async () => {
          const res = await workbench.repair.DetailJournal();
          console.log(res);
          return res;
        },
      },
    ]),
  ],
  data() {
    return {
      query: {
        pageSize: 10,
        pageNum: 1,
      },
      columns: {
        index: {
          hidden: true,
        },
      },
    };
  },
  mounted() {},
  methods: {},
};
</script>
<style lang="scss" scope>
@import "@/assets/css/variables.scss";
.Journal {
  margin: 0 -20px;
}
</style>
<style lang="scss">
.repair-detail-journal {
  .c__list .el-table {
    height: calc(70vh - 260px) !important;
  }
}
</style>
