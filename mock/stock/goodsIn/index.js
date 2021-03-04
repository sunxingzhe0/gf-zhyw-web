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
                total       number      总记录数
                pageNum     number      当前页码
                pageSize    number      每页条数
                headers     Array       表头
                list        Array<{
                    id              number              id
                    name            string              物资名称
                    model           string              物资型号
                    code            string              物资编码
                    manufacturer    string              生产商
                    equipmentType   string              设备类型
                    unit            string              物资单位
                    store      string              收货仓库
                    price           string              入库单价
                    number          string              入库数量  
                    actionUser      string              操作人
                    inTime          string              入库时间  
                    createTime      string              创建时间
                }>
            }
*/
Mock.mock(
  new RegExp("/api/v1/workbench/stock/goodsIn/goodsInList"),
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
          field: "store",
          dataField: "store",
          fieldName: "收货仓库",
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
          field: "price",
          dataField: "price",
          fieldName: "入库单价",
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
          field: "inTime",
          dataField: "inTime",
          fieldName: "入库时间",
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
            store: "光电园仓库", //收货仓库
            number: () => Random.integer(10, 100),
            price: () => Random.integer(1000, 10000),
            actionUser: () => Random.cname(3), // 操作人
            inTime: () => Random.datetime(), // 入库时间
            createTime: () => Random.datetime(), // 创建时间
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
                id          number      入库记录id
            }
@return     {   
                inType        string        入库类型 1采购 2报溢
                inStore       string        收货仓库
                number        number        入库数量
                allPrice      string        总价
                inUser        string        入库人
                inTime        string        入库时间
                order         string        关联单据
                status        string        单据状态 1待审核 2已通过 3已驳回
                reviewUser    string        审核人
                reviewTime    string        审核时间
                reason        string        报溢理由
                goods         object{       物资清单
                    header      Array       表头
                    list        Array<{
                        id              number              id
                        name            string              物资名称
                        model           string              物资型号
                        code            string              物资编码
                        manufacturer    string              生产商
                        equipmentType   string              设备类型
                        unit            string              物资单位
                        store      string              收货仓库
                        price           string              入库单价
                        number          string              入库数量  
                    }>
                }
            }
*/
Mock.mock(
  new RegExp("/api/v1/workbench/stock/goodsIn/goodsInRecord"),
  "get",
  function() {
    return Mock.res({
      inType: "1", //入库类型 1采购 2报溢
      inStore: "光电园仓库", //收货仓库
      number: Random.integer(10, 100), //入库数量
      allPrice: Random.integer(1000, 10000), //总价
      inUser: "王尼玛,0021314,18547896324", //入库人
      inTime: Random.datetime(), // 入库时间
      order: Random.string("number", 8, 8), //关联单据
      status: "1", //单据状态 1待审核 2已通过 3已驳回
      reviewUser: "王尼玛,0021314,18547896324", //审核人
      reviewTime: Random.datetime(), // 审核时间
      reason: Random.csentence(8, 15), //报溢理由
      total:4, //合计物资种类
      goods: {
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
            field: "store",
            dataField: "store",
            fieldName: "收货仓库",
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
            field: "price",
            dataField: "price",
            fieldName: "入库单价",
            fixed: true,
            sorted: false,
            index: 3,
          },
        ],
        list: Mock.mock({
          [`value|${4}`]: [
            {
              id: () => Random.id(), //id
              code: () => Random.string("number", 5, 5), //物资编码
              name: () => Random.csentence(3, 6), //物资名称
              model: "X62-h53t7", //物资型号
              manufacturer: () => Random.csentence(4, 5), //生产商
              equipmentType: "大型家电", //设备类型
              unit: "台", //物资单位
              store: "光电园仓库", //收货仓库
              number: () => Random.integer(10, 100),
              price: () => Random.integer(1000, 10000),
            },
          ],
        }).value,
      },
    });
  }
);
