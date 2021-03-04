const Mock = require("mockjs")
const Random = Mock.Random
module.exports = [
	/*
    @name       getassetList   
    @desc       获取申领资产列表         
    @params     {
                    keyword         string      关键字
                    pageNum         number      页码
                    pageSize        number      每页数量
                }
    @return     Array<{
                    id                  number              记录id
                    assetName           string              资产名称
                    assetNo             number              资产型号
                    assetType           string              资产类型
                    applyStatus         number              状态[1:待审核,2:已通过,3:已驳回]
                    applyDeptName       string              申领部门
                    applyUserName       string              申领人
                    applyRemark         string              申领理由
                    applyTime           string              申领日期
                }
*/
	{
		url: "/api/v1/operations/asset/applyAsset/getassetList",
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
							assetName: () => Random.cword(3, 10),
							assetType: () => Random.cword(3, 10),
							assetNo: () => Random.id(),
							applyStatus: () => Random.pick([2, 1, 3]),
							applyDeptName: () => Random.cword(3, 5),
							applyUserName: () => Random.cname(),
							applyRemark: () => Random.cword(3, 100),
							applyTime: () => Random.datetime(),
						},
					],
				}).value,
			}
		},
	},
	/*
    @name       getassetData   
    @desc       获取申领资产统计
    @params     {
                    keyword         string      关键字
                }
    @return     Array<{
                    value      number           资产数
                    name       string           状态名称
                }
*/
	{
		url: "/api/v1/operations/asset/applyAsset/getassetData",
		handler() {
			return [
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
			]
		},
	},
	/*
    @name       getpurchaseAseets 
    @desc       获取资产采购列表         
    @params     {
                    keyword         string      关键字
                    pageNum         number      页码
                    pageSize        number      每页数量
                }
    @return     Array<{
                    id                  number              记录id
                    assetName           string              资产名称
                    assetNo             number              资产型号
                    assetType           string              资产类型
                    applyStatus         number              状态[1:待采买,2:采买中,3:已采买]
                    applyDeptName       string              申领部门
                    applyUserName       string              申领人
                    applyRemark         string              申领理由
                    applyTime           string              申领日期
                }
*/
	{
		url: "/api/v1/operations/asset/applyAsset/getpurchaseAseets",
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
							assetName: () => Random.cword(3, 10),
							assetType: () => Random.cword(3, 10),
							assetNo: () => Random.id(),
							applyStatus: () => Random.pick([2, 1, 3]),
							applyDeptName: () => Random.cword(3, 5),
							applyUserName: () => Random.cname(),
							applyRemark: () => Random.cword(3, 100),
							applyTime: () => Random.datetime(),
						},
					],
				}).value,
			}
		},
	},
	/*
    @name       getpurchaseData
    @desc       获取采买资产统计
    @params     {
                    keyword         string      关键字
                }
    @return     Array<{
                    value      number           资产数
                    name       string           状态名称
                }
*/
	{
		url: "/api/v1/operations/asset/applyAsset/getpurchaseData",
		handler() {
			return [
				{
					value: Random.integer(1, 1000),
					name: "待采买",
				},
				{
					value: Random.integer(1, 1000),
					name: "采买中",
				},
				{
					value: Random.integer(1, 1000),
					name: "已采买",
				},
			]
		},
	},
	/*
    @name       agree
    @desc       同意资产申领       
    @params     {
                    id   string     记录id
                }
    @return     null
*/
	{
		url: "/api/v1/operations/asset/applyAsset/agree",
		handler() {
			return null
		},
	},
	/*
    @name       refuse
    @desc       拒绝资产申领       
    @params     {
                    id   string     记录id
                }
    @return     null
*/
	{
		url: "/api/v1/operations/asset/applyAsset/refuse",
		handler() {
			return null
		},
	},
	/*
    @name       purchase
    @desc       采购       
    @params     {
                    id   string     记录id
                }
    @return     null
*/
	{
		url: "/api/v1/operations/asset/applyAsset/purchase",
		handler() {
			return null
		},
	},
	/*
    @name       signFor
    @desc       签收       
    @params     {
                    id   string     记录id
                }
    @return     null
*/
	{
		url: "/api/v1/operations/asset/applyAsset/signFor",
		handler() {
			return null
		},
	},
	/*
    @name       withdraw
    @desc       撤回       
    @params     {
                    id   string     记录id
                }
    @return     null
*/
	{
		url: "/api/v1/operations/asset/applyAsset/withdraw",
		handler() {
			return null
		},
	},
	/*
    @name       saveApply
    @desc       申领信息添加       
    @params     {
                    assetName       string      资产名称
                    assetNo         string      资产型号
                    applyDeptName   string      申领部门
                    applyRemark     string      申领理由
                    applyUserName   string      申领人
                }
    @return     null
*/
	{
		url: "/api/v1/operations/asset/applyAsset/saveApply",
		handler() {
			return null
		},
	},
]
