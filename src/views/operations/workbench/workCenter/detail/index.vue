<!-- @format -->

<template>
  <AppDialog
    router
    :show.sync="show"
    :elAttrs="elAttrs"
    @close="closeHandler"
    :title="'故障报修'"
  >
    <OrderDetail :content="content"></OrderDetail>

    <!-- 派单 -->
    <Delegate :id="id" v-if="['Dispatch','ReDispatch'].includes(actionType)"></Delegate>
    <!-- 转单 -->
    <Exchange :id="id" v-if="['Exchange'].includes(actionType)"></Exchange>
    <!-- 协助 -->
    <Help :id="id" v-if="['Help'].includes(actionType)"></Help>
    <!-- 评价 -->
    <Evaluate :id="id" v-if="['Evaluate'].includes(actionType)"></Evaluate>
  </AppDialog>
</template>
<script>
// import {mapState} from 'vuex'
import OrderDetail from "../components/OrderDetail";
import workbench from "@/api/operations/workbench";
import { AppDialog } from "@/components/App";

import Delegate from "../components/Delegate";
import Exchange from "../components/Exchange";
import Help from "../components/Help";
import Evaluate from "../components/Evaluate";
export default {
  name: "OperationsWorkbenchWorkCenterDetail",
  components: { OrderDetail, AppDialog, Delegate, Exchange, Help, Evaluate },
  props: {
    id: {
      type: String,
    },
  },
  data() {
    return {
      elAttrs: {},
      show: false,
      actionType:this.$route.query.actionType,
      // ruleForm: {
      //   dept: "",
      //   orderLevel: "",
      //   finishTime: "",
      // },

      // deptOptions:[],

      // rules: {
      //   dept: [{ required: true, message: "请选择执行部门", trigger: "blur" }],
      // },
      // dialogLoading: false,
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
    // ...mapState({
    //   orderLevel: (state) => state.operations.status.orderLevel,
    // }),
    // orderLevelOptions() {
    //   console.log(this.orderLevel);
    //   return Object.entries(this.orderLevel).map(([value, label]) => {
    //     return {
    //       value: value,
    //       label: label,
    //     };
    //   })
    // },
  },
  mounted() {
    this.show = true;
    // this.getOptions()
  },
  methods: {
    //获取配置项
    // async getOptions(){

    //   [this.deptOptions] = await Promise.all([
    //     await workbench.workCenter.getDeptOptions()
    //   ])
    // },
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
    // submit() {
    //   this.$refs["form"].validate((valid) => {
    //     if (valid) {
    //       // alert('submit!');
    //       console.log(this.ruleForm);
    //       workbench.workCenter.dispatchOrder({
    //         ...this.ruleForm,
    //         orderId:this.id
    //       }).then((res) => {
    //         console.log(res);
    //         this.$message.success("操作成功！");
    //         this.$emit("close")
    //         // this.$router.back();
    //       });
    //     } else {
    //       // console.log('error submit!!');
    //       // return false;
    //     }
    //   });
    // },
    closeHandler() {
      this.$emit("close");
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
