const Mock = require("mockjs");
const Random = Mock.Random;

module.exports = [
  /*
  @name           getReportList         
  @desc           获取巡检报障列表
  @params         {
                      keyword     string      巡检报障关键字
                      pageNum     number      巡检报障页码
                      pageSize    number      巡检报障每页数量
                  }
  @return         {
                      total       number      总记录数
                      pageNum     number      当前页码
                      pageSize    number      每页条数
                      headers     Array<{     表头
                          field       string      字段名
                          dataField   string      字段名
                          fieldName   string      字段中文名
                          sorted      boolean     是否可排序
                      }>
                      list        Array<{
                          id                  string      巡检报障id
                          index               string      巡检报障序号
                          registerId          string      登记人id
                          registerName        string      登记人姓名
                          reportId            string      报修人id
                          reportName          string      报修人姓名
                          reportJobNum        string      报修人工号
                          reportPhone         string      报修人电话
                          reportDepartId      string      报修人科室id
                          reportDepartName    string      报修人科室名称
                          reportTitle         string      报修人主题
                          createdTime         string      报修时间[2020-12-12 12:12:12]
                          status              string      状态{ToBeProcessed: "待处理", InProgress: "处理中", Completed: "已完成", Closed: "已关闭",}
                      }>
                  }
  */
  {
    url: "/api/v1/operations/inspection/report/getReportList",
    handler(req) {
      const params = req.query;
      return {
        total: Random.d100(),
        pageNum: params.pageNum,
        pageSize: params.pageSize,
        headers: [
          {
            field: "index",
            dataField: "index",
            fieldName: "序号",
            sorted: false,
          },
          {
            field: "registerName",
            dataField: "registerName",
            fieldName: "登记人",
            sorted: false,
          },
          {
            field: "reportName",
            dataField: "reportName",
            fieldName: "报修人姓名",
            sorted: false,
          },
          {
            field: "reportJobNum",
            dataField: "reportJobNum",
            fieldName: "报修人工号",
            sorted: false,
          },
          {
            field: "reportPhone",
            dataField: "reportPhone",
            fieldName: "报修人电话",
            sorted: false,
          },
          {
            field: "reportDepartName",
            dataField: "reportDepartName",
            fieldName: "报修科室",
            sorted: false,
          },
          {
            field: "reportTitle",
            dataField: "reportTitle",
            fieldName: "报修主题",
            sorted: false,
          },
          {
            field: "createdTime",
            dataField: "createdTime",
            fieldName: "报修时间",
            sorted: false,
          },
          {
            field: "status",
            dataField: "status",
            fieldName: "状态",
            sorted: false,
          },
        ],
        list: Mock.mock({
          [`value|${params.pageSize}`]: [
            {
              id: () => Random.id(),
              index: () =>
                Number(params.pageNum) * Number(params.pageSize) +
                Mock.Random.increment(),
              registerId: () => Random.id(),
              registerName: () => Random.cname(),
              reportName: () => Random.cname(),
              reportJobNum: () => 10000 + Random.d100(),
              reportPhone: () => 10000000000 + Random.d100(),
              reportDepartId: () => Random.id(),
              reportDepartName: () => Random.cname(),
              reportTitle: () => Random.csentence(4, 20),
              createdTime: () => Random.datetime(),
              status: () =>
                Random.pick([
                  "ToBeProcessed",
                  "InProgress",
                  "Completed",
                  "Closed",
                ]),
            },
          ],
        }).value,
      };
    },
  },
];
