/** @format */
import Mock, { Random } from "mockjs";
// import { getParams } from "@/utils/url";

/*
@name       applyReviewList   
@desc       申领审核列表          
@params     {
                pageNum     number      页码
                pageSize    number      每页数量
                keywords    string      搜索关键字
            }
@return     {
                total       number      总记录数
                pageNum     number      当前页码
                pageSize    number      每页条数
                headers     Array       表头
                list        Array<{
                    id              number              id
                    status          number              审核状态 1待审核 2已通过 3已驳回 4待领取 5已完成
                    order           string              单据号
                    content         string              申领内容
                    reason          string              申领理由
                    user            string              申领人
                    name            string              申领人姓名
                    jobNo           string              申领人工号
                    phone           string              申领人电话
                    dept            string              申领科室
                    applyTime       string              申领时间[2020-12-12 12:12:12]
                    reviewTime      string              审核时间[2020-12-12 12:12:12]
                    useTime         string              领用时间[2020-12-12 12:12:12]
                }>
            }
*/
Mock.mock(
  new RegExp("/api/v1/workbench/stock/goodsReview/applyReviewList"),
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
          field: "order",
          dataField: "order",
          fieldName: "单据号",
          fixed: true,
          sorted: false,
          index: 2,
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
          field: "reason",
          dataField: "reason",
          fieldName: "申领理由",
          fixed: true,
          sorted: false,
          index: 3,
        },
        {
          field: "user",
          dataField: "user",
          fieldName: "申领人",
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
        {
          field: "reviewTime",
          dataField: "reviewTime",
          fieldName: "审核时间",
          fixed: true,
          sorted: false,
          index: 3,
        },
        {
          field: "useTime",
          dataField: "useTime",
          fieldName: "领用时间",
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
            "status|1": ["1", "2", "3", "4", "5"], //状态 1待审核 2已通过 3已驳回 4待领取 5已完成
            order: () => Random.string("number", 5, 5), //单据号
            content: () => Random.csentence(10, 30), //申领内容
            reason: () => Random.csentence(10, 30), //申领理由
            user: "王尼玛，0021314，18547896324", //物资型号
            name: "王尼玛", //申领人姓名
            jobNo: "0021314", //申领人工号
            phone: "18547896324", //申领人电话
            dept: "外科一", //收货仓库
            applyTime: () => Random.datetime(), //申领时间
            reviewTime: () => Random.datetime(), //审核时间
            useTime: () => Random.datetime(), // 领用时间
          },
        ],
      }).value,
      cause: null,
    });
  }
);

/*
@name       inStoreReviewList   
@desc       申领入库列表          
@params     {
                pageNum     number      页码
                pageSize    number      每页数量
                keywords    string      搜索关键字
            }
@return     {
                total       number      总记录数
                pageNum     number      当前页码
                pageSize    number      每页条数
                headers     Array       表头
                list        Array<{
                    id              number              id
                    code            string              物资编码
                    name            string              物资名称
                    model           string              物资型号
                    manufacturer    string              生产商
                    equipmentType   string              设备类型
                    unit            string              物资单位
                    store           string              收货仓库
                    inType          string              入库类型  1采购 2报溢
                    price           string              入库单价
                    number          string              入库数量  
                    actionUser      string              操作人 
                    createTime      string              创建时间
                    reviewTime      string              审核时间 

                    status          number              审核状态 1待审核 2已通过 3已驳回
                }>
            }
*/
Mock.mock(
  new RegExp("/api/v1/workbench/stock/goodsReview/inStoreReviewList"),
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
          fieldName: "设备类型",
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
          field: "inType",
          dataField: "inType",
          fieldName: "类型",
          fixed: true,
          sorted: false,
          index: 3,
        },
        {
          field: "price",
          dataField: "price",
          fieldName: "入库单价",
          fixed: true,
          sorted: false,
          index: 3,
        },
        {
          field: "number",
          dataField: "number",
          fieldName: "入库数量",
          fixed: true,
          sorted: false,
          index: 3,
        },
        {
          field: "actionUser",
          dataField: "actionUser",
          fieldName: "操作人",
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
          field: "reviewTime",
          dataField: "reviewTime",
          fieldName: "审核时间",
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
            "status|1": ["1", "2", "3"], //状态 1待审核 2已通过 3已驳回

            code: () => Random.string("number", 5, 5), //物资编码
            name: () => Random.csentence(3, 6), //物资名称
            model: "X62-h53t7", //物资型号
            manufacturer: () => Random.csentence(4, 5), //生产商
            equipmentType: "大型家电", //设备类型
            unit: "台", //物资单位
            "inType|1": ["1", "2"], //入库类型  1采购 2报溢

            price: () => Random.integer(1000, 10000),
            number: () => Random.integer(10, 100),
            actionUser: () => Random.cname(3), //操作人
            createTime: () => Random.datetime(), //创建时间
            reviewTime: () => Random.datetime(), //审核时间
          },
        ],
      }).value,
      cause: null,
    });
  }
);

/*
@name       inStoreReviewList   
@desc       申领出库列表          
@params     {
                pageNum     number      页码
                pageSize    number      每页数量
                keywords    string      搜索关键字
            }
@return     {
                total       number      总记录数
                pageNum     number      当前页码
                pageSize    number      每页条数
                headers     Array       表头
                list        Array<{
                    id              number              id
                    code            string              物资编码
                    name            string              物资名称
                    model           string              物资型号
                    manufacturer    string              生产商
                    equipmentType   string              设备类型
                    unit            string              物资单位
                    store           string              收货仓库
                    outType          string             出库类型  1领用 2报损 
                    price           string              出库单价
                    number          string              出库数量  
                    actionUser      string              操作人 
                    createTime      string              创建时间
                    reviewTime      string              审核时间 

                    status          number              审核状态 1待审核 2已通过 3已驳回
                }>
            }
*/
Mock.mock(
  new RegExp("/api/v1/workbench/stock/goodsReview/outStoreReviewList"),
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
          fieldName: "设备类型",
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
          field: "outType",
          dataField: "inType",
          fieldName: "类型",
          fixed: true,
          sorted: false,
          index: 3,
        },
        {
          field: "price",
          dataField: "price",
          fieldName: "出库单价",
          fixed: true,
          sorted: false,
          index: 3,
        },
        {
          field: "number",
          dataField: "number",
          fieldName: "出库数量",
          fixed: true,
          sorted: false,
          index: 3,
        },
        {
          field: "actionUser",
          dataField: "actionUser",
          fieldName: "操作人",
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
          field: "reviewTime",
          dataField: "reviewTime",
          fieldName: "审核时间",
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
            "status|1": ["1", "2", "3"], //状态 1待审核 2已通过 3已驳回

            code: () => Random.string("number", 5, 5), //物资编码
            name: () => Random.csentence(3, 6), //物资名称
            model: "X62-h53t7", //物资型号
            manufacturer: () => Random.csentence(4, 5), //生产商
            equipmentType: "大型家电", //设备类型
            unit: "台", //物资单位
            "inType|1": ["1", "2"], //出库类型  1采购 2报溢

            price: () => Random.integer(1000, 10000),
            number: () => Random.integer(10, 100),
            actionUser: () => Random.cname(3), //操作人
            createTime: () => Random.datetime(), //创建时间
            reviewTime: () => Random.datetime(), //审核时间
          },
        ],
      }).value,
      cause: null,
    });
  }
);
