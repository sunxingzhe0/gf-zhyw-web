export const FormItems = [
  [
    {
      label: "计划名称",
      key: "name",
      component: "el-input",
      placeholder: "请输入",
    },
    {
      label: "计划类型",
      key: "type",
      component: "el-select",
      placeholder: "请选择",
    },
    {
      label: "计划级别",
      key: "level",
      component: "el-select",
      placeholder: "请选择",
    },
  ],
  [
    {
      label: "执行部门",
      key: "executorDepartId",
      component: "el-select",
      placeholder: "请选择",
    },
    {
      label: "周期",
      key: "cycle",
      component: "el-select",
      placeholder: "请选择",
    },
    {
      label: "状态",
      key: "enable",
      component: "el-select",
      placeholder: "请选择",
    },
  ],
  [
    {
      label: "执行人",
      key: "executorId",
      component: "el-select",
      placeholder: "请选择",
    },
  ],
  [
    {
      label: "计划描述",
      key: "desc",
      full: true,
      type: "textarea",
      component: "el-input",
      placeholder: "请输入",
    },
  ],
  [
    {
      require: (form) => form.cycle === 2,
      label: "开始时间",
      key: "startTime",
      type: "datetime",
      component: "el-date-picker",
      placeholder: "请选择",
    },
    {
      require: (form) => form.cycle === 2,
      label: "结束时间",
      key: "endTime",
      type: "datetime",
      component: "el-date-picker",
      placeholder: "请选择",
    },
  ],
  [
    {
      require: (form) => form.cycle === 2,
      desc: "巡检类型",
      label: "巡检时间",
      key: "timeType",
      full: true,
    },
  ],
  [
    {
      require: (form) => form.cycle === 1,
      type: "date",
      label: "巡检时间",
      key: "inspectDate",
      placeholder: "请选择",
      component: "el-date-picker",
    },
  ],
  [
    {
      label: "巡检时段",
      key: "timePeriods",
    },
  ],
  [
    {
      full: true,
      label: "巡检点",
      key: "points",
    },
  ],
];

export const Rules = {
  name: [{ required: true, message: "请输入工单名称", trigger: "blur" }],
  type: [{ required: true, message: "请选择计划类型", trigger: "blur" }],
  level: [{ required: true, message: "请选择计划级别", trigger: "blur" }],
  executorDepartId: [
    { required: true, message: "请选择执行部门", trigger: "blur" },
  ],
  cycle: [{ required: true, message: "请选择执行周期", trigger: "blur" }],
  enable: [{ required: true, message: "请选择计划状态", trigger: "blur" }],
  desc: [{ required: true, message: "请输入计划描述", trigger: "blur" }],
  startTime: [{ required: true, message: "请选择开始时间", trigger: "blur" }],
  endTime: [{ required: true, message: "请选择计划结束时间", trigger: "blur" }],
  // 循环
  timeType: [{ required: true, message: "请选择巡检时间", trigger: "blur" }],
  // 单次
  inspectDate: [{ required: true, message: "请选择巡检时间", trigger: "blur" }],
  timePeriods: [{ required: true, message: "请选择巡检时段", trigger: "blur" }],
  points: [{ required: true, message: "请选择巡检点", trigger: "blur" }],
};
