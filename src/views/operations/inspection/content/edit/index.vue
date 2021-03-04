<template>
  <AppDialog router :show="show" :title="title" :elAttrs="elAttrs">
    <AppDialogForm
      :form="form"
      :rules="rules"
      @submit="submit"
      @cancel="cancel"
      :options="options"
      v-loading="loading"
      :formItems="formItems"
    ></AppDialogForm>
  </AppDialog>
</template>
<script>
/*
@author        qiang
@name          ContentEdit
@desc          巡检内容新增/巡检内容编辑
@query         contentId    string    巡检内容id，没有时为新增
@props
@emit
*/
import { FormItems, Rules } from "./constant";
import inspection from "@/api/operations/inspection";
import { AppDialog, AppDialogForm } from "@/components/App";
export default {
  name: "ContentEdit",
  components: {
    AppDialog,
    AppDialogForm,
  },
  data() {
    const Form = {};
    FormItems.forEach((item) => {
      item.forEach((it) => {
        Form[it.key] = it.key === "type" ? [] : "";
      });
    });
    return {
      form: Form,
      show: false,
      rules: Rules,
      initVal: null,
      contentId: "",
      loading: false,
      formItems: FormItems,
      options: {
        type: [
          { label: "设备巡检", value: "device" },
          { label: "现场巡检", value: "site" },
        ],
        ways: [
          { label: "填写", value: "input" },
          { label: "选择", value: "select" },
        ],
      },
      elAttrs: {
        "before-close": this.beforeClose,
      },
    };
  },
  computed: {
    title() {
      return this.contentId ? "编辑巡检内容" : "新增巡检内容";
    },
  },
  mounted() {
    this.contentId = this.$route.query.contentId;
    this.show = true;
    this.init();
  },
  methods: {
    async init() {
      if (this.contentId) {
        try {
          this.loading = true;
          this.form = await inspection.content.getContentDetail(this.contentId);
          this.initVal = JSON.stringify(this.form);
          this.loading = false;
        } catch (e) {
          this.loading = false;
        }
      } else {
        this.initVal = JSON.stringify(this.form);
      }
    },
    async confirmLeave() {
      if (this.initVal !== JSON.stringify(this.form)) {
        try {
          const confirm = await this.$confirm("编辑未保存，您确认要离开吗？", {
            type: "warning",
          });
          if (confirm === "confirm") {
            return true;
          } else {
            return false;
          }
        } catch (_) {
          return false;
        }
      }
      return true;
    },
    async beforeClose(done) {
      const leave = await this.confirmLeave();
      if (leave) done();
    },
    async submit(params) {
      this.loading = true;
      await inspection.content.saveContent(params);
      this.loading = false;
      setTimeout(() => this.$router.back(), 1500);
      this.$message.success("操作成功！");
    },
    async cancel() {
      const leave = await this.confirmLeave();
      if (leave) this.$router.back();
    },
  },
  watch: {
    "form.ways"(val) {
      if (val === "select") {
        this.rules.ranges = [
          {
            required: true,
            trigger: "blur",
            message: "请输入巡检内容选项数值",
          },
        ];
      } else {
        delete this.rules.ranges;
      }
    },
  },
};
</script>
<style lang="scss" scoped></style>
