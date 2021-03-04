const Mock = require("mockjs");
const Random = Mock.Random;

module.exports = [
  /*
  @name       getPointList   
  @desc       获取巡检点列表          
  @params     {
                  keyword     string      巡检点关键字
                  createdTime string      巡检点创建日期
                  pageNum     number      巡检点页码
                  pageSize    number      巡检点每页数量
              }
  @return     {
                  total       number      总记录数
                  pageNum     number      当前页码
                  pageSize    number      每页条数
                  list        Array<{
                      id                  number      巡检点id
                      bim_id              string      巡检点BIM构件id
                      bim_name            string      巡检点BIM构件名称
                      code                string      巡检点编码
                      name                string      巡检点名称
                      createdTime         string      创建时间[2020-12-12 12:12:12]
                      buildingId          string      巡检点楼宇id
                      buildingName        string      巡检点楼宇名称
                      bim_buildingId      string      巡检点BIM楼宇构件id
                      bim_buildingName    string      巡检点BIM楼宇构件名称
                      floorId             string      巡检点楼层id
                      floorName           string      巡检点楼层名称
                      bim_floorId         string      巡检点BIM楼层构件id
                      bim_floorName       string      巡检点BIM楼层构件名称
                  }>
              }
  */
  {
    url: "/api/v1/operations/inspection/point/getPointList",
    handler(req) {
      const params = req.query;
      return {
        total: Random.d100(),
        pageNum: params.pageNum,
        pageSize: params.pageSize,
        list: Mock.mock({
          [`value|${params.pageSize}`]: [
            {
              id: () => Random.id(),
              bim_id: () => Random.guid(),
              bim_name: () => Random.csentence(4, 20),
              code: () => Random.string(7),
              name: () => Random.csentence(4, 20),
              createdTime: () => Random.datetime(),
              buildingId: () => Random.id(),
              buildingName: () => Random.csentence(4, 20),
              bim_buildingId: () => Random.guid(),
              bim_buildingName: () => Random.csentence(4, 20),
              floorId: () => Random.id(),
              floorName: () => Random.csentence(4, 20),
              bim_floorId: () => Random.guid(),
              bim_floorName: () => Random.csentence(4, 20),
            },
          ],
        }).value,
      };
    },
  },
  /*
  @name       saveOrUpdate          
  @desc       保存巡检点基本信息（无id为新增）    
  @params     {
                id            string            巡检点id（无id为新增）
                name          string            巡检点名称
                buildingId    string            巡检点所属区域楼宇id
                buildingName  string            巡检点所属区域楼宇名称
                floorId       string            巡检点所属区域楼层id
                floorName     string            巡检点所属区域楼层名称
                type          number            巡检类型 1-现场巡检 2-设备巡检
                longitude     number            巡检点经度
                latitude      number            巡检点纬度
                address       string            巡检点地址
                rfId          string            巡检点RFID
                imgCount      number            拍照数量 默认最大为9
                offLine       boolean           是否开启离线巡检（false否  true是)
                content       string            巡检内容，当类型为现场巡检时填写
              }   
  @return        
  */
  {
    url: "/api/v1/operations/inspection/point/saveOrUpdate",
    method: "post",
    handler() {
      return {
        id: Random.id(),
      };
    },
  },
  /*
  @name       delPoint        
  @desc       删除巡检点
  @params     id      string    巡检点id   
  @return     status  string    success 
  */
  {
    url: "/api/v1/operations/inspection/point/delPoint",
    method: "delete",
    handler() {
      return {
        status: "success",
      };
    },
  },
  /*
  @name      getBaseInfo    
  @desc      获取巡检点基本信息    
  @params    id               string        巡检点id    
  @return    id               string        巡检点id
             code             string        编号
             name             string        名称   
             area             array<{       所属区域
                  id          string        区域id
                  name        string        区域名称  
             }> 
             inspectionType   string        巡检类型{现场: "site", 设备: "device"} 
             gisLog           string        GIS经度
             gisLat           string        GIS纬度
             address          string        地址
             rfid             string        RFID
             photoNum         number        拍照数量
             offLine          number        是否离线巡检（1是0否）
  */
  {
    url: "/api/v1/operations/inspection/point/getBaseInfo",
    handler() {
      return {
        id: Random.id(),
        code: Random.word(4, 8),
        name: Random.name(),
        area: Mock.mock({
          [`value|3`]: [
            {
              id: () => Random.id(),
              name: () => Random.name(),
            },
          ],
        }).value,
        inspectionType: Random.pick(["site", "device"]),
        gisLog: Random.float(0, 360),
        gisLat: Random.float(0, 180),
        address: Random.csentence(4, 20),
        rfid: Random.guid(),
        photoNum: Random.d12(),
        offLine: Number(Random.bool()),
      };
    },
  },
  /*
  @name       getRelateDevice   
  @desc       获取巡检点关联设备列表         
  @params     {
                  pointId       string      巡检点id
                  deviceTypeId  string      设备类型id
                  buildingId    string      楼宇id
                  floorId       string      楼层id
                  roomId        string      房间id
                  keyword       string      巡检点关键字
                  createdTime   string      巡检点创建日期
                  pageNum       number      巡检点页码
                  pageSize      number      巡检点每页数量
              }
  @return     {
                  headers     Array<{
                    field       string      数据字段key
                    fieldName   string      数据字段名称
                  }>
                  total       number      总记录数
                  pageNum     number      当前页码
                  pageSize    number      每页条数
                  list        Array<{
                      id                  number      巡检点设备id
                      bim_id              string      巡检点设备BIM构件id
                      bim_name            string      巡检点设备BIM构件名称
                      code                string      巡检点设备编码
                      name                string      巡检点设备名称
                      type                string      巡检点设备类型
                      typeId              string      巡检点设备类型id
                      model               string      设备型号
                      content             string      巡检内容
                      createdTime         string      创建时间[2020-12-12 12:12:12]
                      buildingId          string      巡检点楼宇id
                      buildingName        string      巡检点楼宇名称
                      bim_buildingId      string      巡检点BIM楼宇构件id
                      bim_buildingName    string      巡检点BIM楼宇构件名称
                      floorId             string      巡检点楼层id
                      floorName           string      巡检点楼层名称
                      bim_floorId         string      巡检点BIM楼层构件id
                      bim_floorName       string      巡检点BIM楼层构件名称
                      roomId              string      巡检点房间id
                      roomName            string      巡检点房间名称
                      bim_roomId          string      巡检点BIM房间构件id
                      bim_roomName        string      巡检点BIM房间构件名称
                  }>
              }
  */
  {
    url: "/api/v1/operations/inspection/point/getPointList",
    handler(req) {
      const params = req.query;
      return {
        headers: [
          { field: "index", fieldName: "序号" },
          { field: "name", fieldName: "设备名称" },
          { field: "type", fieldName: "设备类型" },
          { field: "buildingName", fieldName: "所属区域" },
          { field: "content", fieldName: "巡检内容" },
          { field: "createdTime", fieldName: "操作日期" },
        ],
        total: Random.d100(),
        pageNum: Number(params.pageNum || 1),
        pageSize: Number(params.pageSize || 20),
        list: Mock.mock({
          [`value|${params.pageSize || 20}`]: [
            {
              id: () => Random.id(),
              index: () =>
                (params.pageNum - 1) * params.pageSize + Random.increment(),
              bim_id: () => Random.guid(),
              bim_name: () => Random.csentence(4, 20),
              code: () => Random.string(7),
              name: () => Random.csentence(4, 20),
              type: () => Random.name(),
              model: () => Random.sentence(4, 20),
              typeId: () => Random.id(),
              content: () => Random.csentence(4, 40),
              createdTime: () => Random.datetime(),
              buildingId: () => Random.id(),
              buildingName: () => Random.csentence(4, 20),
              bim_buildingId: () => Random.guid(),
              bim_buildingName: () => Random.csentence(4, 20),
              floorId: () => Random.id(),
              floorName: () => Random.csentence(4, 20),
              bim_floorId: () => Random.guid(),
              bim_floorName: () => Random.csentence(4, 20),
              roomId: () => Random.guid(),
              roomName: () => Random.csentence(4, 20),
              bim_roomId: () => Random.guid(),
              bim_roomName: () => Random.csentence(4, 20),
            },
          ],
        }).value,
      };
    },
  },

  /*
  @name        getInspectionProjects   
  @desc        获取巡检点检查项目（巡检点详情）  
  @params      pointId      string      巡检点id  
  @return      Array<{
                  id        string      设备id
                  name      string      设备名称
                  model     string      设备型号
                  code      string      设备编号
                  contents   Array<{    巡检内容，模型与巡检内容相同
                    id                  string          巡检内容id
                    name                string          巡检内容名称
                    type                array<string>   巡检内容适用类型{ 设备巡检: device, 现场巡检: site}
                    ways                string          巡检内容录入方式{ 录入: input, 选择: select }
                    content             string          巡检内容-内容
                    ranges               string          巡检内容可选值（当录入方式为选择时， 以英文逗号分割）
                  }>
               }>  
  */
  {
    url: "/api/v1/operations/inspection/point/getInspectionProjects",
    handler() {
      return Mock.mock({
        [`value|${Random.d20()}`]: [
          {
            id: () => Random.id(),
            name: () => Random.name(),
            code: () => Random.word(4, 8),
            model: () => Random.sentence(4, 20),
            contents: () =>
              Mock.mock({
                [`value|${Random.d20()}`]: [
                  {
                    id: () => Random.id(),
                    name: () => Random.csentence(4, 20),
                    type: () => Random.shuffle(["device", "site"], 1, 2),
                    ways: () => Random.pick(["input", "select"]),
                    ranges: () =>
                      Mock.mock({
                        "value|1-4": [Random.csentence(4, 20)],
                      }).value.join(),
                    content: () => Random.csentence(2, 8),
                    createdTime: () => Random.datetime(),
                  },
                ],
              }).value,
          },
        ],
      }).value;
    },
  },
  /*
  @name          getInspectRecord
  @desc          巡检点详情-获取巡检记录
  @params        pointId    string    巡检点id
  @return        array<{
                    id                  string      记录id
                    time                string      巡检时间
                    executorId          string      执行人id
                    executotName        string      执行人姓名
                    executorDepartId    string      执行人科室id
                    executorDepartName  string      执行人科室名称
                    jobNum              string      执行人工号
                    abnormal            boolean     记录状态是否异常（true为异常
                 }>
  */
  {
    url: "/api/v1/operations/inspection/point/getInspectRecord",
    handler() {
      return Mock.mock({
        [`value|${Random.d8()}`]: [
          {
            id: () => Random.id(),
            time: () => Random.datetime(),
            executorId: () => Random.id(),
            executotName: () => Random.cname(),
            executorDepartId: () => Random.id(),
            executorDepartName: () => Random.cword(4, 8),
            jobNum: () => Mock.mock({ "number|10000-100000": 1 }).number,
            abnormal: () => Random.boolean(),
          },
        ],
      }).value;
    },
  },
  /*
  @name          getOperateLog
  @desc          巡检点详情-获取操作日志
  @params        {
                    pointId     string      巡检点id
                    pageNum     number      当前页码
                    pageSize    number      每页条数
                 }
  @return        array<{
                    id                  number      id
                    index               number      序号
                    content             string      操作内容
                    executorId          string      执行人id
                    executotName        string      执行人姓名
                    executorDepartId    string      执行人科室id
                    executorDepartName  string      执行人科室名称
                    createdTime         string      操作时间
                 }>
  */
  {
    url: "/api/v1/operations/inspection/point/getOperateLog",
    handler(req) {
      const { pageNum, pageSize } = req.query;
      return Mock.mock({
        headers: [
          { field: "index", fieldName: "序号" },
          { field: "content", fieldName: "操作内容" },
          { field: "executotName", fieldName: "操作人" },
          { field: "createdTime", fieldName: "操作时间" },
        ],
        total: Random.d100(),
        pageNum: Number(pageNum || 1),
        pageSize: Number(pageSize || 20),
        list: Mock.mock({
          [`value|${pageSize}`]: [
            {
              id: () => Random.id(),
              index: () =>
                Number(pageNum) * Number(pageSize) + Random.increment(),
              content: () => Random.csentence(8, 20),
              executorId: () => Random.id(),
              executotName: () => Random.cname(),
              executorDepartId: () => Random.id(),
              executorDepartName: () => Random.cword(4, 8),
              createdTime: () => Random.datetime(),
            },
          ],
        }).value,
      });
    },
  },
];
