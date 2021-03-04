import request from "@/utils/request"

export default {
	/*
    @name       getPlanInfo 
    @desc       获取保养计划基本信息         
    @params     {
                    planid          string      保养计划id
                }
    @return     {
        id          number              记录id
        status      string              保养计划状态[true:启用,false:停用]
        cycle       number              维护周期
        createdTime string[2020-12-12]  创建时间
        name        string              保养计划名称
    }
    */
	getPlanInfo(params) {
		return request({
			url: "/api/v1/operations/maintain/plan/detail/getPlanInfo",
			method: "get",
			params,
		})
	},
	/*
    @name       getEquipmentTree  
    @desc       获取保养设备树        
    @params     {
                    planId          string      保养计划id
                }
    @return     Array<{
                    id          number              记录id
                    name        string              设备类型
                    children    array {             设备
                        name        string          设备名称
                        children    array {         内容
                            name        string      内容名称
                        }     
                    }              

                }>
    */
	getEquipmentTree(params) {
		return request({
			url: "/api/v1/operations/maintain/plan/detail/getEquipmentTree",
			method: "get",
			params,
		})
	},

	/*
    @name       getorderList   
    @desc       获取保养工单列表        
    @params     {
                    plandId         string      保养计划id
                    pageNum         number      页码
                    pageSize        number      每页数量
                    type            string      设备类型
                    keyword         string      关键字
                    searchType      string      查询类型[1:设备名称,2:设备类型,3:编号,4:所属保养任务]
                    time            array       日期筛选

                }
    @return     {
                    total       number      总记录数
                    pageNum     number      当前页码
                    pageSize    number      每页条数
                    list        Array<{
                        id           number              记录id
                        no           string              编号
                        index        number              序号
                        type         string              类型
                        ename        string              设备名称
                        etype        string              设备类型
                        source       string              来源
                        status       string              状态
                        time         string              登记时间
                        taskNo       string              所属保养任务
                    }>
                }
    */
	getorderList(params) {
		return request({
			url: "/api/v1/operations/maintain/plan/detail/getorderList",
			method: "get",
			params,
		})
	},
	/*
    @name       getRepairorderList   
    @desc       获取维修记录列表        
    @params     {
                    plandId         string      保养计划id
                    pageNum         number      页码
                    pageSize        number      每页数量
                    type            string      设备类型
                    keyword         string      关键字
                    searchType      string      查询类型[1:设备名称,2:设备类型,3:编号,4:所属保养任务]
                    time            array       日期筛选

                }
    @return     {
                    total       number      总记录数
                    pageNum     number      当前页码
                    pageSize    number      每页条数
                    list        Array<{
                        id           number              记录id
                        no           string              编号
                        index        number              序号
                        type         string              维修单类型
                        ename        string              设备名称
                        etype        string              设备类型
                        source       string              来源
                        status       string              状态
                        time         string              登记时间
                        taskNo       string              所属保养任务
                    }>
                }
    */
	getRepairorderList(params) {
		return request({
			url: "/api/v1/operations/maintain/plan/detail/getRepairorderList",
			method: "get",
			params,
		})
	},
}
