<!-- @format -->

<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="form"
    label-width="83px"
    class="dark-form call-repair"
    size="small"
  >
    <el-form-item label="报修主题:" prop="title">
      <el-input v-model="ruleForm.title"></el-input>
    </el-form-item>
    <el-form-item label="报修来源:" prop="from">
      <el-input placeholder="请选择" v-model="ruleForm.from">
        <el-select
          v-model="ruleForm.fromType"
          slot="prepend"
          class="prepend"
          placeholder="请选择"
        >
          <el-option
            :label="item.label"
            :value="item.value"
            v-for="(item, index) in options"
            :key="index"
          ></el-option>
        </el-select>
      </el-input>
    </el-form-item>
    <el-form-item label="设备类型:" prop="type">
      <el-select
        v-model="ruleForm.type"
        placeholder="请选择"
        style="width:100%"
      >
        <el-option
          :label="item.label"
          :value="item.value"
          v-for="(item, index) in options"
          :key="index"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="所在区域:" prop="area">
      <el-select
        v-model="ruleForm.area"
        placeholder="请选择"
        style="width:100%"
      >
        <el-option
          :label="item.label"
          :value="item.value"
          v-for="(item, index) in options"
          :key="index"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="设备名称:" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="故障描述:" prop="desc">
      <el-input type="textarea" v-model="ruleForm.desc"></el-input>
    </el-form-item>

    <el-form-item>
      <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible" :append-to-body="true">
        <img width="100%" :src="dialogImageUrl" alt="" />
      </el-dialog>
    </el-form-item>
    <el-button size="small" type="primary" @click="submit" class="submit-btn">提交</el-button>
  </el-form>
</template>
<script>
export default {
  props: [],
  data() {
    return {
      ruleForm: {
        title: "",
        type: "",
        from: "",
        fromType: "",
        area: "",
        name: "",
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
        title: [{ required: true, message: "请输入报修主题", trigger: "blur" }],
      },
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    submit() {},
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
.submit-btn{
  margin-left: 263px;
}
</style>
