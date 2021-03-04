<!-- @format -->

<template>
  <div class="dialog-in">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="form"
      label-width="83px"
      label-position="left"
      class="dark-form"
      size="small"
    >
      <el-row>
        <el-col :span="8">
          <el-form-item label="出库类型:" prop="inType">
            <el-radio-group v-model="ruleForm.inType">
              <el-radio :label="1">领用</el-radio>
              <el-radio :label="2">报损</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="ruleForm.inType == 2">
          <el-form-item label="关联单据:" prop="order">
            <el-select
              v-model="ruleForm.order"
              placeholder="请选择"
              style="width:100%"
            >
              <el-option label="单据1" value="1"></el-option>
              <!-- <el-option
                :label="item.label"
                :value="item.value"
                v-for="(item, index) in options"
                :key="index"
              ></el-option> -->
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="ruleForm.inType == 2">
          <el-form-item label="报损理由:" prop="reason">
            <el-input v-model="ruleForm.reason"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="出货仓库:" prop="store">
            <el-select
              v-model="ruleForm.store"
              placeholder="请选择"
              style="width:100%"
            >
              <el-option label="仓库1" value="1"></el-option>
              <!-- <el-option
                :label="item.label"
                :value="item.value"
                v-for="(item, index) in options"
                :key="index"
              ></el-option> -->
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    
    <div class="table-title">物资清单：</div>
    <div class="c__list">
      <el-form
        :model="tableForm"
        ref="tableForm"
        label-width="0px"
        size="small"
      >
        <el-table
          :data="tableForm.tableData"
          style="width: 100%"
          :span-method="arraySpanMethod"
        >
          <el-table-column
            :prop="column.field"
            :label="column.fieldName"
            :width="column.width"
            v-for="(column, index) in columns"
            :key="index"
          >
            <template slot-scope="scope">
              <!-- 最底部的新增按钮 -->
              <div
                class="add-new-line"
                v-if="column.field == 'code' && scope.row.addNew"
              >
                <el-button type="text" @click="addNew()">
                  +新增
                </el-button>
              </div>
              <!-- 表格内表单 -->
              <el-form-item
                v-if="scope.row.edit"
                :prop="'tableData.' + scope.$index + '.' + column.field"
                :rules="{
                  required: true,
                  message: column.fieldName + '不能为空',
                  trigger: 'blur',
                }"
              >
                <el-input
                  v-model="scope.row[column.field]"
                  placeholder="请输入"
                  v-if="column.type == 'input'"
                  style="width:100%"
                ></el-input>
                <el-select
                  v-model="scope.row[column.field]"
                  v-if="column.type == 'select'"
                  placeholder="请选择"
                  style="width:100%"
                >
                  <el-option
                    :label="item.label"
                    :value="item.value"
                    v-for="(item, index) in options[column.optionKey]"
                    :key="index"
                  ></el-option>
                </el-select>
              </el-form-item>
              <!-- <el-input
              v-model="scope.row[column.field]"
              v-if="scope.row.edit"
            ></el-input> -->
              <span v-if="!scope.row.edit">{{ scope.row[column.field] }}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
    </div>
    <div class="bottom">
      <el-button size="mini" type="primary" @click="submit">提交</el-button>
    </div>
  </div>
</template>
<script>
const tableTemplate = {
  code: "",
  name: "",
  model: "",
  manufacturer: "",
  equipmentType: "",
  unit: "",
  number: "",
  price: "",
  edit: true,
};
export default {
  props: ["id", "item"],
  data() {
    return {
      tableTemplate,
      ruleForm: {
        inType: 1,
        order: "",
        reason: "",
        inStore: "",
      },

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

      columns: [
        {
          fieldName: "物资编码",
          field: "code",
          type: "input",
        },
        {
          fieldName: "物资名称",
          field: "name",
          type: "input",
        },
        {
          fieldName: "物资型号",
          field: "model",
          type: "input",
        },
        {
          fieldName: "生产商",
          field: "manufacturer",
          type: "select",
          optionKey: "manufacturerOptions",
        },
        {
          fieldName: "设备类型",
          field: "equipmentType",
          type: "input",
        },
        {
          fieldName: "设备单位",
          field: "unit",
          type: "input",
        },
        {
          fieldName: "出库数量",
          field: "number",
          type: "input",
        },
        {
          fieldName: "领用人",
          field: "receiveUser",
          type: "input",
        },
        {
          fieldName: "领用科室",
          field: "receiveDept",
          type: "input",
        },
      ],
      options: {
        manufacturerOptions: [{ label: "生产商1", value: "1" }],
      },
      tableForm: {
        tableData: [
          // {
          //   code: "3464575679",
          //   name: "扳手",
          //   model: "X62-h53t7",
          //   manufacturer: "光电园生产商",
          //   equipmentType: "大型家电",
          //   unit: "台",
          //   number: "80",
          //   price: "120",
          //   edit: true,
          // },
          {
            addNew: true,
            code: "",
          },
        ],
      },
    };
  },
  mounted() {
    console.log("mounted");
    this.addNew();
  },
  methods: {
    // row, column, rowIndex, columnIndex
    // 合并列
    arraySpanMethod({ row }) {
      if (row.addNew) {
        return [1, this.columns.length];
      }
    },
    addNew() {
      console.log(tableTemplate);

      this.tableForm.tableData.splice(this.tableForm.tableData.length - 1, 0, {
        ...tableTemplate,
      });
    },
    submit() {
      console.log(this.tableForm.tableData);
      console.log(this.ruleForm);
      this.$emit('close')
    },
  },
};
</script>
<style lang="scss" scoped>
.table-title{
  font-size: 14px;
  line-height: 34px;
  color: #fff;
}
.dialog-in {
  padding: 20px;
  &::v-deep {
    .el-table {
      .add-new-line {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        padding-bottom: 12px;
      }
      .el-form-item--small.el-form-item {
        margin-bottom: 12px;
        .el-form-item__error {
          top: 30px;
        }
      }
    }
    .el-table td {
      padding: 0;
      padding-top: 12px;
    }
  }
}
.dark-form {
  // padding: 20px;
  &::v-deep {
    .el-form-item {
      padding-right: 30px;
    }
    .el-form-item__label,
    .el-radio {
      color: #fff;
    }
  }
}
.bottom {
  padding-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
// .call-repair {
//   padding-left: 57px;
//   padding-right: 140px;
//   padding-bottom: 20px;
//   ::v-deep {
//     .el-form-item {
//       margin-top: 20px;
//       .el-form-item__label {
//         color: #ffffff;
//       }
//     }
//   }
// }
// .btns {
//   width: 100%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// }
</style>
