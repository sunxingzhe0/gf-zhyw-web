const Mock = require("mockjs")
const Random = Mock.Random
module.exports = [
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
                    contractNum         number              关联合同数目
                    contractAcount      float               合同金额
                    createTime          string              创建时间
                    supplierStatus      number              状态
                }
*/
	{
		url: "/api/v1/operations/asset/supplier/getsupplierList",
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
							supplierName: () => Random.cword(3, 10),
							supplierNo: () => Random.id(),
							supplierStatus: () => Random.pick([0, 1]),
							supplierAddress: () => Random.cword(3, 5),
							createTime: () => Random.date(),
							supplierPhone: () => "17726647947",
							contractNum: () => 5,
							contractAcount: () => 55555.0,
						},
					],
				}).value,
			}
		},
	},
	/*
    @name       saveSupplier   
    @desc       新增供应商信息        
    @params     {
                     supplierName: "", //供应商名称
                    supplierNo: "", //供应商编码
                    supplierAddress: "", // 供应商地址
                    supplierPhone: "", //电话
                    contractNum: "", //关联合同数目
                    contractAcount: "", //合同金额
                    createTime: "", //创建时间
                    supplierStatus: "", //状态
                    creditCode: "", //信用码
                    userInfo: [
                        {
                            user: "", //联系人
                            phone: "", //联系电话
                        },
                    ],
                    summary: "", //简介
                    businessLicense: "", //营业执照
                    others: [],
                }
    @return     null
*/
	{
		url: "/api/v1/operations/asset/supplier/saveSupplier",
		handler() {
			return {
				id: Random.id(),
			}
		},
	},
	/*
    @name       getcontractList   
    @desc       获取关联合同信息         
    @params     {
                    supplierId      string      供应商id
                    keyword         string      关键字
                    pageNum         number      页码
                    pageSize        number      每页数量
                }
    @return     Array<{
                    id                  number              记录id
                    contractName        string              名称
                    contractNo          string              编号
                    contractStatus      string              状态[1:有效]
                    contractTime        string              时间
                    contractBidding     string              是否招标[1:是:0:否]
                }
*/
	{
		url: "/api/v1/operations/asset/supplier/getcontractList",
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
						field: "contractNo",
						dataField: "contractNo",
						fieldName: "合同编号",
						fixed: true,
						sorted: false,
						index: 2,
					},
					{
						field: "contractName",
						dataField: "contractName",
						fieldName: "合同名称",
						fixed: true,
						sorted: false,
						index: 3,
					},
					{
						field: "contractStatus",
						dataField: "contractStatus",
						fieldName: "合同状态",
						fixed: true,
						sorted: false,
						index: 4,
					},
					{
						field: "contractTime",
						dataField: "contractTime",
						fieldName: "合同时间",
						fixed: true,
						sorted: false,
						index: 5,
					},
					{
						field: "contractBidding",
						dataField: "contractBidding",
						fieldName: "是否招标",
						fixed: true,
						sorted: false,
						index: 6,
					},
				],
				list: Mock.mock({
					[`value|${params.pageSize}`]: [
						{
							id: () => Random.id(),
							contractNo: () => Random.id(),
							contractName: () => Random.cword(3, 10),
							contractStatus: () => Random.pick(["1"]),
							contractBidding: () => Random.pick(["1", "0"]),
							usedUserName: () => Random.cname(),
							contractTime: () => Random.datetime(),
						},
					],
				}).value,
			}
		},
	},
	/*
    @name       saveContracts 
    @desc       供应商添加关联合同        
    @params     {
                    contracts   string     合同id逗号隔开
                }
    @return     null
*/
	{
		url: "/api/v1/operations/asset/supplier/saveContracts",
		handler() {
			return null
		},
	},
	/*
    @name       removeContracts 
    @desc       供应商解绑关联合同        
    @params     {
                    contracts   string     合同id逗号隔开
                }
    @return     null
*/
	{
		url: "/api/v1/operations/asset/supplier/removeContracts",
		handler() {
			return null
		},
	},
	/*
    @name       getequipmentList   
    @desc       获取关联设备信息         
    @params     {
                    supplierId      string      供应商id
                    keyword         string      关键字
                    pageNum         number      页码
                    pageSize        number      每页数量
                }
    @return     Array<{
                    id                  number              记录id
                    equipmentName        string              名称
                    equipmentNo          string              编号
                }
*/
	{
		url: "/api/v1/operations/asset/supplier/getequipmentList",
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
						field: "equipmentNo",
						dataField: "equipmentNo",
						fieldName: "设备编号",
						fixed: true,
						sorted: false,
						index: 2,
					},
					{
						field: "equipmentName",
						dataField: "equipmentName",
						fieldName: "设备名称",
						fixed: true,
						sorted: false,
						index: 3,
					},
				],
				list: Mock.mock({
					[`value|${params.pageSize}`]: [
						{
							id: () => Random.id(),
							equipmentNo: () => Random.id(),
							equipmentName: () => Random.cword(3, 10),
						},
					],
				}).value,
			}
		},
	},
	/*
    @name       saveEquipment
    @desc       供应商添加关联设备        
    @params     {
                    contracts   string     设备id逗号隔开
                }
    @return     null
*/
	{
		url: "/api/v1/operations/asset/supplier/saveEquipment",
		handler() {
			return null
		},
	},
	/*
    @name       removeEquipment
    @desc       供应商解绑关联设备       
    @params     {
                    contracts   string     设备id逗号隔开
                }
    @return     null
*/
	{
		url: "/api/v1/operations/asset/supplier/removeEquipment",
		handler() {
			return null
		},
	},
	/*
    @name       getSupplier   
    @desc       获取供应商信息        
    @params     {
                 id    string    记录id
                }
    @return     {
                    supplierName: "", //供应商名称
                    supplierNo: "", //供应商编码
                    supplierAddress: "", // 供应商地址
                    supplierPhone: "", //电话
                    contractNum: "", //关联合同数目
                    contractAcount: "", //合同金额
                    createTime: "", //创建时间
                    supplierStatus: "", //状态
                    creditCode: "", //信用码
                    userInfo: [
                        {
                            user: "", //联系人
                            phone: "", //联系电话
                        },
                    ],
                    summary: "", //简介
                    businessLicense: "", //营业执照
                    others: [],
    }
*/
	{
		url: "/api/v1/operations/asset/supplier/getSupplier",
		handler() {
			return {
				id: Random.id(),
				supplierName: Random.cword(3, 10),
				supplierNo: Random.id(),
				supplierStatus: Random.pick([0, 1]),
				supplierAddress: Random.cword(3, 5),
				createTime: Random.date(),
				supplierPhone: "17726647947",
				creditCode: Random.id(), //信用码
				userInfo: Mock.mock({
					[`value|3`]: [
						{
							id: () => Random.id(),
							phone: () => "17726647947",
							user: () => Random.cname(),
						},
					],
				}).value,
				summary: Random.cword(3, 30), //简介
				businessLicense: Random.image(), //营业执照
				others: Mock.mock({
					[`value|3`]: [
						{
							url: () => Random.image(),
						},
					],
				}).value,
			}
		},
	},
]
