<template>
  <div class="track">
    <div class="lists" v-for="(val, index) in trackList" :key="index">
      <div class="time">
        {{ val.time }}
        <div class="circular" :class="{ active: val.status == 1 }"></div>
      </div>

      <div class="content">
        <div
          class="title"
          @click="showMsg(val.status)"
          :class="{ isOpenClass: val.status == 1 }"
        >
          <span>{{ val.name }}</span>
          <div>
            <span>{{ val.statusName }}</span>
            <span class="icon" :class="{ rote: isopen }" v-if="val.status == 1"
              >v</span
            >
          </div>
        </div>

        <transition name="popup">
          <div class="msg" v-if="val.status == 1 && isopen">
            <p>{{ val.content.title }}</p>
            <div class="describe">{{ val.content.text }}</div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isopen: false,
      trackList: [
        {
          time: "2021-12-31 00:00:00",
          name: "张三",
          statusName: "发起工单",
          status: 0, //0 已执行 1 正在执行
          content: {
            title: "工单处理记录",
            text: "文字描述xxxxxxxxxxxxxx",
          },
        },
        {
          time: "2021-12-31 00:00:00",
          name: "张三",
          statusName: "派发工单",
          status: 0, //0 已执行 1 正在执行
          content: {
            title: "工单处理记录",
            text: "文字描述xxxxxxxxxxxxxx",
          },
        },
        {
          time: "2021-12-31 00:00:00",
          name: "张三",
          statusName: "接收工单",
          status: 0, //0 已执行 1 正在执行
          content: {
            title: "工单处理记录",
            text: "文字描述xxxxxxxxxxxxxx",
          },
        },
        {
          time: "2021-12-31 00:00:00",
          name: "张三",
          statusName: "任务进行中",
          status: 1, //0 已执行 1 正在执行
          content: {
            title: "工单处理记录",
            text: "文字描述xxxxxxxxxxxxxx",
          },
        },
      ],
    };
  },
  methods: {
    showMsg(val) {
      if (val == 1) {
        this.isopen = !this.isopen;
        console.log(val);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.track {
  padding: 20px;
  .lists {
    display: flex;
    .time {
      width: 260px;
      text-align: right;
      box-sizing: border-box;
      padding-right: 17px;
      border-right: 1px solid #333;
      margin-right: 25px;
      position: relative;
      .circular {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: #999999;
        position: absolute;
        top: 0px;
        right: -9px;
      }
      .active {
        background: #fff;
        border: 4.5px solid #0071e3;
        box-sizing: border-box;
      }
    }
    .content {
      width: 600px;
      background: #161616;
      margin-bottom: 20px;
      .title {
        display: flex;
        height: 52px;
        padding: 0 20px;
        align-items: center;
        justify-content: space-between;
        .icon {
          margin-left: 10px;
        }
        .rote {
          display: inline-block;
          transform: rotate(180deg);
        }
      }
      .isOpenClass {
        color: #0071e3;
        border-bottom: 1px solid rgba($color: #fff, $alpha: 0.3);
      }
      .msg {
        padding: 20px;
        p {
          margin: 0;
        }
        .describe {
          width: 560px;
          height: 126px;
          border: 1px solid #999;
          margin-top: 10px;
          background: rgba($color: #fff, $alpha: 0.1);
        }
      }

      .popup-enter-active,
      .popup-leave-active {
        transition: all 0.3s linear;
      }
      .popup-enter,
      .popup-leave-to {
        opacity: 0;
      }
    }
  }
  .lists:last-child {
    .content {
      margin-bottom: 0;
    }
  }
}
</style>
