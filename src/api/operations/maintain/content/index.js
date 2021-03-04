import request from "@/utils/request"

export default {
	/*
    @name       getContentList   
    @desc       获取保养内容列表          
    @params     {
                    search      string      关键字
                    type        string      类型
                    pageNum     number      页码
                    pageSize    number      每页数量
                }
    @return     {
                    total       number      总记录数
                    pageNum     number      当前页码
                    pageSize    number      每页条数
                    list        Array<{
                        id          number              记录id
                        name        string              名称
                        content       string            内容
                        type       string               类型
                    }>
                }
    */
	getContentList(params) {
		return request({
			url: "/api/v1/operations/maintain/content/getContentList",
			method: "get",
			params,
		})
	},
	/*
    @name       delContents 
    @desc       删除内容         
    @params     {
                    id          string      内容id
                }
    @return     null
    */
	delContents(params) {
		return request({
			url: "/api/v1/operations/maintain/content/delContents",
			method: "get",
			params,
		})
	},
	/*
    @name       saveContent 
    @desc       提交内容         
    @params     {
                    name        string              名称
                    content     string              内容
                    type        array               类型
                }
    @return     null
    */
	saveContent(data) {
		return request({
			url: "/api/v1/operations/maintain/content/saveContent",
			method: "post",
			data,
		})
	},
	/*
    @name       getequipmenttree 
    @desc       设备类型树         
    @params     null
    @return     {
                    id           string            类型id
                    name         string            类型名称
                    children     array             子集
                }
    */
	getequipmenttree(params) {
		return request({
			url: "/api/v1/operations/maintain/content/getequipmenttree",
			method: "get",
			params,
		})
	},
}
