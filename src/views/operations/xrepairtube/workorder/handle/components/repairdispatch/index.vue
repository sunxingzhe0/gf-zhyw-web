<template>
  <div class="repair-dispatch">
    <div class="msg">
      <h2 class="title">基本信息</h2>
      <el-row>
        <el-col v-for="(item, index) in lists" :key="index" :span="item.span">
          <span>{{ item.name ? item.name + "：" : "" }}</span>
          <span>{{ basicInfo[item.key] }}</span>
        </el-col>
      </el-row>
    </div>
    <div class="orderInfo">
      <h2 class="title other">工单信息</h2>
      <el-form :model="formDatas" ref="formDatas" label-width="100px">
        <el-form-item
          label="选择工单："
          :rules="[{ required: true, message: '请输入内容', trigger: 'blur' }]"
          class="lable"
          prop="searchText"
        >
          <el-input
            size="small"
            placeholder="请输入关键字搜索"
            style="width:400px"
            v-model="formDatas.searchText"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lists: [
        {
          name: "姓名",
          key: "name",
          span: 8,
        },
        {
          name: "维修班组",
          key: "group",
          span: 8,
        },
        {
          name: "工号",
          key: "workCode",
          span: 8,
        },
        {
          name: "联系电话",
          key: "tel",
          span: 8,
        },
        {
          name: "未完成工单",
          key: "nocomplete",
          span: 8,
        },
        {
          name: "综合评分",
          key: "score",
          span: 8,
        },
      ],
      basicInfo: {
        name: "方星剑",
        group: "攻城部一组",
        workCode: "00585452",
        tel: "457812452",
        nocomplete: "10 / 99",
        score: "5",
      },
      formDatas: {
        searchText: "",
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.repair-dispatch {
  padding: 20px;
  color: #fff;
  .other {
    margin-top: 20px;
  }
  h2 {
    margin: 0;
    border-left: 2px solid #0470e3;
    font-size: 16px;
    line-height: 16px;
    text-indent: 10px;
  }
  .msg {
    .el-row {
      color: #e6e6e6;
      .el-col {
        margin-top: 20px;
      }
    }
  }
}
</style>
