<template>
  <el-input
    placeholder="关键字"
    v-model="value[inputKey]"
    class="dark-composite-input composite-input"
    size="mini"
  >
    <el-select
      v-model="value[selectKey]"
      slot="prepend"
      class="prepend"
      placeholder="请选择"
    >
      <el-option
        :label="item.label"
        :value="item.value"
        v-for="(item, index) in options"
        :key="index"
      ></el-option>
    </el-select>
    <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
  </el-input>
</template>
<script>
/*
@author     dusheng
@name       CompositeInput
@desc       嵌选择器搜索框
@props      value  object  v-model
                keywords  String  搜索关键字
                type   String  选择器的value
            options  Array  选择项列表
              {
                label:"",
                value:""
              }
            inputKey  model输入框的key
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
    inputKey: {
      type: String,
      default: "keywords",
    },
    selectKey: {
      type: String,
      default: "type",
    },
  },
  // props: ["value", "options","inputKey","selectKey"],
  methods: {
    search() {
      this.$emit("search");
    },
  },
};
</script>
<style lang="scss">
.dark-composite-input.composite-input {
  display: flex;
  align-items: center;
  border: 1px solid #4d4d4d;
  box-sizing: border-box;
  height: 28px;
  .el-input-group__prepend {
    background: rgba(0, 0, 0, 0.2);
    border: none;
    width: 33.33%;
    min-width: 90px;
    flex-shrink: 0;
    border-right: 1px solid #4d4d4d;
    padding: 0;
    .prepend {
      margin: 0;
      .el-input__inner {
        padding: 0 10px;
        padding-right: 26px;
        color: #fff;
        height: 26px;
        // overflow: hidden;
        // text-overflow: ellipsis;
        // white-space: nowrap;
      }
      .el-input__inner::-webkit-input-placeholder {
        color: #666666;
      }
    }
  }
  .el-input__inner {
    background: rgba(0, 0, 0, 0.2);
    border: none;
    // border-left: 1px solid #4d4d4d;
    outline: none;
    color: #fff;
    border-radius: 0;
    font-size: 14px;
  }
  .el-input__inner::-webkit-input-placeholder {
    color: #666666;
  }
  // .el-input__inner:hover {
  //   border-left: 1px solid #4d4d4d;
  // }
  .el-input-group__append {
    background: rgba(0, 0, 0, 0.2);
    border: none;
    width: 26px;
    height: 26px;
    padding: 0;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 255, 255, 0) 100%
    );
    .el-button {
      padding: 0;
      margin: 0;
      width: 26px;
      height: 26px;
      border: none;
      // .el-icon-search {
      //   color: #0071e3;
      //   font-size: 16px;
      // }
      // background: rgba(0, 0, 0, 0.2);
    }
  }
}
// .dark-composite-input.composite-input.middle {
//   height: 32px;
//   .el-input-group__prepend {
//     .prepend {
//       .el-input__inner {
//         font-size: 14px;
//         padding-right: 30px;
//       }
//     }
//   }
//   .el-input-group__append {
//     width: 30px;
//     height: 30px;
//     .el-button {
//       width: 30px;
//       height: 30px;
//       font-size: 16px;
//     }
//   }
// }
</style>
