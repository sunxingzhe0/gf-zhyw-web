/** @format */

import request from "@/utils/request";

export default {
  applyList(params) {
    //物资申请列表
    return request({
      url: "/api/v1/workbench/stock/goodsApply/applyList",
      method: "get",
      params,
    });
  },
  applyDetail(params) {
    //物资申领详情
    return request({
      url: "/api/v1/workbench/stock/goodsApply/applyDetail",
      method: "get",
      params,
    });
  },
  applyJournal(params) {
    //物资申领详情（日志）
    return request({
      url: "/api/v1/workbench/stock/goodsApply/applyJournal",
      method: "get",
      params,
    });
  },
  
};
