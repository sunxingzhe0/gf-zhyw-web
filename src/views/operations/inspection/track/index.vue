<template>
  <div class="page-track">
    <div class="page-track-title">
      轨迹查询
    </div>
    <div class="page-track-body">
      <el-form>
        <el-form-item label="巡检人员">
          <el-select v-model="userId" placeholder="请选择 >">
            <el-option
              v-for="(item, index) in users"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="巡检时间">
          <el-date-picker
            align="right"
            v-model="times"
            :clearable="false"
            type="datetimerange"
            end-placeholder="请选择 >"
            :class="{ 'has-val': times.length }"
            value-format="yyyy-MM-dd HH:mm:ss"
            :default-time="['00:00:00', '23:59:59']"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item class="last">
          <el-button
            type="text"
            class="submit"
            @click="search"
            :loading="loading"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
/*
@author        qiang
@name          OperationsInspectionTrack
@desc          轨迹查询
@props
@emit
*/
import inspection from "@/api/operations/inspection";
export default {
  name: "OperationsInspectionTrack",
  meta: {
    title: "巡检轨迹",
    hideMenu: true,
  },
  data() {
    return {
      users: [],
      times: [],
      userId: "",
      loading: false,
    };
  },
  mounted() {
    this.getUserList();
  },
  methods: {
    async getUserList() {
      this.users = await inspection.track.getUserList();
    },
    async search() {
      if (!this.userId) {
        return this.$message.error("请选择巡检人员！");
      }
      if (!this.times.length) {
        return this.$message.error("请选择巡检时间！");
      }
      this.loading = true;
      setTimeout(() => {
        this.$message.info("暂无数据");
        this.loading = false;
      }, 1500);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/variables.scss";
.page-track {
  padding: 15px 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.3);
}
.page-track-title {
  height: 16px;
  font-size: 16px;
  font-weight: bold;
  font-family: PingFang SC;
  color: #ffffff;
}
.page-track-body {
  width: 380px;
  padding: 0 10px;
  margin-top: 15px;
  background: rgba(51, 51, 51, 0.6);
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
  &::v-deep {
    .el-form-item {
      margin: 0;
      height: 34px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    }
    .el-form-item__label {
      width: 56px;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #ffffff;
      padding: 0;
      flex-shrink: 0;
      line-height: 32px;
    }
    .el-form-item__content {
      flex: 1;
      line-height: 32px;
    }
    .last {
      border: none;
      .el-form-item__content {
        text-align: center;
      }
    }
    .el-select {
      display: block;
      .el-input__inner {
        padding-right: 0;
      }
    }
    .el-date-editor--datetimerange {
      display: block;
      width: 100%;
      padding: 0;
    }
    .el-input__inner {
      height: 32px;
      border: none;
      text-align: right;
      line-height: 32px;
      background: transparent;
    }
    .el-range-input {
      width: 44%;
      color: #fff;
      padding-right: 0;
      text-align: right;
    }
    .el-range-separator {
      color: rgb(192 196 204);
    }
    .el-icon-time,
    .el-input__suffix,
    .el-range__close-icon {
      display: none;
    }
    .el-range-separator {
      opacity: 0;
    }
    .has-val .el-range-separator {
      opacity: 1;
    }
  }
  .submit {
    padding: 0;
    height: 32px;
    cursor: pointer;
    color: $--color-primary;
    &:hover {
      color: $--color-primary-light-1;
    }
    &.is-loading:before {
      background: transparent;
    }
  }
}
</style>
