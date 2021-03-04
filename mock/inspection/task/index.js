const Mock = require("mockjs");
const Random = Mock.Random;

module.exports = [
  /*
    @name          getTaskList
    @desc          巡检计划-获取巡检计划列表
    @params        {
                        pageNum         number      当前页码
                        pageSize        number      每页条数
                        startTime       string      开始时间[2020-12-12 12:12:12]
                        endTime         string      结束时间
                        status          string      执行状态{NotPerformed: "未执行", Executing: "执行中", Completed: "已完成", Timedout: "已超时", Terminated: "已终止", TimeoutCompleted: "超时完成",}
                        planId          string      巡检计划id
                        type            number      巡检类型（device-设备巡检 site-现场巡检）
                        level           number      巡检计划级别（1-低 2-中 3-高）
                   }
    @return        {
                        total           number      总记录数     
                        pageNum         number      当前页码
                        pageSize        number      每页条数
                        list            array<{     列表数据
                            id                  number      巡检任务id
                            taskNo              string      巡检任务编号
                            name                string      巡检任务名称
                            type                number      巡检类型（device-设备巡检 site-现场巡检）
                            level               number      巡检计划级别（1-低 2-中 3-高）
                            startTime           string      巡检任务开始时间
                            endTime             string      巡检任务结束时间
                            completion          number      巡检任务完成度
                            progress            number      巡检任务当前进度
                            total               number      巡检总数
                            completed           number      已完成计数
                            notPerformed        number      未执行计数
                            executing           number      进行中计数
                            timeoutCompleted    number      超时完成计数
                            closed              numebr      已关闭计数
                            terminated          numebr      已终止计数
                            timedout            number      已超时计数
                        }>
                   }
    */
  {
    url: "/api/v1/operations/inspection/task/getTaskList",
    handler(req) {
      const { pageNum = 1, pageSize = 20 } = req.query;
      return {
        total: Random.d100(),
        pageNum: pageNum,
        pageSize: pageSize,
        list: Mock.mock({
          [`value|${pageSize}`]: [
            {
              id: Random.id(),
              taskNo: Random.word(4, 8),
              name: Random.csentence(4, 8),
              type: Random.pick(["device", "site"]),
              level: Random.pick([1, 2, 3]),
              startTime: Random.datetime(),
              endTime: Random.datetime(),
              completion: Random.float(0, 0.99),
              progress: Random.float(0, 0.99),
              total: Random.d100(),
              completed: Random.d100(),
              notPerformed: Random.d100(),
              executing: Random.d100(),
              timeoutCompleted: Random.d100(),
              closed: Random.d100(),
              terminated: Random.d100(),
              timedout: Random.d100(),
            },
          ],
        }).value,
      };
    },
  },
  /*
  @name          getTaskInfo
  @desc          巡检任务详情-基本信息
  @params        taskId     string      巡检任务id
  @return        {
                    id                  number      巡检任务id
                    name                string      巡检任务名称
                    type                number      巡检计划类型（device-设备巡检 site-现场巡检）
                    state               number      巡检任务状态 (0-禁用 1-启用)
                    taskNo              string      巡检任务编号
                    executorId          number      执行人id
                    executorName        string      执行人姓名
                    executorDepartId    number      执行科室id
                    executorDepartName  string      执行科室名称
                    level               number      巡检计划级别（1-低 2-中 3-高）
                    startTime           string      巡检任务开始时间
                    endTime             string      巡检任务结束时间
                    patrolState         string      巡检任务状态 NotPerformed-未执行 Executing-执行中 Completed-已完成 Timedout-已超时 Terminated-已终止 TimeoutCompleted-超时完成
                    rangeTime           string      巡检时段，用英文逗号分隔
                    description         string      巡检计划描述
                    deviceCount         number      巡检设备总数
                    completion          number      巡检任务完成度
                    progress            number      巡检任务当前进度
                    completed           number      已完成计数
                    timeoutCompleted    number      超时完成计数
                    timedout            number      已超时计数
                    executing           number      进行中计数
                    notPerformed        number      未执行计数
                 }
  */
  {
    url: "/api/v1/operations/inspection/report/getTaskInfo",
    handler() {
      return {
        id: Random.id(),
        name: Random.cword(4, 8),
        type: Random.pick(["device", "site"]),
        state: Random.pick([0, 1]),
        taskNo: Random.word(4, 8),
        executorId: Random.id(),
        executorName: Random.cword(4, 8),
        executorDepartId: Random.id(),
        executorDepartName: Random.cword(4, 8),
        level: Random.pick([1, 2, 3]),
        startTime: Random.datetime(),
        endTime: Random.datetime(),
        patrolState: Random.pick([
          "NotPerformed",
          "Executing",
          "Completed",
          "Timedout",
          "Terminated",
          "TimeoutCompleted",
        ]),
        rangeTime: Mock.mock({
          "value|4": [
            Random.datetime("HH:mm") + "-" + Random.datetime("HH:mm"),
          ],
        }).value.join(),
        description: Random.csentence(20, 40),
        deviceCount: Random.d100(),
        completion: Random.float(0, 0.99),
        progress: Random.float(0, 0.99),
        completed: Random.d100(),
        timeoutCompleted: Random.d100(),
        timedout: Random.d100(),
        executing: Random.d100(),
        notPerformed: Random.d100(),
      };
    },
  },
  /*
  @name          getDetailList
  @desc          巡检任务-获取巡检记录明细
  @params        {
                    taskId            string        巡检任务id
                    executStatus      string        执行状态{NotPerformed: "未执行", Executing: "执行中", Completed: "已完成", Timedout: "已超时", TimeoutCompleted: "超时完成"}
                    deviceStatus      string        设备状态{全部: "", 正常: "normal", 异常: "abnormal"}
                 }
  @return        Array<{                            巡检明细
                    id                string          记录id
                    startTime         string          本次巡检计划开始时间
                    endTime           string          本次巡检计划结束时间
                    pointId           string          巡检点id                             
                    pointCode         string          巡检点编号                              
                    pointName         string          巡检点名称 
                    abnormal          boolean         本次巡检记录是否异常(有一个设备异常则为异常)
                    status            string          本次巡检记录状态 { NotPerformed: "未执行", Executing: "执行中", Completed: "已完成", Timedout: "已超时", Terminated: "已终止", TimeoutCompleted: "超时完成" }
                    executStartTime   string          本次巡检执行开始时间
                    executEndTime     string          本次巡检执行结束时间
                    devices           Array<{         本次巡检设备列表
                      deviceId          string          设备id
                      deviceName        string          设备名称
                      abnormal          boolean         设备是否异常
                      contents          Array<{         设备巡检内容（基于巡检内容模型）
                        id                  string                          本次巡检巡检内容id
                        name                string                          本次巡检巡检内容名称
                        type                array<string>                   本次巡检巡检内容适用类型(可多选) { 设备巡检: device, 现场巡检: site}
                        ways                string                          本次巡检巡检内容录入方式{ 录入: input, 选择: select }
                        content             string                          本次巡检巡检内容的内容
                        ranges               string                          本次巡检巡检内容可选值（当录入方式为选择时， 以英文逗号分割）
                        value               string                          本次巡检巡检内容录入的值（录入方式为录入时为填写的值，录入方式为选择时为选择的值）
                        executorId          string                          本次巡检执行人id
                        executorName        string                          本次巡检执行人姓名
                        executorDepartId    string                          本次巡检执行人科室id
                        executorDepartName  string                          本次巡检执行人科室名称
                        executorTime        string[2020-12-12 12:12:12]     本次巡检执行时间
                        status              string          本次巡检记录状态 { NotPerformed: "未执行", Executing: "执行中", Completed: "已完成", Timedout: "已超时", Terminated: "已终止", TimeoutCompleted: "超时完成" }
                      }>
                    }>
                 }>
  */
  {
    url: "/api/v1/operations/inspection/task/getDetailList",
    handler() {
      const genRangs = function() {
        const _ranges = Mock.mock({
          "value|1-4": [Random.csentence(4, 20)],
        }).value;
        return {
          ranges: _ranges.join(),
          value: Random.pick(_ranges),
        };
      };
      return Mock.mock({
        [`value|${Random.d4()}`]: [
          {
            id: Random.id(),
            startTime: Random.datetime(),
            endTime: Random.datetime(),
            pointId: Random.id(),
            pointCode: Random.word(4, 8),
            pointName: Random.cword(4, 8),
            abnormal: () => Random.boolean(),
            status: Random.pick([
              "NotPerformed",
              "Executing",
              "Completed",
              "Timedout",
              "Terminated",
              "TimeoutCompleted",
            ]),
            executStartTime: Random.datetime(),
            executEndTime: Random.datetime(),
            devices: () =>
              Mock.mock({
                [`value|${Random.d20()}`]: [
                  {
                    deviceId: () => Random.id(),
                    deviceName: () => Random.cword(4, 8),
                    abnormal: () => Random.boolean(),
                    contents: () =>
                      Mock.mock({
                        [`value|${Random.d8()}`]: [
                          {
                            id: () => Random.id(),
                            name: () => Random.csentence(4, 20),
                            type: () =>
                              Random.shuffle(["device", "site"], 1, 2),
                            ways: () => Random.pick(["input", "select"]),
                            content: () => Random.csentence(2, 8),
                            executorId: () => Random.id(),
                            executorName: () => Random.cname(),
                            executorDepartId: () => Random.id(),
                            executorDepartName: () => Random.cword(4, 8),
                            executorTime: () => Random.datetime(),
                            status: () =>
                              Random.pick([
                                "NotPerformed",
                                "Executing",
                                "Completed",
                                "Timedout",
                                "Terminated",
                                "TimeoutCompleted",
                              ]),
                            ...genRangs(),
                          },
                        ],
                      }).value,
                  },
                ],
              }).value,
          },
        ],
      }).value;
    },
  },
  /*
  @name          getRelateWorkOrder
  @desc          巡检任务-获取关联巡检工单
  @params        taskId     string    巡检任务id
  @return        {
                    baseInfo          object<{
                      orderId           number    巡检工单（id）
                      createTime        string    创建时间[2020-12-12 12:12:12]
                      orderStatus       string    工单状态{ ToBeProcessed: "待处理", PendingOrder: "待接单", InProgress: "进行中", Pending: "挂起中", TransferOrder: "转单中", Acceptance: "验收中", Completed: "已完成", ToBeEvaluated: "待评价"（报修工单）, Closed: "已关闭",}
                    }>
                    executeInfo       array<{
                      userId            number    人员用户id
                      name              string    人员姓名
                      dept              string    人员所属部门
                      userType          number    人员类型{1: 接单人, 2: 转单人, 3: 协助人}
                      operationTime     string    操作时间（接单时间/转单时间）
                      remarks           string    备注
                    }>
                    logInfo           array<{
                      operationDetails  string    日志内容
                      operationTime     string    创建时间
                      name              string    操作人姓名（无姓名时为系统，建议写入日志的添加 系统 项）
                    }>
                 }
  */
  {
    url: "/api/v1/operations/inspection/task/getRelateWorkOrder",
    handler() {
      return {
        baseInfo: {
          orderId: Random.id(),
          createTime: Random.datetime(),
          orderStatus: Random.pick([
            "ToBeProcessed",
            "PendingOrder",
            "InProgress",
            "Pending",
            "TransferOrder",
            "Acceptance",
            "Completed",
            "ToBeEvaluated",
            "Closed",
          ]),
        },
        executeInfo: Mock.mock({
          [`value|${Random.d4()}`]: [
            {
              userId: () => Random.id(),
              name: () => Random.cname(),
              dept: () => Random.cword(4, 8),
              userType: () => Random.pick([1, 2, 3]),
              operationTime: () => Random.datetime(),
              remarks: () => Random.csentence(20, 40),
            },
          ],
        }).value,
        logInfo: Mock.mock({
          [`value|${Random.d8()}`]: [
            {
              operationDetails: () => Random.csentence(20, 40),
              operationTime: () => Random.datetime(),
              name: () => Random.cname(),
            },
          ],
        }).value,
      };
    },
  },
];
