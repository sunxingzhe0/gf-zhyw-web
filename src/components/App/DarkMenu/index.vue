<template>
  <el-menu
    ref="refElMenu"
    mode="horizontal"
    :router="!noRouter"
    @select="selectMent"
    class="dark-el-menu el-menu"
    :default-active="activeRouter"
  >
    <el-menu-item
      v-for="(item, index) in navs"
      :index="item.path"
      :key="index"
      :disabled="item.disabled"
    >
      {{ item.text }}
    </el-menu-item>
  </el-menu>
</template>
<script>
/* 
@author     dusheng
@name       DarkMenu
@desc       黑色风格主题菜单
@props      navs  Array<{           菜单列表
              text        string        菜单文本
              path        string        菜单路由
              disabled    boolean       禁用状态               
            }>  
            noRouter  boolean       是否为路由跳转 
            v-model   string['0']   控制active（选中项的path）
@emit       select    string        当前选中的path
@warning    如果在非路由场景下使用，请自定义path
*/

export default {
  name: "DarkMenu",
  props: {
    navs: {
      type: Array,
      default: () => [],
    },
    value: {
      type: String,
      default: "0",
    },
    noRouter: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    activeRouter() {
      if (this.current) {
        return this.current;
      }
      return this.navs.find((item) => {
        return this.$route.matched.map((it) => it.path).includes(item.path);
      })?.path;
    },
  },
  methods: {
    selectMent(val) {
      this.$emit("input", val);
      this.$emit("select", val);
    },
  },
  watch: {
    value: {
      handler(val) {
        if (!val || !this.noRouter) return;
        if (this.$refs.refElMenu) {
          this.$refs.refElMenu.activeIndex = val;
        } else {
          this.$nextTick(() => (this.$refs.refElMenu.activeIndex = val));
        }
      },
      immediate: true,
    },
  },
};
</script>
<style lang="scss" scoped>
.dark-el-menu.el-menu {
  border-bottom: none;
  height: 36px;
  line-height: 36px;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;
  padding: 0 40px;
  &::before,
  &::after {
    display: none;
  }
  &::v-deep {
    .el-menu-item {
      height: 36px;
      line-height: 36px;
      font-size: 14px;
      padding: 0 0;
    }
    .el-menu-item:not(.is-disabled):hover,
    .el-menu-item:not(.is-disabled):focus {
      background-color: rgba(0, 0, 0, 0.8);
      color: #0071e3;
    }
    .el-menu-item.is-active {
      color: #0071e3;
    }
  }
}
.dark-el-menu.el-menu.gray {
  padding: 0 20px;
  justify-content: flex-start;
  background-color: rgba(255, 255, 255, 0.1);
  &::v-deep {
    .el-menu-item {
      margin-right: 40px;
    }
    .el-menu-item:not(.is-disabled):hover,
    .el-menu-item:not(.is-disabled):focus {
      background-color: rgba(0, 0, 0, 0);
      color: #0071e3;
    }
  }
}
</style>
