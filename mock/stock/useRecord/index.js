/** @format */
import Mock, { Random } from "mockjs";
// import { getParams } from "@/utils/url";

/*
@name       useRecordList   
@desc       获取领用记录列表          
@params     {
                pageNum     number      页码
                pageSize    number      每页数量
                keywords    string      搜索关键字
                useUser     string      领用人
            }
@return     {   
                header      object      表头
                total       number      总记录数
                pageNum     number      当前页码
                pageSize    number      每页条数
                list        Array<{
                      id              number              id
                      name            string              物资名称
                      type            string              物资类型
                      number          string              申领数量  
                      applyName       string              申请人姓名
                      applyUserNo     string              申请人工号
                      dept            string              申领科室
                      applyTime       string              申领时间[2020-12-12 12:12:12]
                }>
            }
*/
Mock.mock(
  new RegExp("/api/v1/workbench/stock/useRecord/useRecordList"),
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
          field: "name",
          dataField: "name",
          fieldName: "物资名称",
          fixed: true,
          sorted: false,
          index: 2,
        },
        {
          field: "type",
          dataField: "type",
          fieldName: "物资类型",
          fixed: true,
          sorted: false,
          index: 3,
        },
        {
          field: "number",
          dataField: "number",
          fieldName: "领用数量",
          fixed: true,
          sorted: false,
          index: 3,
        },
        {
          field: "applyName",
          dataField: "applyName",
          fieldName: "领用人姓名",
          fixed: true,
          sorted: false,
          index: 3,
        },
        {
          field: "applyUserNo",
          dataField: "applyUserNo",
          fieldName: "领用人工号",
          fixed: true,
          sorted: false,
          index: 3,
        },
        {
          field: "dept",
          dataField: "dept",
          fieldName: "申领科室",
          fixed: true,
          sorted: false,
          index: 3,
        },
        {
          field: "applyTime",
          dataField: "applyTime",
          fieldName: "申领时间",
          fixed: true,
          sorted: false,
          index: 3,
        },
      ],
      list: Mock.mock({
        [`value|${10}`]: [
          {
            id: () => Random.id(), // id
            name: () => Random.csentence(3, 5), // 物资名称
            type: "工具类", // 物资类型
            applyName: () => Random.cname(), // 申请人姓名
            applyUserNo: () => Random.string("number", 5, 6), // 申请人工号
            dept: "外科一", // 申领科室
            number: () => Random.natural(1, 100), // 申领数量
            applyTime: () => Random.datetime(), //申领时间[2020-12-12 12:12:12]
          },
        ],
      }).value,
      cause: null,
    });
  }
);
