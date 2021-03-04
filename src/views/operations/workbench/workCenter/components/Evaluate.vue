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
        <el-col :span="24">
          <el-form-item label="评价:" prop="rate">
            <el-rate v-model="ruleForm.rate" class="rate" allow-half></el-rate>
            <span class="rate-text">{{ ruleForm.rate }}</span>
            <span class="rate-text">{{ rateText(ruleForm.rate) }}</span>
            <el-input v-model="ruleForm.remake" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-button
        size="small"
        type="primary"
        @click="submit('form')"
        class="submit-btn"
        >提交</el-button
      >
    </el-form>
  </div>
</template>
<script>
// import OrderDetail from "./OrderDetail";
import workbench from "@/api/operations/workbench";
const rateTexts = [
  {
    min: 0,
    max: 1,
    text: "非常不满意",
  },
  {
    min: 1,
    max: 2,
    text: "不满意",
  },
  {
    min: 2,
    max: 3,
    text: "一般",
  },
  {
    min: 3,
    max: 4,
    text: "满意",
  },
  {
    min: 4,
    max: 5.1,
    text: "非常满意",
  },
];
export default {
  name: "evaluate",
  components: {  },
  props: {
    id: {
      type: String,
    },
  },
  data() {
    return {
      ruleForm: {
        rate: 5,
        remake: "",
      },

      options: [
        {
          label: "一",
          value: "1",
        },
      ],
      rules: {
        // helpUsers: [
        //   { required: true, message: "请输入转接人", trigger: "blur" },
        // ],
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
    rateText(rate) {
      return rateTexts.find((item) => {
        return item.min <= rate && item.max > rate;
      })?.text;
    },
    async openDetail() {
      //弹窗获取详情
      this.current = "1";
      this.dialogLoading = true;
      this.content = {};
      this.content = await workbench.workCenter.workOrderDetail({
        id: this.id,
      });
      // console.log(this.content);
      this.dialogLoading = false;
    },
    // 删除协助人
    deleteHelpUsers(index) {
      this.ruleForm.helpUsers.splice(index, 1);
    },
    //新增协助人
    addHelpUsers() {
      this.ruleForm.helpUsers.push({
        value: "",
      });
    },
    submit(formName) {
      this.$emit("submit");

      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm);
          // alert('submit!');
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
        .el-button {
          position: absolute;
          right: -36px;
          color: #f74a4a;
        }
      }
      .rate {
        display: inline-block;
        // height: 32px;
        // .el-rate__item {
          .el-rate__icon {
            margin-top: -3px;
          }
        // }
      }
      .rate-text {
        line-height: 32px;
        font-size: 14px;
        color: #e89c17 !important;
        display: inline-block;
        height: 32px;
        padding-left: 10px;
      }
    }
  }
}
.submit-btn {
  margin: 20px auto;
  display: block;
}
</style>
