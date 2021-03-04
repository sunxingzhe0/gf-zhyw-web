import request from "@/utils/request"

export default {
	/*
    @name       getData   
    @desc       获取图表数据          
    @params     {
                    search      string      日期筛选
                }
    @return     {
                    nums        string      数量统计
                    examines    string      类型统计
                    repairs     string      维修统计
                }
    */
	getData(params) {
		return request({
			url: "/api/v1/operations/maintain/survey/getData",
			method: "get",
			params,
		})
	},
}
