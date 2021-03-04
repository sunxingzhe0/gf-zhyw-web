/** @format */
import Mock, { Random } from "mockjs";
// import { getParams } from "@/utils/url";

/*
@name       statisticsList   
@desc       库存统计列表          
@params     {
                pageNum     number      页码
                pageSize    number      每页数量
                date        String      查询时间
            }
@return     {   
                header      object      表头
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
                      number          string              库存数量  
                      inNumber        string              入库数量  
                      OutNumber       string              出库数量  
                }>
            }
*/
Mock.mock(
  new RegExp("/api/v1/workbench/stock/statistics/statisticsList"),
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
          field: "number",
          dataField: "number",
          fieldName: "库存数量",
          fixed: true,
          sorted: false,
          index: 3,
        },
        {
          field: "inNumber",
          dataField: "inNumber",
          fieldName: "入库数量",
          fixed: true,
          sorted: false,
          index: 3,
        },
        {
          field: "OutNumber",
          dataField: "OutNumber",
          fieldName: "出库数量",
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
            number: () => Random.integer(10, 100), //库存数量
            inNumber: () => Random.integer(10, 100), //入库数量
            OutNumber: () => Random.integer(10, 100), //出库数量
          },
        ],
      }).value,
      cause: null,
    });
  }
);
