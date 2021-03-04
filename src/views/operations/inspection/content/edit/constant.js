export const FormItems = [
  [
    {
      key: "name",
      label: "名称",
      component: "el-input",
      placeholder: "请输入",
    },
    {
      key: "content",
      label: "内容",
      component: "el-input",
      placeholder: "请输入",
    },
    {
      key: "type",
      label: "适用类型",
      placeholder: "请选择",
      component: "el-checkbox-group",
    },
  ],
  [
    {
      key: "ways",
      label: "方式",
      placeholder: "请选择",
      component: "el-select",
    },
    {
      key: "ranges",
      label: "数值",
      component: "el-input",
      require: (form) => {
        return form.ways === "select";
      },
      placeholder: "请输入,选项请以英文逗号分割",
    },
  ],
];
export const Rules = {
  name: [{ required: true, message: "请输入巡检内容名称", trigger: "blur" }],
  content: [
    { required: true, message: "请输入巡检内容巡检内容", trigger: "blur" },
  ],
  type: [
    { required: true, message: "请选择巡检内容使用类型", trigger: "blur" },
  ],
  ways: [
    { required: true, message: "请选择巡检内容录入方式", trigger: "blur" },
  ],
};
