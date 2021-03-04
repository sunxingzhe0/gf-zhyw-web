const Mock = require("mockjs");
const Random = Mock.Random;

module.exports = [
  /*
  @name           getUserList          
  @desc           获取巡检人员列表          
  @params         
  @return         array<{
                      id      string      巡检人员id
                      name    string      巡检人员name
                  }>
  */
  {
    url: "/api/v1/operations/inspection/track/getUserList",
    handler() {
      return Mock.mock({
        [`value|${Random.d20()}`]: [
          {
            id: () => Random.id(),
            name: () => Random.name(),
          },
        ],
      }).value;
    },
  },
];
