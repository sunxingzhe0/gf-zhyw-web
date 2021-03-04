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
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="协助人:"
                v-for="(item, index) in ruleForm.helpUsers"
                :key="index"
                :prop="'helpUsers.' + index + '.value'"
                :rules="{
                  required: true,
                  message: '请输入协助人',
                  trigger: 'blur',
                }"
              >
                <el-input v-model="item.value"></el-input>
                <el-button type="text" @click="deleteHelpUsers(index)"
                  >删除</el-button
                >
              </el-form-item>
              <el-button
                type="text"
                style="padding: 0;
                  padding-top: 20px;
                  margin-left: 64px;"
                @click="addHelpUsers"
              >
                +添加
              </el-button>
            </el-col>
          </el-row>
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
export default {
  name: "help",
  components: {  },
  props: {
    id: {
      type: String,
    },
  },
  data() {
    return {
      ruleForm: {
        helpUsers: [
          {
            value: "",
          },
        ],
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
    }
  }
}
.submit-btn {
  margin: 20px auto;
  display: block;
}
</style>
