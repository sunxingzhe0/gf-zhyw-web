<template>
  <LinkageSelect
    :level="2"
    :data="data"
    v-model="selfVal"
    class="area-select"
    @change="changeHandler"
    :conf="{ value: 'id', label: 'name' }"
  ></LinkageSelect>
</template>
<script>
/*
@author        qiang
@name          AreaSelect
@desc          设备（点）所属区域级联选择器
@props         value    Array<string>     所选地区的id
@emit          input    Array<string>     所选地区的id
               change   object<
                val       array<string|number>  所选地区的id
                txt       array<string>         所选地区的文本
               > 
*/
// 不使用 import {} 是因为Base里面的Table中依赖AreaSelect，会产生循环引用
import common from "@/api/common";
import LinkageSelect from "@/components/Base/LinkageSelect";
export default {
  name: "AreaSelect",
  components: {
    LinkageSelect,
  },
  props: {
    value: {
      type: Array,
      default: () => ["", ""],
    },
  },
  data() {
    return {
      data: [],
    };
  },
  computed: {
    selfVal: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
  mounted() {
    this.getAreaTree();
  },
  methods: {
    async getAreaTree() {
      this.data = await common.area.getAreaTree();
    },
    changeHandler(val) {
      this.$emit("change", val);
    },
  },
};
</script>
<style lang="scss" scoped>
.area-select {
  display: flex;
}
</style>
