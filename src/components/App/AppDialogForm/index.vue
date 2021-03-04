<template>
  <el-form
    :model="form"
    :rules="rules"
    ref="refAppDialogForm"
    class="app-dialog-form"
  >
    <div class="form-row" v-for="(item, index) in formItems" :key="index">
      <template v-for="(it, i) in item">
        <template v-if="!it.require || (it.require && it.require(form))">
          <el-form-item
            :prop="it.key"
            :label="it.label"
            :key="index + '-' + i"
            :class="{ full: it.full }"
          >
            <template v-if="it.renderFunc">
              <FuncComponent
                :renderFunc="it.renderFunc"
                :params="form"
              ></FuncComponent>
            </template>
            <component
              v-else
              node-key="id"
              :type="it.type"
              default-expand-all
              :data="form[it.key]"
              v-model="form[it.key]"
              :disabled="it.disabled"
              :placeholder="it.placeholder"
              :render-content="it.renderTree"
              :is="it.component || 'el-input'"
              @change="$emit('change', { key: it.key, val: $event })"
            >
              <template v-if="it.component === 'el-select'">
                <el-option
                  v-for="(_it, _i) in options[it.key]"
                  :key="index + '-' + i + '-' + _i"
                  :label="_it.label"
                  :value="_it.value"
                ></el-option>
              </template>
              <template v-if="it.component === 'el-checkbox-group'">
                <el-checkbox
                  v-for="(_it, _i) in options[it.key]"
                  :key="index + '-' + i + '-' + _i"
                  :label="_it.value"
                  :name="it.key"
                  >{{ _it.label }}</el-checkbox
                >
              </template>
            </component>
          </el-form-item>
        </template>
      </template>
    </div>
    <div class="form-row footer">
      <el-button type="primary" @click="submit">提交</el-button>
      <el-button plain @click="cancel">取消</el-button>
    </div>
  </el-form>
</template>
<script>
/*
@author        qiang
@name          AppDialogForm
@desc          app弹出层表单
@props         form         object          目标表单内容 
               rules        object          表单校验规则
               formItems    Array<Array<    表单显示内容项（二维数组）
                {
                    label           string            label
                    key             string            form的key
                    type            string            组件传递的type值
                    full            boolean           是否填充100%
                    disabled        boolean           是否禁用组件
                    component       string            组件名称，如：el-input
                    placeholder     string            placeholder
                    renderFunc      function:VNode    自定义渲染函数(form: 当前表单数据):VNode
                    require         function:boolean  是否渲染 (form: 当前表单数据): boolean      
                }
                options     object<{        options选择值，key为form的key，值为label、value对象数组
                    [key:sting]: Array<{
                        label: string, 
                        value: string
                        }>
                    }>
               >>
@emit          change                change事件        object<{      
                                                          key   string    对应的key
                                                          val   any       对应组件所触发的值 
                                                      }> 
               submit                提交事件           form          
               cancel                取消事件           null
*/
import { FuncComponent } from "@/components/Base";
import AreaSelect from "@/components/App/AreaSelect";
export default {
  name: "AppDialogForm",
  components: {
    AreaSelect,
    FuncComponent,
  },
  props: {
    form: {
      type: Object,
      default: () => ({}),
    },
    rules: {
      type: Object,
      default: () => ({}),
    },
    formItems: {
      type: Array,
      default: () => [],
    },
    options: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    submit() {
      this.$refs.refAppDialogForm.validate((res) => {
        if (res) this.$emit("submit", this.form);
      });
    },
    cancel() {
      this.$emit("cancel");
    },
  },
};
</script>
<style lang="scss" scoped>
.app-dialog-form .form-row {
  width: 100%;
  display: flex;
  padding: 0 20px;
  margin-top: 20px;
  .el-form-item {
    width: 33.3%;
    display: flex;
    margin-bottom: 0;
    align-items: center;
    &.is-required ::v-deep .el-form-item__label::before {
      position: absolute;
      left: 0;
    }
    &.full {
      width: 100%;
      align-items: unset;
      &::v-deep {
        .el-form-item__content {
          width: 1053px;
        }
      }
    }
  }
  &.footer {
    display: flex;
    align-items: center;
    justify-content: center;
    .el-button {
      width: 74px;
      height: 32px;
      border-radius: 2px;
      line-height: 8px;
      margin-left: 20px;
    }
  }
  &::v-deep {
    .el-form-item__label {
      width: 84px;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #ffffff;
      line-height: 32px;
      padding-right: 0;
      text-align: left;
      padding-left: 12px;
      position: relative;
      &::after {
        content: "：";
      }
    }
    .el-form-item__content {
      width: 280px;
      line-height: 32px;
    }
    .el-input,
    .el-select {
      width: 280px;
      height: 32px;
      margin-left: 0;
      .el-input__inner {
        width: 100%;
        height: 32px;
        line-height: 30px;
        padding-left: 10px;
        background: rgba(255, 255, 255, 0.1);
      }
    }
    .el-textarea .el-textarea__inner {
      width: 100%;
      padding: 0 10px;
      line-height: 30px;
      padding-left: 10px;
      background: rgba(255, 255, 255, 0.1);
    }
    .el-input__icon {
      line-height: 1;
    }
    .el-date-editor--date .el-input__prefix {
      display: none;
    }
  }
}
</style>
