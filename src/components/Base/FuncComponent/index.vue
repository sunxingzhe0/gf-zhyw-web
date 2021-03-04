<script>
/*
@author        qiang
@name          FuncComponent
@desc          render函数组件【因为template中写jsx不规范】
@props         params       any         render函数所需参数
               renderFunc   function    render函数 
@emit
*/
export default {
  name: "FuncComponent",
  props: {
    params: {
      type: [String, Number, Boolean, Array, Object, undefined],
    },
    renderFunc: {
      type: Function,
      required: true,
    },
  },
  render() {
    return this.renderFunc(this.params);
  },
};
</script>
