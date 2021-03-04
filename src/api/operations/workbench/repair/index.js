/** @format */

import request from "@/utils/request";

export default {
  /*
  @name          remind
  @desc          报修单催办
  @params        id       string      报修单id
  @return        status   string
  */
  remind(id) {
    return request({
      url: "/api/v1/operations/workbench/repair/remind",
      method: "post",
      body: { id },
    });
  },

  /*
  @name           operate
  @desc           报修单操作[操作、完结、撤回]
  @params         {
                      id          string      报修单id
                      operate     string      操作{终止: 'Terminate', 完结: 'End', 撤回: 'Withdraw'}
                  }
  @return         status  string
  */
  operate(params) {
    return request({
      url: "/api/v1/operations/workbench/repair/operate",
      method: "post",
      data: params,
    });
  },

  /*
  @name       addRegister   
  @desc       报修登记          
  @params     {
                    json    {
                      repairTheme       string      报修主题
                      assetsType   string      资产类型
                      repairContent       string      报修内容
                      repairType       string      报修来源类型 Phone: "电话",  Inspection: "巡检报障",  Maintenance: "保养报障",  Other: "其他" 
                      repairSource       string      报修来源内容
                      attr       string      报修属性  1设备/2被服/3耗材/4其它
                      area       string      所在区域
                      assetsName       string      资产名称
                      associateId       string      关联单据ID
                      contact       string      联系人
                      contactPhone       string      联系电话
                      imageUrl       string      图片资源
                    }
              }
  @return     {
                "msg": "创建成功",
                "success": true,
                "total": 0
              }
  */

  addRegister(params) {
    //报修登记
    return request({
      url: "/api/v1/workbench/repair/register/addRegister",
      method: "post",
      data: params,
    });
  },
  /*
  @name       registerList   
  @desc       报修登记列表          
  @params     {
                  registerUserName        string      登记人
                  repairUserName          string      报修人姓名
                  repairUserNum           string      报修人工号
                  repairUserPhone         string      报修人电话
                  repairTheme             string      报修主题
                  startTime               string      开始时间[2020-12-12 12:12:12]
                  endTime                 string      结束时间
                  pageNum                 number      页码
                  pageSize                number      每页数量
              }
  @return     {
                  total       number      总数
                  pageNum     number      当前页码
                  pageSize    number      每页条数
                  headers     Array<{     表头
                      field       string      字段名
                      dataField   string      字段名
                      fieldName   string      字段中文名
                      sorted      boolean     是否可排序
                  }>
                  list        Array<{
                    
                      id              number        报修id
                      repairTheme           string        报修主题,
                      state           string        报修状态  ToBeProcessed: "待处理", InProgress: "处理中", Completed: "已完成", Closed: "已关闭",
                      stateName       string        状态名, 如：待处理
                      registerUserName    string        登记人姓名
                      repairUserName        string        报修人姓名
                      repairUserNum          string        报修人工号
                      repairUserPhone       string        报修人电话
                      repairType      string        报修类型  Phone: "电话",  Inspection: "巡检报障",  Maintenance: "保养报障",  Other: "其他" 
                      dept            string        报修科室
                      createTime      string        创建时间[2020-12-12 12:12:12]
                      repairTime      string        报修时间[2020-12-12 12:12:12]
                      actionName      string        执行人姓名
                      group           string        受理班组
                      repairLong      string        报修时长
                  }>
              }
  */
  registerList(params) {
    //报修登记列表
    return request({
      url: "/api/v1/workbench/repair/register/registerList",
      method: "get",
      params,
    });
  },
  /*
    @name       registerDetail   
    @desc       报修登记详情          
    @params     {
                      id              string        报修单id
                }
    @return     {
                      id              number        单据号
                      createTime      string        创建日期[2020-12-12 12:12:12]
                      state           string        报修单状态
                      content            object{       报修内容
                          title               string        报修主题
                          registerUser        string        登记人信息 [王尼玛,0021314,18547896324]
                          repairUser          string        报修人信息 [王尼玛,0021314,18547896324]
                          repairUserDept      string        报修科室
                          repairTime          string        报修时间 [2020-12-12 12:12:12]
                          repairSource        string        报修来源  Phone: "电话",  Inspection: "巡检报障",  Maintenance: "保养报障",  Other: "其他" 
                          maintain            string        关联保养记录
                          equipmentType       string        设备类型
                          area                string        所在区域
                          equipmentName       string        设备名称
                          detail              string        报修内容
                          images              Array        报修内容图片 [url,url]
                      }
                      content            object{       报修内容
                          actionUser          string        执行人信息 [王尼玛,0021314,18547896324]
                          actionUserDept      string        执行人所属部门
                          helpUsers           array<{       协助人列表
                              user                string        协助人信息 [王尼玛,0021314,18547896324]
                              dept                string        协助人科室
                          }>       
                          actionTime          string        维修时间[2020-12-12 12:12:12]
                          detail              string        维修内容
                          images              array         维修内容图片 [url,url]
                          rate                number        评价评分
                          rateText            string        评价评分文字
                          rateTime            string        评价时间[2020-12-12 12:12:12]
                          remark              string        评价内容
                      }
                }
    */
  registerDetail(params) {
    //报修登记列表详情
    return request({
      url: "/api/v1/workbench/repair/register/registerDetail",
      method: "get",
      params,
    });
  },
  /*
  @name       DetailJournal   
  @desc       报修日志          
  @params     {
                      id              string        报修单id
              }
  @return     {
                  total       number      总数
                  pageNum     number      当前页码
                  pageSize    number      每页条数
                  headers     Array<{     表头
                      field       string      字段名
                      dataField   string      字段名
                      fieldName   string      字段中文名
                      sorted      boolean     是否可排序
                  }>
                  list        Array<{
                      index           number        序号
                      id              number        单条日志id,
                      content         string        日志内容
                      user            string        操作人[姓名，科室]
                      createTime      number        操作时间[2020-12-12 12:12:12]
                  }>
              }
  */
  DetailJournal(params) {
    //报修登记列表详情（报修日志）
    return request({
      url: "/api/v1/workbench/repair/register/DetailJournal",
      method: "get",
      params,
    });
  },

  /*
  @name       voiceList   
  @desc       语音坐席列表          
  @params     {
                  phoneNumber         string      来电电话
                  phoneContent        string      来电内容
                  pageNum             number      页码
                  pageSize            number      每页数量
                  sort                string      排序
              }
  @return     {
                  total       number      总数
                  pageNum     number      当前页码
                  pageSize    number      每页条数
                  list        Array<{

                      id              number        id
                      state           string        状态  registered: "已登记", unregistered: "未登记", revoked: "已作废"
                      dept            string        所属科室
                      createTime      string        来电时间[2020-12-12 12:12:12]
                      content         string        来电内容

                  }>
              }
  */
  voiceList(params) {
    //语音坐席列表
    return request({
      url: "/api/v1/workbench/repair/voice/voiceList",
      method: "get",
      params,
    });
  },

  /*
  @name       repairTypePhone   
  @desc       获取报修来源 电话来电         
  @params     {

              }
  @return     [{
        value         string      value 用于传值
        label         string      描述
        phone         string      电话
        dept          string      所属科室
        time          string      来电时间
        content       string      来电内容
  }]
  */
  repairTypePhone(params) {
    //获取报修来源 电话来电
    return request({
      url: "/api/v1/workbench/repair/register/repairTypePhone",
      method: "get",
      params,
    });
  },

  /*
  @name       registerStatusChange   
  @desc       修改报修单状态  终止，完结
  @params     {
                id            number      id
                state         string      Completed: "已完成(完结)", Closed: "已关闭(终止)",
              }
  @return     {
                "msg": "操作成功",
                "success": true,
                "total": 0
              }
  */
  registerStatusChange(params) {
    //修改报修单状态  终止，完结
    // console.log(params);
    return request({
      url: "/api/v1/workbench/repair/register/registerStatusChange",
      method: "post",
      data: params,
    });
  },

  /*
  @name       getUserOptions   
  @desc       获取报修人筛选选项列表
  @params     {}
  @return      [{
        value         string      value 用于传值
        label         string      姓名
  }]
  */
  getUserOptions(params) {
    //修改报修单状态  终止，完结
    return request({
      url: "/api/v1/workbench/repair/register/getUserOptions",
      method: "get",
      params,
    });
  },
};
