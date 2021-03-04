const Mock = require("mockjs")
const Random = Mock.Random
module.exports = [
	/*
    @name       getBlacksupplierList   
    @desc       获取黑名单供应商列表         
    @params     {
                    keyword         string      关键字
                    pageNum         number      页码
                    pageSize        number      每页数量
                }
    @return     Array<{
                    id                  number              记录id
                    supplierName        string              供应商名称
                    supplierNo          string              供应商编码
                    supplierAddress     string              供应商地址
                    supplierPhone       string              电话
                    contractNum         number              关联合同数目
                    contractAcount      float               合同金额
                    createTime          string              创建时间
                    supplierStatus      number              状态
                    contractNo          string              关联合同编号
                }
*/
	{
		url: "/api/v1/operations/asset/blacklist/getBlacksupplierList",
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
						field: "supplierNo",
						dataField: "supplierNo",
						fieldName: "公司编号",
						fixed: true,
						sorted: false,
						index: 2,
					},
					{
						field: "supplierName",
						dataField: "supplierName",
						fieldName: "公司名称",
						fixed: true,
						sorted: false,
						index: 3,
					},
					{
						field: "supplierAddress",
						dataField: "supplierAddress",
						fieldName: "公司地址",
						fixed: true,
						sorted: false,
						index: 4,
					},
					{
						field: "supplierPhone",
						dataField: "supplierPhone",
						fieldName: "公司电话",
						fixed: true,
						sorted: false,
						index: 5,
					},
					{
						field: "contractNo",
						dataField: "contractNo",
						fieldName: "关联合同",
						fixed: true,
						sorted: false,
						index: 6,
					},
				],
				list: Mock.mock({
					[`value|${params.pageSize}`]: [
						{
							id: () => Random.id(),
							supplierName: () => Random.cword(3, 10),
							supplierNo: () => Random.id(),
							supplierStatus: () => Random.pick([0, 1]),
							supplierAddress: () => Random.cword(3, 5),
							createTime: () => Random.date(),
							supplierPhone: () => "17726647947",
							contractNum: () => 5,
							contractAcount: () => 55555.0,
							contractNo: () => Random.id(),
						},
					],
				}).value,
			}
		},
	},

	/*
    @name       removeBlacklist
    @desc       移除黑名单       
    @params     {
                    supplierIds   string     供应商id
                }
    @return     null
*/
	{
		url: "/api/v1/operations/asset/blacklist/removeBlacklist",
		handler() {
			return null
		},
	},
	/*
    @name       saveBlacklist
    @desc       添加黑名单       
    @params     {
                    supplierIds   string     供应商id
                }
    @return     null
*/
	{
		url: "/api/v1/operations/asset/blacklist/saveBlacklist",
		handler() {
			return null
		},
	},
	/*
    @name       getsupplierList   
    @desc       获取供应商列表         
    @params     {
                    keyword         string      关键字
                    pageNum         number      页码
                    pageSize        number      每页数量
                }
    @return     Array<{
                    id                  number              记录id
                    supplierName        string              供应商名称
                    supplierNo          string              供应商编码
                    supplierAddress     string              供应商地址
                    supplierPhone       string              电话
                    contractNo          string              关联合同编号
                }
*/
	{
		url: "/api/v1/operations/asset/blacklist/getsupplierList",
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
						field: "supplierNo",
						dataField: "supplierNo",
						fieldName: "公司编号",
						fixed: true,
						sorted: false,
						index: 2,
					},
					{
						field: "supplierName",
						dataField: "supplierName",
						fieldName: "公司名称",
						fixed: true,
						sorted: false,
						index: 3,
					},
					{
						field: "supplierAddress",
						dataField: "supplierAddress",
						fieldName: "公司地址",
						fixed: true,
						sorted: false,
						index: 4,
					},
					{
						field: "supplierPhone",
						dataField: "supplierPhone",
						fieldName: "公司电话",
						fixed: true,
						sorted: false,
						index: 5,
					},
					{
						field: "contractNo",
						dataField: "contractNo",
						fieldName: "关联合同",
						fixed: true,
						sorted: false,
						index: 6,
					},
				],
				list: Mock.mock({
					[`value|${params.pageSize}`]: [
						{
							id: () => Random.id(),
							supplierName: () => Random.cword(3, 10),
							supplierNo: () => Random.id(),
							supplierAddress: () => Random.cword(3, 5),
							supplierPhone: () => "17726647947",
							contractNo: () => Random.id(),
						},
					],
				}).value,
			}
		},
	},
]
