<template>
  <InnerView class="page-inspection">
    <RightContentTitle text="巡检管理"></RightContentTitle>
    <div class="view-scroll-y">
      <RightNavs :navs="navs"></RightNavs>
      <router-view></router-view>
    </div>
  </InnerView>
</template>
<script>
import { Navs } from "./constant";
import { InnerView, RightContentTitle } from "@/components/Layout";
import RightNavs from "@/components/App/RightNavs";
export default {
  name: "OperationsInspection",
  components: { InnerView, RightNavs, RightContentTitle },
  meta: {
    sort: 2,
    title: "巡检管理",
    redirect: "/operations/inspection/plan",
  },
  data() {
    return {
      navs: Navs,
    };
  },
};
</script>
<style lang="scss">
@import "@/assets/css/variables.scss";
.page-inspection {
  .content-header {
    height: 48px;
    display: flex;
    padding: 10px 20px;
    justify-content: space-between;
    border-top: 1px solid rgba(255, 255, 255, 0.3);
    .header-left {
      font-size: 16px;
      line-height: 28px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #ffffff;
    }
    .header-right {
      display: flex;
    }
  }
  .content-body {
    min-height: 100px;
    margin-bottom: 48px;
    padding: 10px 20px 20px;
    .list-item {
      margin-bottom: 20px;
      padding: 10px 10px 0;
      background: rgba(51, 51, 51, 0.6);
      box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
      &:last-child {
        margin-bottom: 0;
      }
    }
    .item-content {
      display: flex;
      margin-bottom: 10px;
    }
    .item-icon {
      width: 36px;
      height: 36px;
      background: $--color-primary;
      border-radius: 50%;
      margin-right: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 18px;
      flex-shrink: 0;
    }
    .item-infos {
      flex: 1;
    }
    .item-info {
      display: flex;
      font-size: 12px;
      line-height: 14px;
      margin-top: 10px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #b3b3b3;
      justify-content: space-between;
      &:first-child {
        margin-top: 0;
      }
    }
    .item-title {
      height: 14px;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #ffffff;
      max-width: calc(100% - 80px);
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .item-footer {
      display: flex;
      font-size: 12px;
      font-family: PingFang SC;
      font-weight: 500;
      line-height: 34px;
      text-align: center;
      color: $--color-primary;
      border-top: 1px solid rgba(255, 255, 255, 0.2);
      span {
        flex: 1;
        cursor: pointer;
        text-align: center;
        position: relative;
        &:hover {
          color: $--color-primary-light-1;
        }
        &::before {
          content: "";
          position: absolute;
          width: 1px;
          height: 14px;
          background: rgba(255, 255, 255, 0.2);
          right: 0;
          top: 10px;
        }
      }
      .no-before {
        &::before {
          display: none;
        }
      }
      .danger {
        color: $--color-danger;
        &:hover {
          color: $--color-danger-light-1;
        }
      }
    }
  }
  .content-footer {
    position: absolute;
    bottom: 0;
    background: rgba(26, 26, 26, 1);
    padding: 10px;
    height: 48px;
    width: 100%;
    border-top: 1px solid rgba(255, 255, 255, 0.3);
  }
  .view-scroll-y {
    height: calc(100% - 48px);
    overflow-y: auto;
  }
  .page-point {
    display: flex;
    height: calc(100%);
    flex-direction: column;
    .content-body {
      flex: 1;
      overflow: hidden;
    }
  }
}
</style>
