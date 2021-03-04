<template>
  <div class="navs">
    <div
      class="nav-item"
      :class="activeRouter == item.path ? 'active' : ''"
      v-for="(item, index) in navs"
      :key="index"
      @click="linkTo(item.path)"
    >
      <div class="nav-overlay">
        <div class="navs-item-icon">
          <svg
            class="iconfont"
            aria-hidden="true"
            :style="
              'color:' +
                item.color +
                ';width:' +
                item.size +
                ';height:' +
                item.size
            "
          >
            <use v-bind="{ 'xlink:href': item.icon }"></use>
          </svg>
        </div>
        <div class="name">{{ item.text }}</div>
      </div>
    </div>
  </div>
</template>
<script>
/*
@author     dusheng
@name       RightNavs
@desc       右侧导航菜单
@props      navs  Array  
              {
                path:"",  路径
                icon:"",  图标 iconfont的码
                text:"",  文本
                color:"",  图标颜色
              }
@emit       none
*/
export default {
  name: "RightNavs",
  props: ["navs"],
  computed: {
    activeRouter() {
      return this.navs.find((nitem) => {
        return this.$route.matched
          .map((item) => item.path)
          .includes(nitem.path);
      })?.path;
    },
  },
  methods: {
    linkTo(link) {
      this.$router.push(link);
    },
  },
};
</script>
<style lang="scss" scoped>
.navs {
  display: flex;
  flex-wrap: wrap;
  padding: 0 2%;
  // justify-content: space-around;
  .nav-item {
    width: 22%;
    flex-shrink: 0;
    height: 110px;
    cursor: pointer;
    color: #fff;
    font-size: 14px;
    line-height: 14px;
    margin-right: 4%;
    .nav-overlay {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      flex-flow: column;
      padding-top: 20px;
    }
    .name {
      padding-top: 10px;
    }
    .navs-item-icon {
      width: 46px;
      height: 46px;
      background: #4d4d4d;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      .iconfont {
        width: 23px;
        height: 23px;
        font-size: 23px;
      }
    }
  }
  .nav-item:nth-child(4n) {
    margin-right: 0px;
  }
  .nav-item.active {
    background: linear-gradient(0deg, #0071e3 0%, rgba(0, 113, 227, 0) 100%);
    color: #0071e3;
    .nav-overlay {
      background: rgba(26, 26, 26, 0.8);
    }
    .navs-item-icon {
      background: #0071e3;
      .iconfont {
        color: #fff !important;
      }
    }
  }
}
</style>
