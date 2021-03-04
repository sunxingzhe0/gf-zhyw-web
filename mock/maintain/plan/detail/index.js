const Mock = require("mockjs")
const Random = Mock.Random
module.exports = [
	/*
@name       getPlanInfo 
@desc       获取保养计划基本信息         
@params     {
                planid          string      保养计划id
            }
@return     {
                id              number              记录id
                name            string      保养名称
                dept            string      维护部门
                executor        string      执行人
                status          string      状态[true:启用,false:停用]
                mrules          array       保养规则
                createuserName  string      创建人
                createTime      string      创建时间
}
*/
	{
		url: "/api/v1/operations/maintain/plan/detail/getPlanInfo",
		handler() {
			return {
				id: Random.id(),
				status: Random.pick([true, false]),
				name: Random.csentence(4, 20),
				dept: Random.csentence(4, 20),
				executor: Random.cname(),
				createTime: Random.datetime(),
				createuserName: Random.cname(),
				mrules: Mock.mock({
					"array|1-3": [
						{
							"value|+1": [
								{
									id: "a",
									cycle: Random.integer(1, 20),
									company: Random.pick(["月", "天"]),
									level: Random.pick([
										"1",
										"2",
										"3",
										"4",
										"5",
									]),
								},
								{
									id: "b",
									hour: Random.integer(1, 1000),
									initialization: Random.date(),
									level: Random.pick([
										"1",
										"2",
										"3",
										"4",
										"5",
									]),
								},
								{
									id: "c",
									accumulate: Random.integer(1, 1000),
									level: Random.pick([
										"1",
										"2",
										"3",
										"4",
										"5",
									]),
								},
							],
						},
					],
				}).array,
			}
		},
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
	{
		url: "/api/v1/operations/maintain/plan/detail/getEquipmentTree",
		handler() {
			return Mock.mock({
				[`value|1-5`]: [
					{
						id: () => Random.id(),
						name: () => Random.csentence(4, 20),
						children: () =>
							Mock.mock({
								[`value|1-5`]: [
									{
										id: () => Random.id(),
										name: () => Random.csentence(4, 20),
										children: () =>
											Mock.mock({
												[`value|1-5`]: [
													{
														id: () => Random.id(),
														name: () =>
															Random.csentence(
																4,
																20
															),
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
	{
		url: "/api/v1/operations/maintain/plan/detail/getorderList",
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
						fieldName: "类型",
						fixed: true,
						sorted: false,
						index: 2,
					},
					{
						field: "no",
						dataField: "no",
						fieldName: "编号",
						fixed: true,
						sorted: false,
						index: 3,
					},
					{
						field: "ename",
						dataField: "ename",
						fieldName: "设备名称",
						fixed: true,
						sorted: false,
						index: 4,
					},
					{
						field: "etype",
						dataField: "etype",
						fieldName: "设备类型",
						fixed: true,
						sorted: false,
						index: 5,
					},
					{
						field: "source",
						dataField: "source",
						fieldName: "来源",
						fixed: true,
						sorted: false,
						index: 6,
					},
					{
						field: "status",
						dataField: "status",
						fieldName: "状态",
						fixed: true,
						sorted: false,
						index: 7,
					},
					{
						field: "time",
						dataField: "time",
						fieldName: "登记时间",
						fixed: true,
						sorted: false,
						index: 8,
					},
					{
						field: "taskNo",
						dataField: "taskNo",
						fieldName: "所属保养任务",
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
							type: () => Random.csentence(2, 10),
							ename: () => Random.csentence(4, 20),
							etype: () => Random.csentence(2, 10),
							source: () => Random.csentence(2, 10),
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
							time: () => Random.datetime(),
							taskNo: () => Random.id(),
						},
					],
				}).value,
			}
		},
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
	{
		url: "/api/v1/operations/maintain/plan/detail/getRepairorderList",
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
						fieldName: "维修单类型",
						fixed: true,
						sorted: false,
						index: 2,
					},
					{
						field: "no",
						dataField: "no",
						fieldName: "编号",
						fixed: true,
						sorted: false,
						index: 3,
					},
					{
						field: "ename",
						dataField: "ename",
						fieldName: "设备名称",
						fixed: true,
						sorted: false,
						index: 4,
					},
					{
						field: "etype",
						dataField: "etype",
						fieldName: "设备类型",
						fixed: true,
						sorted: false,
						index: 5,
					},
					{
						field: "source",
						dataField: "source",
						fieldName: "来源",
						fixed: true,
						sorted: false,
						index: 6,
					},
					{
						field: "status",
						dataField: "status",
						fieldName: "状态",
						fixed: true,
						sorted: false,
						index: 7,
					},
					{
						field: "time",
						dataField: "time",
						fieldName: "登记时间",
						fixed: true,
						sorted: false,
						index: 8,
					},
					{
						field: "taskNo",
						dataField: "taskNo",
						fieldName: "所属保养任务",
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
							type: () => Random.csentence(2, 10),
							ename: () => Random.csentence(4, 20),
							etype: () => Random.csentence(2, 10),
							source: () => Random.csentence(2, 10),
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
							time: () => Random.datetime(),
							taskNo: () => Random.id(),
						},
					],
				}).value,
			}
		},
	},
]
