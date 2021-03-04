<!-- @format -->

<template>
  <el-form
    label-position="left"
    class="card-form"
    label-width="80px"
    :model="form"
    size="medium"
    :rules="rules"
  >
    <el-form-item label="标题：" prop="title">
      <el-input v-model="form.title" placeholder="请输入"></el-input>
    </el-form-item>
    <el-form-item label="调拨类型：" prop="type">
      <el-select v-model="form.type" placeholder="请选择" style="width:100%">
        <el-option label="调入" value="1"></el-option>
        <el-option label="拨出" value="2"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="出货仓库：" prop="outStore">
      <el-select
        v-model="form.outStore"
        placeholder="请选择"
        style="width:100%"
      >
        <el-option label="光电园仓库" value="1"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="入货仓库：" prop="inStore">
      <el-select v-model="form.inStore" placeholder="请选择" style="width:100%">
        <el-option label="光电园仓库" value="1"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="申请仓库：" prop="applyStore">
      <el-select
        v-model="form.applyStore"
        placeholder="请选择"
        style="width:100%"
      >
        <el-option label="光电园仓库" value="1"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item
      :label="index == 0 ? '调拨物资：' : ''"
      v-for="(item, index) in form.goods"
      :prop="'goods.' + index + '.goods'"
      :key="index"
      class="goods-form-item"
      :rules="{
        required: true,
        message: '请选择调拨物资',
        trigger: 'blur',
      }"
    >
      <el-select
        v-model="item.goods"
        placeholder="请选择"
        multiple
        style="width:180px;"
        collapse-tags
      >
        <el-option label="电脑" value="1"></el-option>
        <el-option label="水管" value="2"></el-option>
        <el-option label="空调" value="3"></el-option>
      </el-select>

      <el-form-item
        label=""
        :prop="'goods.' + index + '.number'"
        class="right-number-form-item"
        :rules="{
          required: true,
          message: '请输入数量',
          trigger: 'blur',
        }"
      >
        <el-input
          v-model="item.number"
          placeholder="请输入数量"
          class="right-number-input"
          style="width:100px;"
        ></el-input>
      </el-form-item>
    </el-form-item>

    <el-form-item label="">
      <el-button type="text" @click="addNewGoods">添加</el-button>
    </el-form-item>

    <el-form-item label="调拨理由：" prop="reason">
      <el-input
        v-model="form.reason"
        type="textarea"
        style="min-height:60px"
        placeholder="请输入调拨理由请输入调拨理由请输入调拨 理由，如此换行"
      ></el-input>
    </el-form-item>
    <div class="submit">
      <el-button type="text" @click="submit">提交</el-button>
    </div>
  </el-form>
</template>
<script>
export default {
  name: "OperationsStockGoodsReviewAllotApply",
  meta: {
    sort: 1,
    title: "调拨申请",
  },
  data() {
    return {
      form: {
        title: "",
        type: "1",
        outStore: "",
        inStore: "",
        applyStore: "",
        goods: [
          {
            number: "",
            goods: [],
          },
        ],
        reason:""
      },
      rules: {
        title: { required: true, message: "请输入标题", trigger: "blur" },
        type: { required: true, message: "请选择调拨类型", trigger: "blur" },
        outStore: {
          required: true,
          message: "请选择出货仓库",
          trigger: "blur",
        },
        inStore: { required: true, message: "请选择入货仓库", trigger: "blur" },
        applyStore: {
          required: true,
          message: "请选择申请仓库",
          trigger: "blur",
        },
      },
    };
  },
  methods: {
    //新增物资
    addNewGoods() {
      this.form.goods.push({
        goods: "",
        number: "",
      });
    },
    deleteGoods(index) {
      this.form.goods.splice(index, 1);
    },
    submit() {},
  },
};
</script>
<style lang="scss" scoped>
.card-form {
  margin: 20px;
  padding-left: 20px;

  background: rgba(51, 51, 51, 0.6);
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
  &::v-deep {
    .el-form-item {
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      margin-bottom: 0;
      // height: 36px;
      line-height: 36px;
      font-size: 14px;
      &:last-child {
        border-bottom: none;
      }
      .el-form-item__label {
        color: #fff;
        position: relative;
        padding-right: 0;
        &::before {
          position: absolute;
          left: -12px;
        }
      }
      .el-input__inner,
      .el-textarea__inner {
        border: none;
        background-color: rgba(0, 0, 0, 0);
        padding-left: 0;
      }
      .el-form-item__content {
        position: relative;
        .el-form-item__error {
          // display: none;
          left: auto;
          right: 0;
          top: 0;
          padding-top: 0;
          line-height: 36px;
          padding-right: 5px;
        }
      }
      // &.is-error {
      //   .el-input__inner,
      //   .el-input__inner:focus,
      //   .el-textarea__inner,
      //   .el-textarea__inner:focus {
      //     border-bottom: 1px solid #f56c6c;
      //   }
      // }
    }
    .goods-form-item {
      border-bottom: none;
      .el-input__inner,
      .el-textarea__inner {
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      }
    }
    .right-number-form-item {
      display: inline-block;
      width: 100px;
      .right-number-input {
        border-left: 1px solid rgba(255, 255, 255, 0.1);
        .el-input__inner {
          padding-left: 10px;
        }
      }

      .el-form-item__content {
        position: relative;
        .el-form-item__error {
          // display: none;
          left: 0;
          right: auto;
          top: 100%;
          padding-top: 0;
          line-height: 14px;
          // line-height: 36px;
          // padding-right: 5px;
        }
      }
    }
  }
  .submit{
    width: 100%;
    padding-right: 20px;
    text-align: center;
  }
}
</style>
