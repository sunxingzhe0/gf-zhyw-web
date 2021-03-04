<template>
  <div class="page-point">
    <CardList
      title="巡检点"
      :params="params"
      ref="refCardList"
      :fetcher="fetcher"
      :renderFunc="renderFunc"
      :headerBtns="headerBtns"
    ></CardList>
    <router-view></router-view>
  </div>
</template>
<script>
import { CardList } from "@/components/App";
import inspection from "@/api/operations/inspection";
export default {
  name: "OperationsInspectionPoint",
  meta: {
    title: "巡检点",
    hideMenu: true,
  },
  components: {
    CardList,
  },
  data() {
    return {
      params: [
        {
          elAttrs: {
            size: "mini",
            placeholder: "关键字搜索",
            "suffix-icon": "el-icon-search",
          },
          key: "keyword",
          className: "keyword",
          component: "el-input",
        },
        {
          elAttrs: {
            type: "date",
            placeholder: "按照日期筛选",
            "suffix-icon": "el-icon-search",
          },
          key: "createdDate",
          component: "el-date-picker",
        },
      ],
      headerBtns: [
        {
          text: "新增",
          onClick: this.showEditor,
        },
      ],
      fetcher: inspection.point.getPointList,
    };
  },
  methods: {
    renderFunc(item) {
      return (
        <div class="card-item plan-item">
          <div class="card-content">
            <div class="card-icon">
              <svg class="iconfont" aria-hidden="true">
                <use xlinkHref="#iconxunjiandian"></use>
              </svg>
            </div>
            <div class="card-infos">
              <div class="card-info">
                <span class="card-title" title={item.code}>
                  {item.code}
                </span>
                <span>{item.createdTime}</span>
              </div>
              <div class="card-info">
                <span>{item.name}</span>
                <span>{item.buildingName + "，" + item.floorName}</span>
              </div>
            </div>
          </div>
          <div class="card-footer">
            <span onClick={() => this.showDetail(item.id)}>详情</span>
            <span onClick={() => this.showEditor(item.id)}>编辑</span>
            <span class="danger" onClick={() => this.delItem(item.id)}>
              删除
            </span>
          </div>
        </div>
      );
    },
    showEditor(id = "") {
      this.$router.push("/operations/inspection/point/edit?pointId=" + id);
    },
    showDetail(id) {
      this.$router.push("/operations/inspection/point/detail?pointId=" + id);
    },
    async delItem(id) {
      try {
        const confirm = await this.$confirm("您确认要删除吗？", {
          type: "warning",
        });
        if (confirm === "confirm") {
          await inspection.point.delPoint(id);
          this.$message.success("操作成功！");
          this.$refs.refCardList.loadData();
        }
      } catch (_) {
        // nothing
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.page-point {
  &::v-deep {
    .el-select {
      width: 80px;
      .el-input {
        width: 100%;
        margin-left: 0;
      }
    }
    .el-input {
      width: 120px;
      margin-left: 12px;
    }
    .el-button {
      width: 54px;
      height: 28px;
      margin-left: 10px;
    }
    .el-input__inner {
      padding-left: 8px;
    }
    .el-date-editor {
      .el-input__inner {
        height: 28px;
        font-size: 12px;
        line-height: 26px;
      }
      .el-input__suffix {
        display: flex;
        align-items: center;
      }
      .el-icon-date {
        display: none;
      }
      .el-input__icon::before {
        content: "\e778";
        font-family: element-icons !important;
        speak: none;
        font-style: normal;
        font-weight: 400;
        font-variant: normal;
        text-transform: none;
        line-height: 1;
        vertical-align: baseline;
        display: inline-block;
        -webkit-font-smoothing: antialiased;
      }
    }
    .gis-group {
      display: flex;
      .el-input {
        width: 50%;
        margin: 0;
      }
    }
  }
}
</style>
