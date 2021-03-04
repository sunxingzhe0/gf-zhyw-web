const Mock = require("mockjs")
const Random = Mock.Random
module.exports = [
	/*
@name       getData   
@desc       获取图表数据          
@params     {
                search      array      日期筛选
            }
@return     {
                nums        string      数量统计
                examines    string      类型统计
                repairs     string      维修统计
            }
*/
	{
		url: "/api/v1/operations/maintain/survey/getData",
		handler() {
			return {
				nums: Mock.mock({
					[`value|7`]: [
						{
							ename: () => Random.cword(3, 5),
							enum: () => Random.integer(1, 100),
							mnum: () => Random.integer(1, 100),
						},
					],
				}).value,
				examines: [
					{
						value: Random.integer(1, 1000),
						name: "待审核",
					},
					{
						value: Random.integer(1, 1000),
						name: "已通过",
					},
					{
						value: Random.integer(1, 1000),
						name: "已驳回",
					},
				],
				repairs: Mock.mock({
					[`value|7`]: [
						{
							time: () => Random.date("yyyy"),
							wnum: () => Random.integer(1, 100),
							mnum: () => Random.integer(1, 100),
							overdue: () => Random.integer(1, 100),
							end: () => Random.integer(1, 100),
							proportion: () => Random.integer(1, 100),
						},
					],
				}).value,
			}
		},
	},
]
