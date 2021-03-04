import request from "@/utils/request";

export default {
  /*
    @name       getAreaTree    
    @desc       获取当前用户的区域树   
    @params        
    @return     暂无描述   
  */
  getAreaTree() {
    return request({
      url: "/basicinfo-service/area/tree",
    });
  },
};
