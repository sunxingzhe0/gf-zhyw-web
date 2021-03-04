const Mock = require("mockjs")
const Random = Mock.Random
module.exports = [
	/*
    @name       getcontractList   
    @desc       获取合同列表         
    @params     {
                    keyword         string      关键字
                    pageNum         number      页码
                    pageSize        number      每页数量
                }
    @return     Array<{
                    id                  number              记录id
                    contractName        string              合同名称
                    contractNo          string              合同编号
                    firstParty          string              合同甲方
                    supplierName        string              供应商
                    deptName            string              部门              
                    userName            string              联系人
                    userPhone           string              联系电话
                    contractPrice       float               合同金额
                    startTime           string              开始时间
                    endTime             string              结束时间
                    contractStatus      number              状态
                    briefIntroduction   string              简介
                    enclosure           array               附件
                }
*/
	{
		url: "/api/v1/operations/asset/contract/getcontractList",
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
							contractName: () => Random.cword(3, 10),
							contractNo: () => Random.id(),
							contractStatus: () => Random.pick(["1"]),
							firstParty: () => Random.cword(3, 5),
							supplierName: () => Random.cword(3, 5),
							deptName: () => Random.cword(3, 5),
							userName: () => Random.cname(),
							userPhone: () => "17726647947",
							startTime: () => Random.date(),
							endTime: () => Random.date(),
							contractPrice: () => 55555.0,
						},
					],
				}).value,
			}
		},
	},
	/*
    @name       saveContract   
    @desc       新增合同信息        
    @params     {
                constractNo: "", //合同编号
				constractName: "", //合同名称
				firstParty: "", //合同甲方
				supplierName: "", //供应商
				deptName: "", //部门
				userName: "", //联系人
				userPhone: "", //联系电话
				contractPrice: "", //合同金额
				startTime: "", //开始时间
				endTime: "", //结束时间
				contractStatus: "1", //状态[1:有效,0:无效]
				briefIntroduction: "", //简介
				enclosure: [
                    {
                        filename: '',//文件名称
					    flietype:'',//文件类型
                        fliesize: '',//文件大小
                        raw:'',//文件
                    }
                ], //附件
				contractBidding: "1", //是否招标[1:是,0:否]
                }
    @return     null
*/
	{
		url: "/api/v1/operations/asset/contract/saveContract",
		handler() {
			return {
				id: Random.id(),
			}
		},
	},

	/*
    @name       getContract   
    @desc       获取合同信息        
    @params     {
                 id    string    记录id
                }
    @return     {
                constractNo: "", //合同编号
				constractName: "", //合同名称
				firstParty: "", //合同甲方
				supplierName: "", //供应商
				deptName: "", //部门
				userName: "", //联系人
				userPhone: "", //联系电话
				contractPrice: "", //合同金额
				startTime: "", //开始时间
				endTime: "", //结束时间
				contractStatus: "1", //状态[1:有效,0:无效]
				briefIntroduction: "", //简介
				enclosure: [
                    {
                        filename: '',//文件名称
					    flietype:'',//文件类型
                        fliesize: '',//文件大小
                        raw:'',//文件
                    }
                ], //附件
				contractBidding: "1", //是否招标[1:是,0:否]
    }
*/
	{
		url: "/api/v1/operations/asset/contract/getContract",
		handler() {
			return {
				id: Random.id(),
				contractName: Random.cword(3, 10),
				contractNo: Random.id(),
				contractStatus: Random.pick(["1", "0"]),
				contractBidding: Random.pick(["1", "0"]),
				firstParty: Random.cword(3, 5),
				supplierName: Random.cword(3, 5),
				deptName: Random.cword(3, 5),
				userName: Random.cname(),
				userPhone: "17726647947",
				startTime: Random.date(),
				endTime: Random.date(),
				contractPrice: 55555.0,
				briefIntroduction: Random.cparagraph(), //简介
				enclosure: [
					{
						filename: Random.image(), //文件名称
						flietype: "image", //文件类型
						fliesize: "32432 ", //文件大小
						raw: "", //文件
					},
				], //附件
			}
		},
	},
	/*
    @name       getequipmentList   
    @desc       获取关联设备信息         
    @params     {
                    contractId      string      合同id
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
		url: "/api/v1/operations/asset/contract/getequipmentList",
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
    @desc       合同添加关联设备        
    @params     {
                    equipments   string     设备id逗号隔开
                }
    @return     null
*/
	{
		url: "/api/v1/operations/asset/contract/saveEquipment",
		handler() {
			return null
		},
	},
	/*
    @name       removeEquipment
    @desc       合同解绑关联设备       
    @params     {
                    equipments   string     设备id逗号隔开
                }
    @return     null
*/
	{
		url: "/api/v1/operations/asset/contract/removeEquipment",
		handler() {
			return null
		},
	},
	/*
    @name       getSupplier   
    @desc       获取供应商信息        
    @params     {
                 id    string    合同id
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
                    CooperationNum:1,//合作次数
                    CooperationAcount:1000000,//合作总金额
    }
*/
	{
		url: "/api/v1/operations/asset/contract/getSupplier",
		handler() {
			return {
				id: Random.id(),
				supplierName: Random.cword(3, 10),
				supplierNo: Random.id(),
				supplierStatus: Random.pick([0, 1]),
				supplierAddress:
					"城市:" +
					Random.county(true) +
					",详细地址:" +
					Random.cword(3, 50),
				createTime: Random.datetime(),
				supplierPhone: "17726647947",
				userInfo: Mock.mock({
					[`value|3`]: [
						{
							id: () => Random.id(),
							phone: () => "17726647947",
							user: () => Random.cname(),
						},
					],
				}).value,
				summary: Random.cword(3, 100), //简介
				CooperationAcount: 3223434,
				CooperationNum: 2,
			}
		},
	},
]
