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
          <el-form-item label="执行部门:" prop="dept">
            <el-select
              v-model="ruleForm.dept"
              placeholder="请选择"
              style="width:100%"
            >
              <el-option
                :label="item.label"
                :value="item.value"
                v-for="(item, index) in deptOptions"
                :key="index"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="工单级别:" prop="orderLevel">
            <el-select
              v-model="ruleForm.orderLevel"
              placeholder="请选择"
              style="width:100%"
            >
              <el-option
                :label="item.label"
                :value="item.value"
                v-for="(item, index) in orderLevelOptions"
                :key="index"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="finishTime" label="计划完成时间:">
            <el-date-picker
              v-model="ruleForm.finishTime"
              value-format="yyyy-MM-DD HH:mm:ss"
              type="datetime"
              placeholder="选择日期时间"
              style="width:100%"
            >
            </el-date-picker>
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
import {mapState} from 'vuex'
// import OrderDetail from "./OrderDetail";
import workbench from "@/api/operations/workbench";
export default {
  name:"Delegate",
  components: {  },
  props: {
    id: {
      type: String,
    },
  },
  data() {
    return {
      ruleForm: {
        dept: "",
        orderLevel: "",
        finishTime: "",
      },

      deptOptions:[],

      rules: {
        dept: [{ required: true, message: "请选择执行部门", trigger: "blur" }],
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
  computed: {
    ...mapState({
      orderLevel: (state) => state.operations.status.orderLevel,
    }),
    orderLevelOptions() {
      console.log(this.orderLevel);
      return Object.entries(this.orderLevel).map(([value, label]) => {
        return {
          value: value,
          label: label,
        };
      })
    },
  },
  mounted(){
    this.getOptions()
  },
  methods: {
    //获取配置项
    async getOptions(){
      
      [this.deptOptions] = await Promise.all([
        await workbench.workCenter.getDeptOptions()
      ])
    },
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
      this.$refs["form"].validate((valid) => {
        if (valid) {
          // alert('submit!');
          console.log(this.ruleForm);
          workbench.workCenter.dispatchOrder({
            ...this.ruleForm,
            orderId:this.id
          }).then((res) => {
            console.log(res);
            this.$message.success("操作成功！");
            this.$emit("close")
            // this.$router.back();
          });
        } else {
          // console.log('error submit!!');
          // return false;
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
      }
    }
  }
}
.submit-btn {
  margin: 20px auto;
  display: block;
}
</style>
