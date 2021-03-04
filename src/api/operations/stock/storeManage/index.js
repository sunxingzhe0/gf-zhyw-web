/** @format */

import request from "@/utils/request";

export default {
  storeList(params) {
    //仓库管理列表
    return request({
      url: "/api/v1/workbench/stock/storeManage/storeList",
      method: "get",
      params,
    });
  },
};
