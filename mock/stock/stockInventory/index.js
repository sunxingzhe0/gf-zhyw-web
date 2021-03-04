/** @format */
import Mock, { Random } from "mockjs";
// import { getParams } from "@/utils/url";

/*
@name       stockInventoryList   
@desc       库存盘点列表          
@params     {
                pageNum         number      页码
                pageSize        number      每页数量
                keywords        string      搜索关键字
                createTime      string      创建时间
                inventoryTime   string      盘点时间
            }
@return     {   
                header      object      表头
                total       number      总记录数
                pageNum     number      当前页码
                pageSize    number      每页条数
                list        Array<{
                      id              number              id
                      name            string              盘点名称
                      inventoryTime   string              盘点时间
                      equipmentType   string              设备种类      
                      result          string              盘点结果
                      stockRepair     string              库存修复
                      inventoryUser   string              盘点人  
                      dept            string              所属科室  
                      createTime       string             创建日期  
                }>
            }
*/
Mock.mock(
  new RegExp("/api/v1/workbench/stock/stockInventory/stockInventoryList"),
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
          fieldName: "盘点名称",
          fixed: true,
          sorted: false,
          index: 1,
        },
        {
          field: "inventoryTime",
          dataField: "inventoryTime",
          fieldName: "盘点时间",
          fixed: true,
          sorted: false,
          index: 2,
        },
        {
          field: "equipmentType",
          dataField: "equipmentType",
          fieldName: "设备种类",
          fixed: true,
          sorted: false,
          index: 3,
        },
        {
          field: "result",
          dataField: "result",
          fieldName: "盘点结果",
          fixed: true,
          sorted: false,
          index: 3,
        },
        {
          field: "stockRepair",
          dataField: "stockRepair",
          fieldName: "库存修复",
          fixed: true,
          sorted: false,
          index: 3,
        },
        {
          field: "inventoryUser",
          dataField: "inventoryUser",
          fieldName: "盘点人",
          fixed: true,
          sorted: false,
          index: 3,
        },
        {
          field: "dept",
          dataField: "dept",
          fieldName: "所属科室",
          fixed: true,
          sorted: false,
          index: 3,
        },
        {
          field: "createTime",
          dataField: "createTime",
          fieldName: "创建日期",
          fixed: true,
          sorted: false,
          index: 3,
        },
      ],
      list: Mock.mock({
        [`value|${10}`]: [
          {
            index: "1",
            id: () => Random.id(), //id
            name: () => "盘点" + Random.csentence(3, 6), //物资名称
            inventoryTime: () => Random.datetime() + "~" + Random.datetime(), //盘点时间
            equipmentType: "大型家电", //设备类型
            "result|1": ["正常", "异常", "未知"], //盘点结果
            "stockRepair|1": ["是", "否"], //库存修复
            inventoryUser: () => Random.cname(3), //盘点人
            dept: "外科一", //所属科室
            createTime: () => Random.datetime(), //创建日期
          },
        ],
      }).value,
      cause: null,
    });
  }
);

/*
@name       InventoryDetail   
@desc       库存盘点详情        
@params     {
                id         number      盘点id
            }
@return     {   
                name            string              盘点名称
                inventoryTime   string              盘点时间
                equipmentType   string              设备种类   
                equipmentNumber   string            设备数量      
                result          string              盘点结果
                stockRepair     string              库存修复
                inventoryUser   string              盘点人  
                dept            string              所属科室  
                createTime       string             创建日期  
            }
*/
Mock.mock(
  new RegExp("/api/v1/workbench/stock/stockInventory/InventoryDetail"),
  "get",
  function() {
    return Mock.res(
      
     Mock.mock({
      id: Random.id(), //id
      name: "盘点" + Random.csentence(3, 6), //物资名称
      inventoryTime: Random.datetime() + "~" + Random.datetime(), //盘点时间
      equipmentType: "大型家电", //设备类型
      equipmentNumber:Random.integer(10, 2000),//设备数量
      "result|1": ["正常", "异常", "未知"], //盘点结果
      "stockRepair|1": ["是", "否"], //库存修复
      inventoryUser: Random.cname(3), //盘点人
      dept: "外科一", //所属科室
      createTime: Random.datetime(), //创建日期
    }));
  }
);


