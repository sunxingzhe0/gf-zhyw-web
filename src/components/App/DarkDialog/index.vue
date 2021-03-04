<template>
  <el-dialog
    class="DarkDialog"
    :visible.sync="value.dialogVisible"
    v-bind="value.binds"
    :close-on-click-modal="false"
    @close="
      (val) => {
        $emit('close', val);
      }
    "
  >
    <!-- 四个角的样式 -->
    <div class="dialog-border top-left"></div>
    <div class="dialog-border top-right"></div>
    <div class="dialog-border bottom-left"></div>
    <div class="dialog-border bottom-right"></div>
    <!-- 内容插槽 -->
    <div class="dark-dialog-body"><slot></slot></div>
  </el-dialog>
</template>

<script>
/* 
@author     dusheng
@name       DarkDialog
@desc       黑色风格弹窗
@props      value  object  v-model
                dialogVisible  Boolean  是否显示弹窗
                binds   object  自定义attr
@emit       none
@slot       内部插槽
*/

export default {
  name: "DarkDialog",
  props: ["value"],
  computed: {},
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/variables.scss";
.DarkDialog {
  &::v-deep {
    .el-dialog {
      background-color: rgba(0, 0, 0, 0.9);
      width: 1200px;
      .el-dialog__header {
        // background-color: rgba(0, 0, 0, 0.9);
        padding: 12px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid rgba(255, 255, 255, 0.3);
        .el-dialog__title {
          color: #fff;
          font-size: 16px;
          position: relative;
          z-index: 1;
        }
        .el-dialog__headerbtn {
          width: 24px;
          height: 24px;
          background-color: rgba(255, 255, 255, 0.1);
          position: relative;
          z-index: 1;
          top: 0;
          right: 0;
        }
      }
      .el-dialog__body {
        padding: 0;
        .dark-dialog-body {
          width: 100%;
          min-height: 240px;
          position: relative;
          z-index: 1;
        }
      }
      .dialog-border {
        width: 120px;
        height: 120px;
        position: absolute;
        background: url("~@/assets/img/liner-border.png");
        background-size: 100% 100%;
        z-index: 0;
      }
      .top-left {
        left: -1px;
        top: -1px;
      }
      .top-right {
        right: -1px;
        top: -1px;
        transform: rotateZ(90deg);
      }
      .bottom-left {
        left: -1px;
        bottom: -1px;
        transform: rotateZ(270deg);
      }
      .bottom-right {
        right: -1px;
        bottom: -1px;
        transform: rotateZ(180deg);
      }
    }
  }
}
.dialog-680 {
  &::v-deep {
    .el-dialog {
      width: 680px;
    }
  }
}
</style>
