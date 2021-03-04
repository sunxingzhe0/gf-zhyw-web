<template>
  <div>
    <h2>项目路由文档</h2>
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
  </div>
</template>
<script>
import Views from "../../../../docs/view.json";
export default {
  name: "Router",
  meta: {
    title: "项目路由(组件)文档",
    hideMenu: true,
  },
  components: {},
  data() {
    return {
      views: Views,
      viewsFilter: "",
      defaultProps: { label: "label", children: "children" },
    };
  },
  methods: {
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
  },
};
</script>
