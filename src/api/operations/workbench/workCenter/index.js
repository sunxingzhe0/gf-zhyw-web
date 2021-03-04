/** @format */

import request from "@/utils/request";

export default {
  /*
  @name       dispatchList   
  @desc       调度派工列表          
  @params     {
                  dispatchStatus    string      状态 ToBeDistributed:待派发 Distributing:已派发 Distributed:已派发
                  pageNum           number      页码
                  pageSize          number      每页数量
                  assetsName        string      设备名称
                  assetsType        string      设备类型
                  no                number      编号
                  startTime         string      筛选日期[2020-12-12]
                  endTime           string      筛选日期[2020-12-12]
              }
  @return     {
                  total       number      总记录数
                  pageNum     number      当前页码
                  pageSize    number      每页条数
                  list        Array<{
                      id                  number              id
                      orderTheme          string              标题
                      assetsType          string              设备类型
                      orderDescribe       string              内容
                      createTime          string[2020-12-12]  创建时间
                      dispatchStatus      string              状态 ToBeDistributed:待派发 Distributing:已派发 Distributed:已派发
                      ...
                  }>
              }
  */
  dispatchList(params) {
    //调度派工列表
    return request({
      url: "/api/v1/workbench/repair/workCenter/dispatchList",
      method: "get",
      params,
    });
  },

  /*
  @name       dispatchOrder   
  @desc       调度派工派单          
  @params     {
                    json    {
                      orderId           number      工单id
                      dept              string      执行部门
                      orderLevel        string      工单级别
                      finishTime        string      预计完成时间[2020-12-12 11:11:11]
                    }
              }
  @return     {
                "msg": "操作成功",
                "success": true,
                "total": 0
              }
  */
 dispatchOrder(params) {
    //调度派工派单
    return request({
      url: "/api/v1/workbench/repair/workCenter/dispatchOrder",
      method: "post",
      data:params,
    });
  },
  /*
  @name       addWorkOrder   
  @desc       新增工单登记          
  @params     {
                json    {
                    orderTheme            string      工单主题
                    orderCategory         string      工单类别
                    orderType             string      工单类型
                    correlateDocumentId   string      关联单据
                    attr                  string      属性
                    assetsType            string      资产类型
                    assetsName            string      资产名称
                    area                  array       所在区域
                    orderDescribe         string      工单描述
                    imageUrl              string      图片资源
                    contact               string      联系人
                    contactPhone          string      联系电话
                }
              }
  @return     {
                "msg": "创建成功",
                "success": true,
                "total": 0
              }
  */
  addWorkOrder(params) {
    //新增工单登记
    return request({
      url: "/api/v1/workbench/repair/workCenter/addWorkOrder",
      method: "post",
      data: params,
    });
  },
  /*
  @name       handleList   
  @desc       工单处理列表          
  @params     {
  
                  workOrderStatus       string      状态 ToBeProcessed: "待处理",  PendingOrder: "待接单",  InProgress: "进行中",  Pending: "挂起中",  TransferOrder: "转单中",  Acceptance: "验收中",  Completed: "已完成",  ToBeEvaluated: "待评价", // 报修工单Closed: "已关闭",
                  orderCategory         string      工单类别  1: "维修",  2: "巡检",  3: "保养",
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
  handleList(params) {
    //工单处理列表
    return request({
      url: "/api/v1/workbench/repair/workCenter/handleList",
      method: "get",
      params,
    });
  },

  workOrderDetail(params) {
    //工单详情
    return request({
      url: "/api/v1/workbench/workCenter/workOrderDetail",
      method: "get",
      params,
    });
  },

  /*
  @name       getDeptOptions   
  @desc       获取部门选项列表
  @params     {}
  @return      [{
        value         string      value 用于传值
        label         string      部门名称
  }]
  */
  getDeptOptions(params) {
    //获取执行部门列表
    return request({
      url: "/api/v1/workbench/workCenter/getDeptOptions",
      method: "get",
      params,
    });
  },
  
  
};
