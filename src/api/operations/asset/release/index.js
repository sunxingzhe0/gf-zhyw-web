import request from "@/utils/request"

export default {
	/*
    @name       getReleaseList   
    @desc       获取发放列表          
    @params     {
                    keyword      string      关键字
                    searchType   string      查询类型[1:关联单据,2:领用人,3:领用部门]
                    pageNum      number      当前页
                    pageSize     number      每页条数
                }
    @return     {
                    orderId        string      关联单据
                    releaseUser    string      领用人
                    releaseDept    string      领用部门
                    releaseNum     string      发放数量
                    createTime     string      操作时间
                }
    */
	getReleaseList(params) {
		return request({
			url: "/api/v1/operations/asset/release/getReleaseList",
			method: "get",
			params,
		})
	},
}
