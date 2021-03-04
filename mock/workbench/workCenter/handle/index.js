/** @format */

const Mock = require("mockjs");
const Random = Mock.Random;

module.exports = [
  /*
  @name       handleList   
  @desc       工单处理列表          
  @params     {
  
                  workOrderStatus       string      状态 ToBeProcessed: "待处理",  PendingOrder: "待接单",  InProgress: "进行中",  Pending: "挂起中",  TransferOrder: "转单中",  Acceptance: "验收中",  Completed: "已完成",  ToBeEvaluated: "待评价", // 报修工单Closed: "已关闭",
                  pageNum               number      页码
                  pageSize              number      每页数量
                  orderTheme            string      主题
                  orderDescribe         string      描述
                  startTime             string      筛选日期[2020-12-12]
                  endTime               string      筛选日期[2020-12-12]
              }
  @return     {
                  total       number      总记录数
                  pageNum     number      当前页码
                  pageSize    number      每页条数
                  list        Array<{
                      id                number      id
                      code              string      编号
                      orderCategory     string      工单类别  1: "维修",  2: "巡检",  3: "保养",
                      orderType         string      工单类型  1: "普通报障",  2: "巡检报障",  3: "保养报障",
                      attr              string      属性      1: "设备",  2: "被服",  3: "耗材",  4: "其他",
                      area              array       所在区域
                      orderDescribe     string      工单描述
                      orderTheme        string      工单主题
                      assetsType        string      资产类型
                      assetsName        string      资产名称
                      repairType        string      报修来源类型 Phone: "电话",  Inspection: "巡检报障",  Maintenance: "保养报障",  Other: "其他" 
                      workOrderStatus   string      状态 ToBeProcessed: "待处理",  PendingOrder: "待接单",  InProgress: "进行中",  Pending: "挂起中",  TransferOrder: "转单中",  Acceptance: "验收中",  Completed: "已完成",  ToBeEvaluated: "待评价", // 报修工单 Closed: "已关闭",
                      createdTime       string      登记时间 [2020-12-12] 
                  }>
              }
  */
  {
    url: "/api/v1/workbench/repair/workCenter/handleList",
    handler(req) {
      // const params = req.query;
      let params = req.query;
      let status = params.status;
      let statusArr = status ? [status] : ["ToBeProcessed", "PendingOrder", "InProgress", "Pending", "TransferOrder", "Acceptance", "Completed",'ToBeEvaluated','Closed'];
      return {
        total: 12,
        pageNum: 1,
        pageSize: 10,
        list: Mock.mock({
          [`value|${10}`]: [
            {
              id: () => Random.id(),
              code: "02154",
              "orderCategory|1": ["1", "2", "3"],
              "orderType|1": ["1", "2", "3"],
              "attr|1": ["1", "2", "3",'4'],
              assetsType: "大型家电",
              assetsName: "冰箱",     
              orderDescribe:() => Random.csentence(30, 60),
              orderTheme: () => Random.csentence(5, 10),
              repairType: () => Random.pick(["Phone", "Inspection",'Maintenance','Other']), //报修类型 Phone: "电话",  Inspection: "巡检报障",  Maintenance: "保养报障",  Other: "其他" 
              // "equipmentName|1": ["冰箱", "空调", "水管"],
              // "from|1": ["来电", "移动", "管理"],
              "workOrderStatus|1": statusArr,
              createTime: () => Random.datetime(), //来电时间
            },
          ],
        }).value,
        cause: null,
      };
    },
  },
  
];
