<template>
  <el-form class="table-header">
    <div class="table-header-row">
      <template v-for="(item, index) in params">
        <el-form-item
          v-if="index !== params.length - 1"
          :class="{ empty: !item.label }"
          :label="item.label + '：'"
          :key="index"
        >
          <FuncComponent
            :key="index"
            v-if="item.renderFunc"
            :renderFunc="item.renderFunc"
          ></FuncComponent>
          <component
            v-else
            :key="index"
            :type="item.type"
            :options="item.options"
            v-model="data[item._key]"
            v-bind="{ ...item.elAttrs }"
            :placeholder="item.placeholder"
            :is="item.component || 'el-input'"
          >
            <template v-if="item.component === 'el-select'">
              <el-option
                v-for="(_it, _i) in item.options"
                :key="index + '-' + _i"
                :label="_it.label"
                :value="_it.value"
              ></el-option>
            </template>
          </component>
        </el-form-item>
      </template>
    </div>
    <div class="table-header-btns">
      <!-- 最后一个搜索条件 -->
      <el-form-item
        :label="lastParam.label + '：'"
        :class="{ empty: !lastParam.label }"
      >
        <FuncComponent
          v-if="lastParam.renderFunc"
          :renderFunc="lastParam.renderFunc"
        ></FuncComponent>
        <component
          v-else
          :type="lastParam.type"
          :options="lastParam.options"
          v-model="data[lastParam._key]"
          v-bind="{ ...lastParam.elAttrs }"
          :placeholder="lastParam.placeholder"
          :is="lastParam.component || 'el-input'"
        >
          <template v-if="lastParam.component === 'el-select'">
            <el-option
              v-for="(_it, _i) in lastParam.options"
              :key="'lastParam-' + _i"
              :label="_it.label"
              :value="_it.value"
            ></el-option>
          </template>
        </component>
      </el-form-item>
      <slot v-if="$slots.default"></slot>
      <el-button v-if="searchBtn" type="primary" @click="search"
        >搜索</el-button
      >
    </div>
  </el-form>
</template>
<script>
/*
@author        qiang
@name          TableHeader
@desc          表头筛选组件
@props         params     Array<
                  label           string          label
                  default         string|number   默认值
                  key             string          form的key
                  type            string          组件传递的type值
                  component       string          组件名称，如：el-input
                  placeholder     string          placeholder
                  renderFunc      function:VNode  自定义渲染函数
                  elAttrs         object          element对应组件的属性（配置）
                  options         object<{        el-select时的options
                    label         string          选项label
                    value         string          选项value
                  }>
               }>
               searchBtn  boolean   是否显示搜索按钮[true]
@slot          slot               接受一个默认插槽
@emit
*/
// 不使用 import {} 是因为App里面的AreaSelect中依赖LinkageSelect，会产生循环引用
import { cloneDeep } from "lodash";
import AreaSelect from "@/components/App/AreaSelect";
import FlexInput from "@/components/Base/FlexInput";

export default {
  name: "TableHeader",
  components: {
    FlexInput,
    AreaSelect,
  },
  props: {
    params: {
      type: Array,
      default: () => [],
    },
    searchBtn: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    const data = {};
    this.params.forEach((item, index) => {
      item.elAttrs = item.elAttrs || {};
      if (typeof item.key === "string") {
        data[item.key] = item.default || "";
        item._key = item.key;
      } else {
        item._key = "param-" + index;
        data["param-" + index] = item.default || "";
      }
    });
    const lastParam = this.params[this.params.length - 1];
    return {
      data,
      lastParam,
    };
  },
  methods: {
    search() {
      this.$emit("search");
    },
    setParamsVal(o) {
      const data = cloneDeep(this.data);
      for (let p in o) {
        const index = this.params.findIndex(
          (item) => JSON.stringify(item.key) === p
        );
        if (index === -1) continue;
        data[this.params[index]._key] = o[p];
      }
      this.data = data;
    },
  },
};
</script>
<style lang="scss" scoped>
.table-header {
  display: flex;
  padding: 20px 20px 20px 0;
  .table-header-row {
    display: flex;
    flex: 1;
  }
  .table-header-btns {
    .el-button {
      width: 56px;
      height: 32px;
      background: #0071e3;
      border-radius: 2px;
      line-height: 32px;
      padding: 0;
    }
  }
  &::v-deep {
    .el-form-item {
      display: flex;
      margin-bottom: 0;
      align-items: center;
    }
    .el-form-item__label {
      width: 96px;
      height: 32px;
      line-height: 32px;
    }
    .el-form-item__content {
      .el-select,
      .el-input {
        width: 180px;
        height: 32px;
        display: flex;
        .el-input__inner {
          height: 32px;
          line-height: 30px;
          border: 1px solid #4d4d4d;
          background: rgba(255, 255, 255, 0.1);
        }
        .el-input__suffix {
          top: 1px;
          height: 30px;
          line-height: 30px;
        }
      }
      .el-date-editor {
        height: 32px;
        display: flex;
        padding: 0 10px;
      }
      .el-range-input {
        color: #fff;
      }
    }
    .el-select .el-input .el-select__caret {
      line-height: 30px;
    }
    .empty {
      .el-form-item__label {
        display: none;
      }
    }
    .area-select {
      width: 318px;
    }
    .flex-input {
      .el-select {
        width: 96px;
      }
      .el-input {
        margin-left: 0;
      }
    }
  }
  .table-header-btns {
    display: flex;
  }
}
</style>
