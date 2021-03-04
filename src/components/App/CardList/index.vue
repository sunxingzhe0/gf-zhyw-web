<template>
  <div class="card-list" ref="refCardList">
    <div class="card-list-header">
      <div class="header-left" v-if="title">
        {{ title }}
      </div>
      <div class="header-right" v-if="params.length || headerBtns.length">
        <template v-for="(item, index) in params">
          <component
            :is="item.component"
            :key="'params' + index"
            v-model="data[item.key]"
            v-bind="{ ...item.elAttrs }"
          >
            <template v-if="item.component === 'el-select'">
              <el-option
                v-for="(_item, _index) in item.options"
                :key="index + _index"
                :label="_item.label"
                :value="_item.value"
              ></el-option>
            </template>
          </component>
        </template>
        <el-button v-if="hasSearch" size="mini" type="primary" @click="search()"
          >搜索</el-button
        >
        <template v-for="(item, index) in headerBtns">
          <el-button
            size="mini"
            @click="item.onClick()"
            :class="item.className"
            :key="'headerBtn' + index"
            :type="item.type || 'primary'"
          >
            {{ item.text }}
            <svg v-if="item.icon" class="iconfont" aria-hidden="true">
              <use :xlink:href="'#' + item.icon"></use>
            </svg>
          </el-button>
        </template>
      </div>
      <slot name="header"></slot>
    </div>
    <div class="card-list-body">
      <slot></slot>
      <template v-for="(item, index) in list">
        <FuncComponent
          :params="item"
          :renderFunc="renderFunc"
          :key="'list-item-' + index"
        ></FuncComponent>
      </template>
      <div class="el-loading-mask" v-if="loading">
        <div class="el-loading-spinner">
          <svg viewBox="25 25 50 50" class="circular">
            <circle cx="50" cy="50" r="20" fill="none" class="path"></circle>
          </svg>
        </div>
      </div>
    </div>
    <div class="card-list-footer" v-show="paginationShow">
      <el-pagination
        :total="total"
        :page-size="pageSize"
        :page-sizes="pageSizes"
        :current-page="pageNum"
        @size-change="pageSizeChange"
        @current-change="pageNumChange"
        layout="total, sizes, prev, pager, next"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
/*
@author        qiang
@name          CardList
@desc          右侧卡片列表视图

@props         title            string      试图名称[巡检点]
               params           Array<{     参数配置（不含分页参数）
                  key             string      参数key
                  className       string      类名
                  component       string      组件名称[el-input]
                  elAttrs         object      组件的其他配置，参考对应的组件文档       
               }>   
               fetcher          function    获取数据的方法/函数
               hasSearch        boolean     是否具有搜索按钮，如果不具有则条件发生变化就触发搜索。
               renderFunc       function    每一项的render函数，默认传递当前项为入参
               headerBtns       Array<{     组件顶部的按钮组，如果具有搜索按钮，则排在搜索按钮之后。
                  text            string      按钮文本
                  icon            string      icon symbol值
                  onClick         function    点击之后的回调函数
                  disabled        boolean     按钮状态[false]                  
                  className       string      按钮类名
               }>     
               pagination       boolean     是否具备翻页
               scrollParent     string      相对滚动的父级类，用于固定翻页,默认使用 view-scroll-y
@slot          header           header插槽   header自定义插槽，滚动时与header具有相同定位 
               default          默认插槽      用于卡片上方有其他元素的情况  
@emit


@example       renderFunc示例 
               renderFunc(item) {
                return <div class="card-item">
                  <div class="card-content">
                    <div class="card-icon">
                      <svg class="iconfont" aria-hidden="true">
                        <use xlinkHref="#iconxunjiandian"></use>
                      </svg>
                    </div>
                    <div class="card-infos">
                      <div class="card-info">
                        <span class="card-title" title={item.code}>
                          {item.code}
                        </span>
                        <span>{item.createdTime}</span>
                      </div>
                      <div class="card-info">
                        <span>{item.name}</span>
                        <span>{item.buildingName + "，" + item.floorName}</span>
                      </div>
                    </div>
                  </div>
                  <div class="card-footer">
                    <span onClick={() => this.showDetail(item.id)}>详情</span>
                    <span onClick={() => this.showEditor(item.id)}>编辑</span>
                    <span
                      class="danger"
                      onClick={() => this.delItem(item.id)}
                    >
                      删除
                    </span>
                  </div>
                </div>
               } 
*/

