/** @format */

import request from "@/utils/request";

export default {
  taskReminderList(params) {
    //报修登记列表
    return request({
      url: "/api/v1/workbench/repair/taskReminder/taskReminderList",
      method: "get",
      params,
    });
  },
};
