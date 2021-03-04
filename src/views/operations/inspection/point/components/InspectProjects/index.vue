<template>
  <div class="inspect-projects">
    <el-tree
      :indent="40"
      :data="projects"
      :render-content="renderNode"
      :props="{ children: 'contents' }"
    >
    </el-tree>
  </div>
</template>
<script>
/*
@author        qiang
@name          InspectProjects 
@desc          检查项目
@props         pointId      string      巡检点id 
@emit
*/
import inspection from "@/api/operations/inspection";
export default {
  name: "InspectProjects",
  props: {
    pointId: {
      type: String,
      require: true,
    },
  },
  data() {
    return {
      loading: false,
      projects: [],
    };
  },
  created() {
    this.getInspectionProjects();
  },
  methods: {
    // 获取巡检点检查项目
    async getInspectionProjects() {
      try {
        this.loading = true;
        const res = await inspection.point.getInspectionProjects(this.pointId);
        this.loading = false;
        this.projects = res;
      } catch (_) {
        console.log(_);
        this.loading = false;
      }
    },
    renderNode(h, { data }) {
      if (data.model) {
        return <span>{`【${data.code}】${data.name},${data.model}`}</span>;
      } else {
        return <span>{data.content}</span>;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.el-tree {
  color: #fff;
  padding: 20px 20px 20px 120px;
  background: transparent;
}
</style>
