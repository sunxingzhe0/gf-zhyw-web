/** @format */

const Mock = require("mockjs");
const Random = Mock.Random;

module.exports = [
  /*
  @name       workOrderDetail   
  @desc       工单详情         
  @params     {
                  id     number      工单id
              }
  @return     {     object 工单详情
                    orderId 单据号
                    orderStatus 单据状态
                    orderStatusName 单据状态
                    createTime 创建时间
                    title 工单主题
                    type 工单类型
                    level 工单级别
                    equipmentName 设备名称
                    equipmentType 设备类型
                    area 所在区域
                    detail 报修内容
                    images 
                    startUser 发起人
                    startTime 第二个创建时间
                    planCompleteTime 计划完成时间
                    repairUser 报修人
                    dept 报修科室
                    repairTime 报修时间
              }
  */

  {
    url: "/api/v1/workbench/workCenter/workOrderDetail",
    handler() {
      // const params = req.query;
      return {
        id: Random.id(),
        orderId: Random.id(), //单据号
        orderStatus: "1", //单据状态
        orderStatusName: "待处理", //单据状态
        createTime: Random.datetime(), // 创建时间
        title: Random.csentence(5, 10), //工单主题
        type: "维修工单", // 工单类型
        level: "一", // 工单级别
        equipmentName: "XXXXXXXXXXXXX", //设备名称
        equipmentType: "XXXXXXXX", //设备类型
        area: "XXXXXXXXXXXX", //所在区域
        detail: Random.csentence(80, 200), //报修内容
        images: [
          "https://miapp.chuntaoyisheng.com/mi/api/v1/file/download?token=7B878DAA12F64381B832A37066E460B6&fileId=DC878BB6F1944E1FA6CA8122848FFC71",
          "https://miapp.chuntaoyisheng.com/mi/api/v1/file/download?token=7B878DAA12F64381B832A37066E460B6&fileId=DC878BB6F1944E1FA6CA8122848FFC71",
        ],
        startUser: "王尼玛,0021314,18547896324", //发起人
        startTime: Random.datetime(), //第二个创建时间
        planCompleteTime: Random.datetime(), //计划完成时间
        repairUser: "王尼玛,0021314,18547896324", //报修人
        dept: "外科一", //报修科室
        repairTime: Random.datetime(), //报修时间
      };
    },
  },
  /*
  @name       addWorkOrder   
  @desc       新增工单登记          
  @params     {
                json    {
                    orderTheme            string      工单主题
                    orderCategory         string      工单类别  1: "维修",  2: "巡检",  3: "保养",
                    orderType             string      工单类型  1: "普通报障",  2: "巡检报障",  3: "保养报障",
                    correlateDocumentId   string      关联单据
                    attr                  string      属性  1: "设备",  2: "被服",  3: "耗材",  4: "其他",
                    assetsType            string      资产类型
                    assetsName            string      资产名称
                    area                  array       所在区域
                    orderDescribe         string      工单描述
                    imageUrl              string      图片资源
                    contact               string      联系人
                    contactPhone          string      联系电话
                }
              }
  @return     {
                "msg": "创建成功",
                "success": true,
                "total": 0
              }
  */
  {
    url: "/api/v1/workbench/repair/workCenter/addWorkOrder",
    method: "post",
    handler() {
      // const params = req.query;
      console.log("123");
      return "123";
    },
  },

  /*
  @name       getDeptOptions   
  @desc       获取部门选项列表
  @params     {}
  @return      [{
        value         string      value 用于传值
        label         string      部门名称
  }]
  */

  {
    url: "/api/v1/workbench/workCenter/getDeptOptions",
    handler() {
      // const params = req.query;
      return Mock.mock({
        [`value|${10}`]: [
          {
            value: () => Random.id(),
            label: () => Random.csentence(3,5), //部门名称
          },
        ],
      }).value;
    },
  },
];
