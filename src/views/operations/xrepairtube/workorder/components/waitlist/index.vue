<template>
  <div class="lists">
    <div
      class="item"
      v-for="(item, index) in listData"
      :key="index"
      @click="handleSubmit(item)"
    >
      <div class="top">
        <div class="title">{{ item.title }}</div>
        <div class="status-name">{{ item.stateName }}</div>
      </div>
      <div class="content">
        <div class="left">
          <div class="status item-icon">
            <svg class="iconfont" aria-hidden="true">
              <use xlink:href="#icondanzi"></use>
            </svg>
          </div>
        </div>
        <div class="right">
          <div class="msg">
            <p class="name">
              <span>{{ item.name }}</span>
              <span>来源:{{ item.source }}</span>
            </p>
            <p class="time">登记时间：{{ item.createTime }}</p>
          </div>
        </div>
      </div>
      <div class="bottom">
        <span v-for="val in item.btns" :key="val">{{ val }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["listData"],
  data() {
    return {};
  },
  methods: {
    handleSubmit(item) {
      this.$emit("showOrderInfo", item);
    },
  },
};
</script>
<style lang="scss" scoped>
.lists {
  min-height: 100px;
  .item {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    background: rgba(51, 51, 51, 0.6);
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
    cursor: pointer;
    .top {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      color: #ffffff;
      line-height: 14px;
    }
    .content {
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      border-top: 1px solid rgba(255, 255, 255, 0.2);
      display: flex;
      margin-top: 10px;
    }
    .left {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      .item-icon {
        width: 36px;
        height: 36px;
        background: #0071e3;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
      }
    }
    .right {
      padding-left: 10px;
      width: 100%;

      .msg {
        font-size: 12px;
        p {
          margin: 8px 0;
        }
        .name {
          display: flex;
          justify-content: space-between;
          span:first-child {
            font-size: 14px;
          }
          span:last-child {
            color: #a7a4a5;
          }
        }
        .time {
          color: #a7a4a5;
        }
      }
    }
    .bottom {
      text-align: center;
      font-size: 12px;
      color: #0071e3;
      padding-top: 10px;
      line-height: 12px;
      display: flex;
      justify-content: center;
      span {
        padding: 0 32px;
        border-right: 1px solid rgba(255, 255, 255, 0.2);
      }
      span:nth-child(2) {
        color: #9c34f5;
      }
      span:nth-child(3) {
        color: #da9102;
      }
      span:nth-child(4) {
        color: #1297a3;
      }
      span:last-child {
        border-right: none;
      }
    }
  }
}
</style>
