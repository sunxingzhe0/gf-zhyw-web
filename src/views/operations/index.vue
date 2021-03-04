<template>
  <RightView>
    <router-view></router-view>
  </RightView>
</template>
<script>
import { RightView } from "@/components/Layout";
export default {
  name: "Operations",
  components: { RightView },
  meta: {
    sort: 3,
    title: "智慧运维"
  }
};
</script>
<style lang="scss" scoped></style>
