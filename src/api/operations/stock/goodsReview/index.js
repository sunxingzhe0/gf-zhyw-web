/** @format */

import request from "@/utils/request";

export default {
  applyReviewList(params) {
    //申领审核列表
    return request({
      url: "/api/v1/workbench/stock/goodsReview/applyReviewList",
      method: "get",
      params,
    });
  },
  inStoreReviewList(params) {
    //入库审核列表
    return request({
      url: "/api/v1/workbench/stock/goodsReview/inStoreReviewList",
      method: "get",
      params,
    });
  },
  outStoreReviewList(params) {
    //出库审核列表
    return request({
      url: "/api/v1/workbench/stock/goodsReview/outStoreReviewList",
      method: "get",
      params,
    });
  },
};
