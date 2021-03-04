<!-- @format -->

<template>
  <AppDialog
    router
    :show.sync="show"
    :elAttrs="elAttrs"
    @close="closeHandler"
    :title="'故障报修'"
  >
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="form"
      label-width="83px"
      class="dark-form call-repair"
      size="small"
    >
      <el-form-item label="工单主题:" prop="orderTheme">
        <el-input v-model="ruleForm.orderTheme"></el-input>
      </el-form-item>
      <el-form-item label="工单类别:" prop="orderCategory">
        <el-select
          v-model="ruleForm.orderCategory"
          placeholder="请选择"
          style="width:100%"
        >
          <el-option
            :label="item.label"
            :value="item.value"
            v-for="(item, index) in orderCategoryOption"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="工单类型:" prop="orderType">
        <el-select
          v-model="ruleForm.orderType"
          placeholder="请选择"
          style="width:100%"
        >
          <el-option
            :label="item.label"
            :value="item.value"
            v-for="(item, index) in orderTypeOption"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="关联单据:" prop="correlateDocumentId">
        <el-input v-model="ruleForm.correlateDocumentId"></el-input>
      </el-form-item>
      <el-form-item label="所在区域:" prop="area">
        <AreaSelect v-model="ruleForm.area"></AreaSelect>
        <!-- <el-select
        v-model="ruleForm.area"
        placeholder="请选择"
        style="width:100%"
      >
        <el-option
          :label="item.label"
          :value="item.value"
          v-for="(item, index) in options"
          :key="index"
        ></el-option>
      </el-select> -->
      </el-form-item>
      <el-form-item label="属性:" prop="attr">
        <el-select
          v-model="ruleForm.attr"
          placeholder="请选择"
          style="width:100%"
        >
          <el-option
            :label="item.label"
            :value="item.value"
            v-for="(item, index) in attrTypeOption"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        label="设备类型:"
        prop="assetsType"
        v-if="ruleForm.attr == '1'"
      >
        <el-select
          v-model="ruleForm.assetsType"
          placeholder="请选择"
          style="width:100%"
        >
          <el-option
            :label="item.label"
            :value="item.value"
            v-for="(item, index) in options"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="设备名称:"
        prop="assetsName"
        v-if="ruleForm.attr == '1'"
      >
        <el-input v-model="ruleForm.assetsName"></el-input>
      </el-form-item>
      <el-form-item label="联系人:" prop="contact">
        <el-input v-model="ruleForm.contact"></el-input>
      </el-form-item>
      <el-form-item label="联系电话:" prop="contactPhone">
        <el-input v-model="ruleForm.contactPhone"></el-input>
      </el-form-item>
      <el-form-item label="故障描述:" prop="orderDescribe" style="width:100%">
        <el-input type="textarea" v-model="ruleForm.orderDescribe"></el-input>
      </el-form-item>

      <el-form-item>
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" :append-to-body="true">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
    </el-form>
    <el-button size="small" type="primary" @click="submit" class="submit-btn"
      >提交</el-button
    >
  </AppDialog>
</template>
<script>
import { AreaSelect } from "@/components/App";
import { mapState } from "vuex";
import workbench from "@/api/operations/workbench";
import { AppDialog } from "@/components/App";
export default {
  name: "OperationsWorkbenchWorkCenterCallWorkOrder",
  components: {
    AppDialog,
    AreaSelect,
  },
  meta: {
    title: "工单登记",
    hideMenu: true,
  },
  data() {
    return {
      elAttrs: {
        "before-close": this.beforeClose,
      },
      show: false,

      ruleForm: {
        orderTheme: "",
        orderCategory: "1",
        orderType: "1",
        correlateDocumentId: "",
        attr: "1",
        assetsId: "1",
        assetsType: "",
        assetsName: "",
        area: [],
        orderDescribe: "",
        imageUrl: "",
        contact: "",
        contactPhone: "",
      },

      dialogImageUrl: "",
      dialogVisible: false,
      options: [],
      rules: {
        // title: [{ required: true, message: "请输入报修主题", trigger: "blur" }],
      },
      // ruleForm: {
      //   repairTheme: "",
      //   assetsType: "",
      //   repairContent: "",
      //   repairType: "",
      //   repairSource: "",
      //   attr: "1",
      //   area: [],
      //   assetsName: "",

      //   associateId: "",
      //   contact: "",
      //   contactPhone: "",
      // },

      // dialogImageUrl: "",
      // dialogVisible: false,
      // phoneOptions: [
      //   //可选电话来源
      //   {
      //     value: "1",
      //     label: "",
      //     phone: "02365478963",
      //     dept: "内科",
      //     time: "2020-11-27 10:00:21",
      //     content: "来电内容",
      //   },
      // ],
      // fromOptions: [], //报修来源
      // typeOptions: [], //设备类型
    };
  },
  computed: {
    ...mapState({
      RepairSource: (state) => state.operations.status.RepairSource,
      orderCategory: (state) => state.operations.status.orderCategory,
      orderType: (state) => state.operations.status.orderType,
      attrType: (state) => state.operations.status.attrType,
    }),
    orderCategoryOption() {
      return Object.entries(this.orderCategory).map(([value, label]) => {
        return {
          value: value,
          label: label,
        };
      });
    },
    orderTypeOption() {
      return Object.entries(this.orderType).map(([value, label]) => {
        return {
          value: value,
          label: label,
        };
      });
    },
    attrTypeOption() {
      return Object.entries(this.attrType).map(([value, label]) => {
        return {
          value: value,
          label: label,
        };
      });
    },
  },
  mounted() {
    this.show = true;
    console.log(this.$route.query);
    this.ruleForm = {
      ...this.ruleForm,
      ...this.$route.query,
    };
  },
  watch: {
    RepairSource: {
      handler(val) {
        // console.log(val);
        let options = [];
        if (val) {
          options = Object.entries(val).map(([value, label]) => {
            return {
              label: label,
              value: value,
            };
          });
        }
        this.fromOptions = options;
      },
      immediate: true,
    },
  },
  methods: {
    beforeClose(done) {
      console.log("before close");
      done();
    },
    closeHandler() {
      this.$emit("close");
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    submit() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          // alert('submit!');
          console.log(this.ruleForm);
          workbench.workCenter.addWorkOrder(this.ruleForm).then((res) => {
            console.log(res);
            this.$message.success("操作成功！");
            this.$router.back();
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
.flex {
  display: flex;
  &::v-deep {
    .el-select {
      width: 100%;
      &.main-select {
        width: 200px;
        flex-shrink: 0;
      }
    }
    // .main-select{
    // }
  }
}
.call-repair {
  padding: 20px;
  padding-top: 0;
  display: flex;
  flex-wrap: wrap;
  ::v-deep {
    .el-form-item {
      width: 33.3%;
      margin-top: 20px;
      margin-bottom: 0;
      .el-form-item__label {
        color: #ffffff;
      }
    }
  }
}
.submit-btn {
  display: block;
  margin: 0 auto;
}
</style>
