/** @format */

import request from "@/utils/request";

export default {
  stockInventoryList(params) {
    //库存盘点列表
    return request({
      url: "/api/v1/workbench/stock/stockInventory/stockInventoryList",
      method: "get",
      params,
    });
  },
  InventoryDetail(params) {
    //库存盘点详情
    return request({
      url: "/api/v1/workbench/stock/stockInventory/InventoryDetail",
      method: "get",
      params,
    });
  },
  InventoryStockList(params) {
    //库存盘点的库存详情（列表） 
    return request({
      url: "/api/v1/workbench/stock/stockInventory/InventoryStockList",
      method: "get",
      params,
    });
  },
  AbnormalStockList(params) {
    //库存盘点的异常库存列表
    return request({
      url: "/api/v1/workbench/stock/stockInventory/AbnormalStockList",
      method: "get",
      params,
    });
  },
  actionJournal(params) {
    //库存盘点的异常库存列表
    return request({
      url: "/api/v1/workbench/stock/stockInventory/actionJournal",
      method: "get",
      params,
    });
  },
};
