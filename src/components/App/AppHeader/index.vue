<template>
  <div class="app-header">
    <div class="header-left">
      <div class="app-logo">
        <img src="@/assets/img/logo.png" alt="" />
      </div>
      <div class="app-company">
        {{ companyName }}
      </div>
    </div>
    <div class="header-center">
      {{ appName }}
      <div class="bottom bottom-left"></div>
      <div class="bottom bottom-right"></div>
    </div>
    <div class="header-right">
      <div class="app-home">
        <svg class="iconfont" aria-hidden="true">
          <use xlink:href="#iconxiaoxi"></use>
        </svg>
      </div>
      <div class="app-home">
        <svg
          class="iconfont"
          aria-hidden="true"
          style="width:25px;height:25px;font-size:25px;flex-shrink:0"
        >
          <use xlink:href="#iconbaojing"></use>
        </svg>
      </div>
      <div class="app-user">
        <div class="app-avatar">
          <img src="@/assets/img/avatar.png" alt="" />
        </div>
        <div class="user-name">
          赵飞燕（ADMIN）
        </div>
      </div>
      <div class="arrow-down">
        <i class="el-icon-arrow-down"></i>
      </div>
    </div>
  </div>
</template>
<script>
/*
@author        qiang
@name          AppHeader
@desc          顶部工具栏
@props      
@emit
*/
import { appName, companyName } from "@/config";

export default {
  name: "AppHeader",
  data() {
    return {
      appName,
      companyName,
    };
  },
};
</script>
<style lang="scss" scoped>
.app-header {
  width: 100%;
  height: 50px;
  flex-shrink: 0;
  display: flex;
  // padding: 0 20px;
  align-items: center;
  background: rgba(51, 51, 51, 0.3);
  justify-content: space-between;
  position: relative;
  z-index: 2;
}
.header-left {
  display: flex;
  align-items: center;
  background: url("~@/assets/img/header-left.png");
  background-size: 100% 100%;
  height: 100%;
  width: 217px;
  padding-left: 20px;
  .app-logo {
    width: 20px;
    height: 20px;
    margin-right: 7px;
    img {
      width: 20px;
      height: 20px;
    }
  }
  .app-company {
    font-size: 14px;
    font-family: Source Han Sans CN;
    font-weight: 500;
    color: #ffffff;
    line-height: 20px;
  }
  .app-name {
    height: 20px;
    background: #ddf8fa;
    border: 1px solid #0071e3;
    border-radius: 4px;
    line-height: 10px;
    font-size: 10px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #0071e3;
    padding: 5px 10px;
    margin-right: 20px;
  }
  .app-back {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 1px solid #e7e7e7;
    display: flex;
    color: #6b6b6b;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    cursor: pointer;
  }
}
.header-center {
  height: 100%;
  font-size: 24px;
  line-height: 50px;
  font-family: PingFang SC;
  font-weight: bold;
  text-align: center;
  position: relative;
  color: #fff;
  width: 320px;
  .bottom {
    width: 160px;
    height: 2px;
    position: absolute;
    bottom: 0;
  }
  .bottom-left {
    background: linear-gradient(-90deg, #0071e3 0%, rgba(0, 113, 227, 0) 100%);
    left: 0;
  }
  .bottom-right {
    background: linear-gradient(90deg, #0071e3 0%, rgba(0, 113, 227, 0) 100%);
    right: 0;
  }
}
.header-right {
  display: flex;
  align-items: center;
  width: 303px;
  height: 50px;
  background: url("~@/assets/img/header-right.png");
  background-size: 100% 100%;
  padding-right: 20px;
  padding-left: 41px;
  .iconfont {
    color: #fff;
  }
  .app-home {
    width: 20px;
    height: 20px;
    font-size: 20px;
    margin-right: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  .app-user {
    display: flex;
    align-items: center;
    height: 50px;
    font-size: 14px;
    color: #fff;
    .user-name {
      width: 106px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .arrow-down {
    margin-left: 5px;
    font-size: 10px;
    color: #fff;
  }
  .app-avatar {
    margin-right: 10px;
    width: 30px;
    height: 30px;
    img {
      width: 30px;
      height: 30px;
    }
  }
  .app-logout {
    font-size: 20px;
    cursor: pointer;
    margin-left: 40px;
  }
}
</style>
