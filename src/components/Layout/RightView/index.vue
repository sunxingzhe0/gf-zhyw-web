<template>
  <div class="right-view">
    <!-- <div class="in-right-view"> -->
      <slot></slot>
    <!-- </div> -->
  </div>
</template>
<script>
export const RightContentTitle = ({ props }) => {
  return <div class="right-content-title">{props.text}</div>;
};

export default {
  name: "rightView"
};
</script>
<style lang="scss" scoped>
.right-view {
  transition: all 0.8s cubic-bezier(0.55, 0, 0.1, 1);
  position: absolute;
  width: 420px;
  height: calc(100% - 20px - 52px);
  right: 0;
  top: 52px;
  background: rgba(26, 26, 26, 0.8);
  color: #fff;
  .in-right-view {
    // position: relative;
    width: 100%;
    height: 100%;
    // z-index: 1;
  }

  ::v-deep {
    .el-loading-mask {
      //loading背景颜色修改
      background-color: rgba(0, 0, 0, 0);
    }
    .right-content-title {
      height: 48px;
      font-size: 16px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.3);
      line-height: 48px;
      padding-left: 20px;
    }
  }
}

.right-view::before {
  content: "";
  width: 120px;
  height: 120px;
  position: absolute;
  left: -1px;
  top: -1px;
  background: url("~@/assets/img/liner-border.png");
  background-size: 100% 100%;
  z-index: 0;
}

.right-view::after {
  content: "";
  width: 2px;
  height: 300px;
  background: linear-gradient(0deg, #0071e3 0%, rgba(0, 113, 227, 0) 100%);
  position: absolute;
  left: -1px;
  top: 50%;
  margin-top: -150px;
  z-index: 0;
}
</style>
