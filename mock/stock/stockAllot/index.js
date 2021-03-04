/** @format */
import Mock, { Random } from "mockjs";
import { getParams } from "@/utils/url";

/*
@name       allotList   
@desc       库存调拨列表          
@params     {
                pageNum     number      页码
                pageSize    number      每页数量
                keywords    string      搜索关键字
                startTime   string      创建起始时间
                endTime     string      创建结束时间
                allotType   string      1审核列表 2执行列表
                   
            }
@return     {   
                header      object      表头
                total       number      总记录数
                pageNum     number      当前页码
                pageSize    number      每页条数
                list        Array<{
                      id                    number              id
                      title                 string              库存调拨标题
                      allotType             string              库存调拨类型
                      applyStore            string              申请仓库
                      outStore              string              出货仓库
                      inStore               string              入货仓库  
                      allotNumber           string              调拨物资数量
                      reason                string              调拨理由
                      createTime            string              创建时间[2020-12-12 12:12:12]
                      status                string              状态 1待审核 2已通过 3已驳回 4待出货 5出货中 6已完成
                }>
            }
*/
Mock.mock(
  new RegExp("/api/v1/workbench/stock/stockAllot/allotList"),
  "get",
  function(req) {
    let params = getParams(req.url);
    console.log(params);
    let statusList =
      params.allotType === "1"
        ? ["1", "2", "3"]
        : params.allotType === "2"
        ? ["4", "5", "6"]
        : ["1", "2", "3", "4", "5", "6"];
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
          field: "title",
          dataField: "title",
          fieldName: "标题",
          fixed: true,
          sorted: false,
          index: 2,
        },
        {
          field: "allotType",
          dataField: "allotType",
          fieldName: "调拨类型",
          fixed: true,
          sorted: false,
          index: 3,
        },
        {
          field: "applyStore",
          dataField: "applyStore",
          fieldName: "申请仓库",
          fixed: true,
          sorted: false,
          index: 3,
        },
        {
          field: "outStore",
          dataField: "outStore",
          fieldName: "出货仓库",
          fixed: true,
          sorted: false,
          index: 3,
        },
        {
          field: "inStore",
          dataField: "inStore",
          fieldName: "入货仓库",
          fixed: true,
          sorted: false,
          index: 3,
        },
        {
          field: "allotNumber",
          dataField: "allotNumber",
          fieldName: "调拨物资数量",
          fixed: true,
          sorted: false,
          index: 3,
        },
        {
          field: "reason",
          dataField: "reason",
          fieldName: "调拨理由",
          fixed: true,
          sorted: false,
          index: 3,
        },
        {
          field: "createTime",
          dataField: "createTime",
          fieldName: "创建时间",
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
            id: () => Random.id(), // id

            title: () => "调拨" + Random.csentence(3, 5), // 库存调拨标题
            allotType: "正常转移", // 库存调拨类型
            applyStore: () => "仓库" + Random.csentence(3, 5), // 申请仓库
            outStore: () => "仓库" + Random.csentence(3, 5), // 出货仓库
            inStore: () => "仓库" + Random.csentence(3, 5), // 入货仓库
            allotNumber: () => Random.natural(1, 100), // 调拨物资数量
            reason: () => Random.csentence(20, 30), //调拨理由
            createTime: () => Random.datetime(), //创建时间[2020-12-12 12:12:12]
            "status|1": statusList, // 状态 1待审核 2已通过 3已驳回 4待出货 5出货中 6已完成
          },
        ],
      }).value,
      cause: null,
    });
  }
);

