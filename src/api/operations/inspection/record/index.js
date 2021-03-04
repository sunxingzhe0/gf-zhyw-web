import request from "@/utils/request";

export default {
  /*
  @name       getRecordList   
  @desc       获取巡检记录列表          
  @params     {
                  pointCode       string    巡检点编号
                  pointName       string    巡检点名称
                  RFID            string    RFID
                  GIS             string    GIS定位,经度与纬度通过英文逗号拼接  
                  executorName    string    执行人姓名
                  executorDepart  string    执行人科室
                  executorJobNum  string    执行人工号
                  abnormal        boolean   巡检结果状态{全部: "", 正常: false, 异常: true}
                  startTime       string    开始时间[2020-12-12 12:12:12]
                  endTime         string    结束时间
                  pageNum         number    当前页码
                  pageSize        number    每页条数
              }
  @return     {
                  total       number      总记录数
                  pageNum     number      当前页码
                  pageSize    number      每页条数
                  headers     Array<{     表头
                      field       string      字段名
                      dataField   string      字段名
                      fieldName   string      字段中文名
                      sorted      boolean     是否可排序
                  }>
                  list        Array<{
                      id                  number                          巡检记录id
                      index               number                          序号
                      pointCode           string                          巡检点编号                              
                      pointName           string                          巡检点名称 
                      areaStr             string                          所属区域
                      RFID                string                          RFID
                      inspectType         string                          巡检类型{site: "现场巡检",device: "设备巡检"}
                      GIS                 string                          GIS定位,经度与纬度通过英文逗号拼接，如：106.566426,29.55176
                      phtotNum            number                          拍照数量
                      inspectionTaskId    string                          所属巡检任务id
                      inspectionTaskName  string                          所属巡检任务名称
                      executorId          string                          执行人id
                      executorName        string                          执行人姓名
                      executorDepartId    string                          执行人科室id
                      executorDepartName  string                          执行人科室名称
                      abnormal            boolean                         巡检结果是否异常
                      createdTime         string[2020-12-12 12:12:12]     创建时间（巡检时间）
                  }>
              }
  */
  getRecordList(params) {
    return request({
      url: "/api/v1/operations/inspection/record/getRecordList",
      params,
    });
  },
  /*
  @name       getRecordDetail 
  @desc       获取巡检记录详情（基本信息+检查项目信息）         
  @params     {
                  id                  string                          巡检记录id
              }
  @return     {
                  baseInfo            object<{                        基本信息
                    id                  number                          巡检记录id
                    index               number                          序号
                    pointCode           string                          巡检点编号                              
                    pointName           string                          巡检点名称 
                    areaStr             string                          所属区域
                    RFID                string                          RFID
                    inspectType         string                          巡检类型{site: "现场巡检",device: "设备巡检"}
                    GIS                 string                          GIS定位,经度与纬度通过英文逗号拼接，如：106.566426,29.55176
                    phtotNum            number                          拍照数量
                    inspectionTaskId    string                          所属巡检任务id
                    inspectionTaskName  string                          所属巡检任务名称
                    executorId          string                          执行人id
                    executorName        string                          执行人姓名
                    executorDepartId    string                          执行人科室id
                    executorDepartName  string                          执行人科室名称
                    abnormal            boolean                         巡检结果是否异常
                    createdTime         string[2020-12-12 12:12:12]     创建时间（巡检时间）
                  }>
                  projects            Array<{                         检查项目
                    deviceId            string                          设备id
                    deviceName          string                          设备名称
                    deviceCode          string                          设备编码
                    deviceMode          string                          设备型号
                    contents            Array<{                           巡检内容（与巡检内容模型相同
                      id                  string                            巡检内容id
                      name                string                            巡检内容名称
                      type                array<string>                     巡检内容适用类型(可多选) { 设备巡检: device, 现场巡检: site}
                      ways                string                            巡检内容录入方式{ 录入: input, 选择: select }
                      content             string                            巡检内容-内容
                      ranges               string                            巡检内容可选值（当录入方式为选择时， 以英文逗号分割）
                      useCount            number                            当前使用数量
                      creatorId           string                            创建人id
                      creatorName         string                            创建人姓名
                      createdTime         string                            创建时间[2020-12-12 12:12:12]
                    }>
                  }>
              }
  */
  getRecordDetail(id) {
    return request({
      url: "/api/v1/operations/inspection/record/getRecordDetail",
      params: { id },
    });
  },
  /*
  @name          getDetailList
  @desc          获取巡检记录明细
  @params        {
                    id                string        巡检记录id
                    executStatus      string        执行状态{NotPerformed: "未执行", Executing: "执行中", Completed: "已完成", Timedout: "已超时", TimeoutCompleted: "超时完成"}
                    deviceStatus      string        设备状态{全部: "", 正常: "normal", 异常: "abnormal"}
                 }
  @return        Array<{                            巡检明细
                    id                string          记录id
                    startTime         string          本次巡检计划开始时间
                    endTime           string          本次巡检计划结束时间
                    pointId           string          巡检点id                             
                    pointCode         string          巡检点编号                              
                    pointName         string          巡检点名称 
                    abnormal          boolean         本次巡检记录是否异常(有一个设备异常则为异常)
                    status            string          本次巡检记录状态 { NotPerformed: "未执行", Executing: "执行中", Completed: "已完成", Timedout: "已超时", Terminated: "已终止", TimeoutCompleted: "超时完成" }
                    executStartTime   string          本次巡检执行开始时间
                    executEndTime     string          本次巡检执行结束时间
                    devices           Array<{         本次巡检设备列表
                      deviceId          string          设备id
                      deviceName        string          设备名称
                      abnormal          boolean         设备是否异常
                      contents          Array<{         设备巡检内容（基于巡检内容模型）
                        id                  string                          本次巡检巡检内容id
                        name                string                          本次巡检巡检内容名称
                        type                array<string>                   本次巡检巡检内容适用类型(可多选) { 设备巡检: device, 现场巡检: site}
                        ways                string                          本次巡检巡检内容录入方式{ 录入: input, 选择: select }
                        content             string                          本次巡检巡检内容的内容
                        ranges               string                          本次巡检巡检内容可选值（当录入方式为选择时， 以英文逗号分割）
                        value               string                          本次巡检巡检内容录入的值（录入方式为录入时为填写的值，录入方式为选择时为选择的值）
                        executorId          string                          本次巡检执行人id
                        executorName        string                          本次巡检执行人姓名
                        executorDepartId    string                          本次巡检执行人科室id
                        executorDepartName  string                          本次巡检执行人科室名称
                        executorTime        string[2020-12-12 12:12:12]     本次巡检执行时间
                        status              string          本次巡检记录状态 { NotPerformed: "未执行", Executing: "执行中", Completed: "已完成", Timedout: "已超时", Terminated: "已终止", TimeoutCompleted: "超时完成" }
                      }>
                    }>
                 }>
  */
  getDetailList(params) {
    return request({
      url: "/api/v1/operations/inspection/record/getDetailList",
      params,
    });
  },
};
