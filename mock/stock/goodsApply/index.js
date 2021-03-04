/** @format */
import Mock, { Random } from "mockjs";
// import { getParams } from "@/utils/url";

/*
@name       getPlanList   
@desc       任务提醒列表          
@params     {
                pageNum     number      页码
                pageSize    number      每页数量
                keywords    string      搜索关键字
            }
@return     {   
                header      object      表头
                total       number      总记录数
                pageNum     number      当前页码
                pageSize    number      每页条数
                list        Array<{
                    id              number              id
                    name            string              申请人姓名
                    jobNo           string              申请人工号
                    phone           string              申请人电话
                    dept            string              申领科室
                    content         string              申领内容
                    number          string              申领数量  
                    status          string              状态
                    applyTime       string              申领时间[2020-12-12 12:12:12]
                }>
            }
*/
Mock.mock(
  new RegExp("/api/v1/workbench/stock/goodsApply/applyList"),
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
          fieldName: "申请人姓名",
          fixed: true,
          sorted: false,
          index: 2,
        },
        {
          field: "jobNo",
          dataField: "jobNo",
          fieldName: "申请人工号",
          fixed: true,
          sorted: false,
          index: 3,
        },
        {
          field: "phone",
          dataField: "phone",
          fieldName: "申请人电话",
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
          field: "number",
          dataField: "number",
          fieldName: "申领数量",
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
            name: () => Random.cname(), // 申请人姓名
            jobNo: () => Random.string("number", 5, 6), // 申请人工号
            phone: "18547896324", // 申请人电话
            dept: "外科一", // 申领科室
            content: "工具+扳手；工具+铝合金梯子；工... ", // 申领内容
            number: () => Random.natural(1, 100), // 申领数量
            "status|1": ["1", "2", "3"], //状态 1待审核 2已通过 3已驳回
            applyTime: () => Random.datetime(), //申领时间[2020-12-12 12:12:12]
          },
        ],
      }).value,
      cause: null,
    });
  }
);

/*
@name       getPlanList   
@desc       任务提醒列表          
@params     {
                pageNum     number      页码
                pageSize    number      每页数量
                keywords    string      搜索关键字
            }
@return     {   
                id              string        //单据号
                createTime      string        //创建日期
                status          string        //单据状态
                statusName      string        //单据状态
                content         object        //申领内容
                approval        object        //审批情况
                
            }
*/
//申领详情
Mock.mock(
  new RegExp("/api/v1/workbench/stock/goodsApply/applyDetail"),
  "get",
  {
    state: true,
    message: "SUCCESS",
    body: {
      id: "6998465656465", //单据号
      createTime: "2020-11-27 12:20:14", //创建日期
      status: "1", //单据状态
      statusName: "待审核", //单据状态
      content: {
        order: Random.string("number", 8, 10), //关联工单
        dept: "外科一", //申领科室
        applyUser: "王尼玛,0021314,18547896324", //申领人信息
        applyTime: Random.datetime(), //申领时间[2020-12-12 12:12:12]
        // content:"1.类型+物资名称 *2      2.类型+物资名称 *2      3.类型+物资名称 *2",
        contents: [
          //物资详情
          {
            index: 1,
            name: "扳手",
            type: "工具",
          },
          {
            index: 1,
            name: "电线",
            type: "工具",
          },
          {
            index: 1,
            name: "螺丝刀",
            type: "工具",
          },
        ],
        number: Random.natural(1, 100), // 数量
        reason:
          "这里是申领理由测试文案这里是报修内容测试文案这里是报修内容测试文案这里是报修内容测试文案这里是报修内容测试文案这里是申领这里是报修内容测试文案这里是报修内容测试文案这里是报修内容测试文案",
      },
      approval: {
        approvalUser: "王尼玛，0021314，18547896324", //审批人
        dept: "工程部一组", //所属部门
        approvalTime: Random.datetime(), //审批时间
        result: "驳回",
        resultId: "3",
        helpUsers: [
          {
            user: "王尼玛，0021314，18547896324",
            dept: "工程部一组",
          },
          {
            user: "王尼玛，0021314，18547896324",
            dept: "工程部一组",
          },
        ],
        reason:
          "这里是申领理由测试文案这里是报修内容测试文案这里是报修内容测试文案这里是报修内容测试文案这里是报修内容测试文案这里是申领这里是报修内容测试文案这里是报修内容测试文案这里是报修内容测试文案",
      },
    },
    cause: null,
  }
);

/*
@name       applyJournal   
@desc       申领详情日志
@params     {
                pageNum     number      页码
                pageSize    number      每页数量
                id          number      申领详情id
            }
@return     {   
                header      object      表头
                total       number      总记录数
                pageNum     number      当前页码
                pageSize    number      每页条数
                list        Array<{
                    content         string              操作内容
                    user            string              操作人  
                    createTime      string              日志创建时间[2020-12-12 12:12:12]       
                }>
            }
*/

//申领详情日志
Mock.mock(
  new RegExp("/api/v1/workbench/stock/goodsApply/applyJournal"),
  "get",
  {
    state: true,
    message: "SUCCESS",
    body: {
      // 表头数据: "",
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
          field: "content",
          dataField: "content",
          fieldName: "操作内容",
          fixed: true,
          sorted: false,
          index: 2,
        },
        {
          field: "user",
          dataField: "user",
          fieldName: "操作人",
          fixed: true,
          sorted: false,
          index: 3,
        },
        {
          field: "createTime",
          dataField: "createTime",
          fieldName: "操作时间",
          fixed: true,
          sorted: false,
          index: 3,
        },
      ],
      pages: 1,
      total: 12,
      pageNum: 1,
      pageSize: 10,

      list: Mock.mock({
        [`value|${10}`]: [
          {
            index: "1",
            id: "1",
            content: "这是一条操作内容  ",
            user: "姓名，科室  ",
            createTime: "2020-11-27 12:20:14",
          },
        ],
      }).value,
      prePage: 0,
      nextPage: 0,
      extData: {},
    },
    cause: null,
  }
);
