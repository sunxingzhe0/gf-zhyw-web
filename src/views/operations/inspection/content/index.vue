<template>
  <div class="page-content">
    <CardList
      title="巡检内容"
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
/*
@author        qiang
@name          OperationsInspectionContent
@desc          巡检内容（管理）
@props          
@emit
*/
import { CardList } from "@/components/App";
import inspection from "@/api/operations/inspection";
import { InspectTypes } from "@/views/operations/constant";
export default {
  name: "OperationsInspectionContent",
  meta: {
    title: "巡检内容",
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
      ],
      headerBtns: [
        {
          text: "新增",
          onClick: this.showEditor,
        },
      ],
      fetcher: inspection.content.getContentList,
    };
  },
  methods: {
    renderFunc(item) {
      return (
        <div class="card-item plan-item">
          <div class="card-content">
            <div class="card-icon">
              <svg class="iconfont" aria-hidden="true">
                <use xlinkHref="#iconxunjianneirong"></use>
              </svg>
            </div>
            <div class="card-infos">
              <div class="card-info">
                <span class="card-title" title={item.name}>
                  {item.name}
                </span>
              </div>
              <div class="card-info">
                适用类型：
                {item.type.map((_item) => InspectTypes[_item]).join("、")}
              </div>
              <div class="card-info info-content">
                <div class="content-label">{item.content}：</div>
                {this.renderContent(item)}
              </div>
              <div class="card-info">当前使用：{item.useCount}</div>
              <div class="card-info">创建时间：{item.createdTime}</div>
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
    renderContent(item) {
      if (item.ways === "input") {
        return item.value;
      } else {
        const ranges = item.ranges.split(",");
        return (
          <el-radio-group value={item.value}>
            {ranges.map((_item) => (
              <el-radio label={_item}>{_item}</el-radio>
            ))}
          </el-radio-group>
        );
      }
    },
    showEditor(id = "") {
      this.$router.push("/operations/inspection/content/edit?contentId=" + id);
    },
    showDetail(id) {
      this.$router.push(
        "/operations/inspection/content/detail?contentId=" + id
      );
    },
    async delItem(id) {
      try {
        const confirm = await this.$confirm("您确认要删除吗？", {
          type: "warning",
        });
        if (confirm === "confirm") {
          await inspection.content.delContent(id);
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
.page-content {
  &::v-deep {
    .card-list {
      .el-input {
        width: 140px;
      }
      .el-button {
        width: 54px;
        height: 28px;
        margin-left: 10px;
      }
      .el-input__inner {
        padding-left: 8px;
      }
      .info-content {
        justify-content: flex-start;
      }
      .content-label {
        white-space: nowrap;
        float: left;
      }
      .el-radio {
        margin-right: 0;
        white-space: unset;
        display: flex;
      }
      .el-radio__inner {
        width: 12px;
        height: 12px;
        height: 12px;
        margin-top: 2px;
        background-color: transparent;
      }
      .el-radio__label {
        font-size: 12px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #ffffff;
        line-height: 16px;
        margin-bottom: 4px;
        white-space: unset;
        padding-left: 5px;
        border-color: #999999;
      }
    }
  }
}
</style>
