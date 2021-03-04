/** @format */

import request from "@/utils/request";

export default {
  allotList(params) {
    //调拨列表（审核与执行都在这里）
    return request({
      url: "/api/v1/workbench/stock/stockAllot/allotList",
      method: "get",
      params,
    });
  },
  allotDetail(params) {
    //调拨详情
    return request({
      url: "/api/v1/workbench/stock/stockAllot/allotDetail",
      method: "get",
      params,
    });
  },
  allotContentList(params) {
    //调拨详情调拨内容物资列表
    return request({
      url: "/api/v1/workbench/stock/stockAllot/allotContentList",
      method: "get",
      params,
    });
  },
  actionJournal(params) {
    //操作日志
    return request({
      url: "/api/v1/workbench/stock/stockAllot/actionJournal",
      method: "get",
      params,
    });
  },
};
