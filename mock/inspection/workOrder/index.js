const Mock = require("mockjs");
const Random = Mock.Random;

module.exports = [
  /*
  @name           getWorkOrderList         
  @desc           获取巡检工单
  @params         {
                      keyword     string      巡检工单关键字
                      pageNum     number      巡检工单页码
                      pageSize    number      巡检工单每页数量
                  }
  @return         {
                      total       number      总记录数
                      pageNum     number      当前页码
                      pageSize    number      每页条数
                      list        Array<{
                          id                  string      巡检工单id
                          pointId             string      所属巡检点id
                          pointName           string      所属巡检点名称
                          type                string      巡检工单巡检类型
                          code                string      巡检工单编号
                          deviceId            string      设备id
                          deviceName          string      设备名称
                          deviceType          string      设备类型
                          status              string      巡检工单状态 "ToBeProcessed", "PendingOrder", "InProgress", "Pending", "TransferOrder", "Acceptance", "Completed", "Closed",
                          createdTime         string      创建/登记时间[2020-12-12 12:12:12]
                      }>
                  }
  */
  {
    url: "/api/v1/operations/inspection/task/getWorkOrderList",
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
              pointId: () => Random.guid(),
              pointName: () => Random.csentence(4, 20),
              type: () => Random.string(7),
              code: () => Random.string(7),
              deviceId: () => Random.id(),
              deviceName: () => Random.csentence(4, 20),
              deviceType: () => Random.csentence(4, 20),
              status: () =>
                Random.pick([
                  "ToBeProcessed",
                  "PendingOrder",
                  "InProgress",
                  "Pending",
                  "TransferOrder",
                  "Acceptance",
                  "Completed",
                  "Closed",
                ]),
              createdTime: () => Random.datetime(),
            },
          ],
        }).value,
      };
    },
  },
];
