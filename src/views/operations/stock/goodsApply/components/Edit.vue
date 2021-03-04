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
    <el-form-item label="关联工单:" prop="order">
      <el-input v-model="ruleForm.order" placeholder="请输入"></el-input>
    </el-form-item>
    <el-form-item label="申领科室:" prop="dept">
      <el-select
        v-model="ruleForm.dept"
        placeholder="请选择"
        style="width:100%"
      >
        <el-option label="科室一" value="1"></el-option>
        <!-- <el-option
          :label="item.label"
          :value="item.value"
          v-for="(item, index) in options"
          :key="index"
        ></el-option> -->
      </el-select>
    </el-form-item>
    <el-form-item label="申领人:" prop="user">
      <el-select
        v-model="ruleForm.user"
        placeholder="请选择"
        style="width:100%"
      >
        <el-option label="申领人" value="1"></el-option>
        <!-- <el-option
          :label="item.label"
          :value="item.value"
          v-for="(item, index) in options"
          :key="index"
        ></el-option> -->
      </el-select>
    </el-form-item>
    <el-form-item
      :label="index == 0 ? '申领内容:' : ''"
      v-for="(item, index) in ruleForm.contents"
      :key="index"
      class="multiple-form-item"
      :prop="'contents.' + index + '.value'"
      :rules="{
        required: true,
        message: '请至少选择一项申领内容',
        trigger: 'blur',
      }"
    >
      <el-cascader
        placeholder="请输入"
        :options="options"
        v-model="item.value"
        :show-all-levels="false"
        filterable
        style="width:100%"
      >
      </el-cascader>
      <el-button
        type="text"
        @click="deleteContents(index)"
        style="margin-left:20px"
        v-if="ruleForm.contents.length > 1"
        >删除</el-button
      >
    </el-form-item>
    <el-button
      type="text"
      style="padding: 0;margin-left: 83px;"
      @click="addContents"
    >
      +添加
    </el-button>
    <el-form-item label="申领数量:" prop="number">
      <el-input v-model="ruleForm.number" placeholder="请输入"></el-input>
    </el-form-item>
    <el-form-item label="申领理由:" prop="reason">
      <el-input
        type="textarea"
        v-model="ruleForm.reason"
        style="width:100%;"
        placeholder="请输入故障描述"
      ></el-input>
    </el-form-item>
    <div class="btns">
      <el-button size="small" type="primary" @click="submit">保存</el-button>
    </div>
  </el-form>
</template>
<script>
export default {
  props: [],
  data() {
    return {
      ruleForm: {
        order: "",
        dept: "1",
        user: "1",
        number: "",
        reason: "",
        contents: [{ value: "" }],
      },

      dialogImageUrl: "",
      dialogVisible: false,
      options: [
        {
          value: "ddx",
          label: "大东西",
          children: [
            {
              value: "bx",
              label: "冰箱",
            },
          ],
        },
        {
          value: "xdx",
          label: "小东西",
          children: [
            {
              value: "dfg",
              label: "电饭锅",
            },
            {
              value: "sg",
              label: "水管",
            },
          ],
        },
      ],
      rules: {
        // order: "",
        // dept: "1",
        // user: "1",
        // number: "",
        // reason:"",
        order: [{ required: true, message: "请输入关联工单", trigger: "blur" }],
        dept: [{ required: true, message: "请选择科室", trigger: "blur" }],
        user: [{ required: true, message: "请选择申领人", trigger: "blur" }],
        number: [{ required: true, message: "请输入数量", trigger: "blur" }],
        reason: [
          { required: true, message: "请输入故障描述", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submit() {
      this.$emit("close");
    },
    // 删除
    deleteContents(index) {
      this.ruleForm.contents.splice(index, 1);
    },
    //新增
    addContents() {
      this.ruleForm.contents.push({
        value: "",
      });
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
.multiple-form-item {
  &::v-deep {
    .el-form-item__content {
      display: flex;
      .el-button {
        flex-shrink: 0;
      }
    }
  }
}
</style>
