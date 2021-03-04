/** @format */
import Mock, { Random } from "mockjs";
// import { getParams } from "@/utils/url";

/*
@name       goodsList   
@desc       物资列表          
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
                    id              number              id
                    name            string              物资名称
                    model           string              物资型号
                    code            string              物资编码
                    manufacturer    string              生产商
                    equipmentType   string              设备类型
                    unit            string              物资单位
                    number          string              物资数量  
                    price           string              物资单价
                }>
            }
*/
Mock.mock(
  new RegExp("/api/v1/workbench/stock/goodsManage/goodsList"),
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
            number: () => Random.integer(10, 100),
            price: () => Random.integer(1000, 10000),
          },
        ],
      }).value,
      cause: null,
    });
  }
);
