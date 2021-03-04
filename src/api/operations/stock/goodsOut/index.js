/** @format */

import request from "@/utils/request";

export default {
  goodsOutList(params) {
    //物资入库列表
    return request({
      url: "/api/v1/workbench/stock/goodsOut/goodsOutList",
      method: "get",
      params,
    });
  },
  goodsOutRecord(params) {
    //物资入库列表
    return request({
      url: "/api/v1/workbench/stock/goodsOut/goodsOutRecord",
      method: "get",
      params,
    });
  },
};
