const Mock = require("mockjs")
const Random = Mock.Random
module.exports = [
	/*
@name       getRecordList   
@desc       获取保养记录列表          
@params     {
                search      string      关键字
                time        array       日期筛选
                status      string      状态
                pageNum     number      页码
                pageSize    number      每页数量
            }
@return     {
                total       number      总记录数
                pageNum     number      当前页码
                pageSize    number      每页条数
                list        Array<{
                    id          number              记录id
                    time        string              记录时间
                    name        string              名称
                    dept        string              所属部门
                    executor    string              执行人
                    result       string              结果
                }>
            }
*/
	{
		url: "/api/v1/operations/maintain/record/getRecordList",
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
							time: () => Random.date(),
							dept: () => Random.csentence(4, 10),
							executor: Random.cname(),
							result: () => Random.pick(["正常", "未果"]),
						},
					],
				}).value,
			}
		},
	},
	/*
    @name       getDetail   
    @desc       获取保养记录详情          
    @params     {
                    id      string      记录ids
                }
    @return     {
                    id          number              记录id
                    time        string              时间
                    name        string              名称
                    index       string              次数
                    dept        string              所属部门
                    executor    string              执行人
                    content     string              内容
                    createTime  string              创建时间
                    user        string              创建人
                    cycle       string              维护周期
                }
    */
	{
		url: "/api/v1/operations/maintain/record/getDetail",
		handler() {
			return {
				cycle: Random.d20(),
				dept: Random.cword(3, 5),
				executor: Random.cname(),
				time: Random.datetime(),
				content: Random.cparagraph(),
				createTime: Random.datetime(),
				id: Random.id(),
				index: Random.increment(),
				name: Random.csentence(4, 20),
				userName: Random.cname(),
				userDept: Random.cword(3, 5),
			}
		},
	},
	/*
@name       getRecord   
@desc       获取保养记录       
@params     {
                record          string      保养记录id
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
	{
		url: "/api/v1/operations/maintain/record/getRecord",
		handler() {
			return {
				maintainTime:
					Random.date("yyyy-MM-dd ") +
					Random.time("HH:mm") +
					" ~ " +
					Random.time("HH:mm"),
				taskTime: Random.date(),
				ename: Random.cword(3, 20),
				etypeName: Random.cword(3, 20),
				status: Random.pick(["正常", "异常"]),
				remark: Random.cparagraph(),
				contents: Mock.mock({
					[`value|4`]: [
						{
							name: () => Random.cword(3, 20),
							executionUser: () => Random.cname(),
							executionDate: () => Random.datetime(),
							status: () => Random.pick([1, 2]),
						},
					],
				}).value,
			}
		},
	},
]
