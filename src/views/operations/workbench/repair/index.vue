<template>
  <div>
    <DarkMenu :navs="navs" 
      v-model="current"
      :noRouter="true"></DarkMenu>
      
    <router-view></router-view>
    <Register v-if="current == 'register'"></Register>
    <Voice v-if="current == 'voice'"></Voice>
    <Statistics v-if="current == 'statistics'"></Statistics>
  </div>
</template>
<script>
import Register from './components/register'
import Voice from './components/voice'
import Statistics from './components/statistics'
import { Navs } from "./constant";
import { DarkMenu } from "@/components/App";
export default {
  name: "OperationsWorkbenchRepair",
  meta: {
    sort: 3,
    title: "报修中心",
    keepAlive:true,
    hideMenu: true,
    // redirect: "/operations/workbench/repair/register"
  },
  components: { DarkMenu,Register,Voice,Statistics },
  data() {
  // {
  //   path: "register",
  //   text: "报修登记"
  // },
  // {
  //   path: "voice",
  //   text: "语音坐席"
  // },
  // {
  //   path: "statistics",
  //   text: "报修统计"
  // }
    return {
      navs: Navs,
      current:"register"
    };
  },
};
</script>
<style lang="scss" scoped></style>
