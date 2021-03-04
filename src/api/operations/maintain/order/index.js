import request from "@/utils/request"

export default {
	/*
    @name       getSingleList   
    @desc       获取保养单列表          
    @params     {
                    keyword      string      关键字
                    searchType   string      类型
                    pageNum      number      页码
                    pageSize     number      每页数量
                }
    @return     {
                    total       number      总记录数
                    pageNum     number      当前页码
                    pageSize    number      每页条数
                    list        Array<{
                        id           number              记录id
                        type         string              类型
                        no           string              编号
                        ename        string              设备名称
                        etype        string              设备类型
                        status       string              状态
                        registerTime string              登记时间
                        task         string              任务
                        record       string              记录
                    }>
                }
    */
	getOrderList(params) {
		return request({
			url: "/api/v1/operations/maintain/order/getOrderList",
			method: "get",
			params,
		})
	},
	/*
    @name       getBasicinfo
    @desc       获取派单详情          
    @params     {
                    id      string      记录ids
                }
    @return     {
                    id              number              记录id
                    no              string              单据编号
                    status          string              单据状态
                    time            string              创建日期
                    theme           string              主题
                    type            string              类型
                    level           string              级别
                    ename           string              设备名称
                    area            string              所属区域
                    etype           string              设备类型
                    content         string              保养单内容
                    remark          string              保养计划描述
                    createuser      string              任务创建
                    userno          string              编号
                    userphone       string              手机
                    taskCreateTime  string              任务创建时间
                    completeTimew   string              计划完成时间
                }
    */
	getBasicinfo(params) {
		return request({
			url: "/api/v1/operations/maintain/order/getBasicinfo",
			method: "get",
			params,
		})
	},
	/*
    @name       saveSingle 
    @desc       提交派单         
    @params     {
                    execouter        string       执行人
                    level            string       级别[1:低,2:中,3:高]
                    completeTime     string       计划完成时间
                }
    @return     null
    */
	saveOrder(data) {
		return request({
			url: "/api/v1/operations/maintain/order/saveOrder",
			method: "post",
			data,
		})
	},
	/*
    @name       receiving 
    @desc       接单         
    @params     {
                    id     string     记录id
                }
    @return     null
    */
	receiving(params) {
		return request({
			url: "/api/v1/operations/maintain/order/receiving",
			method: "get",
			params,
		})
	},
	/*
    @name       end 
    @desc       结束订单         
    @params     {
                    id     string     记录id
                }
    @return     null
    */
	end(params) {
		return request({
			url: "/api/v1/operations/maintain/order/end",
			method: "get",
			params,
		})
	},
	/*
    @name       saveAssist 
    @desc       保存协助信息         
    @params     {
                    id               string       单id
                    assistuser       string       协助人
                    remark           string       备注
                    completeTime     string       计划完成时间
                }
    @return     null
    */
	saveAssist(data) {
		return request({
			url: "/api/v1/operations/maintain/order/saveAssist",
			method: "post",
			data,
		})
	},
	/*
    @name       getHelpers 
    @desc       获取协助人         
    @params     null
    @return     array>{
                    id       string     协助人id
                    name     string     姓名
                    phone    string     电话
                    no       string     编号
                }
    */
	getHelpers(params) {
		return request({
			url: "/api/v1/operations/maintain/order/getHelpers",
			method: "get",
			params,
		})
	},
	/*
    @name       saveTransfer 
    @desc       保存转接信息         
    @params     {
                    id               string       单id
                    transferuser     string       转接人
                    remark           string       备注
                    completeTime     string       计划完成时间
                }
    @return     null
    */
	saveTransfer(data) {
		return request({
			url: "/api/v1/operations/maintain/order/saveTransfer",
			method: "post",
			data,
		})
	},
	/*
    @name       hangUp 
    @desc       挂起         
    @params     {
                    id     string     记录id
                }
    @return     null
    */
	hangUp(params) {
		return request({
			url: "/api/v1/operations/maintain/order/hangUp",
			method: "get",
			params,
		})
	},

	/*
    @name       recovery 
    @desc       恢复         
    @params     {
                    id     string     记录id
                }
    @return     null
    */
	recovery(params) {
		return request({
			url: "/api/v1/operations/maintain/order/recovery",
			method: "get",
			params,
		})
	},

	/*
    @name       agree 
    @desc       同意         
    @params     {
                    id     string     记录id
                }
    @return     null
    */
	agree(params) {
		return request({
			url: "/api/v1/operations/maintain/order/agree",
			method: "get",
			params,
		})
	},
	/*
    @name       refuse 
    @desc       拒绝         
    @params     {
                    id     string     记录id
                }
    @return     null
    */
	refuse(params) {
		return request({
			url: "/api/v1/operations/maintain/order/refuse",
			method: "get",
			params,
		})
	},
	/*
    @name       saveEvaluate 
    @desc       提交评价信息         
    @params     {
                    id           string     记录id
                    fraction     string     星级
                    remark       string     备注
                }
    @return     null
    */
	saveEvaluate(data) {
		return request({
			url: "/api/v1/operations/maintain/order/saveEvaluate",
			method: "post",
			data,
		})
	},
	/*
    @name       getImplement
    @desc       获取执行信息          
    @params     {
                    id      string      记录ids
                }
    @return     {
                    id                 number              记录id
                    implementName      string              执行人姓名
                    implementDept      string              维护部门
                    implementTime      string              执行时间
                    implementRemark    string              执行备注
                    assistName          string             协助人姓名
                    assistDept          string             协助部门
                    assistTime          string             协助时间
                    assistRemark        string             协助备注
    */
	getImplement(params) {
		return request({
			url: "/api/v1/operations/maintain/order/getImplement",
			method: "get",
			params,
		})
	},
	/*
    @name       getEvaluate
    @desc       获取评价信息          
    @params     {
                    id      string      记录id
                }
    @return     {
                    id                 number              记录id
                    name               string              评分人
                    dept               string              部门
                    time               string              评价时间
                    remark             string              备注
                    score              string              评分
                }
    */
	getEvaluate(params) {
		return request({
			url: "/api/v1/operations/maintain/order/getEvaluate",
			method: "get",
			params,
		})
	},
	/*
    @name       getMaintenance 
    @desc       获取保养情况         
    @params     null
    @return     array>{
                    id          string     id
                    content     string     执行内容
                    filelist    array      文件
                    cretatTime  string     创建时间
                }
    */
	getMaintenance(params) {
		return request({
			url: "/api/v1/operations/maintain/order/getMaintenance",
			method: "get",
			params,
		})
	},
	/*
    @name       getOrdertracking
    @desc       获取保养单追踪        
    @params     null
    @return     array>{
                    id          string     id
                    exetuoter   string     执行人
                    status      string     状态
                    filelist    array      文件
                    remark      stirng     备注
                    time  string     创建时间
                }
    */
	getOrdertracking(params) {
		return request({
			url: "/api/v1/operations/maintain/order/getOrdertracking",
			method: "get",
			params,
		})
	},
	/*
    @name       getnotesList
    @desc       获取备忘记录        
    @params     {
                pageNum         number      页码
                pageSize        number      每页数量
                applicant       string      申领人
                keyword         string      关键字
                searchType      string      查询类型[1:设备名称]
                time            array       日期筛选
    }
    @return     array>{
                    id          string     id
                    exetuoter   string     执行人
                    status      string     状态
                    filelist    array      文件
                    remark      stirng     备注
                    time  string     创建时间
                }
    */
	getnotesList(params) {
		return request({
			url: "/api/v1/operations/maintain/order/getnotesList",
			method: "get",
			params,
		})
	},
	/*
    @name       getMaintainContents 
    @desc       获取保养单保养内容        
    @params      {
                    orderId     string      保养单id
                }
    @return     array>{
                    id              string     id
                    content         string     保养内容
                    executionTime   string     执行时间
                    status          string     执行状态
                }
    */
	getMaintainContents(params) {
		return request({
			url: "/api/v1/operations/maintain/order/getMaintainContents",
			method: "get",
			params,
		})
	},
	/*
    @name       getDdepts  
    @desc       获取申领科室         
    @return     Array<{
                        id          number              记录id
                        name        string              科室名称
                    }>
    */
	getDdepts(params) {
		return request({
			url: "/api/v1/operations/maintain/order/getDdepts",
			method: "get",
			params,
		})
	},
}
