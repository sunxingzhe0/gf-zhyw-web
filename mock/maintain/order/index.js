const Mock = require("mockjs")
const Random = Mock.Random
module.exports = [
	/*
@name       getorderList   
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
	{
		url: "/api/v1/operations/maintain/order/getOrderList",
		handler(req) {
			const params = req.query
			return {
				total: Random.d100(),
				pageNum: params.pageNum,
				pageSize: params.pageSize,
				list: Mock.mock({
					[`value|${params.pageSize}`]: [
						{
							id: () => Random.id(),
							type: () => Random.cword(3, 5),
							no: () => Random.increment(),
							ename: () => Random.cword(3, 5),
							etype: () => Random.cword(3, 5),
							status: () =>
								Random.pick([
									"1",
									"2",
									"3",
									"4",
									"5",
									"6",
									"7",
								]),
							registerTime: () => Random.date(),
							task: () => Random.csentence(4, 10),
							record: () => Random.csentence(4, 10),
						},
					],
				}).value,
			}
		},
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
	{
		url: "/api/v1/operations/maintain/order/getBasicinfo",
		handler() {
			return {
				id: Random.id(),
				no: Random.increment(),
				status: Random.pick(["1", "2", "3", "4", "5", "6", "7"]),
				time: Random.datetime(),
				theme: Random.cword(3, 20),
				type: Random.cword(3, 5),
				level: Random.pick(["1", "2", "3"]),
				ename: Random.cword(3, 20),
				area: Random.cword(3, 20),
				etype: Random.cword(3, 20),
				content: Random.cparagraph(),
				remark: Random.cparagraph(),
				createuser: Random.cname(),
				userDept: Random.cword(3, 5),
				userno: Random.increment(),
				userphone: "150458409094",
				createTime: Random.datetime(),
				completeTime: "3天",
				ActualcompleteTime: Random.datetime(),
				PlancompleteTime: Random.datetime(),
				duration: Random.d100(),
				date: Random.date("MM月-dd日"),
			}
		},
	},

	/*
@name       saveOrder 
@desc       提交派单         
@params     {
                id               string       单id
                execouter        string       执行人
                level            string       级别[1:低,2:中,3:高]
                completeTime     string       计划完成时间
            }
@return     null
*/
	{
		url: "/api/v1/operations/maintain/order/saveOrder",
		handler() {
			return null
		},
	},

	/*
@name       receiving 
@desc       接单         
@params     {
                id     string     记录id
            }
@return     null
*/
	{
		url: "/api/v1/operations/maintain/order/receiving",
		handler() {
			return null
		},
	},

	/*
@name       end 
@desc       结束订单         
@params     {
                id     string     记录id
            }
@return     null
*/
	{
		url: "/api/v1/operations/maintain/order/end",
		handler() {
			return null
		},
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
	{
		url: "/api/v1/operations/maintain/order/saveAssist",
		handler() {
			return null
		},
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
	{
		url: "/api/v1/operations/maintain/order/getHelpers",
		handler() {
			return Mock.mock({
				[`value|20`]: [
					{
						id: () => Random.id(),
						name: Random.cname(),
						phone: "1583403439489",
						no: () => Random.increment(),
					},
				],
			}).value
		},
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
	{
		url: "/api/v1/operations/maintain/order/saveTransfer",
		handler() {
			return null
		},
	},
	/*
@name       hangUp 
@desc       挂起         
@params     {
                id     string     记录id
            }
@return     null
*/
	{
		url: "/api/v1/operations/maintain/order/hangUp",
		handler() {
			return null
		},
	},

	/*
@name       recovery 
@desc       恢复         
@params     {
                id     string     记录id
            }
@return     null
*/
	{
		url: "/api/v1/operations/maintain/order/recovery",
		handler() {
			return null
		},
	},

	/*
@name       agree 
@desc       同意         
@params     {
                id     string     记录id
            }
@return     null
*/
	{
		url: "/api/v1/operations/maintain/order/agree",
		handler() {
			return null
		},
	},
	/*
@name       refuse 
@desc       拒绝         
@params     {
                id     string     记录id
            }
@return     null
*/
	{
		url: "/api/v1/operations/maintain/order/refuse",
		handler() {
			return null
		},
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
	{
		url: "/api/v1/operations/maintain/order/saveEvaluate",
		handler() {
			return null
		},
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
                }
    */
	{
		url: "/api/v1/operations/maintain/order/getImplement",
		handler() {
			return {
				id: Random.id(),
				implementName: Random.cword(3, 20),
				implementDept: Random.cword(3, 10),
				implementTime: Random.datetime(),
				implementRemark: "",
				assistName: Random.cword(3, 20),
				assistDept: Random.cword(3, 10),
				assistTime: Random.datetime(),
				assistRemark: "",
			}
		},
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
	{
		url: "/api/v1/operations/maintain/order/getEvaluate",
		handler() {
			return {
				id: Random.id(),
				name: Random.cword(3, 20),
				dept: Random.cword(3, 10),
				time: Random.datetime(),
				remark: Random.cparagraph(),
				score: Random.integer(1, 5),
			}
		},
	},
	/*
@name       getMaintenance 
@desc       获取保养情况         
@params     {
                orderId     string      保养单id
            }
@return     array>{
                id          string     id
                content     string     执行内容
                cretatTime  string     创建时间
            }
*/
	{
		url: "/api/v1/operations/maintain/order/getMaintenance",
		handler() {
			return Mock.mock({
				[`value|6`]: [
					{
						id: () => Random.id(),
						content: () => Random.cparagraph(),
						cretatTime: () => Random.datetime(),
					},
				],
			}).value
		},
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
	{
		url: "/api/v1/operations/maintain/order/getOrdertracking",
		handler() {
			return Mock.mock({
				[`value|6`]: [
					{
						id: () => Random.id(),
						exetuoter: () => Random.cname(),
						status: () => Random.cword(3, 10),
						time: () => Random.datetime(),
						content: () => Random.cword(3, 20),
						record: () => "工单处理记录",
					},
				],
			}).value
		},
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
	{
		url: "/api/v1/operations/maintain/order/getnotesList",
		handler(req) {
			const params = req.query
			return {
				total: Random.d100(),
				pageNum: params.pageNum,
				pageSize: params.pageSize,
				headers: [
					{
						field: "index",
						dataField: "index",
						fieldName: "序号",
						fixed: true,
						sorted: false,
						index: 1,
					},
					{
						field: "name",
						dataField: "name",
						fieldName: "申领人姓名",
						fixed: true,
						sorted: false,
						index: 2,
					},
					{
						field: "no",
						dataField: "no",
						fieldName: "申领人工号",
						fixed: true,
						sorted: false,
						index: 3,
					},
					{
						field: "phone",
						dataField: "phone",
						fieldName: "申领人电话",
						fixed: true,
						sorted: false,
						index: 4,
					},
					{
						field: "dept",
						dataField: "dept",
						fieldName: "申领科室",
						fixed: true,
						sorted: false,
						index: 5,
					},
					{
						field: "content",
						dataField: "content",
						fieldName: "申领内容",
						fixed: true,
						sorted: false,
						index: 6,
					},
					{
						field: "num",
						dataField: "num",
						fieldName: "申领数量",
						fixed: true,
						sorted: false,
						index: 7,
					},
					{
						field: "status",
						dataField: "status",
						fieldName: "状态",
						fixed: true,
						sorted: false,
						index: 8,
					},
					{
						field: "time",
						dataField: "time",
						fieldName: "申领日期",
						fixed: true,
						sorted: false,
						index: 9,
					},
				],
				list: Mock.mock({
					[`value|${params.pageSize}`]: [
						{
							id: () => Random.id(),
							index: () => Random.increment(),
							no: () => Random.id(),
							dept: () => Random.csentence(2, 10),
							name: () => Random.cname(),
							status: () => Random.pick(["1", "2", "3"]),
							time: () => Random.datetime(),
							num: () => Random.d20(),
							content: () => Random.cword(3, 20),
							phone: () => "18547896324",
						},
					],
				}).value,
			}
		},
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
	{
		url: "/api/v1/operations/maintain/order/getMaintainContents",
		handler() {
			return {
				status: Random.pick(["1", "2", "3", "4", "5", "6", "7"]),
				contents: Mock.mock({
					[`value|6`]: [
						{
							id: () => Random.id(),
							content: () => Random.cparagraph(),
							executionTime: () =>
								Random.pick(["", Random.datetime()]),
						},
					],
				}).value,
			}
		},
	},
	/*
@name       getDdepts  
@desc       获取申领科室         
@return     Array<{
                    id          number              记录id
                    name        string              科室名称
                }>
*/
	{
		url: "/api/v1/operations/maintain/order/getDdepts",
		handler() {
			return Mock.mock({
				[`value|10`]: [
					{
						id: () => Random.id(),
						name: () => Random.csentence(4, 20),
					},
				],
			}).value
		},
	},
]
