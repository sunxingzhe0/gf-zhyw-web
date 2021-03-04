const Mock = require("mockjs")
const Random = Mock.Random
module.exports = [
	/*
@name       getContentList   
@desc       获取保养内容列表          
@params     {
                search      string      关键字
                type        string      类型
                pageNum     number      页码
                pageSize    number      每页数量
            }
@return     {
                total       number      总记录数
                pageNum     number      当前页码
                pageSize    number      每页条数
                list        Array<{
                    id          number              记录id
                    name        string              名称
                    content       string            内容
                    type       string               类型
                }>
            }
*/
	{
		url: "/api/v1/operations/maintain/content/getContentList",
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
							content: () => Random.cparagraph(),
							type: () => Random.pick([1, 2, 3]),
							typename: () => Random.cword(3, 5),
						},
					],
				}).value,
			}
		},
	},

	/*
@name       delContents 
@desc       删除内容         
@params     {
               id          string      内容id
            }
@return     null
*/
	{
		url: "/api/v1/operations/maintain/content/delContents",
		handler() {
			return null
		},
	},
	/*
@name       saveContent 
@desc       提交内容         
@params     {
                name        string            名称
                content     string            内容
                type        array             类型
            }
@return     null
*/
	{
		url: "/api/v1/operations/maintain/content/saveContent",
		handler() {
			return null
		},
	},
	/*
@name       getequipmenttree 
@desc       设备类型树         
@params     null
@return     {
                id           string            类型id
                name         string            类型名称
                children     array             子集
            }
*/
	{
		url: "/api/v1/operations/maintain/content/getequipmenttree",
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
									},
								],
							}).value,
					},
				],
			}).value
		},
	},
]
