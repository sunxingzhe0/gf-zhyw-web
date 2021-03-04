<!-- @format -->

<template>
  <div class="dialog-in" v-loading="dialogLoading">
    <!-- <OrderDetail :content="content"></OrderDetail> -->
    <el-form
      :inline="true"
      :model="ruleForm"
      :rules="rules"
      ref="form"
      class="dark-form "
      size="small"
      label-position="left"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="转接人:" prop="exchangeUser">
            <el-input v-model="ruleForm.exchangeUser"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="time" label="计划完成时间:">
            <el-date-picker
              v-model="ruleForm.time"
              type="datetime"
              placeholder="选择日期时间"
              style="width:100%"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="备注:" prop="remake">
            <el-input v-model="ruleForm.remake"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-button size="small" type="primary" @click="submit" class="submit-btn"
        >提交</el-button
      >
    </el-form>
  </div>
</template>
<script>
// import OrderDetail from "./OrderDetail";
import workbench from "@/api/operations/workbench";
export default {
  name:"exchange",
  components: {  },
  props: {
    id: {
      type: String,
    },
  },
  data() {
    return {
      ruleForm: {
        exchangeUser: "",
        time: "",
        remake: "",
      },

      options: [
        {
          label: "一",
          value: "1",
        },
      ],
      rules: {
        exchangeUser: [{ required: true, message: "请输入转接人", trigger: "blur" }],
      },
      dialogLoading: false,
      content: {},
    };
  },
  watch: {
    id: {
      handler() {
        this.openDetail();
        // id
      },
      immediate: true,
    },
  },
  methods: {
    async openDetail() {
      //弹窗获取详情
      this.current = "1";
      this.dialogLoading = true;
      this.content = {};
      this.content = await workbench.workCenter.workOrderDetail({
        id: this.id,
      });
      console.log(this.content);
      this.dialogLoading = false;
    },
    submit() {
      this.$emit("submit");
    },
  },
};
</script>
<style lang="scss" scoped>
.dialog-in {
  padding: 20px;
  ::v-deep {
    .el-form-item {
      margin-top: 20px;
      margin-bottom: 0;
      width: 100%;
      display: flex;
      padding-right: 130px;
      .el-form-item__label {
        padding-left: 10px;
        color: #ffffff;
        flex-shrink: 0;
        &::before {
          position: absolute;
          left: 0;
        }
      }
      .el-form-item__content {
        width: 100%;
      }
    }
  }
}
.submit-btn {
  margin: 20px auto;
  display: block;
}
</style>
