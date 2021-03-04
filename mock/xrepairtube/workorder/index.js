/** @format */
import Mock, { Random } from "mockjs";
import { getParams } from "@/utils/url";
/* 维修工单-更多 */
Mock.mock(
  new RegExp("/api/v1/xrepairtube/workorder/getOrderList"),
  "get",
  function(req) {
    console.log(getParams(req.url));
    return Mock.res({
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
          field: "userName",
          dataField: "userName",
          fieldName: "报修人姓名",
          fixed: true,
          sorted: false,
          index: 3,
        },
        {
          field: "userNo",
          dataField: "userNo",
          fieldName: "报修人工号",
          fixed: true,
          sorted: false,
          index: 3,
        },
        {
          field: "userPhone",
          dataField: "userPhone",
          fieldName: "报修人电话",
          fixed: true,
          sorted: false,
          index: 3,
        },
        {
          field: "dept",
          dataField: "dept",
          fieldName: "报修科室",
          fixed: true,
          sorted: false,
          index: 3,
        },
        {
          field: "content",
          dataField: "content",
          fieldName: "报修内容",
          fixed: true,
          sorted: false,
          index: 3,
        },
        {
          field: "createTime",
          dataField: "createTime",
          fieldName: "报修日期",
          fixed: true,
          sorted: false,
          index: 3,
        },
        {
          field: "actionName",
          dataField: "actionName",
          fieldName: "执行人姓名",
          fixed: true,
          sorted: false,
          index: 3,
        },
        {
          field: "group",
          dataField: "group",
          fieldName: "受理班组",
          fixed: true,
          sorted: false,
          index: 3,
        },
        {
          field: "repairLong",
          dataField: "repairLong",
          fieldName: "维修时长",
          fixed: true,
          sorted: false,
          index: 3,
        },
        {
          field: "stateName",
          dataField: "stateName",
          fieldName: "状态",
          fixed: true,
          sorted: false,
          index: 3,
        },
        {
          field: "operation",
          dataField: "operation",
          fieldName: "操作",
          fixed: true,
          sorted: false,
          index: 3,
        },
      ],
      pages: 1,
      total: 12,
      pageNum: 1,
      pageSize: 10,
      prePage: 0,
      nextPage: 0,
      extData: {},
      list: Mock.mock({
        [`value|${10}`]: [
          {
            id: () => Random.id(),

            content: "xxxxxxx",
            state: "1", //状态
            stateName: "待处理", //状态名
            userName: () => Random.cname(), //报修人姓名
            userNo: "0021314", //报修人工号
            userPhone: "18547896324", //报修人电话
            dept: "外科一", //报修科室
            createTime: () => Random.datetime(),
            actionName: () => Random.cname(), //执行人姓名
            group: "工程部一组", //受理班组
            repairLong: "205分钟",
            operation: "查看",
          },
        ],
      }).value,
      cause: null,
    });
  }
);

/* 工单详情-备件记录 */
Mock.mock(
  new RegExp("/api/v1/xrepairtube/workorder/getRecord"),
  "get",
  function(req) {
    console.log(getParams(req.url));
    return Mock.res({
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
          field: "userName",
          dataField: "userName",
          fieldName: "申领人姓名",
          fixed: true,
          sorted: false,
          index: 3,
        },
        {
          field: "userNo",
          dataField: "userNo",
          fieldName: "申领人工号",
          fixed: true,
          sorted: false,
          index: 3,
        },
        {
          field: "userPhone",
          dataField: "userPhone",
          fieldName: "申领人电话",
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
          field: "content",
          dataField: "content",
          fieldName: "申领内容",
          fixed: true,
          sorted: false,
          index: 3,
        },
        {
          field: "num",
          dataField: "num",
          fieldName: "申领数量",
          fixed: true,
          sorted: false,
          index: 3,
        },
        {
          field: "stateName",
          dataField: "stateName",
          fieldName: "状态",
          fixed: true,
          sorted: false,
          index: 3,
        },
        {
          field: "time",
          dataField: "time",
          fieldName: "申领日期",
          fixed: true,
          sorted: false,
          index: 3,
        },
      ],
      pages: 1,
      total: 12,
      pageNum: 1,
      pageSize: 10,
      prePage: 0,
      nextPage: 0,
      extData: {},
      list: Mock.mock({
        [`value|${10}`]: [
          {
            id: () => Random.id(),

            content: "xxxxxxx",
            stateName: "已通过", //状态名
            userName: () => Random.cname(), //申领人姓名
            userNo: "0021314", //申领人工号
            userPhone: "18547896324", //报修人电话
            dept: "外科一", //申领科室
            num: () => Random.integer(1, 100),
            time: () => Random.datetime(),
          },
        ],
      }).value,
      cause: null,
    });
  }
);
