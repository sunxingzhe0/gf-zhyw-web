/** @format */
import Mock, { Random } from "mockjs";
// import { getParams } from "@/utils/url";

/*
@name       storeList   
@desc       仓库管理列表          
@params     {
                pageNum     number      页码
                pageSize    number      每页数量
                keywords    string      搜索关键字
            }
@return     {
                total       number      总记录数
                pageNum     number      当前页码
                pageSize    number      每页条数
                list        Array<{
                    id                  number              id
                    code                string              仓库编码
                    name                string              仓库名称
                    address             string              仓库地址
                    goodsTypeNumber     string              物资种类数量
                    stockTotal          string              库存总量
                    status              string              状态 1启用 2禁用
                    phone               string              仓库电话
                    desc                string              仓库简介
                }>
            }
*/
Mock.mock(
  new RegExp("/api/v1/workbench/stock/storeManage/storeList"),
  "get",
  function() {
    return Mock.res({
      total: 12,
      pageNum: 1,
      pageSize: 10,
      headers: [
        {
          field: "index",
          dataField: "index",
          fieldName: "序号",
          fixed: true,
          sorted: false,
          index: 1,
        },
        {
          field: "code",
          dataField: "code",
          fieldName: "仓库编码",
          fixed: true,
          sorted: false,
          index: 3,
        },
        {
          field: "name",
          dataField: "name",
          fieldName: "仓库名称",
          fixed: true,
          sorted: false,
          index: 3,
        },
        {
          field: "address",
          dataField: "address",
          fieldName: "仓库地址",
          fixed: true,
          sorted: false,
          index: 3,
        },
        {
          field: "goodsTypeNumber",
          dataField: "goodsTypeNumber",
          fieldName: "物资种类",
          fixed: true,
          sorted: false,
          index: 3,
        },
        {
          field: "stockTotal",
          dataField: "stockTotal",
          fieldName: "库存总量",
          fixed: true,
          sorted: false,
          index: 3,
        },
        {
          field: "status",
          dataField: "status",
          fieldName: "状态",
          fixed: true,
          sorted: false,
          index: 3,
        },
      ],
      list: Mock.mock({
        [`value|${10}`]: [
          {
            id: () => Random.id(), //id
            code: () => Random.string("number", 13, 13), //仓库编码
            name: () => {
              let res = "仓库" + Random.csentence(2, 3);
              return res.split("。")[0];
            }, //仓库名称
            address: () => Random.region() + Random.csentence(5, 8), //仓库地址
            goodsTypeNumber: () => Random.integer(1000, 10000), //物资种类
            stockTotal: () => Random.integer(1000, 10000), //库存总量
            "status|1": ["1", "2"], //物资单位
            phone: "13206204852", //仓库电话
            desc: () => Random.csentence(20, 50), //仓库简介
          },
        ],
      }).value,
      cause: null,
    });
  }
);
