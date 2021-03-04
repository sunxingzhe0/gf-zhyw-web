import request from "@/utils/request";

export default {
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
                            id          string          巡检内容id无id为新增
                            name        string          巡检内容名称
                            type        array<string>   巡检内容适用类型 { 设备巡检: device, 现场巡检: site}
                            ways        string          巡检内容录入方式{ 录入: input, 选择: select }
                            content     string          巡检内容-内容
                            ranges       string          巡检内容可选值（当录入方式为选择时， 以英文逗号分割）
                        }>
                    }
  */
  getContentList(params) {
    return request({
      url: "/api/v1/operations/inspection/content/getContentList",
      params,
    });
  },
  /*
  @name           getContentDetail    
  @desc           获取巡检内容详情
  @params         {
                      id          string        巡检内容id
                  }
  @return         {
                      id          string          巡检内容id无id为新增
                      name        string          巡检内容名称
                      type        array<string>   巡检内容适用类型 { 设备巡检: device, 现场巡检: site}
                      ways        string          巡检内容录入方式{ 录入: input, 选择: select }
                      content     string          巡检内容-内容
                      ranges       string          巡检内容可选值（当录入方式为选择时， 以英文逗号分割）
                      useCount    number          当前使用数量
                      creatorId   string          创建人id
                      creatorName string          创建人姓名
                      createdTime string          创建时间[2020-12-12 12:12:12]
                  }
  */
  getContentDetail(id) {
    return request({
      url: "/api/v1/operations/inspection/content/getContentDetail",
      params: { id },
    });
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
  saveContent(params) {
    return request({
      url: "/api/v1/operations/inspection/content/saveContent",
      method: "post",
      data: params,
    });
  },
  /*
  @name       delContent        
  @desc       删除巡检内容
  @params     id      string    巡检内容id   
  @return     status  string    success 
  */
  delContent(id) {
    return request({
      url: "/api/v1/operations/inspection/content/delContent",
      method: "delete",
      body: { id },
    });
  },
};
