<template>
  <el-form
    :model="formData"
    :rules="rules"
    ref="ruleForm"
    label-width="130px"
    class="demo-ruleForm"
    size="small"
  >
    <el-form-item label="关联工单" prop="orderCode">
      <el-input v-model="formData.orderCode"></el-input>
    </el-form-item>
    <el-form-item label="申领科室" prop="department">
      <el-select v-model="formData.department" placeholder="请选择">
        <el-option label="1" value="shanghai"></el-option>
        <el-option label="2" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="申领人" prop="user">
      <el-select v-model="formData.user" placeholder="请选择">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="申领内容" prop="applyContent">
      <div class="addMore">+添加</div>
      <el-select v-model="formData.applyContent" placeholder="请选择">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="申领数量" prop="num">
      <el-input v-model="formData.num"></el-input>
    </el-form-item>

    <el-form-item label="申领理由" prop="reason">
      <el-input type="textarea" v-model="formData.reason"></el-input>
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
        orderCode: "",
        department: "",
        user: "",
        applyContent: "",
        num: "",
        reason: "",
        delivery: false,
      },
      //规则
      rules: {
        orderCode: [
          { required: true, message: "关联工单不能为空", trigger: "blur" },
        ],
        department: [
          { required: true, message: "请选择申领科室", trigger: "change" },
        ],
        user: [{ required: true, message: "请选择申领人", trigger: "change" }],
        applyContent: [
          { required: true, message: "请选择申领内容", trigger: "change" },
        ],
        num: [{ required: true, message: "申领数量不能为空", trigger: "blur" }],
        reason: [
          { required: true, message: "申领理由不能为空", trigger: "blur" },
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
    .addMore {
      color: #0071e3;
      cursor: pointer;
    }
  }
}
</style>
