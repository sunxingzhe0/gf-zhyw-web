<template>
  <el-row class="content">
    <el-col
      class="item"
      v-for="(item, index) in lists"
      :key="index"
      :span="item.span"
    >
      <span class="title">{{ item.name }}{{ item.name ? "：" : "" }}</span
      >{{ maintenance[item.key] }}
    </el-col>
    <!-- 报修内容 -->
    <el-col class="item" :span="24">
      <div class="title">报修内容：</div>
      <div class="content-list">
        <div class="add">+添加</div>
        <div
          class="list-item"
          v-for="val in maintenance.repairContent"
          :key="val.content"
        >
          <div class="time">
            {{ val.time }}
            <div class="circular"></div>
          </div>

          <div class="content">
            <div class="text">{{ val.content }}</div>
            <div class="img-box">
              <el-image
                v-for="item in val.imgs"
                :key="item"
                class="img-list"
                :src="item"
                :preview-src-list="[item]"
              ></el-image>
            </div>
          </div>

          <div class="icons">
            <div class="edit">+</div>
            <div class="del">-</div>
          </div>
        </div>
      </div>
    </el-col>
    <!-- ----------- -->
    <el-col class="item" :span="8">
      <div class="title">评价内容：</div>
      <div class="rate-text">非常满意</div>
      <div class="rate-text">{{ maintenance.star }}</div>
      <el-rate
        disabled
        v-model="maintenance.star"
        style="margin-top:3px"
      ></el-rate>
    </el-col>
    <el-col class="item" :span="8">
      <div class="title">{{ maintenance.commentTime }}</div>
    </el-col>
    <el-col class="item" :span="24">
      <div class="title" style="opacity:0">报修内容：</div>
      <div class="title">非常好,我非常满意</div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  props: ["maintenance"],
  data() {
    return {
      lists: [
        {
          name: "执行人",
          key: "executor",
          span: 8,
        },
        {
          name: "所属部门",
          key: "department",
          span: 8,
        },
        {
          name: "协助人1",
          key: "helpersOne",
          span: 8,
        },
        {
          name: "所属部门",
          key: "departmentOne",
          span: 8,
        },
        {
          name: "协助人2",
          key: "helpersTwo",
          span: 8,
        },
        {
          name: "所属部门",
          key: "departmentTwo",
          span: 8,
        },
        {
          name: "维修时间",
          key: "repairTime",
          span: 24,
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.content {
  font-size: 14px;
  line-height: 24px;
  margin-top: -10px;
  padding: 20px;
  .item {
    display: flex;
    padding: 5px 0;
    .title {
      flex-shrink: 0;
      display: inline-block;
    }
    .content-list {
      .add {
        color: #0071e3;
      }
      .list-item {
        display: flex;
        .time {
          margin-left: 20px;
          border-right: 2px solid rgba($color: #fff, $alpha: 0.2);
          margin-right: 20px;
          padding-right: 20px;
          position: relative;
          .circular {
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: #373737;
            position: absolute;
            top: 0;
            right: -9px;
          }
        }
        .content {
          margin-top: 1px;
          padding: 20px;
          background: #161617;
          width: 600px;
          .img-box {
            display: flex;
            margin-top: 20px;
            .img-list {
              width: 74px;
              height: 74px;
              margin-right: 10px;
            }
          }
        }
        .icons {
          margin-top: 1px;
          > div {
            width: 30px;
            height: 30px;
            background: #161617;
            margin-left: 3px;
            margin-bottom: 3px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
      }
    }
    .rate-text {
      color: #f7ba2a;
      padding-right: 20px;
    }
    .img-list {
      display: flex;
    }
    .content-image {
      margin-right: 10px;
      width: 74px;
      height: 74px;
      border: 1px solid #0071e3;
      .el-image {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
