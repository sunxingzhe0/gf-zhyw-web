import request from "@/utils/request";

export default {
  /*
    @name           getUserList          
    @desc           获取巡检人员列表          
    @params         
    @return         array<{
                        id      string      巡检人员id
                        name    string      巡检人员name
                    }>
  */
  getUserList() {
    return request({
      url: "/api/v1/operations/inspection/track/getUserList",
    });
  },
};
