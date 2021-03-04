const Mock = require("mockjs")
const Random = Mock.Random
module.exports = [
	/*
    @name       getEquipments   
    @desc       获取设备盘点列表         
    @params     {
                    searchType      string      查询类型
                    keyword         string      关键字
                    pageNum         number      页码
                    pageSize        number      每页数量
                    inventoryTime   array       盘点时间
                }
    @return     Array<{
                    id                  number              记录id
                    inventoryName       string              盘点名称
                    inventoryTime       string              盘点时间
                    inventoryNum        number              盘点数量
                    inventoryResult     string              盘点结果[1:正常,2:异常,3:未知]
                    InventoryRepair     string              库存修复[1:是,0:否]
                    inventoryUser       string              盘点人
                    inventoryDept       string              盘点科室
                    createDate          string              创建时间
                }
    */
	{
		url: "/api/v1/operations/asset/inventory/getEquipments",
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
						field: "inventoryName",
						dataField: "inventoryName",
						fieldName: "盘点名称",
						fixed: true,
						sorted: false,
						index: 2,
					},
					{
						field: "inventoryTime",
						dataField: "inventoryTime",
						fieldName: "盘点时间",
						fixed: true,
						sorted: false,
						index: 3,
					},
					{
						field: "inventoryNum",
						dataField: "inventoryNum",
						fieldName: "盘点数量",
						fixed: true,
						sorted: false,
						index: 4,
					},
					{
						field: "inventoryResult",
						dataField: "inventoryResult",
						fieldName: "盘点结果",
						fixed: true,
						sorted: false,
						index: 5,
					},
					{
						field: "InventoryRepair",
						dataField: "InventoryRepair",
						fieldName: "库存修复",
						fixed: true,
						sorted: false,
						index: 6,
					},
					{
						field: "inventoryUser",
						dataField: "inventoryUser",
						fieldName: "盘点人",
						fixed: true,
						sorted: false,
						index: 7,
					},
					{
						field: "inventoryDept",
						dataField: "inventoryDept",
						fieldName: "使用部门",
						fixed: true,
						sorted: false,
						index: 8,
					},
				],
				list: Mock.mock({
					[`value|${params.pageSize}`]: [
						{
							id: () => Random.id(),
							inventoryName: () => Random.cword(3, 10),
							inventoryNum: () => Random.increment(1000),
							InventoryRepair: () => Random.pick([0, 1]),
							inventoryDept: () => Random.cword(3, 5),
							inventoryTime: () =>
								Random.datetime() + "~" + Random.datetime(),
							inventoryResult: () => Random.pick([1, 2, 3]),
							inventoryUser: () => Random.cword(3, 5),
							createDate: () => Random.datetime(),
						},
					],
				}).value,
			}
		},
	},
	/*
    @name       getClothings   
    @desc       获取被服盘点列表         
    @params     {
                    searchType      string      查询类型
                    keyword         string      关键字
                    pageNum         number      页码
                    pageSize        number      每页数量
                }
    @return     Array<{
                    id                  number              记录id
                    inventoryName       string              盘点名称
                    inventoryTime       string              盘点时间
                    equipmentNum        number              设备数量
                    inventoryResult     string              盘点结果[1:正常,2:异常,3:未知]
                    InventoryRepair     string              库存修复[1:是,0:否]
                    inventoryUser       string              盘点人
                    inventoryDept       string              使用部门
                }
    */
	{
		url: "/api/v1/operations/asset/inventory/getClothings",
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
							inventoryName: () => Random.cword(3, 10),
							equipmentNum: () =>
								Mock.mock({
									"number|1-1000": 1000,
								}).number,
							InventoryRepair: () => Random.pick([0, 1]),
							inventoryDept: () => Random.cword(3, 5),
							inventoryTime: () => Random.datetime(),
							inventoryResult: () => Random.pick([1, 2, 3]),
							inventoryUser: () => Random.cword(3, 5),
						},
					],
				}).value,
			}
		},
	},
	/*
    @name       getDepts  
    @desc       获取使用部门数据      
    @return     Array<{
                        id              number              记录id
                        deptName        string              部门名称
                    }>
    */
	{
		url: "/api/v1/operations/asset/inventory/getDepts",
		handler() {
			return Mock.mock({
				[`value|10`]: [
					{
						id: () => Random.id(),
						deptName: () => Random.csentence(4, 10),
					},
				],
			}).value
		},
	},
	/*
    @name       getTree   
    @desc       获取物资类型树         
    @params     null
    @return     Array<{
                    id          number              记录id
                    name        string              类型名称
                    no          string              类型编号
                    pid         string              上级类型
                }>
    */
	{
		url: "/api/v1/operations/asset/inventory/getTree",
		handler() {
			let index = 0
			function getdata(index, pid) {
				index += 1
				if (index <= 3) {
					let id = Random.id()
					return Mock.mock({
						[`value|1-7`]: [
							{
								id: () => id,
								name: () => Random.cword(3, 20),
								no: () => Random.increment(1000),
								pid: () => pid,
								level: () => index,
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
    @name       getcategoryTree   
    @desc       获取物资类别树         
    @params     null
    @return     Array<{
                    id          number              记录id
                    name        string              类型名称
                    no          string              类型编号
                    pid         string              上级类型
                }>
    */
	{
		url: "/api/v1/operations/asset/inventory/getcategoryTree",
		handler() {
			let index1 = 0
			function getdata1(index, pid) {
				index += 1
				if (index <= 3) {
					let id = Random.id()
					return Mock.mock({
						[`value|1-7`]: [
							{
								id: () => id,
								name: () => Random.cword(3, 20),
								no: () => Random.increment(1000),
								pid: () => pid,
								level: () => index,
								children: () => getdata1(index, id),
							},
						],
					}).value
				}
			}
			return getdata1(index1, "")
		},
	},

	/*
    @name       saveEquipmentInventory   
    @desc       设备盘点新增         
    @params     {
                    inventoryName       string              盘点名称
                    inventoryDept       string              盘点部门
                    type                string              盘点对象[1:设备,2:被服]
                    eType               string              物资类型
                    eCategory           string              物资类别
    }
    @return     null
    */
	{
		url: "/api/v1/operations/asset/inventory/saveEquipmentInventory",
		handler() {
			return null
		},
	},
	/*
    @name       getinventoryEquipmentList   
    @desc       获取设备盘点录入物资列表         
    @params     {
                    searchType      string      查询类型
                    keyword         string      关键字
                    pageNum         number      页码
                    pageSize        number      每页数量
                }
    @return     Array<{
                    id                  number              记录id
                    no                  string              物资编号
                    name                string              物资名称
                    specification       string              物资规格
                    attribute           string              物资属性
                    category            string              物资类别
                    typeName            string              物资类型
                    manufactorName      string              生产厂商
                    productionDate      string              生产日期
                    company             string              物资单位
                    deptName            string              使用部门
                    chargeP             string              使用人
                    RFID                string              RFID
                    inventoryResult     string              盘点结果[1:正常,2:故障,3:丢失,4:停用]
                    remark              string              备注
                }
    */
	{
		url: "/api/v1/operations/asset/inventory/getinventoryEquipmentList",
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
						field: "no",
						dataField: "no",
						fieldName: "物资编号",
						fixed: true,
						sorted: false,
						index: 2,
					},
					{
						field: "name",
						dataField: "name",
						fieldName: "物资名称",
						fixed: true,
						sorted: false,
						index: 3,
					},
					{
						field: "specification",
						dataField: "specification",
						fieldName: "规格",
						fixed: true,
						sorted: false,
						index: 4,
					},
					{
						field: "attribute",
						dataField: "attribute",
						fieldName: "属性",
						fixed: true,
						sorted: false,
						index: 5,
					},
					{
						field: "category",
						dataField: "category",
						fieldName: "类别",
						fixed: true,
						sorted: false,
						index: 6,
					},
					{
						field: "typeName",
						dataField: "typeName",
						fieldName: "类型",
						fixed: true,
						sorted: false,
						index: 7,
					},
					{
						field: "manufactorName",
						dataField: "manufactorName",
						fieldName: "生产厂商",
						fixed: true,
						sorted: false,
						index: 8,
					},
					{
						field: "productionDate",
						dataField: "productionDate",
						fieldName: "生产日期",
						fixed: true,
						sorted: false,
						index: 9,
					},
					{
						field: "company",
						dataField: "company",
						fieldName: "单位",
						fixed: true,
						sorted: false,
						index: 10,
					},
					{
						field: "deptName",
						dataField: "deptName",
						fieldName: "使用部门",
						fixed: true,
						sorted: false,
						index: 11,
					},
					{
						field: "chargeP",
						dataField: "chargeP",
						fieldName: "使用人",
						fixed: true,
						sorted: false,
						index: 12,
					},
					{
						field: "RFID",
						dataField: "RFID",
						fieldName: "RFID",
						fixed: true,
						sorted: false,
						index: 13,
					},
					{
						field: "inventoryResult",
						dataField: "inventoryResult",
						fieldName: "盘点结果",
						fixed: true,
						sorted: false,
						index: 14,
					},
					{
						field: "remark",
						dataField: "remark",
						fieldName: "备注",
						fixed: true,
						sorted: false,
						index: 15,
					},
				],
				list: Mock.mock({
					[`value|${params.pageSize}`]: [
						{
							id: () => Random.id(),
							no: () => Random.id(),
							name: () => Random.cword(3, 10),
							specification: () => Random.cword(3, 10),
							attribute: () => Random.cword(3, 10),
							category: () => Random.cword(3, 10),
							typeName: () => Random.cword(3, 10),
							manufactorName: () => Random.cword(3, 10),
							productionDate: () => Random.datetime(),
							company: () =>
								Random.pick(["个", "台", "kg", "件"]),
							deptName: () => Random.cword(3, 10),
							chargeP: () => Random.cname(),
							RFID: () => Random.id(),
							inventoryResult: () =>
								Random.pick(["1", "2", "3", "4"]),
							remark: () =>
								Random.pick(["", Random.cword(3, 10)]),
						},
					],
				}).value,
			}
		},
	},
	/*
    @name       saveEquipmentInventoryInfo   
    @desc       设备物资盘点录入         
    @params     {
                    id                  string              盘点记录id
                    results             array{
                        id                           string              物资id
                        inventoryResult              string              盘点结果
                        remark                       string              备注
                    }
    }
    @return     null
    */
	{
		url: "/api/v1/operations/asset/inventory/saveEquipmentInventoryInfo",
		handler() {
			return null
		},
	},
	/*
    @name       getEquipmentInventoryRecord   
    @desc       获取设备盘点记录信息      
    @params     {
                    id                  string             记录id      
                }
    @return     object<{
                    id                  number              记录id
                    inventoryName       string              盘点名称
                    inventoryTime       string              盘点时间
                    inventoryNum        number              盘点数量
                    inventoryUser       string              盘点人
                    inventoryDept       string              盘点科室
                    createDate          string              创建时间
                    inventoryResult     string              盘点结果[1:正常,2:异常,3:未知]
                    InventoryRepair     string              库存修复[1:是,0:否]
                }
    */
	{
		url: "/api/v1/operations/asset/inventory/getEquipmentInventoryRecord",
		handler() {
			return {
				inventoryName: Random.cword(3, 10),
				inventoryNum: Random.increment(1000),
				inventoryDept: Random.cword(3, 5),
				inventoryTime: Random.datetime() + "~" + Random.datetime(),
				inventoryUser: Random.cword(3, 5),
				createDate: Random.datetime(),
				InventoryRepair: Random.pick([0, 1]),
				inventoryResult: Random.pick([1, 2, 3]),
			}
		},
	},
	/*
    @name       getabnormalEquipmentList   
    @desc       获取异常设备列表         
    @params     {
                    searchType      string      查询类型
                    keyword         string      关键字
                    pageNum         number      页码
                    pageSize        number      每页数量
                    id              string      盘点记录id
                }
    @return     Array<{
                    id                  number              记录id
                    no                  string              设备编号
                    name                string              设备名称
                    specification       string              设备规格
                    attribute           string              设备属性
                    category            string              设备类别
                    typeName            string              设备类型
                    manufactorName      string              生产厂商
                    productionDate      string              生产日期
                    company             string              设备单位
                    deptName            string              使用部门
                    position            string              安装位置
                    RFID                string              RFID
                    inventoryResult     string              盘点结果[1:正常,2:故障,3:丢失,4:停用]
                }
    */
	{
		url: "/api/v1/operations/asset/inventory/getabnormalEquipmentList",
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
						field: "no",
						dataField: "no",
						fieldName: "设备编号",
						fixed: true,
						sorted: false,
						index: 2,
					},
					{
						field: "name",
						dataField: "name",
						fieldName: "设备名称",
						fixed: true,
						sorted: false,
						index: 3,
					},
					{
						field: "specification",
						dataField: "specification",
						fieldName: "规格",
						fixed: true,
						sorted: false,
						index: 4,
					},
					{
						field: "attribute",
						dataField: "attribute",
						fieldName: "属性",
						fixed: true,
						sorted: false,
						index: 5,
					},
					{
						field: "category",
						dataField: "category",
						fieldName: "类别",
						fixed: true,
						sorted: false,
						index: 6,
					},
					{
						field: "typeName",
						dataField: "typeName",
						fieldName: "类型",
						fixed: true,
						sorted: false,
						index: 7,
					},
					{
						field: "manufactorName",
						dataField: "manufactorName",
						fieldName: "生产厂商",
						fixed: true,
						sorted: false,
						index: 8,
					},
					{
						field: "productionDate",
						dataField: "productionDate",
						fieldName: "生产日期",
						fixed: true,
						sorted: false,
						index: 9,
					},
					{
						field: "company",
						dataField: "company",
						fieldName: "单位",
						fixed: true,
						sorted: false,
						index: 10,
					},
					{
						field: "deptName",
						dataField: "deptName",
						fieldName: "使用部门",
						fixed: true,
						sorted: false,
						index: 11,
					},
					{
						field: "position",
						dataField: "position",
						fieldName: "安装位置",
						fixed: true,
						sorted: false,
						index: 12,
					},
					{
						field: "RFID",
						dataField: "RFID",
						fieldName: "RFID",
						fixed: true,
						sorted: false,
						index: 13,
					},
					{
						field: "inventoryResult",
						dataField: "inventoryResult",
						fieldName: "盘点结果",
						fixed: true,
						sorted: false,
						index: 14,
					},
				],
				list: Mock.mock({
					[`value|${params.pageSize}`]: [
						{
							id: () => Random.id(),
							no: () => Random.id(),
							name: () => Random.cword(3, 10),
							specification: () => Random.cword(3, 10),
							attribute: () => Random.cword(3, 10),
							category: () => Random.cword(3, 10),
							typeName: () => Random.cword(3, 10),
							manufactorName: () => Random.cword(3, 10),
							productionDate: () => Random.datetime(),
							company: () =>
								Random.pick(["个", "台", "kg", "件"]),
							deptName: () => Random.cword(3, 10),
							position: () => Random.cword(3, 10),
							RFID: () => Random.id(),
							inventoryResult: () =>
								Random.pick(["1", "2", "3", "4"]),
						},
					],
				}).value,
			}
		},
	},
	/*
    @name       getequipmentActionList   
    @desc       获取设备盘点操作记录         
    @params     {
                    pageNum         number      页码
                    pageSize        number      每页数量
                    id              string      盘点记录id
                }
    @return     Array<{
                    id                  number              记录id
                    actionUser          string              操作人(姓名,科室)
                    actionContent       string              操作内容
                    actionTime          stirng              操作时间
                }
    */
	{
		url: "/api/v1/operations/asset/inventory/getequipmentActionList",
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
						field: "actionContent",
						dataField: "actionContent",
						fieldName: "操作内容",
						fixed: true,
						sorted: false,
						index: 2,
					},
					{
						field: "actionUser",
						dataField: "actionUser",
						fieldName: "操作人",
						fixed: true,
						sorted: false,
						index: 3,
					},
					{
						field: "actionTime",
						dataField: "actionTime",
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
							actionUser: () =>
								Random.cname() + "," + Random.cword(3, 10),
							actionContent: () => Random.cword(3, 100),
							actionTime: () => Random.datetime(),
						},
					],
				}).value,
			}
		},
	},
	/*
    @name       equipmentInventoryDown   
    @desc       盘点记录下载         
    @params     {
                    id                  string              盘点记录id
                }
    }
    @return     null
    */
	{
		url: "/api/v1/operations/asset/inventory/equipmentInventoryDown",
		handler() {
			return null
		},
	},
	/*
    @name       equipmentInventoryPrinting  
    @desc       盘点记录打印         
    @params     {
                    id                  string              盘点记录id
                }
    }
    @return     null
    */
	{
		url: "/api/v1/operations/asset/inventory/equipmentInventoryPrinting",
		handler() {
			return null
		},
	},
	/*
    @name       equipmentInventoryRepair   
    @desc       盘点记录下载         
    @params     {
                    id                  string              盘点记录id
                }
    }
    @return     null
    */
	{
		url: "/api/v1/operations/asset/inventory/equipmentInventoryRepair",
		handler() {
			return null
		},
	},
]
