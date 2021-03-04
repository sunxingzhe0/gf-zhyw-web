import request from "@/utils/request"

export default {
	/*
    @name       getHandicapList   
    @desc       获取保养任务列表          
    @params     {
                    keyword      string     关键字
                    searchType   string     查询类型
                    pageNum     number      页码
                    pageSize    number      每页数量
                }
    @return     {
                    total       number      总记录数
                    pageNum     number      当前页码
                    pageSize    number      每页条数
                    list        Array<{
                        id               number              记录id
                        title            string              主题
                        registrant       string              登记人
                        repairName       string              报修人姓名
                        repairNo         string              报修人工号
                        repairPhone      string              报修人电话
                        repairDept       string              报修人部门
                        repairTime       string              报修人时间
                    }>
                }
    */
	getHandicapList(params) {
		return request({
			url: "/api/v1/operations/maintain/handicap/getHandicapList",
			method: "get",
			params,
		})
	},
	/*
    @name       urging 
    @desc       催办         
    @params     {
                    id               string       id
                }
    @return     null
    */
	urging(params) {
		return request({
			url: "/api/v1/operations/maintain/handicap/urging",
			method: "get",
			params,
		})
	},
	/*
    @name       getDetail   
    @desc       获取报修详情          
    @params     {
                    id      string      记录ids
                }
    @return     {
                id               number              记录id
                title            string              主题
                registrant       string              登记人
                repairName       string              报修人姓名
                repairNo         string              报修人工号
                repairPhone      string              报修人电话
                repairDept       string              报修人部门
                repairTime       string              报修人时间
                }
    */
	getDetail(params) {
		return request({
			url: "/api/v1/operations/maintain/handicap/getDetail",
			method: "get",
			params,
		})
	},
	/*
    @name       getRepairSituation   
    @desc       获取维修情况          
    @params     {
                    id      string      记录ids
                }
    @return     {
                id               number              记录id
                repairTime       string              报修时间
                repairContent    string              报修内容
                evaluate         object              评价
                assist           array               协助
                distribute       array               执行
                }
    */
	getRepairSituation(params) {
		return request({
			url: "/api/v1/operations/maintain/handicap/getRepairSituation",
			method: "get",
			params,
		})
	},
	/*
    @name       gelogList   
    @desc       获取维修日志          
    @params     {
                pageNum     number      当前页码
                pageSize    number      每页条数
                id          string      记录id
    }
    @return     {
                    total       number      总记录数
                    pageNum     number      当前页码
                    pageSize    number      每页条数
                    list        Array<{
                        id               number              记录id
                        userName         string              操作人
                        content          string              内容
                        time             string              时间
                    }>
                }
    */
	gelogList(params) {
		return request({
			url: "/api/v1/operations/maintain/handicap/gelogList",
			method: "get",
			params,
		})
	},
	/*
    @name       saveHandicap 
    @desc       报修         
    @params     {
                    title              string       主题
                    source             string       来源
                    record             string       记录
                    ename              string       设备
                    etype              string       设备类型
                    area               string       区域
                    content            string       内容
                    filelist           string       文件
                }
    @return     null
    */
	saveHandicap(data) {
		return request({
			url: "/api/v1/operations/maintain/handicap/saveHandicap",
			method: "post",
			data,
		})
	},
}
