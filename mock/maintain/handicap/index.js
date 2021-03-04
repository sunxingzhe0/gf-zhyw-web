const Mock = require("mockjs")
const Random = Mock.Random
module.exports = [
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
	{
		url: "/api/v1/operations/maintain/handicap/getHandicapList",
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
						field: "registrant",
						dataField: "registrant",
						fieldName: "登记人",
						fixed: true,
						sorted: false,
						index: 2,
					},
					{
						field: "repairName",
						dataField: "repairName",
						fieldName: "报修人姓名",
						fixed: true,
						sorted: false,
						index: 3,
					},
					{
						field: "repairNo",
						dataField: "repairNo",
						fieldName: "报修人工号",
						fixed: true,
						sorted: false,
						index: 4,
					},
					{
						field: "repairPhone",
						dataField: "repairPhone",
						fieldName: "报修人电话",
						fixed: true,
						sorted: false,
						index: 5,
					},
					{
						field: "repairDept",
						dataField: "repairDept",
						fieldName: "报修部门",
						fixed: true,
						sorted: false,
						index: 6,
					},
					{
						field: "title",
						dataField: "title",
						fieldName: "报修主题",
						fixed: true,
						sorted: false,
						index: 7,
					},
					{
						field: "repairTime",
						dataField: "repairTime",
						fieldName: "报修时间",
						fixed: true,
						sorted: false,
						index: 8,
					},
					{
						field: "status",
						dataField: "status",
						fieldName: "状态",
						fixed: true,
						sorted: false,
						index: 9,
					},
				],
				list: Mock.mock({
					[`value|${params.pageSize}`]: [
						{
							id: () => Random.id(),
							title: () => Random.cword(3, 20),
							registrant: () => Random.cname(),
							repairName: () => Random.cname(),
							repairNo: () => Random.increment(100),
							repairPhone: () => "18547896324",
							repairDept: () => Random.cword(3, 5),
							repairTime: () => Random.datetime(),
							status: () => Random.pick(["1", "2", "3"]),
						},
					],
				}).value,
			}
		},
	},

	/*
@name       urging 
@desc       催办         
@params     {
                id               string       id
            }
@return     null
*/
	{
		url: "/api/v1/operations/maintain/handicap/urging",
		handler() {
			return null
		},
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
	{
		url: "/api/v1/operations/maintain/handicap/getDetail",
		handler() {
			return {
				id: Random.id(),
				title: Random.cword(3, 20),
				registrant: Random.cname(),
				repairName: Random.cname(),
				repairNo: Random.increment(100),
				repairPhone: "18547896324",
				repairDept: Random.cword(3, 5),
				repairTime: Random.datetime(),
				status: Random.pick(["1", "2", "3"]),
				repairContent: Random.cparagraph(),
				record: Random.cword(3, 5),
				etype: Random.cword(3, 5),
				area: Random.cword(3, 5),
				ename: Random.cword(3, 5),
				filelist: Mock.mock({
					[`value|6`]: [
						{
							url: () => Random.image(),
						},
					],
				}).value,
			}
		},
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
	{
		url: "/api/v1/operations/maintain/handicap/getRepairSituation",
		handler() {
			return {
				id: Random.id(),
				repairTime: Random.datetime() + "~ " + Random.datetime(),
				repairContent: Random.cparagraph(),
				filelist: Mock.mock({
					[`value|6`]: [
						{
							url: () => Random.image(),
						},
					],
				}).value,
				evaluate: {
					score: Random.integer(1, 5),
					remark: Random.cparagraph(),
					time: Random.datetime(),
				},
				assist: Mock.mock({
					[`value|2`]: [
						{
							name: Random.cname(),
							no: Random.increment(100),
							phone: "18547896324",
							dept: Random.cword(3, 5),
						},
					],
				}).value,
				distribute: Mock.mock({
					[`value|2`]: [
						{
							name: Random.cname(),
							no: Random.increment(100),
							phone: "18547896324",
							dept: Random.cword(3, 5),
						},
					],
				}).value,
			}
		},
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
	{
		url: "/api/v1/operations/maintain/handicap/gelogList",
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
						field: "content",
						dataField: "content",
						fieldName: "操作内容",
						fixed: true,
						sorted: false,
						index: 2,
					},
					{
						field: "userName",
						dataField: "userName",
						fieldName: "操作人",
						fixed: true,
						sorted: false,
						index: 3,
					},
					{
						field: "time",
						dataField: "time",
						fieldName: "操作时间",
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
							userName: () => Random.cname(),
							time: () => Random.datetime(),
							content: () => Random.cparagraph(),
						},
					],
				}).value,
			}
		},
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
	{
		url: "/api/v1/operations/maintain/handicap/saveHandicap",
		handler() {
			return null
		},
	},
]
