const Mock = require("mockjs")
const Random = Mock.Random
module.exports = [
	/*
@name       getPlanList   
@desc       获取保养计划列表          
@params     {
                status      string      保养计划状态[1:启用,0:停用]
                date        array       日期筛选
                pageNum     number      页码
                pageSize    number      每页数量
            }
@return     {
                total       number      总记录数
                pageNum     number      当前页码
                pageSize    number      每页条数
                list        Array<{
                    id          number              记录id
                    status      string              保养计划状态[true:启用,false:停用]
                    rules       array               保养规则
                    createdTime string              创建时间
                    equipments  number              保养设备数量
                    level       string              保养等级[1:日常保养,2:一级保养,3:二级保养,4:三级保养,5:定期检修]
                    name        string              保养计划名称
                }>
            }
*/
	{
		url: "/api/v1/operations/maintain/plan/getPlanList",
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
							equipments: () => Random.d20(),
							level: () => Random.pick([1, 2, 3, 4, 5]),
							createdTime: () => Random.datetime(),
							status: () => Random.boolean(),
							name: () => Random.csentence(4, 20),
							rules: () =>
								Mock.mock({
									"array|1-3": [
										{
											"value|+1": [
												"保养周期" +
													Random.integer(1, 20) +
													"天",
												"保养后运行" +
													Random.integer(1, 100) +
													"小时",
												"累积运行" +
													Random.integer(1, 1000) +
													"小时",
											],
										},
									],
								}).array,
						},
					],
				}).value,
			}
		},
	},
	/*
@name       getTypes  
@desc       获取保养计划设备类型          
@return     Array<{
                    id          number              记录id
                    name        string              设备类型名称
                }>
*/
	{
		url: "/api/v1/operations/maintain/plan/getTypes",
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
	/*
@name       getContentList 
@desc       获取保养计划保养内容列表          
@params     {
                typeid      string      设备类型id
            }
@return     Array<{
                    id          number              记录id
                    index       number              序号
                    name        string              名称
                    content     string              内容
                }>
*/
	{
		url: "/api/v1/operations/maintain/plan/getContentList",
		handler() {
			return Mock.mock({
				[`value|10`]: [
					{
						id: () => Random.id(),
						index: () => Random.increment(),
						name: () => Random.csentence(4, 20),
						typeName: () => Random.csentence(4, 20),
						content: () => Random.cparagraph(),
					},
				],
			}).value
		},
	},
	/*
@name       getDepts  
@desc       获取维护部门         
@return     Array<{
                    id          number              记录id
                    name        string              部门名称
                }>
*/
	{
		url: "/api/v1/operations/maintain/plan/getDepts",
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
	/*
@name       getExecutors
@desc       获取执行人          
@return     Array<{
                    id          number              记录id
                    name        string              执行人名称
                }>
*/
	{
		url: "/api/v1/operations/maintain/plan/getExecutors",
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
	{
		url: "/api/v1/operations/maintain/plan/savePlan",
		method: "post",
		handler() {
			return {
				id: Random.id(),
				message: "提交成功",
			}
		},
	},

	/*
@name       getequipmentList   
@desc       获取设备关联列表        
@params     {
                searchType      string      查询类型[0:设备名称,1:设备类型]
                keyword         string      关键字
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
                    no          string              编号
                }>
            }
*/
	{
		url: "/api/v1/operations/maintain/plan/getequipmentList",
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
						field: "type",
						dataField: "type",
						fieldName: "设备类型",
						fixed: true,
						sorted: false,
						index: 2,
					},
					{
						field: "no",
						dataField: "no",
						fieldName: "设备编号",
						fixed: true,
						sorted: false,
						index: 3,
					},
					{
						field: "name",
						dataField: "name",
						fieldName: "设备名称",
						fixed: true,
						sorted: false,
						index: 4,
					},
				],
				list: Mock.mock({
					[`value|${params.pageSize}`]: [
						{
							id: () => Random.id(),
							index: () => Random.increment(),
							type: () => Random.csentence(2, 10),
							typeid: () => Random.id(),
							no: () => Random.id(),
							name: () => Random.csentence(4, 20),
						},
					],
				}).value,
			}
		},
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
	{
		url: "/api/v1/operations/maintain/plan/getUnboundequipments",
		handler() {
			return Mock.mock({
				[`value|20`]: [
					{
						id: () => Random.id(),
						index: () => Random.increment(),
						type: () => Random.csentence(2, 10),
						no: () => Random.id(),
						name: () => Random.csentence(4, 20),
					},
				],
			}).value
		},
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
	{
		url: "/api/v1/operations/maintain/plan/savePlanquipment",
		handler() {
			return null
		},
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
	{
		url: "/api/v1/operations/maintain/plan/removePlanequipment",
		handler() {
			return null
		},
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
	{
		url: "/api/v1/operations/maintain/plan/getRecord",
		handler() {
			return Mock.mock({
				[`value|4`]: [
					{
						id: () => Random.id(),
						name: () => Random.cword(3, 20),
						taskTime: () => Random.date(),
						executionTime: () => Random.date(),
						timeInterval: () =>
							Mock.mock({
								[`value|4`]: [
									{
										time: () =>
											Random.time("HH:mm") +
											" ~ " +
											Random.time("HH:mm"),
										ponitName: () =>
											Random.csentence(4, 20),
										maintainTime: () =>
											Random.date("yyyy-MM-dd ") +
											Random.time("HH:mm") +
											" ~ " +
											Random.time("HH:mm"),
										status: () =>
											Random.pick(["正常", "异常"]),
										remark: () => Random.cparagraph(),
										equipments: () =>
											Mock.mock({
												[`value|4`]: [
													{
														ename: () =>
															Random.cword(3, 20),
														status: () =>
															Random.pick([
																"正常",
																"异常",
															]),
														contents: () =>
															Mock.mock({
																[`value|4`]: [
																	{
																		name: () =>
																			Random.cword(
																				3,
																				20
																			),
																		executionUser: () =>
																			Random.cname(),
																		executionDate: () =>
																			Random.datetime(),
																	},
																],
															}).value,
													},
												],
											}).value,
									},
								],
							}).value,
					},
				],
			}).value
		},
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
	{
		url: "/api/v1/operations/maintain/plan/getTaskList",
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
							name: () => Random.csentence(4, 20),
							time: () => Random.datetime(),
							index: () => Random.increment(),
							ename: () => Random.csentence(4, 10),
							dept: () => Random.csentence(4, 20),
							executor: () => Random.cname(),
							floor: Mock.mock("@natural(1, 20)"),
						},
					],
				}).value,
			}
		},
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
	{
		url: "/api/v1/operations/maintain/plan/getContents",
		handler() {
			return Mock.mock({
				[`value|10`]: [
					{
						id: () => Random.id(),
						index: () => Random.increment(),
						name: () => Random.csentence(4, 20),
						typeName: () => Random.csentence(4, 20),
						content: () => Random.cparagraph(),
					},
				],
			}).value
		},
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
	{
		url: "/api/v1/operations/maintain/plan/savePlanContent",
		method: "post",
		handler() {
			return {
				message: "添加成功",
			}
		},
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
	{
		url: "/api/v1/operations/maintain/plan/delPlanContent",
		method: "post",
		handler() {
			return {
				message: "删除成功",
			}
		},
	},
]
