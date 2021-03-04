import request from "@/utils/request";

export default {
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
  getReportList(params) {
    return request({
      url: "/api/v1/operations/inspection/report/getReportList",
      method: "get",
      params,
    });
  },
};
