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
      <el-form-item label="报修主题:" prop="repairTheme">
        <el-input v-model="ruleForm.repairTheme"></el-input>
      </el-form-item>
      <el-form-item label="报修类型:" prop="attr">
        <el-select
          v-model="ruleForm.attr"
          style="width:100%"
          placeholder="请选择"
        >
            <el-option
              :label="item.label"
              :value="item.value"
              v-for="(item, index) in attrTypeOption"
              :key="index"
            ></el-option>
        
        </el-select>
      </el-form-item>
      <el-form-item label="报修来源:" prop="repairType">
        <div class="flex">
          <el-select v-model="ruleForm.repairType" placeholder="请选择">
            <el-option
              :label="item.label"
              :value="item.value"
              v-for="(item, index) in fromOptions"
              :key="index"
            ></el-option>
          </el-select>
          <el-select
            v-model="ruleForm.repairSource"
            v-if="ruleForm.repairType == 'Phone'"
            class="main-select"
            placeholder="请选择"
          >
            <el-option
              :label="item.phone"
              :value="item.phone"
              v-for="(item, index) in phoneOptions"
              :key="index"
            >
              <span
                >{{ item.phone }},{{ item.dept }},{{ item.time }},{{
                  item.content
                }}</span
              >
            </el-option>
          </el-select>
        </div>
      </el-form-item>
      <el-form-item
        label="资产类型:"
        prop="assetsType"
        v-if="ruleForm.attr == 1"
      >
        <el-select
          v-model="ruleForm.assetsType"
          placeholder="请选择"
          style="width:100%"
        >
          <el-option
            :label="item.label"
            :value="item.value"
            v-for="(item, index) in typeOptions"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所在区域:" prop="area" v-if="ruleForm.attr == 1">
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
      <el-form-item
        label="资产名称:"
        prop="assetsName"
        v-if="ruleForm.attr == 1"
      >
        <el-input v-model="ruleForm.assetsName"></el-input>
      </el-form-item>
      <el-form-item label="关联单据:" prop="associateId">
        <el-input v-model="ruleForm.associateId"></el-input>
      </el-form-item>
      <el-form-item label="联系人:" prop="contact">
        <el-input v-model="ruleForm.contact"></el-input>
      </el-form-item>
      <el-form-item label="联系电话:" prop="contactPhone">
        <el-input v-model="ruleForm.contactPhone"></el-input>
      </el-form-item>
      <el-form-item label="故障描述:" prop="repairContent" style="width:100%">
        <el-input type="textarea" v-model="ruleForm.repairContent"></el-input>
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
  name: "OperationsWorkbenchRepairRegister",
  components: {
    AppDialog,
    AreaSelect,
  },
  meta: {
    title: "故障报修",
    hideMenu: true,
  },
  data() {
    return {
      elAttrs: {
        "before-close": this.beforeClose,
      },
      show: false,

      ruleForm: {
        repairTheme: "",
        assetsType: "",
        repairContent: "",
        repairType: "",
        repairSource: "",
        attr: "1",
        area: [],
        assetsName: "",

        associateId: "",
        contact: "",
        contactPhone: "",
      },

      dialogImageUrl: "",
      dialogVisible: false,
      phoneOptions: [
        //可选电话来源
        // {
        //   value: "1",
        //   label: "",
        //   phone: "02365478963",
        //   dept: "内科",
        //   time: "2020-11-27 10:00:21",
        //   content: "来电内容",
        // },
      ],
      fromOptions: [], //报修来源
      typeOptions: [], //设备类型
      rules: {
        // title: [{ required: true, message: "请输入报修主题", trigger: "blur" }],
      },
    };
  },
  mounted() {
    this.show = true;
    console.log(this.$route.query);
    this.ruleForm = {
      ...this.ruleForm,
      ...this.$route.query,
    };
    this.getOptions()
  },
  computed: {
    ...mapState({
      RepairSource: (state) => state.operations.status.RepairSource,
      attrType: (state) => state.operations.status.attrType,
      
    }),
    attrTypeOption() {
      return Object.entries(this.attrType).map(([value, label]) => {
        return {
          value: value,
          label: label,
        };
      });
    },
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
    //获取选项配置
    async getOptions(){
      [this.phoneOptions,this.typeOptions] = await Promise.all([
        await workbench.repair.repairTypePhone(),
        []
        // await workbench.repair.repairTypePhone()
      ])
      // this.phoneOptions = await workbench.repair.repairTypePhone()
      // this.phoneOptions = res
      // console.log(this.phoneOptions);
    },
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
          workbench.repair.addRegister(this.ruleForm).then((res) => {
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