import { FuncComponent } from "@/components/Base";
export default {
  name: "CardList",
  components: {
    FuncComponent,
  },
  props: {
    title: {
      type: String,
      default: "",
    },
    params: {
      type: Array,
      default: () => [],
    },
    fetcher: {
      type: Function,
      required: true,
    },
    renderFunc: {
      type: Function,
      required: true,
    },
    hasSearch: {
      type: Boolean,
      default: false,
    },
    headerBtns: {
      type: Array,
      default: () => [],
    },
    scrollParent: {
      type: String,
      default: "view-scroll-y",
    },
  },
  data() {
    return {
      list: [],
      data: {},
      total: 0,
      pageNum: 1,
      pageSize: 20,
      loading: false,
      offsetTop: null,
      paginationShow: false,
      pageSizes: [10, 20, 50, 100],
    };
  },
  created() {
    this.loadData();
  },
  mounted() {
    this.init();
    this.paginationShow = this.offsetTop < 0;
    window.addEventListener("resize", this.init);
    if (this.scrollView) {
      this.scrollView.addEventListener("scroll", this.scrollHandler);
    }
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.init);
    if (this.scrollView) {
      this.scrollView.removeEventListener("scroll", this.scrollHandler);
    }
  },
  methods: {
    init() {
      this.scrollView = this.findScrollView(this.$el);
      this.offsetTop = this.$refs.refCardList.offsetTop - 48;
      this.offsetTop = this.offsetTop - this.scrollView.offsetHeight + 100;
    },
    findScrollView(ele) {
      if (ele.className.indexOf(this.scrollParent) !== -1) {
        return ele;
      } else {
        if (ele) {
          return this.findScrollView(ele.parentNode);
        } else {
          return null;
        }
      }
    },
    scrollHandler(event) {
      if (event.target.scrollTop >= this.offsetTop) {
        this.paginationShow = true;
      } else {
        this.paginationShow = false;
      }
    },
    async loadData() {
      try {
        this.loading = true;
        const params = {
          ...this.data,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        };
        const res = await this.fetcher(params);
        this.total = res.total;
        this.list = res.list;
        this.loading = false;
      } catch (e) {
        this.list = [];
        this.loading = false;
      }
    },
    pageNumChange(pageNum) {
      this.pageNum = pageNum;
      this.loadData();
    },
    pageSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.loadData();
    },
  },
  watch: {
    params: {
      handler(val) {
        const data = {};
        if (val && val.length) {
          val.forEach((item) => {
            data[item.key] = item.default || "";
          });
          this.data = data;
        }
      },
      immediate: true,
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/variables.scss";
.card-list {
  .view-scroll-y {
    height: calc(100% - 48px);
    overflow-y: auto;
  }
}
.card-list-header {
  top: -1px;
  z-index: 1;
  height: 48px;
  display: flex;
  position: sticky;
  padding: 10px 20px;
  background: #202020;
  justify-content: space-between;
  box-shadow: 0px 6px 6px rgb(0 0 0 / 50%);
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  .header-left {
    font-size: 16px;
    line-height: 28px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #ffffff;
  }
  .header-right {
    display: flex;
  }
}
.card-list-body {
  min-height: 100px;
  position: relative;
  margin-bottom: 48px;
  padding: 10px 20px 20px;
  .card-item {
    margin-bottom: 20px;
    padding: 10px 10px 0;
    background: rgba(51, 51, 51, 0.6);
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-loading-spinner {
    position: sticky;
    margin-top: 40px;
  }
  &::v-deep {
    .card-content {
      display: flex;
      margin-bottom: 10px;
    }
    .card-icon {
      width: 36px;
      height: 36px;
      background: $--color-primary;
      border-radius: 50%;
      margin-right: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 18px;
      flex-shrink: 0;
    }
    .card-infos {
      flex: 1;
      overflow: hidden;
    }
    .card-info {
      display: flex;
      font-size: 12px;
      line-height: 14px;
      margin-top: 10px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #b3b3b3;
      justify-content: space-between;
      &:first-child {
        margin-top: 0;
      }
    }
    .card-title {
      height: 14px;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #ffffff;
      max-width: calc(100% - 80px);
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .card-footer {
      display: flex;
      font-size: 12px;
      font-family: PingFang SC;
      font-weight: 500;
      line-height: 34px;
      text-align: center;
      color: $--color-primary;
      border-top: 1px solid rgba(255, 255, 255, 0.2);
      span {
        flex: 1;
        cursor: pointer;
        text-align: center;
        position: relative;
        &:hover {
          color: $--color-primary-light-1;
        }
        &::before {
          content: "";
          position: absolute;
          width: 1px;
          height: 14px;
          background: rgba(255, 255, 255, 0.2);
          right: 0;
          top: 10px;
        }
        &:last-child {
          &::before {
            display: none;
          }
        }
      }
      .danger {
        color: $--color-danger;
        &:hover {
          color: $--color-danger-light-1;
        }
      }
    }
  }
}
.card-list-footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 48px;
  padding: 10px;
  transition: all ease-in 0.4s;
  background: rgba(26, 26, 26, 1);
  border-top: 1px solid rgba(255, 255, 255, 0.3);
}
</style>
