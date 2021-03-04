import request from "@/utils/request";

export default {
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
                        status              string      巡检工单状态
                        createdTime         string      创建/登记时间[2020-12-12 12:12:12]
                    }>
                }
  */
  getWorkOrderList(params) {
    return request({
      url: "/api/v1/operations/inspection/task/getWorkOrderList",
      params,
    });
  },
};
