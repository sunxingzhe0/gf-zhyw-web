import request from "@/utils/request"
import detail from "./detail"
export default {
	/*
    @name       getPlanList   
    @desc       获取保养计划列表          
    @params     
                status      string      保养计划状态[1:启用,0:停用]
                date        array       日期筛选
                pageNum     number      页码
                pageSize    number      每页数量
    @return        
    */
	getPlanList(params) {
		return request({
			url: "/api/v1/operations/maintain/plan/getPlanList",
			method: "get",
			params,
		})
	},
	/*
    @name       getTypes   
    @desc       获取保养计划设备类型    
    */
	getTypes(params) {
		return request({
			url: "/api/v1/operations/maintain/plan/getTypes",
			method: "get",
			params,
		})
	},
	/*
    @name       getContentList   
    @desc       获取保养计划保养内容列表          
    @params     
                 typeid      string      设备类型id
    */
	getContentList(params) {
		return request({
			url: "/api/v1/operations/maintain/plan/getContentList",
			method: "get",
			params,
		})
	},
	/*
    @name       getExecutors   
    @desc       获取维护部门    
    */
	getExecutors(params) {
		return request({
			url: "/api/v1/operations/maintain/plan/getExecutors",
			method: "get",
			params,
		})
	},
	/*
    @name       getDepts   
    @desc       获取执行人    
    */
	getDepts(params) {
		return request({
			url: "/api/v1/operations/maintain/plan/getDepts",
			method: "get",
			params,
		})
	},
	/*
    @name       savePlan 
    @desc       保养计划提交          
    @params     {
                    name     string      保养名称
                    dept     string      维护部门
                    executor string      执行人
                    status   string      状态[true:启用,false:停用]
                    mrules   array       保养规则
                }
    @return     {
                    id      number              记录id
    }
    */
	savePlan(data) {
		return request({
			url: "/api/v1/operations/maintain/plan/savePlan",
			method: "post",
			data,
		})
	},
	/*
    @name       getequipmentList   
    @desc       获取设备关联列表        
    @params     {
                    searchType      string      查询类型[0:设备名称,1:设备类型]
                    keyword         string      关键字
                    area            string      所属区域
                    pageNum         number      页码
                    pageSize        number      每页数量
                    planid          string      保养计划id
                }
    @return     {
                    total       number      总记录数
                    pageNum     number      当前页码
                    pageSize    number      每页条数
                    list        Array<{
                        id          number              记录id
                        name        string              名称
                        type        string              类型
                        area        string              区域
                        actionDate  string              操作日期
                    }>
                }
    */
	getequipmentList(params) {
		return request({
			url: "/api/v1/operations/maintain/plan/getequipmentList",
			method: "get",
			params,
		})
	},
	/*
    @name       getUnboundequipments  
    @desc       获取未绑定设备列表        
    @params     {
                    searchType      string      查询类型[0:设备名称,1:设备类型]
                    keyword         string      关键字
                    pageNum         number      页码
                    pageSize        number      每页数量
                }
    @return     {
                    total       number      总记录数
                    pageNum     number      当前页码
                    pageSize    number      每页条数
                    list        Array<{
                        id          number              记录id
                        name        string              名称
                        type        string              类型
                        no          string              编号
                    }>
                }
    */
	getUnboundequipments(params) {
		return request({
			url: "/api/v1/operations/maintain/plan/getUnboundequipments",
			method: "get",
			params,
		})
	},
	/*
    @name       savePlanquipment 
    @desc       保养计划关联设备关联         
    @params     {
                    data   array     设备数据
                    planid          string      保养计划id
                }
    @return     null
    */
	savePlanquipment(data) {
		return request({
			url: "/api/v1/operations/maintain/plan/savePlanquipment",
			method: "post",
			data,
		})
	},
	/*
    @name       removePlanequipment 
    @desc       保养计划关联设备解绑         
    @params     {
                    data   array     设备数据
                    planid          string      保养计划id
                }
    @return     null
    */
	removePlanequipment(params) {
		return request({
			url: "/api/v1/operations/maintain/plan/removePlanequipment",
			method: "get",
			params,
		})
	},
	/*
    @name       getTaskList   
    @desc       获取保养任务        
    @params     {
                    planid          string      保养计划id
                    pageNum         number      页码
                    pageSize        number      每页数量
                    TaskType        string      保养类型[-1:全部,1:保养周期,2:保养后运行时长,3:保养累积时长]
                    searchType      string      查询类型
                    time            array       时间段
                }
    @return     {
                    total       number      总记录数
                    pageNum     number      当前页码
                    pageSize    number      每页条数
                    list        Array<{
                        id          number              记录id
                        time        string              任务时间
                        name        string              保养任务名称
                        index       string              任务次数
                        ename       string              设备名称
                        dept        string              所属部门
                        executor    string              执行人
                        floor       string              楼
                    }>
                }
    */
	getTaskList(params) {
		return request({
			url: "/api/v1/operations/maintain/plan/getTaskList",
			method: "get",
			params,
		})
	},
	/*
    @name       getRecord   
    @desc       获取保养记录       
    @params     {
                    planid          string      保养计划id
                    TaskStatus      stirng      任务状态
                    searchType      stirng      搜索类型
                    time            array       时间段
                }
    @return     Array<{
                    id                  number      记录id
                    name                string      保养名称
                    taskTime            string      任务时间
                    executionTime       string      执行时间
                    timeInterval        array       保养时段信息{
                        time            string      时段(xxx ~ xxxx)
                        ponitName       stirng      保养点名称
                        maintainTime    stirng      保养时间(年-月-日 时:分 ~ 时:分)
                        status          string      保养状态(异常/正常)
                        remark          string      备注
                        equipments      array       保养设备{
                            ename       string      设备名称
                            status      stirng      设备保养状态(异常/正常)
                            contents    array       保养内容{
                                name                string      内容名称
                                executionUser       string      执行人
                                executionDate       string      执行时间
                            }
                        }
                    }

                    }>
    */
	getRecord(params) {
		return request({
			url: "/api/v1/operations/maintain/plan/getRecord",
			method: "get",
			params,
		})
	},
	/*
    @name       getContents
    @desc       根据保养计划获取内容       
    @params     {
                    planid          string              计划id
                }
    @return     Array<{
                        id          number              记录id
                        index       number              序号
                        name        string              名称
                        content     string              内容
                    }>
    */
	getContents(params) {
		return request({
			url: "/api/v1/operations/maintain/plan/getContents",
			method: "get",
			params,
		})
	},
	/*
    @name       savePlanContent 
    @desc       保养计划添加保养内容          
    @params     {
                   contentIds   array       保养内容id
                   planId       string      计划id
                }
    @return     {
                    message     string         信息提示
    }
    */
	savePlanContent(data) {
		return request({
			url: "/api/v1/operations/maintain/plan/savePlanContent",
			method: "post",
			data,
		})
	},
	/*
    @name       delPlanContent 
    @desc       保养计划删除保养内容          
    @params     {
                   contentid    string       保养内容id
                   planId       string       计划id
                }
    @return     {
                    message     string         信息提示
    }
    */
	delPlanContent(data) {
		return request({
			url: "/api/v1/operations/maintain/plan/delPlanContent",
			method: "post",
			data,
		})
	},
	detail, //详情
}