/*
@name       allotDetail   
@desc       库存调拨详情      
@params     {
                id     number      id
            }
@return     {   
              id                    number              id
              title                 string              库存调拨标题
              allotType             string              库存调拨类型
              applyStore            string              申请仓库
              outStore              string              出货仓库
              inStore               string              入货仓库  
              allotNumber           string              调拨物资数量
              reason                string              调拨理由
              createTime            string              创建时间[2020-12-12 12:12:12]
              createUser            string              创建人
              status                string              状态 1待审核 2已通过 3已驳回 4待出货 5出货中 6已完成
              progress              array<{             审核进度
                status              string              进度状态 1已通过 2进行中 3已驳回
                title               string              标题
                actionTime          string              执行时间[2020-12-12 12:12:12]
                type                string              类型 1提交 2审核
                userName            string              负责人姓名
              }>
            }
*/
Mock.mock(
  new RegExp("/api/v1/workbench/stock/stockAllot/allotDetail"),
  "get",
  function() {
    return Mock.res(
      Mock.mock({
        id: Random.id(), // id

        title: "调拨" + Random.csentence(3, 5), // 库存调拨标题
        allotType: "正常转移", // 库存调拨类型
        applyStore: "仓库" + Random.csentence(3, 5), // 申请仓库
        outStore: "仓库" + Random.csentence(3, 5), // 出货仓库
        inStore: "仓库" + Random.csentence(3, 5), // 入货仓库
        allotNumber: Random.natural(1, 100), // 调拨物资数量
        reason: Random.csentence(20, 30), //调拨理由
        createTime: Random.datetime(), //创建时间[2020-12-12 12:12:12]
        createUser: Random.cname(3), //创建人
        "status|1": ["1", "2", "3", "4", "5", "6"], // 状态 1待审核 2已通过 3已驳回 4待出货 5出货中 6已完成
        progress: [
          {
            status: "1", // 进度状态
            title: "提交申请", //
            actionTime: "2020.01.02 19:20:30",
            type: "1",
            userName: "王尼玛",
          },
          {
            status: "2", // 进度状态
            title: "审核1", //
            actionTime: "2020.01.02 19:20:30",
            type: "2",
            userName: "王尼玛",
          },
          {
            status: "2", // 进度状态
            title: "审核2", //
            actionTime: "2020.01.02 19:20:30",
            type: "2",
            userName: "王尼玛",
          },
          {
            status: "2", // 进度状态
            title: "审核3", //
            actionTime: "2020.01.02 19:20:30",
            type: "2",
            userName: "王尼玛",
          },
        ],
      })
    );
  }
);

/*
@name       allotContentList   
@desc       调拨详情调拨内容物资列表          
@params     {
                pageNum     number      页码
                pageSize    number      每页数量
                keywords    string      搜索关键字
                id          string      id
            }
@return     {
                total       number      总记录数
                pageNum     number      当前页码
                pageSize    number      每页条数
                list        Array<{
                    id              number              id
                    code            string              物资编码
                    name            string              物资名称
                    model           string              物资型号
                    manufacturer    string              生产商
                    equipmentType   string              设备类型
                    unit            string              物资单位
                    applyNumber     string              申请数量  
                    allotNumber     string              调拨数量
                }>
            }
*/
Mock.mock(
  new RegExp("/api/v1/workbench/stock/stockAllot/allotContentList"),
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
          fieldName: "物资编码",
          fixed: true,
          sorted: false,
          index: 2,
        },
        {
          field: "name",
          dataField: "name",
          fieldName: "物资名称",
          fixed: true,
          sorted: false,
          index: 3,
        },
        {
          field: "model",
          dataField: "model",
          fieldName: "物资型号",
          fixed: true,
          sorted: false,
          index: 3,
        },
        {
          field: "manufacturer",
          dataField: "manufacturer",
          fieldName: "生产商",
          fixed: true,
          sorted: false,
          index: 3,
        },
        {
          field: "equipmentType",
          dataField: "equipmentType",
          fieldName: "大型家电",
          fixed: true,
          sorted: false,
          index: 3,
        },
        {
          field: "unit",
          dataField: "unit",
          fieldName: "物资单位",
          fixed: true,
          sorted: false,
          index: 3,
        },
        {
          field: "applyNumber",
          dataField: "applyNumber",
          fieldName: "申请数量",
          fixed: true,
          sorted: false,
          index: 3,
        },
        {
          field: "allotNumber",
          dataField: "allotNumber",
          fieldName: "调拨数量",
          fixed: true,
          sorted: false,
          index: 3,
        },
      ],
      list: Mock.mock({
        [`value|${10}`]: [
          {
            id: () => Random.id(), //id
            code: () => Random.string("number", 5, 5), //物资编码
            name: () => Random.csentence(3, 6), //物资名称
            model: "X62-h53t7", //物资型号
            manufacturer: () => Random.csentence(4, 5), //生产商
            equipmentType: "大型家电", //设备类型
            unit: "台", //物资单位
            applyNumber: () => Random.integer(10, 100), //申请数量
            allotNumber: () => Random.integer(10, 100), //调拨数量
          },
        ],
      }).value,
      cause: null,
    });
  }
);

/*
@name       actionJournal   
@desc       操作日志
@params     {
                pageNum     number      页码
                pageSize    number      每页数量
                id          number      id
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

//操作日志
Mock.mock(
  new RegExp("/api/v1/workbench/stock/stockAllot/actionJournal"),
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
