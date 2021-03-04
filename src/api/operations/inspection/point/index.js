import request from "@/utils/request";

export default {
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
                        floorNmae           string      巡检点楼层名称
                        bim_floorId         string      巡检点BIM楼层构件id
                        bim_floorNmae       string      巡检点BIM楼层构件名称
                    }>
                }
  */
  getPointList(params) {
    return request({
      url: "/api/v1/operations/inspection/point/getPointList",
      params,
    });
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
  saveOrUpdate(params) {
    return request({
      url: "/api/v1/operations/inspection/point/saveOrUpdate",
      method: "post",
      data: params,
    });
  },
  /*
  @name       delPoint        
  @desc       删除巡检点
  @params     id      string    巡检点id   
  @return     status  string    success 
  */
  delPoint(id) {
    return request({
      url: "/api/v1/operations/inspection/point/delPoint",
      method: "delete",
      data: { id },
    });
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
  getBaseInfo(id) {
    return request({
      url: "/api/v1/operations/inspection/point/getBaseInfo",
      params: { id },
    });
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
                      model               string      设备型号
                      typeId              string      巡检点设备类型id
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
  getRelateDevice(params) {
    return request({
      url: "/api/v1/operations/inspection/point/getPointList",
      params,
    });
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
  getInspectionProjects(id) {
    return request({
      url: "/api/v1/operations/inspection/point/getInspectionProjects",
      params: { id },
    });
  },
  /*
  @name         getDeviceTypeTree          
  @desc         获取设备类型树
  @params       deviceType  number  设备类型id 
  @return       [
                  {
                    "children": [
                      null
                    ],
                    "id": 0,
                    "name": "string",
                    "nodePath": "string",
                    "pid": 0
                  }
                ] 
  */
  getDeviceTypeTree(deviceType) {
    return request({
      url: "/api/v1/operations/inspection/point/getDeviceTypeTree",
      params: { deviceType },
    });
  },
  /*
  @name          getDeviceByType
  @desc          根据设备类型，获取未关联设备数据
  @params        { 
                    buildingId      number    楼宇id
                    deviceCode      string    设备编码
                    deviceName      string    设备名称
                    deviceType      number    设备类型id
                    floorId         number    楼层id
                 }
  @return        array<{
                    "id": 927,
                    "typeId": 48,
                    "areaId": 0,
                    "name": "设备1"
                 }>
  */
  getDeviceByType(params) {
    return request({
      url: "/api/v1/operations/inspection/point/getDeviceByType",
      params,
    });
  },
  /*
  @name          
  @desc          获取巡检点,已关联设备树
  @params        {
                    deviceCode      string    设备编码
                    deviceName      string    设备名称
                    deviceType      number    设备类型id
                    pointId         number    巡检点id
                 }
  @return        [
                    {
                      "contentVoList": [
                        {
                          "content": "string",
                          "id": 0,
                          "name": "string"
                        }
                      ],
                      "deviceInfoList": [
                        {
                          "deviceCode": "string",
                          "deviceId": 0,
                          "deviceName": "string",
                          "id": 0
                        }
                      ],
                      "deviceTypeId": 0,
                      "deviceTypeName": "string",
                      "id": 0
                    }
                 ]
  */
  getRelateDeviceTree(params) {
    return request({
      url: "/api/v1/operations/inspection/point/getRelateDeviceTree",
      params,
    });
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
  getInspectRecord(pointId) {
    return request({
      url: "/api/v1/operations/inspection/point/getInspectRecord",
      params: { pointId },
    });
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
  getOperateLog(params) {
    return request({
      url: "/api/v1/operations/inspection/point/getOperateLog",
      params,
    });
  },
};
