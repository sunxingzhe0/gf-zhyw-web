<template>
  <AppDialog router :show="show" title="巡检内容详情">
    <el-form class="app-dialog-form" v-loading="loading">
      <div class="form-row">
        <el-form-item
          :label="(item.ways === 'input' ? '[输入]' : '[选择]') + item.name"
        ></el-form-item>
        <el-form-item label="适用类型：">{{
          (item.type || []).map((key) => types[key]).join("、")
        }}</el-form-item>
        <el-form-item label="巡检内容：">
          {{ item.content }}
        </el-form-item>
      </div>
      <div class="form-row full" v-if="item.ways === 'select'">
        <el-form-item class="full" label="内容数值：">
          <el-radio-group>
            <el-radio
              v-for="(_item, _index) in rangeArr"
              :label="_item"
              :key="_index"
            >
              {{ _item }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
      </div>
      <div class="form-row">
        <el-form-item :label="'当前使用：' + item.useCount"></el-form-item>
        <el-form-item :label="'创建人：' + item.creatorName"></el-form-item>
        <el-form-item :label="'创建时间：' + item.createdTime"></el-form-item>
      </div>
    </el-form>
  </AppDialog>
</template>
<script>
/*
@author        qiang
@name          ContentDetail
@desc          巡检内容详情
@query         contentId    string    巡检内容id
@props
@emit
*/
import { AppDialog } from "@/components/App";
import inspection from "@/api/operations/inspection";
export default {
  name: "ContentDetail",
  components: {
    AppDialog,
  },
  data() {
    return {
      item: {
        name: "",
        type: "",
        ways: "",
        ranges: "",
        content: "",
        useCount: "",
        creatorName: "",
        createdTime: "",
      },
      show: false,
      rangeArr: [],
      contentId: "",
      loading: false,
      types: {
        site: "现场巡检",
        device: "设备巡检",
      },
    };
  },
  mounted() {
    this.contentId = this.$route.query.contentId;
    this.show = true;
    this.init();
  },
  methods: {
    async init() {
      try {
        this.loading = true;
        this.item = await inspection.content.getContentDetail(this.contentId);
        if (this.item.ways === "select") {
          this.rangeArr = this.item.ranges.split(",");
        }
        this.loading = false;
      } catch (e) {
        this.loading = false;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.app-dialog-form .form-row {
  width: 100%;
  display: flex;
  padding: 0 20px;
  margin-top: 15px;
  .el-form-item {
    width: 33.3%;
    display: flex;
    margin-bottom: 0;
    align-items: center;
    &.full {
      width: 100%;
      align-items: unset;
      padding-left: 10px;
      background: #323232;
      &::v-deep {
        .el-form-item__content {
          width: 1053px;
        }
      }
    }
  }
  &::v-deep {
    .el-form-item__label {
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #ffffff;
      line-height: 32px;
      padding-right: 0;
      text-align: left;
      padding-left: 12px;
      position: relative;
    }
    .el-form-item__content {
      line-height: 32px;
      color: #ffffff;
    }
    .el-radio {
      float: left;
      color: #fff;
      margin-left: 10px;
    }
    .el-radio__inner {
      background: transparent;
      border-color: #999999;
    }
  }
}
</style>
