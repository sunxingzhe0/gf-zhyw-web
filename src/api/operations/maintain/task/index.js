import request from "@/utils/request"

export default {
	/*
    @name       getTaskList   
    @desc       获取保养任务列表          
    @params     {
                    time                    array       日期筛选
                    pageNum                 number      页码
                    pageSize                number      每页数量
                    OperationsTaskStatus    string      状态[NotPerformed: "未执行",Executing: "执行中",Completed: "已完成",]
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
			url: "/api/v1/operations/maintain/task/getTaskList",
			method: "get",
			params,
		})
	},
	/*
    @name       getDetail   
    @desc       获取保养任务列表          
    @params     {
                    id      string      记录ids
                }
    @return     {
                    id          number              记录id
                    time        string              任务时间
                    name        string              保养任务名称
                    index       string              任务次数
                    ename       string              设备名称
                    dept        string              所属部门
                    executor    string              执行人
                    floor       string              楼
                }
    */
	getDetail(params) {
		return request({
			url: "/api/v1/operations/maintain/task/getDetail",
			method: "get",
			params,
		})
	},
	/*
    @name       getRecord   
    @desc       获取保养记录       
    @params     {
                    taskid          string      保养任务id
                    searchType      stirng      搜索类型
                    keyword         string      关键字
                    TaskStatus      stirng      任务状态
                    timeType        string      时间查询类型
                    time            array       时间段
                }
    @return     Array<{
                    id                  number      记录id
                    ename               string      设备名称
                    status              stirng      设备保养状态(异常/正常)
                    maintainTime        stirng      保养时间(年-月-日 时:分 ~ 时:分)
                    etypeName           stirng      设备类型
                    taskTime            string      任务时间
                    contents            array       保养内容{
                        name                string      内容名称
                        executionUser       string      执行人
                        executionDate       string      执行时间
                    }

                    }>
    */
	getRecord(params) {
		return request({
			url: "/api/v1/operations/maintain/task/getRecord",
			method: "get",
			params,
		})
	},
}
