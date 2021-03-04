const Mock = require("mockjs")
const Random = Mock.Random
module.exports = [
	/*
    @name       getclothingList   
    @desc       获取被服列表         
    @params     {
                    keyword         string      关键字
                    pageNum         number      页码
                    pageSize        number      每页数量
                }
    @return     Array<{
                    id                  number              记录id
                    deptId              number              部门id
                    typeId              number              类型id
                    name                string              被服名称
                    type                string              被服类型
                    status              number              状态[1:待贴置,2:待注册]
                    deptName            string              使用部门
                    specification       string              规格
                }
*/
	{
		url: "/api/v1/operations/asset/clothing/getclothingList",
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
						field: "name",
						dataField: "name",
						fieldName: "名称",
						fixed: true,
						sorted: false,
						index: 2,
					},
					{
						field: "status",
						dataField: "status",
						fieldName: "状态",
						fixed: true,
						sorted: false,
						index: 3,
					},
					{
						field: "typeName",
						dataField: "typeName",
						fieldName: "类型",
						fixed: true,
						sorted: false,
						index: 4,
					},
					{
						field: "specification",
						dataField: "specification",
						fieldName: "规格",
						fixed: true,
						sorted: false,
						index: 5,
					},
					{
						field: "deptName",
						dataField: "deptName",
						fieldName: "使用部门",
						fixed: true,
						sorted: false,
						index: 6,
					},
				],
				list: Mock.mock({
					[`value|${params.pageSize}`]: [
						{
							id: () => Random.id(),
							name: () => Random.cword(3, 10),
							typeName: () => Random.cword(3, 10),
							typeId: () => Random.id(),
							status: () =>
								Random.pick(["ToBePosted", "ToBeRegistered"]),
							deptName: () => Random.cword(3, 5),
							deptId: () => Random.id(),
							specification: () => Random.cword(3, 5),
						},
					],
				}).value,
			}
		},
	},
	/*
    @name       Placement  
    @desc       贴置        
    @params     {
                    id          string          被服设备id
                    RFID        stirng          RFID
                }
    @return     null
*/
	{
		url: "/api/v1/operations/asset/clothing/Placement",
		handler() {
			return null
		},
	},
	/*
    @name       Register   
    @desc       注册        
    @params     {
                    id          string          被服设备id
                    usedName    string          使用人
                    usedDept    string          使用部门
                    usedTime    string          注册时间
                }
    @return     null
*/
	{
		url: "/api/v1/operations/asset/clothing/Register",
		handler() {
			return null
		},
	},
	/*
    @name       Reset   
    @desc       重置        
    @params     {
                    id          string          被服设备id
                }
    @return     null
*/
	{
		url: "/api/v1/operations/asset/clothing/Reset",
		handler() {
			return null
		},
	},
	/*
    @name       clothingBatchPlacement
    @desc       被服批量贴置
    @params     {
                    equipments          array{
                        id                  string              被服id
                        usedUser            string              使用人
                        usedDept            string              使用部门
                        registerTime        string              注册时间
                    } 
    }
    @return     null
    */
	{
		url: "/api/v1/operations/asset/clothing/clothingBatchPlacement",
		handler() {
			return null
		},
	},
	/*
    @name       clothingBatchRegister
    @desc       被服批量注册
    @params     { 
                    equipments          array{
                        id                  stirng              被服id
                        usedUser            string              使用人
                        usedDept            string              使用部门
                        registerTime        string              注册时间  
                    }   
    }
    @return     null
    */
	{
		url: "/api/v1/operations/asset/clothing/clothingBatchRegister",
		handler() {
			return null
		},
	},
	/*
    @name       editClothing   
    @desc       编辑被服设备        
    @params     {
                    id        string     记录id(修改)
                    assetInfo object {//资产信息
                        assetNo                 string      资产编码
                        usedTime                string      启用日期
                        status                  string      状态[1:在用,2:闲置,3:报废]
                        originalValue           string      资产原值
                        assignment              string      资产赋值
                        discountMethod          string      折扣方法[1:平均年限法]
                        discountRate            string      折扣率
                        discountPeriod          string      折扣年限
                    }
					basicInfo object {//基本信息
                        no                      string      被服编号
                        name                    string      被服名称
                        specification           string      规格型号
                        category                string      被服类别[1:智能资产,0:非智能资产]
                        type                    string      被服类型
                        dept                    string      所属部门
                        chargeP                 string      负责人
                        managementDept          string      管理部门
                        barCode                 string      被服条码
                        supplier                string      供应商
                        contractNo              string      合同编号
                        lastWashingTime         string      最近一次洗涤时间
                        cumulativeWashing       string      累积洗涤次数
                        accumulatedWashing      string      累计洗涤费用
                    }
					factoryInfo object {//厂家信息
                        manufacturer            string      生产商
                        productionDate          string      出厂日期
                        contacts                string      联系人
                        contactInformation      string      联系方式
                        contactAddress          string      联系地址
                    }
					pictures array {//被服图片
                        name            string      文件名
                        raw             string      文件
                        size            string      大小
                    }
                    archives array{//档案
                        id            string      id
                        url           string      文件地址
                    }
                    lifeCycles array{//全生命周期
                        content            string     内容
                        timestamp          string     时间
                    }
                    registerInfo object{
                        usedUser          string          使用人
                        usedDept          string          使用部门
                        registerTime      string          注册时间
                    }
                }
    @return     null
*/
	{
		url: "/api/v1/operations/asset/clothing/saveClothing",
		handler() {
			return null
		},
	},
	/*
    @name       getClothingInfo  
    @desc       获取被服设备信息        
    @params     {
                    id      string      //被服设备id
                }
    @return     {
                     assetInfo object {//资产信息
                        assetNo                 string      资产编码
                        usedTime                string      启用日期
                        status                  string      状态[1:在用,2:闲置,3:报废]
                        originalValue           string      资产原值
                        assignment              string      资产赋值
                        discountMethod          string      折扣方法[1:平均年限法]
                        discountRate            string      折扣率
                        discountPeriod          string      折扣年限
                    }
					basicInfo object {//基本信息
                        no                      string      被服编号
                        name                    string      被服名称
                        specification           string      规格型号
                        category                string      被服类别[1:智能资产,0:非智能资产]
                        type                    string      被服类型
                        dept                    string      所属部门
                        chargeP                 string      负责人
                        managementDept          string      管理部门
                        barCode                 string      被服条码
                        RFID                    string      RFID
                        supplier                string      供应商
                        contractNo              string      合同编号
                        lastWashingTime         string      最近一次洗涤时间
                        cumulativeWashing       string      累积洗涤次数
                        accumulatedWashing      string      累计洗涤费用
                    }
					factoryInfo object {//厂家信息
                        manufacturer            string      生产商
                        productionDate          string      出厂日期
                        contacts                string      联系人
                        contactInformation      string      联系方式
                        contactAddress          string      联系地址
                    }
					pictures array {//被服图片
                        name            string      文件名
                        raw             string      文件
                        size            string      大小
                    }
                    archives array{//档案
                        id            string      id
                        url           string      文件地址
                    }
                    lifeCycles array{//全生命周期
                        content            string     内容
                        timestamp          string     时间
                    }
                    registerInfo object{
                        usedUser          string          使用人
                        usedDept          string          使用部门
                        registerTime      string          注册时间
                    }
                }
    
*/
	{
		url: "/api/v1/operations/asset/clothing/getClothingInfo",
		handler() {
			return {
				assetInfo: {
					assetNo: Random.id(), //资产编码
					usedTime: Random.date(), //启用日期
					status: Random.pick(["1", "2", "3"]), //状态
					originalValue: Random.cword(3, 10), //资产原值
					assignment: Random.cword(3, 10), //资产赋值
					discountMethod: Random.pick(["1"]), //折扣方法
					discountRate: Random.integer(1, 100), //折扣率
					discountPeriod: Random.integer(1, 5), //折扣年限
				},
				basicInfo: {
					no: Random.id(),
					name: Random.cword(3, 20),
					specification: Random.cword(3, 10), //规格型号
					category: Random.pick(["1", "0"]), //被服类别
					typeName: Random.cword(3, 10),
					usedDept: Random.cword(3, 10), //使用部门
					chargeP: Random.cname(), //负责人
					managementDept: Random.cword(3, 10), //管理部门
					RFID: Random.id(), //RFID
					barCode: Random.id(), //条码
					supplier: Random.id(), //供应商
					contractNo: Random.id(), //合同编号
					lastWashingTime: Random.datetime(), // 最近一次洗涤时间
					cumulativeWashing: Random.integer(1, 20), //累积洗涤次数
					accumulatedWashing: Random.integer(1, 100), //累计洗涤费用
					url:
						"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1382995570,914777394&fm=26&gp=0.jpg",
				},
				factoryInfo: {
					manufacturer: Random.cword(3, 10), //生产商
					productionDate: Random.date(), //出厂日期
					contacts: Random.cname(), //联系人
					contactInformation: Mock.mock({
						regexp: /\d{3}-\d{8}|\d{4}-\d{7}|^1(3[0-9]|4[57]|5[0-35-9]|7[0678]|8[0-9])\d{8}$/,
					}).regexp, //联系方式
					contactAddress: Random.county(true), //联系地址
				},
				pictures: Mock.mock({
					[`value|5`]: [
						{
							id: () => Random.id(),
							url: () =>
								Random.image(
									"200x100",
									"#50B347",
									"#FFF",
									"Mock.js"
								),
						},
					],
				}).value,
				archives: Mock.mock({
					[`value|5`]: [
						{
							id: () => Random.id(),
							url: () =>
								Random.image(
									"200x100",
									"#50B347",
									"#FFF",
									"Mock.js"
								),
						},
					],
				}).value,
				lifeCycles: Mock.mock({
					[`value|5`]: [
						{
							time: () => Random.datetime(),
							content: () => Random.cword(3, 10),
						},
					],
				}).value,
				registerInfo: {
					usedUser: Random.cname(), // 使用人
					usedDept: Random.cword(3, 10), //使用部门
					registerTime: Random.datetime(), //注册时间
				},
			}
		},
	},
	/*
    @name       getdailyClothingList   
    @desc       获取日常管理被服列表         
    @params     {
                    keyword         string      关键字
                    pageNum         number      页码
                    pageSize        number      每页数量
                }
    @return     Array<{
                    id                  number              记录id
                    typeId              number              类型id
                    name                string              被服名称
                    type                string              被服类型
                    useStatus           number              状态[1:待发放,2:待领用,3:使用中,4:待回收,5:待洗涤,6:洗涤中,7:待收货,8:已报废]
                    usedDept            string              使用部门
                    usedName            string              使用人
                    no                  string              编码
                    specification       string              型号
                }
*/
	{
		url: "/api/v1/operations/asset/clothing/getdailyClothingList",
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
						field: "name",
						dataField: "name",
						fieldName: "名称",
						fixed: true,
						sorted: false,
						index: 2,
					},
					{
						field: "status",
						dataField: "status",
						fieldName: "状态",
						fixed: true,
						sorted: false,
						index: 3,
					},
					{
						field: "typeName",
						dataField: "typeName",
						fieldName: "类型",
						fixed: true,
						sorted: false,
						index: 4,
					},
					{
						field: "specification",
						dataField: "specification",
						fieldName: "规格",
						fixed: true,
						sorted: false,
						index: 5,
					},
					{
						field: "usedDept",
						dataField: "usedDept",
						fieldName: "使用部门",
						fixed: true,
						sorted: false,
						index: 6,
					},
				],
				list: Mock.mock({
					[`value|${params.pageSize}`]: [
						{
							id: () => Random.id(),
							name: () => Random.cword(3, 10),
							typeName: () => Random.cword(3, 10),
							typeId: () => Random.id(),
							useStatus: () =>
								Random.pick([
									"ToBeSend",
									"ToBeUsed",
									"Using",
									"ToBeRecycled",
									"ToBeWashed",
									"Washing",
									"ToBeReceived",
									"Scrapped",
								]),
							usedDept: () => Random.cword(3, 5),
							usedName: () => Random.cname(),
							no: () => Random.id(),
							specification: () => Random.cword(3, 5),
						},
					],
				}).value,
			}
		},
	},

	/*
    @name       registerClothing   
    @desc       被服注册        
    @params     {
                    usedIdentity        string      //身份
				    usedName            string      //姓名
				    usedSex             string      //性别
				    usedTime            string      //领用时间
                }
    @return     null
*/
	{
		url: "/api/v1/operations/asset/clothing/registerClothing",
		handler() {
			return null
		},
	},
	/*
@name       getTypetree   
@desc       获取类型树         
@params     null
@return     Array<{
                id          number              记录id
                name        string              类型名称
                no          string              类型编号
                pid         string              上级类型
                clothingNum number               数量
                Proportion number                占比
            }>
*/
	{
		url: "/api/v1/operations/asset/clothing/getTypetree",
		handler() {
			let index = 0
			function getdata(index, pid) {
				index += 1
				if (index <= 3) {
					let id = Random.id()
					return Mock.mock({
						[`value|7-10`]: [
							{
								id: () => id,
								name: () => Random.cword(3, 10),
								no: () => Random.increment(1000),
								pid: () => pid,
								level: () => index,
								clothingNum: () => Random.integer(1, 1000),
								Proportion: () => Random.integer(1, 100),
								children: () => getdata(index, id),
							},
						],
					}).value
				}
			}
			return getdata(index, "")
		},
	},

	/*
    @name       usedList   
    @desc       获取被服使用情况         
    @params     {
                    clothingId      string      被服id
                    keyword         string      关键字
                    pageNum         number      页码
                    pageSize        number      每页数量
                }
    @return     Array<{
                    id                  number              记录id
                    usedIdentity        string              //身份
				    usedName            string              //姓名
				    usedDeptName        string              //所属科室
				    usedNum             number              //洗涤次数
                    usedSumprice        float               //洗涤总价
                    usedDuration        number              //使用时长
                    usedTime            string              //领用时间
                    recallTime          string              //召回时间
                }
*/
	{
		url: "/api/v1/operations/asset/clothing/usedList",
		handler(req) {
			const params = req.query
			let num = Random.integer(1, 5)
			let price = Random.float(1, 20, 2, 4) * num
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
						field: "usedName",
						dataField: "usedName",
						fieldName: "使用人姓名",
						fixed: true,
						sorted: false,
						index: 2,
					},
					{
						field: "usedIdentity",
						dataField: "usedIdentity",
						fieldName: "使用人身份",
						fixed: true,
						sorted: false,
						index: 3,
					},
					{
						field: "usedDeptName",
						dataField: "usedDeptName",
						fieldName: "所属部门",
						fixed: true,
						sorted: false,
						index: 4,
					},
					{
						field: "usedNum",
						dataField: "usedNum",
						fieldName: "洗涤次数",
						fixed: true,
						sorted: false,
						index: 5,
					},
					{
						field: "usedSumprice",
						dataField: "usedSumprice",
						fieldName: "洗涤总价",
						fixed: true,
						sorted: false,
						index: 6,
					},
					{
						field: "usedDuration",
						dataField: "usedDuration",
						fieldName: "使用时长",
						fixed: true,
						sorted: false,
						index: 7,
					},
					{
						field: "usedTime",
						dataField: "usedTime",
						fieldName: "注册时间",
						fixed: true,
						sorted: false,
						index: 8,
					},
					{
						field: "recallTime",
						dataField: "recallTime",
						fieldName: "召回时间",
						fixed: true,
						sorted: false,
						index: 9,
					},
				],
				list: Mock.mock({
					[`value|${params.pageSize}`]: [
						{
							id: () => Random.id(),
							usedIdentity: () => Random.cword(3, 10),
							usedName: () => Random.cname(),
							usedDeptName: () => Random.cword(3, 10),
							usedNum: num,
							usedSumprice: price,
							usedDuration: () => Random.integer(1, 5),
							usedTime: () => Random.datetime(),
							recallTime: () => Random.datetime(),
						},
					],
				}).value,
			}
		},
	},
	/*
    @name       washList   
    @desc       获取被服洗涤记录         
    @params     {
                    clothingId      string      被服id
                    keyword         string      关键字
                    pageNum         number      页码
                    pageSize        number      每页数量
                }
    @return     Array<{
                    id                  number              记录id
                    usedIdentity        string              //身份
				    usedName            string              //姓名
				    usedDeptName        string              //所属科室
				    usedNum             number              //洗涤次数
                    usedSumprice        float               //洗涤总价
                    washTime            string              //洗涤时间
                    result              string              //洗涤结果[1:合格,2:不合格]
                }
*/
	{
		url: "/api/v1/operations/asset/clothing/washList",
		handler(req) {
			const params = req.query
			let num = Random.integer(1, 5)
			let average = Random.float(1, 20, 2, 4)
			let price = average * num
			return {
				total: Random.d100(),
				pageNum: params.pageNum,
				pageSize: params.pageSize,
				extData: {
					sumUsedNum: num * params.pageSize * params.pageNum,
					sumUsedPrice: price * params.pageSize * params.pageNum,
					averagePrice: average * params.pageSize * params.pageNum,
				},
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
						field: "usedName",
						dataField: "usedName",
						fieldName: "使用人姓名",
						fixed: true,
						sorted: false,
						index: 2,
					},
					{
						field: "usedIdentity",
						dataField: "usedIdentity",
						fieldName: "使用人身份",
						fixed: true,
						sorted: false,
						index: 3,
					},
					{
						field: "usedDeptName",
						dataField: "usedDeptName",
						fieldName: "所属部门",
						fixed: true,
						sorted: false,
						index: 4,
					},
					{
						field: "usedNum",
						dataField: "usedNum",
						fieldName: "洗涤次数",
						fixed: true,
						sorted: false,
						index: 5,
					},
					{
						field: "usedSumprice",
						dataField: "usedSumprice",
						fieldName: "洗涤总价",
						fixed: true,
						sorted: false,
						index: 6,
					},
					{
						field: "washTime",
						dataField: "washTime",
						fieldName: "洗涤时间",
						fixed: true,
						sorted: false,
						index: 7,
					},
					{
						field: "result",
						dataField: "result",
						fieldName: "洗涤结果",
						fixed: true,
						sorted: false,
						index: 8,
					},
				],
				list: Mock.mock({
					[`value|${params.pageSize}`]: [
						{
							id: () => Random.id(),
							usedIdentity: () => Random.cword(3, 10),
							usedName: () => Random.cname(),
							usedDeptName: () => Random.cword(3, 10),
							usedNum: num,
							usedSumprice: price,
							washTime: () => Random.datetime(),
							result: () => Random.pick([1, 2]),
						},
					],
				}).value,
			}
		},
	},
]
