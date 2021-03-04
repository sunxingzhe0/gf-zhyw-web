<template>
  <div class="base-table">
    <div class="base-table-header">
      <TableHeader
        :params="params"
        @search="loadData"
        v-if="params.length"
        ref="refTableHeader"
        :searchBtn="searchBtn"
      >
        <slot name="tableHeader"> </slot>
      </TableHeader>
    </div>
    <div class="base-table-body" ref="refTableBody" v-loading="loading">
      <el-table
        :height="height"
        :data="tableData"
        ref="refInnerTable"
        v-bind="{ ...table }"
      >
        <template v-for="(column, index) in tableColumns">
          <el-table-column
            v-if="column.renderFun"
            v-bind="{ ...column }"
            :key="index"
          >
            <template slot-scope="scope">
              <FuncComponent
                :params="scope"
                :renderFunc="column.renderFun"
              ></FuncComponent>
            </template>
          </el-table-column>
          <el-table-column
            v-else
            :key="index"
            v-bind="{ ...column }"
          ></el-table-column>
        </template>
      </el-table>
    </div>
    <div class="base-table-footer">
      <el-pagination
        :total="total"
        :current-page="page"
        :page-size="pageSize"
        :page-sizes="pageSizes"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes, prev, pager, next, jumper"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
/*
@author        qiang
@name          Table
@desc          基础表格组件[搜索条件+内容+翻页区域]
@props         table      object<{          表格配置，参考el-table;无需定义data，否则将覆盖组件内data,仅扩展以下属性
                   page         number      默认页码[1]
                   pageSize     number      默认页码条数[20]
               }>

               params     Array<{           表格请求所需参数，组件将自动添加页码，最后一个条件将自动放置到最后
                   component    string      全局组件 global-component 及 TableHeader 已导入组件[AreaSelect、FlexInput],使用FlexInput 必须指定默认值为 {}
                   label        string      表单项label
                   type         string      组件type属性
                   key          string      参数key
                   placeholder  string      placeholder
                   options      array<{
                       label    string      label
                       value    string      value
                   }>
               }>

               columns    object<{          表格列配置，参考el-table；如接口返回表头，则将会对表头进行合并，无需重复定义label，如果headers中未包含colums中的属性，则会将未包含的属性放置到最后。仅扩展以下属性
                   renderFun    function    render函数，scope 作为入参
               }>

               fetcher    function          获取数据的方法

               searchBtn  boolean           是否显示搜索按钮[true]
@slot          tableHeader                  tableHeader slot
@refMethod     setParamsVal     object      设置params参数值,key为params的key(必须转JSON)，val为params的值，会自动根据key的类型进行赋值
@emit
@waring        上方部分属性暴露出来需要直接绑定，切勿全部使用 elAttr ,存在属性覆盖导致某些属性绑定失败 
*/
import TableHeader from "./TableHeader";
import FuncComponent from "@/components/Base/FuncComponent";
export default {
  name: "Table",
  props: {
    table: {
      type: Object,
      default: () => ({}),
    },
    params: {
      type: Array,
      default: () => [],
    },
    columns: {
      type: Object,
      default: () => ({}),
    },
    fetcher: {
      type: Function,
    },
    searchBtn: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    TableHeader,
    FuncComponent,
  },
  data() {
    return {
      total: 0,
      fixed: false,
      height: null,
      tableData: [],
      loading: false,
      tableColumns: [],
      page: this.table.page || 1,
      pageSize: this.table.pageSize || 20,
      pageSizes: this.table.pageSizes || [10, 20, 50, 100],
    };
  },
  mounted() {
    for (let p in this.columns) {
      if (this.columns[p].fixed) {
        this.fixed = true;
        break;
      }
    }
    if (this.fetcher) this.loadData();
    if (this.fixed) this.scrollHandler(1);
    window.addEventListener("resize", this.calcHeight);
  },
  beforeDestroy() {
    if (this.fixed) this.scrollHandler(0);
    window.removeEventListener("resize", this.calcHeight);
  },
  methods: {
    async loadData() {
      this.loading = true;
      try {
        const params = {
          page: this.page,
          pageSize: this.pageSize,
        };
        if (this.$refs.refTableHeader) {
          const data = this.$refs.refTableHeader.data;
          for (let p in data) {
            if (/^param-/.test(p)) {
              const index = parseInt(p.substring(6));
              if (Array.isArray(this.params[index].key)) {
                this.params[index].key.forEach((key, _index) => {
                  params[key] = data[p]?.[_index] || "";
                });
              } else {
                for (let _p in data[p]) {
                  params[_p] = data[p][_p];
                }
              }
            } else {
              params[p] = data[p];
            }
          }
        }
        const res = await this.fetcher(params);
        if (!this.tableColumns.length) {
          const fields = [];
          const tableColumns = res.headers.map((item) => {
            fields.push(item.field);
            return {
              ...item,
              prop: item.field,
              label: item.fieldName,
              ...this.columns[item.field],
              type: item.field === "index" ? "index" : null,
              index: item.field === "index" ? this.indexMethod : null,
            };
          });
          for (let p in this.columns) {
            if (!fields.includes(p)) {
              tableColumns.push(this.columns[p]);
            }
          }
          this.tableColumns = tableColumns;
        }
        this.tableData = res.list;
        this.total = res.total;
        this.loading = false;
        this.calcHeight();
        this.scrollTop();
      } catch (e) {
        this.loading = false;
      }
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.loadData();
    },
    handleCurrentChange(page) {
      this.page = page;
      this.loadData();
    },
    // 序号
    indexMethod(index) {
      return (this.page - 1) * this.pageSize + index + 1;
    },
    // 设置params参数值
    setParamsVal(val) {
      this.$refs.refTableHeader.setParamsVal(val);
    },
    // 计算高度
    calcHeight() {
      const innerTable = this.$refs.refInnerTable.$el;
      const bodyWrapper = innerTable.querySelector(".el-table__body-wrapper");
      innerTable.style.height = "";
      bodyWrapper.style.height = "";
      setTimeout(() => {
        const _offsetHeight = this.$refs.refTableBody.offsetHeight;
        setTimeout(() => {
          const offsetHeight = this.$refs.refTableBody.offsetHeight;
          if (offsetHeight !== _offsetHeight) return;
          this.height = offsetHeight - 72 + "px";
        }, 100);
      });
    },
    // 滚动到顶部
    scrollTop() {
      const innerTable = this.$refs.refInnerTable.$el;
      const bodyWrapper = innerTable.querySelector(".el-table__body-wrapper");
      bodyWrapper.scrollTop = 0;
    },
    // 滚动处理函数
    scrollHandler(bind) {
      const _self = this;
      const innerTable = this.$refs.refInnerTable.$el;
      const doLayout = () => {
        _self.$nextTick(() => _self.$refs.refInnerTable.doLayout());
      };
      const bodyWrapper = innerTable.querySelector(".el-table__body-wrapper");
      if (bind) {
        bodyWrapper.addEventListener("scroll", doLayout);
      } else {
        bodyWrapper.removeEventListener("scroll", doLayout);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.base-table {
  height: 100%;
  display: flex;
  overflow: hidden;
  position: relative;
  flex-direction: column;
}
.base-table-body {
  flex: 1;
  overflow: hidden;
  padding-bottom: 72px;
}
.base-table-footer {
  bottom: 0;
  width: 100%;
  padding: 20px;
  position: absolute;
  background: #000000;
}
</style>
