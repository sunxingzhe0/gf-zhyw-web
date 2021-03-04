<template>
  <InnerView>
    <H1>Wellcom to use Template!</H1>
    <router-link to="/template/readme">简介</router-link>
    <router-link to="/template/readme">组件</router-link>
    <router-link to="/template/readme">指令</router-link>
    <router-link to="/template/readme">过滤器</router-link>
    <router-link to="/template/readme">混淆</router-link>
    <router-link to="/template/readme">工具函数</router-link>
    <hr />
    <router-link to="/template/layout-ih">互联网医院布局模板</router-link>
    <router-link to="/template/layout-platform"
      >集成平台项目布局模板</router-link
    >
  </InnerView>
</template>

<script>
import { InnerView } from "@/components/Layout";
export default {
  name: "TemplateIndex",
  meta: {
    title: "模板首页"
  },
  components: {
    InnerView
  }
};
</script>
