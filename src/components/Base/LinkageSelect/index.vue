<script>
/*
@author        qiang
@name          LinkageSelect
@desc          级联选择器
@props
               conf     object<{                  配置
                 label      string['label']         显示的值
                 value      string['value']         选中的值
                 children   string['children']      子项key
               }>
               value    array<string>             选取的值
               level    number                    级联层数
               data     array<{}>                 使用的数据，如使用了fetcher，将使用fetcher返回的数据覆盖data
               fetcher  function(node):array<{}>  获取下一级的函数,node:当前节点选中的项[暂未实现]
@emit          input    array<string|number>      当前选中的值 
               change   object<{                  当前选中的值和文本
                 val      array<string|number>      当前选中的值 
                 txt      array<string>             当前选中的文本
               }> 
@futrue        支持fetcher
               数据回显 
*/
const Conf = {
  label: "label",
  value: "value",
  children: "children",
};
export default {
  name: "LinkageSelect",
  props: {
    conf: {
      type: Object,
      default: () => Conf,
    },
    value: {
      type: Array,
      default: () => [],
    },
    level: {
      type: Number,
      default: 3,
    },
    data: {
      type: Array,
      default: () => [],
    },
    fetcher: {
      type: Function,
      default: null,
    },
  },
  computed: {
    selfVal: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
        this.$emit("change", {
          val: val,
          txt: this.texts,
        });
      },
    },
    selfConf() {
      return { ...Conf, ...this.conf };
    },
  },
  data() {
    return {
      texts: [], // 激活的文本
      indexs: [], // 激活的索引
    };
  },
  created() {
    this.indexs = new Array(this.level).fill(0);
  },
  mounted() {},
  methods: {
    genOptions(level) {
      let options = [];
      let children = this.selfConf.children;
      try {
        for (let i = 0; i <= level; i++) {
          if (i === 0) {
            options = this.data;
          } else {
            options = options[this.indexs[i - 1]][children];
          }
        }
      } catch (e) {
        console.warn(e);
        options = [];
      }
      return options;
    },

    renderItem(level) {
      const { label, value } = this.selfConf;
      const options = this.genOptions(level);
      return (
        <el-select
          value={this.selfVal[level]}
          onChange={(val) => this.changeHandler(val, level, options)}
        >
          {options.map((item) => (
            <el-option label={item[label]} value={item[value]}></el-option>
          ))}
        </el-select>
      );
    },
    changeHandler(val, level, options) {
      let texts = [],
        values = [];
      const { label, value } = this.selfConf;
      const activeIndex = options.findIndex((item) => item[value] === val);
      this.indexs = this.indexs.map((item, index) => {
        if (index === level) {
          return activeIndex;
        } else if (index < level) {
          return item;
        } else {
          return 0;
        }
      });
      this.indexs.forEach((item, level) => {
        const options = this.genOptions(level);
        if (options[item] && options[item][value]) {
          texts.push(options[item][label]);
          values.push(options[item][value]);
        } else {
          texts.push("");
          values.push("");
        }
      });
      this.texts = texts;
      this.selfVal = values;
    },
  },
  render() {
    return (
      <div class="linkage-select">
        {this.indexs.map((_, level) => this.renderItem(level))}
      </div>
    );
  },
};
</script>
<style scoped></style>
