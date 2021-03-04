<template>
  <div>
    <h2>项目组件文档</h2>
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
  </div>
</template>
<script>
import Components from "../../../../docs/components.json";

export default {
  name: "Component",
  meta: {
    title: "组件文档",
    hideMenu: true,
  },
  components: {},
  data() {
    return {
      componentsFilter: "",
      components: Components,
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
    componentsFilter(val) {
      this.$refs.componentsTree.filter(val);
    },
  },
};
</script>
