<!-- @format -->

<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="form"
    label-width="83px"
    label-position="left"
    class="dark-form call-repair"
    size="small"
  >
    <el-form-item label="物资编码:" prop="code" v-if="id">
      <el-input v-model="id" disabled></el-input>
    </el-form-item>
    <el-form-item label="物资名称:" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="物资型号:" prop="model">
      <el-input v-model="ruleForm.model"></el-input>
    </el-form-item>
    <el-form-item label="生产商:" prop="manufacturer">
      <el-input v-model="ruleForm.manufacturer"></el-input>
    </el-form-item>
    <el-form-item label="设备类型:" prop="equipmentType">
      <el-select
        v-model="ruleForm.equipmentType"
        placeholder="请选择"
        style="width:100%"
      >
        <el-option label="大型家电" value="1"></el-option>
        <!-- <el-option
          :label="item.label"
          :value="item.value"
          v-for="(item, index) in options"
          :key="index"
        ></el-option> -->
      </el-select>
    </el-form-item>
    <el-form-item label="设备单位:" prop="unit">
      <el-select
        v-model="ruleForm.unit"
        placeholder="请选择"
        style="width:100%"
      >
        <el-option label="台" value="1"></el-option>
        <!-- <el-option
          :label="item.label"
          :value="item.value"
          v-for="(item, index) in options"
          :key="index"
        ></el-option> -->
      </el-select>
    </el-form-item>
    <div class="btns">
      <el-button size="small" type="primary" @click="submit" v-if="id"
        >保存</el-button
      >
      <el-button
        size="small"
        type="primary"
        plain
        v-if="id"
        @click="
          () => {
            $emit('close');
          }
        "
        >返回</el-button
      >
      <el-button size="small" type="primary" @click="submit" v-if="!id"
        >提交并入库</el-button
      >
    </div>
  </el-form>
</template>
<script>
export default {
  name:"goodsManageEdit",
  props: ["id", "item"],
  data() {
    return {
      ruleForm: {
        name: "",
        model: "",
        manufacturer: "",
        equipmentType: "",
        unit: "",
      },

      dialogImageUrl: "",
      dialogVisible: false,
      options: [
        {
          label: "电话",
          value: "1",
        },
      ],
      rules: {
        name: [{ required: true, message: "请输入物资名称", trigger: "blur" }],
        model: [{ required: true, message: "请输入物资型号", trigger: "blur" }],
        manufacturer: [
          { required: true, message: "请输入生产商", trigger: "blur" },
        ],
        equipmentType: [
          { required: true, message: "设备类型", trigger: "blur" },
        ],
        unit: [{ required: true, message: "设备单位", trigger: "blur" }],
        code: [{ required: true, message: "", trigger: "blur" }],
      },
    };
  },
  watch: {
    id: {
      handler(val) {
        this.resetForm("form");
        if (val && this.item) {
          this.ruleForm = this.item;
        }
      },
      immediate: true,
    },
  },
  methods: {
    resetForm(formName) {
      this.$nextTick(() => {
        // console.log(this.$refs[formName]);
        this.$refs[formName].resetFields();
      });
    },
    submit() {
      if (!this.id) {
        this.$message.info("跳转到新增入库界面，将物资信息带入");
      }
      this.$emit("close");
    },
  },
};
</script>
<style lang="scss" scoped>
.call-repair {
  padding-left: 57px;
  padding-right: 140px;
  padding-bottom: 20px;
  ::v-deep {
    .el-form-item {
      margin-top: 20px;
      .el-form-item__label {
        color: #ffffff;
      }
    }
  }
}
.btns {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
