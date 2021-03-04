/** @format */

import request from "@/utils/request";

export default {
  goodsList(params) {
    //物资管理列表
    return request({
      url: "/api/v1/workbench/stock/goodsManage/goodsList",
      method: "get",
      params,
    });
  },
};
