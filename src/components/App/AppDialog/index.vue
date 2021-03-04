<template>
  <el-dialog
    :title="title"
    v-if="dialogShow"
    class="app-dialog"
    :width="dialogWidth"
    @close="closeHandler"
    :visible.sync="dialogShow"
    :close-on-click-modal="false"
    v-bind="elAttrs"
  >
    <!-- 四个角的样式 -->
    <div class="dialog-border top-left"></div>
    <div class="dialog-border top-right"></div>
    <div class="dialog-border bottom-left"></div>
    <div class="dialog-border bottom-right"></div>
    <!-- 内容插槽 -->
    <div class="app-dialog-body"><slot></slot></div>
  </el-dialog>
</template>
<script>
/* 
@author     qiang
@name       AppDialog
@desc       App风格弹窗
@props      
            value     boolean             是否显示，支持.sync修饰符
            title     string              弹窗标题
            width     string|number[1200] 弹窗宽度
            router    boolean             是否路由模式，路由模式关闭返回
            elAttrs   object              element-ui dialog自定义参数
@emit       close                         关闭弹窗的回调
@slot       内部插槽
*/
export default {
  name: "AppDialog",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    width: {
      type: [String, Number],
      default: 1200,
    },
    router: {
      type: Boolean,
      default: false,
    },
    elAttrs: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    dialogShow: {
      get() {
        return this.show;
      },
      set() {
        if (this.router) {
          this.$router.back();
        } else {
          this.$emit("update:show", false);
        }
      },
    },
    dialogWidth() {
      if (typeof this.width === "string") {
        return "";
      } else {
        return "";
      }
    },
  },
  methods: {
    closeHandler() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/variables.scss";
.app-dialog {
  &::v-deep {
    .el-dialog {
      background-color: rgba(0, 0, 0, 0.9);
      margin: 0 auto;
      width: 1200px;
    }
    .el-dialog__header {
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
      .app-dialog-body {
        z-index: 1;
        width: 100%;
        overflow: hidden;
        max-height: 70vh;
        position: relative;
        padding-bottom: 20px;
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
    .base-table {
      max-height: inherit;
    }
  }
}
</style>
