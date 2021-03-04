// 设备状态
export const DeviceStatus = {
  ToBePosted: "待贴置",
  ToBeInstalled: "待安装",
  Using: "在用",
  Free: "空闲",
  Scrapped: "已报废",
};
// 被服状态
export const BeddingStatus = {
  TobePosted: "待贴置",
  ToBeRegistered: "待注册",
  ToBeSend: "待发放",
  ToBeUsed: "待领用",
  Using: "使用中",
  ToBeRecycled: "待回收",
  ToBeWashed: "待洗涤",
  Washing: "洗涤中",
  ToBeReceived: "待收货",
  Scrapped: "已报废",
};
// 采购单状态
export const PurchaseOrder = {
  ToBePurchased: "待采买",
  ToBeSigned: "待签收",
  Completed: "已完成",
};
// 入库单状态&出库单状态
export const WarehouseStatus = {
  ToBeReview: "待审核",
  Completed: "已完成",
  Closed: "已关闭",
};
// 物资调拨状态
export const TransferStatus = {
  ToBeReview: "待审核",
  ToBeShipped: "待出货",
  Shipping: "出货中",
  completed: "已完成",
  Rejected: "已驳回",
};
// 物资申领状态
export const ApplyStatus = {
  DepartmentToBeReview: "待审核", // 部门
  WarehouseToBeReview: "待审核", // 仓库
  ToBeUsedReceive: "待领取",
  Completed: "已完成",
  Closed: "已关闭",
};
// 调度派工状态
export const DispatchStatus = {
  ToBeDistributed: "待派发",
  Distributing: "派发中",
  Distributed: "已派发",
};
// 协助工单状态
export const AssistWorkOrderStatus = {
  OrderRejected: "已拒单",
  Withdrawn: "已撤回",
  PendingOrder: "待接单",
  OrderReceived: "已接单",
};
// 报修来源
export const RepairSource = {
  Phone: "电话",
  Inspection: "巡检报障",
  Maintenance: "保养报障",
  Other: "其他",
};
// 报修单状态
export const RepairFormStatus = {
  ToBeProcessed: "待处理",
  InProgress: "处理中",
  Completed: "已完成",
  Closed: "已关闭",
};
// 报修记录状态
export const RepairStatus = {
  ToBeProcessed: "待处理",
  InProgress: "处理中",
  Completed: "已完成",
};
//语音坐席列表状态
export const VoiceStatus = {
  unregistered: "未登记",
  registered: "已登记",
  revoked: "已作废",
};
// 运维任务状态[巡检任务、保养任务]
export const TaskStatus = {
  NotPerformed: "未执行",
  Executing: "执行中",
  Completed: "已完成",
  Timedout: "已超时",
  Terminated: "已终止",
  TimeoutCompleted: "超时完成",
};

// 运维工单状态[巡检工单、巡检工单、报修工单]
export const WorkOrderStatus = {
  ToBeProcessed: "待处理",
  PendingOrder: "待接单",
  InProgress: "进行中",
  Pending: "挂起中",
  TransferOrder: "转单中",
  Acceptance: "验收中",
  Completed: "已完成",
  ToBeEvaluated: "待评价", // 报修工单
  Closed: "已关闭",
};
//报修类型/属性
export const attrType = {
  1: "设备",
  2: "被服",
  3: "耗材",
  4: "其他",
};
//工单类别
export const orderCategory = {
  1: "维修",
  2: "巡检",
  3: "保养",
};
//工单类型
export const orderType = {
  1: "普通报障",
  2: "巡检报障",
  3: "保养报障",
}
//工单级别
export const orderLevel = {
  1: "低",
  2: "中",
  3: "高",
}

// 执行状态[巡检]
export const ExecutStatus = {
  NotPerformed: "未执行",
  Executing: "执行中",
  Completed: "已完成",
  Timedout: "已超时",
  TimeoutCompleted: "超时完成",
};
