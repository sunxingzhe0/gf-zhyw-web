export const FormItems = [
  [
    {
      key: "code",
      label: "编号",
      disabled: true,
      component: "el-input",
      placeholder: "请输入",
    },
    {
      key: "name",
      label: "名称",
      component: "el-input",
      placeholder: "请选择",
    },
    {
      key: "area",
      label: "所属区域",
      component: "AreaSelect",
      placeholder: "请选择",
    },
  ],
  [
    {
      label: "巡检类型",
      key: "inspectionType",
      component: "el-select",
      placeholder: "请选择",
    },
    {
      label: "GIS坐标",
      key: "gisLog",
    },
    {
      label: "地址",
      key: "address",
      component: "el-input",
      placeholder: "请输入",
    },
  ],
  [
    {
      label: "RFID",
      key: "rfid",
      component: "el-input",
      placeholder: "请输入",
    },
    {
      label: "拍照数量",
      key: "photoNum",
      type: "number",
      component: "el-input",
      placeholder: "请输入",
    },
    {
      key: "offLine",
      label: "离线巡检",
      component: "el-select",
      placeholder: "请选择",
    },
  ],
  [
    {
      full: true,
      require: (form) => form.inspectionType === "site",
      key: "content",
      label: "巡检内容",
      type: "textarea",
      component: "el-input",
      placeholder: "请输入",
    },
  ],
];

export const Rules = {
  name: [{ required: true, message: "请输入巡检点名称", trigger: "blur" }],
  area: [{ required: true, message: "请选择巡检点所属区域", trigger: "blur" }],
  inspectionType: [
    { required: true, message: "请选择巡检点巡检类型", trigger: "blur" },
  ],
  address: [{ required: true, message: "请输入巡检点地址", trigger: "blur" }],
  rfid: [{ required: true, message: "请输入巡检点RFID", trigger: "blur" }],
  offLine: [
    { required: true, message: "请输入巡检点离线巡检状态", trigger: "blur" },
  ],
  content: [{ required: true, message: "请输入巡检内容", trigger: "blur" }],
};
