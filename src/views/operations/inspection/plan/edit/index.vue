<template>
  <AppDialog
    router
    :show.sync="show"
    :elAttrs="elAttrs"
    @close="closeHandler"
    :title="planId ? '编辑巡检计划' : '新增巡检计划'"
  >
    <PlanForm :id="planId"></PlanForm>
  </AppDialog>
</template>
<script>
/*
@author        qiang
@name          PlanEdit
@desc          巡检计划新增/编辑
@props
@query         planId       string      巡检计划id，没有时为新增 
@emit
*/
import { PlanForm } from "../components";
import { AppDialog } from "@/components/App";
export default {
  name: "PlanEdit",
  meta: {
    title: "编辑巡检计划",
    hideMenu: true,
  },
  components: {
    PlanForm,
    AppDialog,
  },
  data() {
    return {
      elAttrs: {
        "before-close": this.beforeClose,
      },
      planId: "",
      show: false,
    };
  },
  mounted() {
    this.show = true;
    this.planId = this.$route.query.planId;
  },
  methods: {
    beforeClose(done) {
      console.log("before close");
      done();
    },
    closeHandler() {
      this.$emit("close");
    },
  },
};
</script>
<style lang="scss" scoped></style>
