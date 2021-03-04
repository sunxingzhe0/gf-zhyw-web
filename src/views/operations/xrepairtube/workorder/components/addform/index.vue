<template>
  <el-form
    :model="formData"
    :rules="rules"
    ref="ruleForm"
    label-width="130px"
    class="demo-ruleForm"
    size="small"
  >
    <el-form-item label="报修主题" prop="name">
      <el-input v-model="formData.name"></el-input>
    </el-form-item>
    <el-form-item label="报修来源" prop="source">
      <el-select v-model="formData.source" placeholder="请选择活动区域">
        <el-option label="1" value="shanghai"></el-option>
        <el-option label="2" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="设备类型" prop="type">
      <el-select v-model="formData.type" placeholder="请选择活动区域">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="所在区域" prop="region">
      <el-select v-model="formData.region" placeholder="请选择活动区域">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="设备名称" prop="equipment">
      <el-input v-model="formData.equipment"></el-input>
    </el-form-item>

    <el-form-item label="故障描述" prop="describe">
      <el-input type="textarea" v-model="formData.describe"></el-input>
    </el-form-item>

    <el-form-item label="">
      <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :limit="2"
        :on-exceed="handleMaxUp"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="" />
      </el-dialog>
    </el-form-item>

    <el-form-item class="sumit">
      <el-button type="primary" @click="submitForm('formData')">提交</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      //表单数据
      formData: {
        name: "",
        source: "",
        type: "",
        region: "",
        equipment: "",
        describe: "",
        delivery: false,
      },
      //规则
      rules: {
        name: [{ required: true, message: "请输入报修主题", trigger: "blur" }],
        source: [
          { required: true, message: "请选择报修来源", trigger: "change" },
        ],
        type: [
          { required: true, message: "请选择设备类型", trigger: "change" },
        ],
        region: [
          { required: true, message: "请选择所在区域", trigger: "change" },
        ],
        equipment: [
          { required: true, message: "请输入设备名称", trigger: "blur" },
        ],
        describe: [
          { required: true, message: "请输入故障描述", trigger: "blur" },
        ],
      },
      /* 上传 */
      dialogImageUrl: "",
      dialogVisible: false,
    };
  },
  methods: {
    //提交
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    /* 上传-移除 */
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    /* 上传-点击已上传文件-缩略图预览*/
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //上传-超出最大限制
    handleMaxUp() {
      this.$message({
        showClose: true,
        message: "最多上传2张图片",
        type: "error",
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.el-form {
  margin-top: 20px;
  .el-form-item {
    .el-input,
    .el-select,
    .el-textarea {
      width: 400px;
    }
    ::v-deep.el-textarea {
      .el-textarea__inner {
        background-color: rgba($color: #fff, $alpha: 0.1);
        border-color: #4d4d4d;
        color: #fff;
        height: 74px;
        &:focus {
          border-color: #c0c4cc;
        }
      }
    }
    ::v-deep.el-upload {
      width: 74px;
      height: 74px;
      line-height: 74px;
      background-color: rgba($color: #000000, $alpha: 0);
    }
    ::v-deep.el-upload-list__item {
      width: 74px;
      height: 74px;
    }
    .el-button {
      margin-left: 170px;
      margin-bottom: 20px;
    }
    ::v-deep.el-input__inner {
      background-color: rgba($color: #fff, $alpha: 0.1);
    }
  }
}
</style>
