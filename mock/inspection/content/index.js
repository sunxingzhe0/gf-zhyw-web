const Mock = require("mockjs");
const Random = Mock.Random;

module.exports = [
  /*
  @name           getContentList          
  @desc           获取巡检内容列表
  @params         {
                      keyword     string      巡检内容关键字
                      pageNum     number      巡检内容页码
                      pageSize    number      巡检内容每页数量
                  }
  @return         {
                      total       number      总记录数
                      pageNum     number      当前页码
                      pageSize    number      每页条数
                      list        Array<{
                          id                  string          巡检内容id
                          name                string          巡检内容名称
                          type                array<string>   巡检内容适用类型{ 设备巡检: device, 现场巡检: site}
                          ways                string          巡检内容录入方式{ 录入: input, 选择: select }
                          content             string          巡检内容-内容
                          ranges               string          巡检内容可选值（当录入方式为选择时， 以英文逗号分割）
                          useCount            number          当前适用数量
                      }>
                  }
  */
  {
    url: "/api/v1/operations/inspection/content/getContentList",
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
              name: () => Random.csentence(4, 20),
              type: () => Random.shuffle(["device", "site"], 1, 2),
              ways: () => Random.pick(["input", "select"]),
              ranges: () =>
                Mock.mock({
                  "value|1-4": [Random.csentence(4, 20)],
                }).value.join(),
              content: () => Random.csentence(2, 8),
              useCount: () => Random.d20(),
              createdTime: () => Random.datetime(),
            },
          ],
        }).value,
      };
    },
  },
  /*
  @name           getContentDetail    
  @desc           获取巡检内容详情
  @params         {
                      id          string        巡检内容id
                  }
  @return         {
                      id          string          巡检内容id
                      name        string          巡检内容名称
                      type        array<string>   巡检内容适用类型(可多选) { 设备巡检: device, 现场巡检: site}
                      ways        string          巡检内容录入方式{ 录入: input, 选择: select }
                      content     string          巡检内容-内容
                      ranges       string          巡检内容可选值（当录入方式为选择时， 以英文逗号分割）
                      useCount    number          当前使用数量
                      creatorId   string          创建人id
                      creatorName string          创建人姓名
                      createdTime string          创建时间[2020-12-12 12:12:12]
                  }
  */
  {
    url: "/api/v1/operations/inspection/content/getContentDetail",
    handler(req) {
      const params = req.query;
      return {
        id: params.id,
        name: Random.csentence(4, 20),
        type: Random.shuffle(["device", "site"], 1, 2),
        ways: Random.pick(["input", "select"]),
        ranges: Mock.mock({
          "value|1-4": [Random.csentence(4, 20)],
        }).value.join(","),
        content: Random.csentence(2, 8),
        useCount: Random.d20(),
        createdTime: Random.datetime(),
        creatorId: Random.id(),
        creatorName: Random.cname(),
      };
    },
  },
  /*
  @name           saveContent
  @desc           新增/编辑巡检内容
  @params         {
                      id          string          巡检内容id无id为新增
                      name        string          巡检内容名称
                      type        array<string>   巡检内容适用类型 { 设备巡检: device, 现场巡检: site}
                      ways        string          巡检内容录入方式{ 录入: input, 选择: select }
                      content     string          巡检内容-内容
                      ranges       string          巡检内容可选值（当录入方式为选择时， 以英文逗号分割）
                  }
  @return         
  */
  {
    url: "/api/v1/operations/inspection/content/saveContent",
    method: "post",
    handler() {
      return {
        message: "操作成功！",
      };
    },
  },
  /*
  @name       delContent        
  @desc       删除巡检内容
  @params     id      string    巡检内容id   
  @return     status  string    success 
  */
  {
    url: "/api/v1/operations/inspection/content/delContent",
    method: "delete",
    handler() {
      return {
        message: "操作成功！",
      };
    },
  },
];