/*
@name       InventoryStockList   
@desc       库存盘点的库存详情（列表）        
@params     {
                pageNum         number      页码
                pageSize        number      每页数量
                keywords        string      搜索关键字
            }
@return     {   
                header      object      表头
                total       number      总记录数
                pageNum     number      当前页码
                pageSize    number      每页条数
                list        Array<{
                  id  id
                  code            string      物资编码
                  name            string      物资名称
                  model           string      物资型号
                  manufacturer    string      生产商
                  equipmentType   string      设备类型
                  unit            string      物资单位
                  number          string      库存数量
                  price           string      设备单价
                  inventoryNumber string      盘点数量
                }>
            }
*/
Mock.mock(
  new RegExp("/api/v1/workbench/stock/stockInventory/InventoryStockList"),
  "get",
  function() {
    return Mock.res({
      total: 12,
      pageNum: 1,
      pageSize: 10,
      headers: [
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
          field: "price",
          dataField: "price",
          fieldName: "物资单价",
          fixed: true,
          sorted: false,
          index: 3,
        },
        {
          field: "number",
          dataField: "number",
          fieldName: "库存数量",
          fixed: true,
          sorted: false,
          index: 3,
        },
        {
          field: "inventoryNumber",
          dataField: "inventoryNumber",
          fieldName: "盘点数量",
          fixed: true,
          sorted: false,
          index: 3,
        },
      ],
      list: Mock.mock({
        [`value|${10}`]: [
          {
            index: "1",
            id: () => Random.id(), //id
            code: () => Random.string("number", 5, 5), //物资编码
            name: () => Random.csentence(3, 6), //物资名称
            model: "X62-h53t7", //物资型号
            manufacturer: () => Random.csentence(4, 5), //生产商
            equipmentType: "大型家电", //设备类型
            unit: "台", //物资单位
            number: () => Random.integer(10, 100),//库存数量
            price: () => Random.integer(1000, 10000),//设备单价
            inventoryNumber: () => Random.integer(10, 100),//盘点数量
          },
        ],
      }).value,
      cause: null,
    });
  }
);


/*
@name       AbnormalStockList   
@desc       库存盘点的异常库存列表      
@params     {
                pageNum         number      页码
                pageSize        number      每页数量
                keywords        string      搜索关键字
            }
@return     {   
                header      object      表头
                total       number      总记录数
                pageNum     number      当前页码
                pageSize    number      每页条数
                list        Array<{
                  id  id
                  code            string      物资编码
                  name            string      物资名称
                  model           string      物资型号
                  manufacturer    string      生产商
                  equipmentType   string      设备类型
                  unit            string      物资单位
                  number          string      库存数量
                  price           string      设备单价
                  inventoryNumber string      盘点数量
                  abnormalNumber  string      差异数量
                }>
            }
*/
Mock.mock(
  new RegExp("/api/v1/workbench/stock/stockInventory/AbnormalStockList"),
  "get",
  function() {
    return Mock.res({
      total: 12,
      pageNum: 1,
      pageSize: 10,
      headers: [
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
          field: "price",
          dataField: "price",
          fieldName: "物资单价",
          fixed: true,
          sorted: false,
          index: 3,
        },
        {
          field: "number",
          dataField: "number",
          fieldName: "库存数量",
          fixed: true,
          sorted: false,
          index: 3,
        },
        {
          field: "inventoryNumber",
          dataField: "inventoryNumber",
          fieldName: "盘点数量",
          fixed: true,
          sorted: false,
          index: 3,
        },
        {
          field: "abnormalNumber",
          dataField: "abnormalNumber",
          fieldName: "差异数量",
          fixed: true,
          sorted: false,
          index: 3,
        },
      ],
      list: Mock.mock({
        [`value|${10}`]: [
          {
            index: "1",
            id: () => Random.id(), //id
            code: () => Random.string("number", 5, 5), //物资编码
            name: () => Random.csentence(3, 6), //物资名称
            model: "X62-h53t7", //物资型号
            manufacturer: () => Random.csentence(4, 5), //生产商
            equipmentType: "大型家电", //设备类型
            unit: "台", //物资单位
            number: () => Random.integer(10, 100),//库存数量
            price: () => Random.integer(1000, 10000),//设备单价
            inventoryNumber: () => Random.integer(10, 100),//盘点数量
            abnormalNumber: () => Random.integer(10, 100),//差异数量
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
  new RegExp("/api/v1/workbench/stock/stockInventory/actionJournal"),
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
