/** @format */

import request from "@/utils/request";

export default {
  statisticsList(params) {
    //库存统计列表
    return request({
      url: "/api/v1/workbench/stock/statistics/statisticsList",
      method: "get",
      params,
    });
  },
  
};
