<template>
  <AppDialogForm
    :form="form"
    :rules="rules"
    @submit="submit"
    @cancel="cancel"
    :options="options"
    v-loading="loading"
    :formItems="formItems"
    @change="changeHandler"
  ></AppDialogForm>
</template>
<script>
/*
@author        qiang
@name          BaseInfo
@desc          巡检点基本信息
@props         pointId    string    巡检点id
@emit
*/
import { FormItems, Rules } from "./constant";
import { AppDialogForm } from "@/components/App";
import inspection from "@/api/operations/inspection";

export default {
  name: "BaseInfo",
  components: {
    AppDialogForm,
  },
  props: {
    pointId: {
      type: String,
      default: "",
    },
  },
  data() {
    const Form = {};
    FormItems.forEach((item) => {
      item.forEach((it) => {
        if (it.key === "area") {
          Form.area = ["", ""];
          Rules.area.push({ validator: this.areaValidator, trigger: "blur" });
        } else if (it.key === "gisLog") {
          Rules.gisLog = [{ validator: this.gisValidator, trigger: "blur" }];
          it.renderFunc = this.renderGIS;
          Form.gisLat = "";
          Form.gisLog = "";
        } else {
          Form[it.key] = "";
        }
      });
    });
    return {
      form: Form,
      options: {
        inspectionType: [
          { label: "设备", value: "device" },
          { label: "现场", value: "site" },
        ],
        offLine: [
          { label: "启用", value: 1 },
          { label: "禁用", value: 0 },
        ],
      },
      area: {
        buildingId: "",
        buildingName: "",
        floorId: "",
        floorName: "",
      },
      rules: Rules,
      loading: false,
      formItems: FormItems,
    };
  },
  created() {
    if (this.pointId) {
      this.getPointInfo();
    }
  },
  methods: {
    renderGIS() {
      const { gisLog, gisLat } = this.form;
      return (
        <div class="gis-group">
          <el-input
            type="number"
            value={gisLog}
            placeholder="请输入"
            onInput={(e) => (this.form.gisLog = e)}
          ></el-input>
          <el-input
            type="number"
            value={gisLat}
            placeholder="请输入"
            onInput={(e) => (this.form.gisLat = e)}
          ></el-input>
        </div>
      );
    },
    async getPointInfo() {
      try {
        this.loading = true;
        const res = await inspection.point.getBaseInfo(this.pointId);
        res.area = res.area.map((item) => item.id);
        this.loading = false;
        this.form = res;
      } catch (e) {
        this.loading = false;
      }
    },
    areaValidator(rule, value, callback) {
      if (value.every((item) => item === "")) {
        callback(new Error("请选择所属区域"));
      } else {
        callback();
      }
    },
    gisValidator(rule, value, callback) {
      const { gisLog, gisLat } = this.form;
      if ((!gisLog && !gisLat) || (gisLog && gisLat)) {
        callback();
      } else {
        callback(new Error("请输入正确的GIS坐标"));
      }
    },
    changeHandler({ key, val }) {
      if (key === "area") {
        this.area = {
          buildingId: val.val[0],
          buildingName: val.txt[0],
          floorId: val.val[1],
          floorName: val.txt[1],
        };
      }
    },
    async submit() {
      const params = {
        id: this.form.id,
        name: this.form.name,
        type: this.form.inspectionType === "site" ? 1 : 2,
        longitude: this.form.gisLog,
        latitude: this.form.gisLat,
        address: this.form.address,
        rfId: this.form.rfId,
        imgCount: this.form.photoNum,
        offLine: Boolean(this.form.offLine),
        content: this.form.content,
        ...this.area,
      };
      await inspection.point.saveOrUpdate(params);
      this.$message.success("操作成功！");
    },
    cancel() {
      this.$emit("cancel");
    },
  },
};
</script>
<style lang="scss" scoped></style>
