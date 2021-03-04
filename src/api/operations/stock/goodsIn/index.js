/** @format */

import request from "@/utils/request";

export default {
  goodsInList(params) {
    //物资入库列表
    return request({
      url: "/api/v1/workbench/stock/goodsIn/goodsInList",
      method: "get",
      params,
    });
  },
  goodsInRecord(params) {
    //物资入库列表
    return request({
      url: "/api/v1/workbench/stock/goodsIn/goodsInRecord",
      method: "get",
      params,
    });
  },
};