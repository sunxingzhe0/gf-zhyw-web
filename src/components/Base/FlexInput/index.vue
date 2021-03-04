<template>
  <div class="flex-input">
    <el-select :size="size" v-model="selectVal" v-bind="{ ...elAttrs }">
      <el-option
        v-for="(item, index) in options"
        :label="item.label"
        :value="item.value"
        :key="index"
      ></el-option>
    </el-select>
    <template v-if="withType">
      <el-input
        :size="size"
        v-model="inputVal"
        placeholder="请输入"
        v-bind="{ ...elAttrs }"
      >
        <slot name="suffix"></slot>
      </el-input>
    </template>
    <template v-else>
      <template v-for="(item, index) in options">
        <el-input
          v-if="index === selectIndex"
          v-model="value[item.value]"
          v-bind="{ ...elAttrs }"
          placeholder="请输入"
          :size="size"
          :key="index"
        >
          <slot name="suffix" slot="suffix"></slot>
        </el-input>
      </template>
    </template>
  </div>
</template>
<script>
/*
@author     qiang
@name       FlexInput
@desc       响应式Input输入框,由withType决定返回值
            withType: { conf.keyKey: select, conf.valKey: value, }
            !withType: { key1: value1, key2: value2, ... } 此模式下仅保留激活key的value
            注意：无论哪种模式，都尽量保证 value 的 key 值为最终需要使用的键值
@props  
            conf            ojbect<{        withType为true时必须的配置
                typeKey     string
                valueKey    string
            }> 
            size            string          "normal"|"mini"|"big"
            options         array<{         下拉类型选项
                label       string
                value       string|number
            }>
            withType        boolean         是否为类型关键字[false]
            elAttrs         object          element-ui el-input和el-select相关配置
@slot       suffix          Vnode           后面input的后缀插槽
@emit

*/
export default {
  name: "FlexInput",
  props: {
    conf: {
      type: Object,
      default: () => ({
        typeKey: "type",
        valueKey: "value",
      }),
    },
    size: {
      type: String,
      default: "normal",
    },
    value: {
      type: Object,
      default: () => ({
        key: "",
        value: "",
      }),
    },
    options: {
      type: Array,
      default: () => [],
    },
    withType: {
      type: Boolean,
      default: false,
    },
    elAttrs: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    inputVal: {
      get() {
        if (this.withType) {
          return this.value[this.conf.valueKey];
        } else {
          return "";
        }
      },
      set(val) {
        if (this.withType) {
          this.$emit("input", {
            [this.conf.typeKey]: this.selectVal,
            [this.conf.valueKey]: val,
          });
        } else {
          const form = this.value;
          for (let p in form) {
            if (p === this.selectVal) {
              form[p] = val;
            } else {
              form[p] = "";
            }
          }
          this.$emit("input", form);
        }
      },
    },
    selectVal: {
      get() {
        if (this.options[this.selectIndex]) {
          return this.options[this.selectIndex].value;
        } else {
          return "";
        }
      },
      set(val) {
        const index = this.options.findIndex((item) => item.value === val);
        this.selectIndex = index;
        if (this.withType) {
          this.$emit("input", {
            [this.conf.typeKey]: val,
            [this.conf.valueKey]: "",
          });
        } else {
          const form = this.value;
          for (let p in form) {
            form[p] = "";
          }
          this.$emit("input", form);
        }
      },
    },
  },
  data() {
    return {
      selectIndex: 0,
    };
  },
};
</script>
<style lang="scss" scoped>
.flex-input {
  display: flex;
}
</style>
