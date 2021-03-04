import request from "@/utils/request"

export default {
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
	getEquipments(params) {
		return request({
			url: "/api/v1/operations/asset/inventory/getEquipments",
			method: "get",
			params,
		})
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
	getClothings(params) {
		return request({
			url: "/api/v1/operations/asset/inventory/getClothings",
			method: "get",
			params,
		})
	},
	/*
    @name       getDepts  
    @desc       获取使用部门数据      
    @return     Array<{
                        id              number              记录id
                        deptName        string              部门名称
                    }>
    */
	getDepts(params) {
		return request({
			url: "/api/v1/operations/asset/inventory/getDepts",
			method: "get",
			params,
		})
	},
	/*
    @name       getTree   
    @desc       获取类型树         
    @params     null
    @return     Array<{
                    id          number              记录id
                    name        string              类型名称
                    no          string              类型编号
                    pid         string              上级类型
                }>
    */
	getTree(params) {
		return request({
			url: "/api/v1/operations/asset/inventory/getTree",
			method: "get",
			params,
		})
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
	getcategoryTree(params) {
		return request({
			url: "/api/v1/operations/asset/inventory/getcategoryTree",
			method: "get",
			params,
		})
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
	saveEquipmentInventory(data) {
		return request({
			url: "/api/v1/operations/asset/inventory/saveEquipmentInventory",
			method: "post",
			data,
		})
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
	getinventoryEquipmentList(params) {
		return request({
			url: "/api/v1/operations/asset/inventory/getinventoryEquipmentList",
			method: "get",
			params,
		})
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
	saveEquipmentInventoryInfo(data) {
		return request({
			url:
				"/api/v1/operations/asset/inventory/saveEquipmentInventoryInfo",
			method: "post",
			data,
		})
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
                }
    */
	getEquipmentInventoryRecord(params) {
		return request({
			url:
				"/api/v1/operations/asset/inventory/getEquipmentInventoryRecord",
			method: "get",
			params,
		})
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
	getabnormalEquipmentList(params) {
		return request({
			url: "/api/v1/operations/asset/inventory/getabnormalEquipmentList",
			method: "get",
			params,
		})
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
	getequipmentActionList(params) {
		return request({
			url: "/api/v1/operations/asset/inventory/getequipmentActionList",
			method: "get",
			params,
		})
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
	equipmentInventoryDown(params) {
		return request({
			url: "/api/v1/operations/asset/inventory/equipmentInventoryDown",
			method: "get",
			params,
		})
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
	equipmentInventoryPrinting(params) {
		return request({
			url:
				"/api/v1/operations/asset/inventory/equipmentInventoryPrinting",
			method: "get",
			params,
		})
	},
	/*
    @name       equipmentInventoryRepair   
    @desc       盘点记录修复        
    @params     {
                    id                  string              盘点记录id
                }
    }
    @return     null
    */
	equipmentInventoryRepair(params) {
		return request({
			url: "/api/v1/operations/asset/inventory/equipmentInventoryRepair",
			method: "get",
			params,
		})
	},
}
