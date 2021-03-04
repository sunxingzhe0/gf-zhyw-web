<!-- @format -->

<template>
  
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="form"
    label-width="68px"
    label-position="left"
    class="dark-form call-repair"
    size="small"
  >
    <el-row>
      <el-col :span="8">
        <el-form-item label="仓库编码:" prop="code">
          <el-input v-model="ruleForm.code"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="仓库名称:" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="仓库电话:" prop="phone">
          <el-input v-model="ruleForm.phone"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="仓库状态:" prop="status">
          <el-select
            v-model="ruleForm.status"
            placeholder="请选择"
            style="width:100%"
          >
            <el-option label="启用" value="1"></el-option>
            <el-option label="停用" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="16">
        <el-form-item label="仓库地址:" prop="address">
          <div class="flex-form-item">
            <el-select
              v-model="ruleForm.province"
              placeholder="省"
              style="width:120px;flex-shrink: 0;"
            >
              <el-option label="省" value="1"></el-option>
            </el-select>
            <el-select
              v-model="ruleForm.city"
              placeholder="市"
              style="width:120px;flex-shrink: 0;"
            >
              <el-option label="市" value="1"></el-option>
            </el-select>
            <el-select
              v-model="ruleForm.district"
              placeholder="区/县"
              style="width:120px;flex-shrink: 0;"
            >
              <el-option label="区" value="1"></el-option>
            </el-select>
            <el-input v-model="ruleForm.address" style="width:100%"></el-input>
          </div>
        </el-form-item>
      </el-col>
      <!-- <el-col
        :span="24"
        v-for="(item, index) in ruleForm.contacts"
        :key="index"
      > -->
      <el-row v-for="(item, index) in ruleForm.contacts" :key="index">
        <el-col :span="8">
          <el-form-item
            label="联系人:"
            :prop="'contacts.' + index + '.name'"
            :rules="{
              required: true,
              message: '请输入联系人',
              trigger: 'blur',
            }"
          >
            <el-input v-model="item.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="联系电话:"
            :prop="'contacts.' + index + '.phone'"
          >
            <el-input v-model="item.phone"></el-input>
          </el-form-item>
        </el-col>
        <el-button
          type="text"
          style="padding:8px 0"
          @click="deleteContacts(index)"
          v-if="ruleForm.contacts.length > 1"
          >删除</el-button
        >
      </el-row>
      <!-- </el-col> -->
    </el-row>
    <el-col :span="24" style="margin-top:-20px">
      <el-form-item label="">
        <el-button type="text" @click="addNewContacts">新增</el-button>
      </el-form-item>
    </el-col>

    <el-col :span="24">
      <el-form-item label="仓库简介:" prop="desc">
        <el-input type="textarea" placeholder="请输入" v-model="ruleForm.desc"></el-input>
      </el-form-item>
    </el-col>
    <div class="btns">
      <el-button
        size="small"
        type="primary"
        plain
        @click="
          () => {
            $emit('close');
          }
        "
        >返回</el-button
      >
      <el-button size="small" type="primary" @click="submit">提交</el-button>
    </div>
  </el-form>
</template>
<script>
export default {
  props: ["id", "item"],
  data() {
    return {
      ruleForm: {
        code: "",
        name: "",
        phone: "",
        status: "1",
        province: "",
        city: "",
        district: "",
        address: "",
        contacts: [
          {
            name: "",
            phone: "",
          },
        ],
        desc: "",
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
        // name: [{ required: true, message: "请输入物资名称", trigger: "blur" }],
        // model: [{ required: true, message: "请输入物资型号", trigger: "blur" }],
        // manufacturer: [
        //   { required: true, message: "请输入生产商", trigger: "blur" },
        // ],
        // equipmentType: [
        //   { required: true, message: "设备类型", trigger: "blur" },
        // ],
        // unit: [{ required: true, message: "设备单位", trigger: "blur" }],
        // code: [{ required: true, message: "", trigger: "blur" }],
      },
    };
  },
  watch: {
    id: {
      handler(val) {
        this.resetForm("form");
        if (val && this.item) {
          this.ruleForm = { ...this.ruleForm, ...this.item };
        }
      },
      immediate: true,
    },
  },
  methods: {
    // 删除联系人
    deleteContacts(index) {
      this.ruleForm.contacts.splice(index, 1);
    },
    //新增联系人
    addNewContacts() {
      this.ruleForm.contacts.push({
        name: "",
        phone: "",
      });
    },
    resetForm(formName) {
      this.$nextTick(() => {
        // console.log(this.$refs[formName]);
        this.$refs[formName].resetFields();
      });
    },
    submit() {
      // if (!this.id) {
      //   this.$message.info("跳转到新增入库界面，将物资信息带入");
      // }
      this.$emit("close");
    },
  },
};
</script>
<style lang="scss" scoped>
.call-repair {
  // padding-left: 57px;
  // padding-right: 140px;
  // padding-bottom: 20px;
  padding-top: 20px;
  ::v-deep {
    .el-form-item {
      margin-top: 0px;
      margin-bottom: 20px;
      .el-form-item__label {
        color: #ffffff;
        padding-right: 0;
      }
    }
    .el-col {
      padding: 0 20px;
    }
    .flex-form-item {
      display: flex;
    }
  }
}
.btns {
  padding: 20px 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid rgba(255, 255, 255, 0.3);
}
</style>
