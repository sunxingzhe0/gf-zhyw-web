<script>
/*
@author        qiang
@name          Empty
@desc          暂无数据占位组件
@props         tips     string      占位文本
@emit
*/
export default {
  name: "Empty",
  functional: true,
  render(h, { props, children, data }) {
    return (
      <div class="app-empty" {...data}>
        {children || [<p>{props.tips || "暂无数据"}</p>]}
      </div>
    );
  },
};
</script>

<style lang="scss">
.app-empty {
  text-align: center;
  color: #8c8c8c;
}
</style>
