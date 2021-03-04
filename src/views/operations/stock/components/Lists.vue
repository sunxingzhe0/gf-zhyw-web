<!-- @format -->

<template>
  <div class="lists currency-card-list">
    <slot></slot>
    <!-- <div class="item" v-for="(item, index) in lists" :key="index">
      <div class="content">
        <div class="left">
          <div class="status item-icon">
            <svg class="iconfont" aria-hidden="true">
              <use xlink:href="#iconwuziguanli"></use>
            </svg>
          </div>
        </div>
        <div class="right">
          <div class="top">
            <div class="title">{{ item.name }}({{ item.model }})</div>
          </div>
          <el-row class="msgs">
            <el-col
              :span="citem.span"
              class="msg-item"
              v-for="(citem, cindex) in contents"
              :key="cindex"
            >
              {{ citem.title }}：{{ item[citem.key] }}</el-col
            >
          </el-row>
        </div>
      </div>
      <div class="bottom">
        <el-button type="text">编辑</el-button>
      </div>
    </div> -->
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss">
.currency-card-list {
  padding: 20px;
  min-height: 100px;
  padding-bottom: 48px;
  // &::v-deep {
  .currency-card-item {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    background: rgba(51, 51, 51, 0.6);
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
    cursor: pointer;
    .currency-item-content {
      display: flex;
    }
    .currency-item-content-left {
      flex-shrink: 0;
    }
    .currency-item-icon {
      width: 36px;
      height: 36px;
      background: #0071e3;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
    }
    .currency-item-right {
      padding-left: 10px;
      width: 100%;
    }
    .currency-item-top {
      font-size: 14px;
      color: #ffffff;
      line-height: 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .currency-item-msgs {
      padding: 5px 0px;
      color: #b3b3b3;
      font-size: 12px;
      line-height: 22px;
    }
    // .msg-item{
    //   overflow: hidden;
    //   text-overflow: ellipsis;
    //   white-space: nowrap;
    // }
    .currency-item-bottom {
      text-align: center;
      font-size: 12px;
      color: #0071e3;
      padding-top: 10px;
      line-height: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-top: 1px solid hsla(0, 0%, 100%, 0.2);
      // ::v-deep {
      .el-divider {
        background-color: rgba(255, 255, 255, 0.2);
      }
      .el-button--text {
        width: 50%;
        height: 12px;
        padding: 0;
        line-height: 12px;
        font-size: 12px;
      }
      // }
    }
  }
  // }
}
</style>
