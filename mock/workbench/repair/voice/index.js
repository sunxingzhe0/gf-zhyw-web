/** @format */

const Mock = require("mockjs");
const Random = Mock.Random;

module.exports = [
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
                      phone           number        来电号码

                  }>
              }
  */
  {
    url: "/api/v1/workbench/repair/voice/voiceList",
    handler() {
      // const params = req.query;
      return Mock.mock({
        [`value|${10}`]: [
          {
            id: () => Random.id(),
            phone:"02365478963",
            state: () => Random.pick(["registered", "unregistered","revoked"]),
            dept: "内科", //所属科室
            createTime: () => Random.datetime(), //来电时间
            content: () => Random.csentence(30, 60), //来电内容
          },
        ],
      }).value;
    },
  },
];
