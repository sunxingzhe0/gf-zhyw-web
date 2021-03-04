<template>
  <div class="page-plan">
    <CardList
      title="巡检计划"
      :params="params"
      :fetcher="fetcher"
      :renderFunc="renderFunc"
      :headerBtns="headerBtns"
    >
    </CardList>
    <router-view></router-view>
  </div>
</template>
<script>
import { CardList } from "@/components/App";
import inspection from "@/api/operations/inspection";
export default {
  name: "OperationsInspectionPlan",
  meta: {
    title: "巡检计划",
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
          },
          key: "level",
          options: [
            { label: "高", value: "3" },
            { label: "中", value: "2" },
            { label: "低", value: "1" },
          ],
          component: "el-select",
        },
        {
          elAttrs: {
            size: "mini",
            placeholder: "关键字搜索",
            "suffix-icon": "el-icon-search",
          },
          key: "keyword",
          component: "el-input",
        },
      ],
      headerBtns: [
        {
          text: "新增",
          onClick: this.showEdit,
        },
      ],
      fetcher: inspection.plan.getPlanList,
    };
  },
  methods: {
    renderFunc(item) {
      return (
        <div class="card-item plan-item">
          <div class="card-content">
            <div class="card-icon">
              <svg class="iconfont" aria-hidden="true">
                <use xlinkHref="#iconxunjianjihua"></use>
              </svg>
            </div>
            <div class="card-infos">
              <div class="card-info">
                <span class="card-title" title={item.name}>
                  {item.name}
                </span>
                <span>{item.createdTime}</span>
              </div>
              <div class="card-info">
                <span>级别：{this.levelFilter(item.level)}</span>
                <span>巡检点：{item.points}个</span>
              </div>
            </div>
          </div>
          <div class="card-footer">
            <span onClick={() => this.showEdit(item.id)}>编辑</span>
            <span onClick={() => this.showDetail(item.id)}>详情</span>
          </div>
        </div>
      );
    },
    levelFilter(val) {
      switch (val) {
        case 1:
          return "低";
        case 2:
          return "中";
        case 3:
          return "高";
      }
    },
    showEdit(id = "") {
      this.$router.push("/operations/inspection/plan/edit?planId=" + id);
    },
    showDetail(id) {
      this.$router.push("/operations/inspection/plan/detail?planId=" + id);
    },
  },
};
</script>
<style lang="scss" scoped>
.page-plan {
  &::v-deep {
    .el-select {
      width: 80px;
      .el-input {
        width: 100%;
        margin-left: 0;
      }
    }
    .el-input {
      width: 140px;
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
  }
}
</style>
