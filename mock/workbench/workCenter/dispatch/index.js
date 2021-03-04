
/** @format */

const Mock = require("mockjs");
const Random = Mock.Random;

module.exports = [
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
  {
    url: "/api/v1/workbench/repair/workCenter/dispatchList",
    handler(req) {
      // const params = req.query;
    let params = req.query;
    let dispatchStatus = params.dispatchStatus;
    let statusArr = dispatchStatus && dispatchStatus != "" ? [dispatchStatus] : ["ToBeDistributed", "Distributing",'Distributed'];
      return {
        total: 12,
        pageNum: 1,
        pageSize: 10,
        list: Mock.mock({
          [`value|${10}`]: [
            {
              id: () => Random.id(),
              assetsType: "大型家电",
              orderTheme: () => Random.csentence(5, 10),
              orderDescribe: () => Random.csentence(30, 60),
              "dispatchStatus|1": statusArr,
              // "statusName|1": ["待派发", "已派发"],
              createTime: () => Random.datetime(), //来电时间
            },
          ],
        }).value,
        cause: null,
      };
    },
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
  {
    url: "/api/v1/workbench/repair/workCenter/dispatchOrder",
    method: "post",
    handler() {
      // const params = req.query;
      return {
        msg: "操作成功",
        success: true,
        total: 0,
      };
    },
  },

];
