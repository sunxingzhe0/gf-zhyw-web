/** @format */

import request from "@/utils/request";

export default {
  useRecordList(params) {
    //领用记录列表
    return request({
      url: "/api/v1/workbench/stock/useRecord/useRecordList",
      method: "get",
      params,
    });
  },
  
};
