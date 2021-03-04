<template>
  <div class="DarkSelect">
    <div class="label">{{ title }}：</div>
    <el-select
      v-model="value[selectKey]"
      placeholder="请选择"
      @change="search"
      size="small"
    >
      <!-- <el-option label="全部" value=""></el-option> -->
      <el-option
        :label="item.label"
        :value="item.value"
        v-for="(item, index) in options"
        :key="index"
      ></el-option>
    </el-select>
  </div>
  <!-- <el-input
    placeholder="关键字"
    v-model="value[inputKey]"
    class="dark-composite-input composite-input"
    size="mini"
  >
    <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
  </el-input> -->
</template>
<script>
/*
@author     dusheng
@name       DarkSelect
@desc       选择器
@props      value  Object  v-model
            options  Array  选择项列表
              {
                label:"",
                value:""
              }
            title  label
            selectKey  model选择器的key
@emit       search  点击搜索
*/
export default {
  props: {
    value: {
      type: Object,
    },
    options: {
      type: Array,
    },
    title: {
      type: String,
    },
    selectKey: {
      type: String,
      default: "type",
    },
  },
  // props: ["value", "title","options","selectKey"],
  methods: {
    search() {
      this.$emit("search");
    },
  },
};
</script>
<style lang="scss">
.DarkSelect {
  display: flex;
  align-items: center;
  .label {
    color: #fff;
  }
}
</style>
