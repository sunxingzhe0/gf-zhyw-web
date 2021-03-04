/** @format */

// 报修单操作按钮{dispatcher: 调度员, reporter: 报修人}
export const ReportBtns = {
  // 待处理
  ToBeProcessed: {
    dispatcher: [
      { text: "查看工单", code: "Detail" },
      { text: "转工单", code: "WorkOrder" },
      { text: "终止", code: "Terminate" },
      { text: "完结", code: "End" },
    ],
    reporter: [
      { text: "查看工单", code: "Detail" },
      { text: "催办", code: "Reminders" },
      { text: "撤回", code: "Withdraw" },
    ],
  },
  // 处理中
  InProgress: {
    dispatcher: [
      { text: "查看工单", code: "Detail" },
      { text: "终止", code: "Terminate" },
    ],
    reporter: [{ text: "查看工单", code: "Detail" }],
  },
  // 已完结
  Completed: {
    dispatcher: [{ text: "查看工单", code: "Detail" }],
    reporter: [{ text: "查看工单", code: "Detail" }],
  },
  // 已关闭
  Closed: {
    dispatcher: [{ text: "查看工单", code: "Detail" }],
    reporter: [{ text: "查看工单", code: "Detail" }],
  },
};

// 工单操作按钮{dispatcher:调度员, leader: 组长, member: 组员,reporter: 报修人}
// Dispatch ReDispatch Grab End Terminate Detail Accept Refuse Suspend Back Exchange Help Check RefuseCheck Recovery
export const WorkOrderBtns = {
  // 待处理
  ToBeProcessed: {
    dispatcher: [{ text: "终止", code: "Terminate" }],
    leader: [
      { text: "派单", code: "Dispatch" },
      { text: "抢单", code: "Grab" },
      { text: "终止", code: "Terminate" },
      { text: "查看", code: "Detail" },
    ],
    member: [
      { text: "抢单", code: "Grab" },
      { text: "查看", code: "Detail" },
    ],
    reporter: [{ text: "查看", code: "Detail" }],
  },
  // 待接单
  PendingOrder: {
    dispatcher: [{ text: "终止", code: "Terminate" }],
    leader: [
      { text: "重派单", code: "ReDispatch" },
      { text: "终止", code: "Terminate" },
      { text: "查看", code: "Detail" },
    ],
    member: [
      { text: "接单", code: "Accept" },
      { text: "拒单", code: "Refuse" },
      { text: "查看", code: "Detail" },
    ],
    reporter: [{ text: "查看", code: "Detail" }],
  },
  // 进行中
  InProgress: {
    dispatcher: [{ text: "终止", code: "Terminate" }],
    leader: [{ text: "终止", code: "Terminate" }, { text: "查看", code: "Detail" }],
    member: [
      { text: "挂起", code: "Suspend" },
      { text: "回退", code: "Back" },
      { text: "转单", code: "Exchange" },
      { text: "协助", code: "Help" },
      { text: "终止", code: "Terminate" },
      { text: "结束", code: "End" },
    ],
    reporter: [{ text: "查看", code: "Detail" }],
  },
  // 挂起中
  Pending: {
    dispatcher: [{ text: "终止", code: "Terminate" }],
    leader: [
      { text: "终止", code: "Terminate" },
      { text: "查看", code: "Detail" },
    ],
    member: [
      { text: "恢复", code: "Recovery" },
      { text: "查看", code: "Detail" },
    ],
    reporter: [{ text: "查看", code: "Detail" }],
  },
  // 转单中
  TransferOrder: {
    dispatcher: [{ text: "终止", code: "Terminate" }],
    leader: [
      { text: "终止", code: "Terminate" },
      { text: "查看", code: "Detail" },
    ],
    member: [
      { text: "回退", code: "Back" },
      { text: "查看", code: "Detail" },
    ],
    reporter: [{ text: "查看", code: "Detail" }],
  },
  // 验收中
  Acceptance: {
    dispatcher: [{ text: "终止", code: "Terminate" }],
    leader: [{ text: "查看", code: "Detail" }],
    member: [{ text: "回退", code: "Back" }],
    reporter: [
      { text: "验收", code: "Check" },
      { text: "拒收", code: "RefuseCheck" },
    ],
  },
  // 已完成
  Completed: {
    leader: [{ text: "查看", code: "Detail" }],
    member: [{ text: "查看", code: "Detail" }],
    reporter: [{ text: "查看", code: "Detail" }],
  },
  // 待评价[报修工单]
  ToBeEvaluated: {
    leader: [{ text: "查看", code: "Detail" }],
    member: [{ text: "查看", code: "Detail" }],
    reporter: [
      { text: "查看", code: "Detail" },
      { text: "查看", code: "Evaluate" },
    ],
  },
  // 已关闭
  Closed: {
    leader: [{ text: "查看", code: "Detail" }],
    member: [{ text: "查看", code: "Detail" }],
    reporter: [{ text: "查看", code: "Detail" }],
  },
};
// 巡检类型
export const InspectTypes = {
  site: "现场巡检",
  device: "设备巡检",
};
