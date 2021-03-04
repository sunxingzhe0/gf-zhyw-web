const Mock = require("mockjs");
const Random = Mock.Random;

module.exports = [
  /*
  @name       getPlanList   
  @desc       获取巡检计划列表          
  @params     {
                  level      string      巡检计划级别
                  keyword     string      巡检计划关键字
                  pageNum     number      巡检计划页码
                  pageSize    number      巡检计划每页数量
              }
  @return     {
                  total       number      总记录数
                  pageNum     number      当前页码
                  pageSize    number      每页条数
                  list        Array<{
                      id          number              巡检记录id
                      level      number              巡检计划等级[1: 低, 2: 中, 3: 高]
                      points      number              巡检点数量
                      createdTime string[2020-12-12]  创建时间
                      name        string              巡检计划名称
                  }>
              }
  */
  {
    url: "/api/v1/operations/inspection/plan/getPlanList",
    handler(req) {
      const params = req.query;
      return {
        total: Random.d100(),
        pageNum: params.pageNum,
        pageSize: params.pageSize,
        list: Mock.mock({
          [`value|${params.pageSize}`]: [
            {
              id: () => Random.id(),
              points: () => Random.d20(),
              createdTime: () => Random.date(),
              level: () => Random.pick([1, 2, 3]),
              name: () => Random.csentence(4, 20),
            },
          ],
        }).value,
      };
    },
  },
  /*
  @name       savePlan 
  @desc       保存/更新巡检计划   
  @params     {
                id                  string          巡检计划id（无id为新增）
                name                string          巡检计划名称
                type                string          巡检计划类型(site为现场巡检，device为设备巡检)
                level               number          巡检计划级别(1为低，2为中，3为高)
                executorDepartId    string          巡检计划执行部门id
                executorDepartName  string          巡检计划执行部门名称
                cycle               number          巡检计划周期(1为单次，2为循环)
                enable              number          巡检计划状态(1为启用，0为禁用)
                executorId          string          巡检计划执行人id
                executorName        string          巡检计划执行人名称
                desc                string          巡检计划描述
                startTime           string          巡检计划开始时间(巡检计划周期为循环时)
                endTime             string          巡检计划结束时间(巡检计划周期为循环时)
                timeType            string          巡检计划巡检时间(巡检计划周期为循环时){每天:day, 每周: week, 每月:month}
                dates               array<number>   巡检计划巡检日期(巡检计划周期为循环时，每周为1-7，每月为1-31)
                date                string          巡检计划巡检时间(巡检计划周期为单次时，2020-12-12)
                timePeriods         array<string>   巡检计划巡检时间段，每个时间以-拼接，每段时间以,拼接，如：'10:00-12:00,13:00-14:00'
                points              array<{         巡检计划巡检点
                                      id    string  巡检点id
                                      name  string  巡检点名称
                                      code  string  巡检点编码
                                    }>  
              } 
  @return        
  */
  {
    url: "/api/v1/operations/inspection/plan/savePlan",
    method: "post",
    handler() {
      return { id: Random.id() };
    },
  },

  /*
  @name        getPlanDetail          
  @desc        获取巡检计划详情  
  @params      {
                  id          string        巡检计划id
               }  
  @return      {
                  id                  string          巡检计划id（无id为新增）
                  name                string          巡检计划名称
                  type                string          巡检计划类型(site为现场巡检，device为设备巡检)
                  level               number          巡检计划级别(1为低，2为中，3为高)
                  executorDepartId    string          巡检计划执行部门id
                  executorDepartName  string          
                  cycle               number          巡检计划周期(1为单次，2为循环)
                  enable              number          巡检计划状态(1为启用，0为禁用)
                  executorId          string          巡检计划执行人id
                  executorName        string    
                  desc                string          巡检计划描述
                  startTime           string          巡检计划开始时间(巡检计划周期为循环时)
                  endTime             string          巡检计划结束时间(巡检计划周期为循环时)
                  timeType            string          巡检计划巡检时间(巡检计划周期为循环时){每天:day, 每周: week, 每月:month}
                  dates               array<number>   巡检计划巡检日期(巡检计划周期为循环时，每周为1-7，每月为1-31)
                  date                string          巡检计划巡检时间(巡检计划周期为单次时，2020-12-12)
                  timePeriods         array<string>   巡检计划巡检时间段，每个时间以-拼接，每段时间以,拼接，如：'10:00-12:00,13:00-14:00'
                  points              array<{         巡检计划巡检点
                                        id    string  巡检点id
                                        name  string  巡检点名称
                                        code  string  巡检点编码
                                      }>   
              }   
  */
  {
    url: "/api/v1/operations/inspection/plan/getPlanDetail",
    handler() {
      return {
        id: Random.id(),
        name: Random.cword(4, 8),
        type: Random.pick(["site", "device"]),
        level: Random.pick([1, 2, 3]),
        executorDepartId: Random.id(),
        executorDepartName: Random.cword(4, 8),
        cycle: Random.pick([1, 2]),
        enable: Number(Random.boolean()),
        executorId: Random.id(),
        executorName: Random.cname(),
        desc: Random.csentence(10, 40),
        startTime: Random.datetime(),
        endTime: Random.datetime(),
        timeType: Random.pick(["day", "week", "month"]),
        dates: Mock.mock({
          [`value|${Random.d20()}`]: [() => Random.d20()],
        }).value,
        date: Random.datetime("YYYY-MM-DD"),
        timePeriods: Mock.mock({
          "value|4": [
            Random.datetime("HH:mm") + "-" + Random.datetime("HH:mm"),
          ],
        }).value.join(),
        points: Mock.mock({
          [`value|${Random.d20()}`]: [
            {
              id: () => Random.d20(),
              name: () => Random.cword(4, 8),
              code: () => Random.word(8),
            },
          ],
        }).value,
      };
    },
  },
  /*
  @name       getInspectRecord      
  @desc       巡检计划详情获取巡检记录   
  @params     {
                  planId              string          巡检计划id
                  status              string          执行状态{NotPerformed: "未执行", Executing: "执行中", Completed: "已完成", Timedout: "已超时", TimeoutCompleted: "超时完成"}
                  taskTime            string          任务时间(开始时间和结束时间以英文逗号分割)
                  executeTime         string          执行时间(开始时间和结束时间以英文逗号分割)
                  taskName            string          任务关键字      
              }   
    @return   Array<{                            巡检明细
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
    url: "/api/v1/operations/inspection/plan/getInspectRecord",
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
];
