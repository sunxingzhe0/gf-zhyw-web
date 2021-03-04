/** @format */

const Mock = require("mockjs");
const Random = Mock.Random;

module.exports = [
  /*
  @name       taskReminderList   
  @desc       任务提醒列表          
  @params     {
                type        string      类型 1：工单审核,2：接单提醒,3：执行提醒,4：保养提醒,5：巡检提醒,
                pageNum     number      页码
                pageSize    number      每页数量
              }
  @return     {
                  total       number      总数
                  pageNum     number      当前页码
                  pageSize    number      每页条数
                  list        Array<{
                    id            number              id
                    title         string              标题
                    content       string              内容
                    createdTime   string              创建时间[2020-12-12] 
                    status        string              状态 1：待处理,2：已处理 ......,（暂缓，已读，未读）
                    isRead        Boolean             是否已读

                  }>
              }
  */
  {
    url: "/api/v1/workbench/repair/taskReminder/taskReminderList",
    handler() {
      // const params = req.query;
      return {
        total: 12,
        pageNum: 1,
        pageSize: 10,
        list: Mock.mock({
          [`value|${10}`]: [
            {
              id: () => Random.id(),

              title: () => Random.csentence(5, 10),
              content: () => Random.csentence(30, 60),
              "status|1": ["1", "2"],
              "isRead|1": [true, false],
              createTime: () => Random.datetime(), //来电时间
            },
          ],
        }).value,
        cause: null,
      };
    },
  },
];
