<template>
  <div>
    <h2>项目 Mock 接口文档</h2>
    <el-tree
      :data="apis"
      default-expand-all
      ref="componentsTree"
      :props="defaultProps"
      :render-content="renderTree"
      :indent="30"
    >
    </el-tree>
  </div>
</template>
<script>
import "code-prettify";
import Apis from "../../../../docs/apis.json";

export default {
  name: "Api",
  meta: {
    title: "Mock接口文档",
    hideMenu: true,
  },
  components: {},
  data() {
    return {
      apis: Apis,
      defaultProps: { label: "label", children: "children" },
    };
  },
  mounted() {
    window.PR.prettyPrint();
  },
  methods: {
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
              </h4>
              <div class="desc">
                <pre class="prettyprint ">{data.desc}</pre>
              </div>
            </div>
          )}
        </div>
      );
    },
  },
  watch: {
    apisFilter(val) {
      this.$refs.componentsTree.filter(val);
    },
  },
};
</script>
