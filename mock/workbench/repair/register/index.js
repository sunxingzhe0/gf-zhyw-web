/** @format */

const Mock = require("mockjs");
const Random = Mock.Random;

module.exports = [
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
  {
    url: "/api/v1/workbench/repair/register/registerList",
    handler(req) {
      const params = req.query;
      // console.log(params);
      return {
        params: params,
        headers: [
          {
            field: "index",
            dataField: "index",
            fieldName: "序号",
            sorted: false,
            index: 1,
          },
          {
            field: "registerUserName",
            dataField: "registerUserName",
            fieldName: "登记人",
            sorted: false,
            index: 2,
          },
          {
            field: "repairUserName",
            dataField: "repairUserName",
            fieldName: "报修人姓名",
            sorted: false,
            index: 3,
          },
          {
            field: "repairUserNum",
            dataField: "repairUserNum",
            fieldName: "报修人工号",
            sorted: false,
            index: 3,
          },
          {
            field: "repairUserPhone",
            dataField: "repairUserPhone",
            fieldName: "报修人电话",
            // 'show-overflow-tooltip':true,
            sorted: false,
            index: 3,
          },
          {
            field: "dept",
            dataField: "dept",
            fieldName: "报修科室",
            sorted: false,
            index: 3,
          },
          {
            field: "repairType",
            dataField: "repairType",
            fieldName: "报修类型",
            sorted: false,
            index: 3,
          },
          {
            field: "repairTheme",
            dataField: "repairTheme",
            fieldName: "报修主题",
            sorted: false,
            index: 3,
          },
          {
            field: "repairTime",
            dataField: "repairTime",
            fieldName: "报修时间",
            sorted: false,
            index: 3,
          },
          {
            field: "state",
            dataField: "state",
            fieldName: "状态",
            sorted: false,
            index: 3,
          },
        ],
        pages: 1,
        total: 20,
        pageNum: params.pageNum,
        pageSize: params.pageSize,
        prePage: 0,
        nextPage: 0,
        extData: {},

        list: Mock.mock({
          [`value|${10}`]: [
            {
              id: () => Random.id(),

              repairTheme: "空调维修",
              state: () =>
                Random.pick([
                  "ToBeProcessed",
                  "InProgress",
                  "Completed",
                  "Closed",
                ]),
              repairType: () =>
                Random.pick(["Phone", "Inspection", "Maintenance", "Other"]), //报修类型
              // stateName: "待处理", //状态名
              registerUserName: () => Random.cname(), //登记人
              repairUserName: () => Random.cname(), //报修人姓名
              repairUserNum: "0021314", //报修人工号
              repairUserPhone: "18547896324", //报修人电话
              dept: "外科一", //报修科室
              createTime: () => Random.datetime(),
              repairTime: () => Random.datetime(),
              // actionName: () => Random.cname(), //执行人姓名
              // group: "工程部一组", //受理班组
              // repairLong: "205分钟",
            },
          ],
        }).value,
        // list: Mock.mock({
        //   [`value|${10}`]: [
        //   ],
        // }).value,
        cause: null,
      };
    },
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
  {
    url: "/api/v1/workbench/repair/register/registerDetail",
    handler() {
      // const params = req.query;
      // console.log(params);
      return {
        id: "6998465656465", //单据号
        createTime: "2020-11-27 12:20:14", //创建日期
        state: Random.pick([
          "ToBeProcessed",
          "InProgress",
          "Completed",
          "Closed",
        ]), //
        content: {
          title: "这是一个工单主题",
          registerUser: "王尼玛,0021314,18547896324", //登记人信息
          repairUser: "王尼玛,0021314,18547896324", //报修人信息
          repairUserDept: "外科一", //报修科室
          createTime: "2020-10-23 12:10:14", // 报修时间
          repairSource: Random.pick([
            "Phone",
            "Inspection",
            "Maintenance",
            "Other",
          ]), // 报修来源
          maintain: "XXXXXXXX", //关联保养记录
          equipmentType: "XXXXXXXX", //设备类型
          area: "XXXXXXXXXXXX", //所在区域
          equipmentName: "XXXXXXXXXXXXX", //设备名称
          detail:
            "这里是申领理由测试文案这里是报修内容测试文案这里是报修内容测试文案这里是报修内容测试文案这里是报修内容测试文案这里是申领这里是报修内容测试文案这里是报修内容测试文案这里是报修内容测试文案",
          images: [
            "https://miapp.chuntaoyisheng.com/mi/api/v1/file/download?token=7B878DAA12F64381B832A37066E460B6&fileId=DC878BB6F1944E1FA6CA8122848FFC71",
            "https://miapp.chuntaoyisheng.com/mi/api/v1/file/download?token=7B878DAA12F64381B832A37066E460B6&fileId=DC878BB6F1944E1FA6CA8122848FFC71",
          ],
        },
        situation: {
          actionUser: "王尼玛，0021314，18547896324", //执行人
          actionUserDept: "工程部一组", //执行人所属部门
          helpUsers: [
            {
              user: "王尼玛，0021314，18547896324",
              dept: "工程部一组",
            },
            {
              user: "王尼玛，0021314，18547896324",
              dept: "工程部一组",
            },
          ],
          actionTime: "2020-11-27 12:20:14  ~  2020-11-29 12:20:14",
          detail:
            "这里是申领理由测试文案这里是报修内容测试文案这里是报修内容测试文案这里是报修内容测试文案这里是报修内容测试文案这里是申领理由测试文案这里是报修内容测试文案这里是报修内容测试文案这里是报修内容测试文案这里是报修内容测试文",
          images: [
            "https://miapp.chuntaoyisheng.com/mi/api/v1/file/download?token=7B878DAA12F64381B832A37066E460B6&fileId=DC878BB6F1944E1FA6CA8122848FFC71",
            "https://miapp.chuntaoyisheng.com/mi/api/v1/file/download?token=7B878DAA12F64381B832A37066E460B6&fileId=DC878BB6F1944E1FA6CA8122848FFC71",
          ],
          rate: 5,
          rateText: "非常满意",
          rateTime: "2020-05-12 10:21",
          remark: "非常好，我非常满意！",
        },
      };
    },
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
  {
    url: "/api/v1/workbench/repair/register/DetailJournal",
    handler() {
      // const params = req.query;
      // console.log(params);
      return {
        // 表头数据: "",
        headers: [
          {
            field: "index",
            dataField: "index",
            fieldName: "序号",
            sorted: false,
            index: 1,
          },
          {
            field: "content",
            dataField: "content",
            fieldName: "操作内容",
            sorted: false,
            index: 2,
          },
          {
            field: "user",
            dataField: "user",
            fieldName: "操作人",
            sorted: false,
            index: 3,
          },
          {
            field: "createTime",
            dataField: "createTime",
            fieldName: "操作时间",
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
      };
    },
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
  {
    url: "/api/v1/workbench/repair/register/registerStatusChange",
    method: "post",
    handler() {
      // const params = req.query;
      return {
        msg: "操作成功",
        success: true,
        total: 0,
      };
    },
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
  {
    url: "/api/v1/workbench/repair/register/addRegister",
    method: "post",
    handler() {
      // const params = req.query;
      return {
        msg: "创建成功",
        success: true,
        total: 0,
      };
    },
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

  {
    url: "/api/v1/workbench/repair/register/repairTypePhone",
    handler() {
      // const params = req.query;
      return Mock.mock({
        [`value|${10}`]: [
          {
            value: "02365478963",
            label: "02365478963",
            phone: "02365478963",
            dept: "内科",
            time: "2020-11-27 10:00:21",
            content: "来电内容",
            // index: "1",
            // id: "1",
            // content: "这是一条操作内容  ",
            // user: "姓名，科室  ",
            // createTime: "2020-11-27 12:20:14",
          },
        ],
      }).value;
    },
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
  {
    url: "/api/v1/workbench/repair/register/getUserOptions",
    handler() {
      // const params = req.query;
      return Mock.mock({
        [`value|${10}`]: [
          {
            value: () => Random.id(),
            label: () => Random.cname(), //报修人姓名
          },
        ],
      }).value;
    },
  },
];
