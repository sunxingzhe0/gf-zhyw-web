<!-- @format -->

<template>
  <div class="doc-page">
    <div class="doc-page-main">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        router
      >
        <el-menu-item index="/docsCopy/routerDoc">项目路由</el-menu-item>
        <el-menu-item index="/docsCopy/comDocs">组件文档</el-menu-item>
      </el-menu>
      <router-view></router-view>
      <!-- <el-tab-pane label="项目路由" name="router"><ComDocs></ComDocs></el-tab-pane>
      <el-tab-pane label="组件文档" name="component"><RouterDoc></RouterDoc></el-tab-pane> -->
    </div>
    <!-- <el-collapse v-model="activeNames">
      <el-collapse-item title="路由及路由组件" name="views">
        <el-input placeholder="输入关键字进行过滤" v-model="viewsFilter">
        </el-input>
        <el-tree
          :data="views"
          ref="viewsTree"
          default-expand-all
          :props="defaultProps"
          :render-content="renderTree"
          :filter-node-method="filterNode"
          :indent="30"
        >
        </el-tree>
      </el-collapse-item>
      <el-collapse-item title="项目组件（未全局注册）" name="components">
        <el-input placeholder="输入关键字进行过滤" v-model="componentsFilter">
        </el-input>
        <el-tree
          :data="components"
          default-expand-all
          ref="componentsTree"
          :props="defaultProps"
          :render-content="renderTree"
          :filter-node-method="filterNode"
          :indent="30"
        >
        </el-tree>
      </el-collapse-item>
    </el-collapse> -->
  </div>
</template>
<script>
import Views from "../../../docs/view.json";
import Components from "../../../docs/components.json";
// import ComDocs from './components/ComDocs'
// import RouterDoc from './components/RouterDoc'
export default {
  name: "Docs",
  meta: {
    title: "项目路由/组件文档",
    hideMenu: true,
    redirect: "/docsCopy/routerDoc",
  },
  // components: {ComDocs,RouterDoc},
  data() {
    return {
      activeIndex: "/docsCopy/routerDoc",
      activeName: "router",
      views: Views,
      viewsFilter: "",
      componentsFilter: "",
      components: Components,
      activeNames: ["views", "components"],
      defaultProps: { label: "label", children: "children" },
    };
  },
  methods: {
    handleClick(val, v) {
      console.log(val, v);
      // this.$router.push(val)
    },
    filterNode(value, data, node) {
      if (!value) return true;
      const val = value.toLowerCase();
      const label = data.label.toLowerCase();
      const parentLabel = (node.parent.label || "").toLowerCase();
      return label.indexOf(val) !== -1 || parentLabel.indexOf(val) !== -1;
    },
    renderTree(h, { node, data }) {
      return (
        <div class="custom-tree-node">
          {data.dir ? (
            <h3>{data.label}</h3>
          ) : (
            <div>
              <h4 class="name">
                {node.parent.label}
                <span class="path">{data.path}</span>
                {data.component ? null : (
                  <b class="router">
                    <i>Routr</i>
                  </b>
                )}
              </h4>
              <div class="desc">
                {data.desc && data.desc.map((item) => <pre>{item}</pre>)}
                {!data.desc || !data.desc.length ? "暂无描述" : null}
              </div>
            </div>
          )}
        </div>
      );
    },
  },
  watch: {
    viewsFilter(val) {
      this.$refs.viewsTree.filter(val);
    },
    componentsFilter(val) {
      this.$refs.componentsTree.filter(val);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/variables.scss";
.doc-page {
  padding-left: 180px;
  background: #000;
  padding-top: 40px;
  padding-bottom: 20px;
  overflow: auto;
  color: #fff;
  .doc-page-main {
    width: 100%;
    height: 100%;
    background: rgba(51, 51, 51, 0.6);
    // background-color: #fff;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
    overflow-y: auto;
  }
  ::v-deep {
    .el-input__inner,
    .el-textarea__inner {
      background-color: rgba(0, 0, 0, 0.8);
    }
    .el-collapse-item__wrap {
      background-color: #fff;
    }
    .el-tree {
      background-color: rgba(0, 0, 0, 0.8);
      color: #fff;
      // .el-tree-node.is-current {
      //   // border-bottom: 1px solid rgba(255,255,255,.3);
      // }
      .el-tree-node__content {
        height: auto;
        padding-bottom: 5px;
      }
    }
    .custom-tree-node {
      width: 100%;
      h3,
      h4,
      h5 {
        margin: 4px 0;
      }
      .router {
        margin-left: 5px;
        color: $--color-primary;
      }
    }
    .path {
      color: $--color-warning;
      margin: 0 5px;
    }
    .desc {
      background: #333;
      padding-left: 20px;
    }
    pre {
      margin: 0;
    }

    .el-menu {
      background-color: rgba(0, 0, 0, 0.8);
      border-bottom: none;
      .el-menu-item {
        height: 40px;
        line-height: 40px;
        color: #fff;
      }
      .el-menu-item.is-active {
        color: #0071e3;
      }
      .el-menu-item:focus,
      .el-menu-item:hover {
        background-color: rgba(0, 0, 0, 0.8);
      }
    }
  }
}
h2 {
  color: #fff;
  margin: 0;
}
</style>
