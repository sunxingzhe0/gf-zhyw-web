<template>
  <div class="app-bread-crumb">
    <router-link class="app-home" to="/index">
      <svg class="iconfont" aria-hidden="true">
        <use xlink:href="#iconhuaban"></use>
      </svg>
    </router-link>
    <el-breadcrumb class="bread-crumb" separator="/">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item v-for="item in paths" :key="item.path">
          <router-link :to="item.path">{{ item.meta.title }}</router-link>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<script>
/*
@author        qiang
@name          BreadCrumb
@desc          顶部面包屑导航
@props        
@emit
*/
export default {
  name: "BreadCrumb",
  computed: {
    paths() {
      const matched = this.$route.matched.filter(
        (item) => item.meta && item.meta.title
      );
      return matched.filter((item) => item.meta && item.meta.title);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/variables.scss";

.app-bread-crumb {
  position: absolute;
  z-index: 1;
  width: 100%;
  padding-top: 50px;
  display: flex;
  box-sizing: border-box;
  // margin-bottom: 20px;
  height: 104px;
  align-items: center;
  justify-content: flex-end;
  padding-right: 20px;
  .app-home {
    color: #fff;
    display: flex;
    font-size: 14px;
    margin-right: 5px;
    &:hover {
      color: $--color-primary;
    }
  }
  &::v-deep {
    .router-link-active {
      height: 14px;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #fff;
      &:hover {
        color: $--color-primary;
      }
    }
    .el-breadcrumb__separator {
      margin: 0 5px;
      color: #fff;
    }
    .el-breadcrumb__item:last-child .el-breadcrumb__inner a {
      color: $--color-primary;
    }
  }
}
</style>
