import request from "@/utils/request";

export default {
  /*
    @name       getAllDepts          
    @desc       获取所有部门列表    
    @params        
    @return     Array<{
                    "id": 43,
                    "parentId": 0,
                    "name": "111",
                    "description": "",
                    "projectId": null,
                    "creator": "admin",
                    "createTime": "2020-09-28 14:57:05",
                    "updateTime": "2020-09-28 14:57:05",
                    "fullName": "111",
                    "fullPath": "0|43"
                }>   
    */
  getAllDepts() {
    return request({
      url: "/basicinfo-service/dept",
    });
  },
};
