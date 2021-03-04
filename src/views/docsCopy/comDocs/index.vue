<!-- @format -->

<template>
  <div class="routerDoc">
    
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
  </div>
</template>
<script>
import Views from "../../../../docs/view.json";
import routers from "@/router/meta.json";
export default {
  name: "docsCopyComDocs",
  meta: {
    title: "路由",
  },
  data() {
    return {
      views: [],
      viewsFilter: "",
      defaultProps: { label: "label", children: "children" },
      activeItem: {},
    };
  },
  mounted() {
    // console.log(routers);
    // console.log(Views);
    this.views =  Views
    // console.log(this.views);
    // this.activeItem = this.views[0].dir
    //   ? this.views[0].children[0]
    //   : this.views[0];
    // console.log(this.activeItem);
    // _path = _path.replace(/\\/g, "/")
  },
  // computed: {
  //   formatViews() {
  //     console.log(this.formatDeep(this.Views));
  //     return this.formatDeep(this.Views);
  //   },
  // },
  methods: {
    formatDeep(list) {
      list.forEach((element) => {
        element.path = element.path.replace(/\\/g, "/");
        element.path = element.path.replace("src/", "@/");
        let searchPath =
          element.path.indexOf("/index.vue") >= 0
            ? element.path
            : element.path + "/index.vue";
        element.label = routers[searchPath]
          ? routers[searchPath].meta.title
          : "";

        if (element.children) {
          element.children = this.formatDeep(element.children);
        }
      });
      return list;
      // console.log(list);
    },
    filterNode(value, data, node) {
      if (!value) return true;
      const val = value.toLowerCase();
      const label = data.label.toLowerCase();
      const parentLabel = (node.parent.label || "").toLowerCase();
      return label.indexOf(val) !== -1 || parentLabel.indexOf(val) !== -1;
    },
    // eslint-disable-next-line no-unused-vars
    renderTree(h, { node, data }) {
      // console.log(data);
      return (
        <div class="custom-tree-node">
          {data.dir ? (
            <h3>{data.label}</h3>
          ) : (
            <div>
              <h4 class="name">
                
                <span >{data.label}</span>
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
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/variables.scss";
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
.routerDoc {
  display: flex;
  flex-flow: column;
  height: calc(100% - 40px);
}
.doc-container {
  height: calc(100% - 40px);
  display: flex;
}
.doc-aside {
  padding: 20px;
  color: #999;
  font-size: 14px;
  max-height: 100%;
  flex-shrink: 0;
  // height:calc(100% - 40px) ;
  overflow-y: auto;
  .doc-nav-item {
    color: #fff;
    cursor: pointer;
    font-size: 16px;
  }
  .doc-nav-group {
    padding: 10px 0 30px 0;
    .doc-nav-item {
      padding-top: 5px;
      line-height: 20px;
    }
  }
  .doc-nav-item.active {
    color: #0071e3;
  }
}
.doc-main {
  max-height: 100%;
  // height:calc(100% - 40px) ;
  overflow-y: auto;
  width: 100%;
}
</style>
