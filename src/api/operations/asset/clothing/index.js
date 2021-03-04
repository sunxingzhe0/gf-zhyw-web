import request from "@/utils/request"

export default {
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
	getclothingList(params) {
		return request({
			url: "/api/v1/operations/asset/clothing/getclothingList",
			method: "get",
			params,
		})
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
	Placement(data) {
		return request({
			url: "/api/v1/operations/asset/clothing/Placement",
			method: "post",
			data,
		})
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
	Register(data) {
		return request({
			url: "/api/v1/operations/asset/clothing/Register",
			method: "post",
			data,
		})
	},

	/*
    @name       Reset   
    @desc       重置        
    @params     {
                    id          string          被服设备id
                }
    @return     null
    */
	Reset(params) {
		return request({
			url: "/api/v1/operations/asset/clothing/Reset",
			method: "get",
			params,
		})
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
	clothingBatchPlacement(data) {
		return request({
			url: "/api/v1/operations/asset/clothing/clothingBatchPlacement",
			method: "post",
			data,
		})
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
	clothingBatchRegister(data) {
		return request({
			url: "/api/v1/operations/asset/clothing/clothingBatchRegister",
			method: "post",
			data,
		})
	},
	/*
    @name       editClothing   
    @desc       编辑被服设备        
    @params     {
                    id                          string      被服id
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
	saveClothing(data) {
		return request({
			url: "/api/v1/operations/asset/clothing/editClothing",
			method: "post",
			data,
		})
	},
	/*
    @name       getClothingInfo  
    @desc       获取被服设备信息        
    @params     {
                    id      string      //被服设备id
                }
    @return     {
                     id                          string      被服id
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
    
    */
	getClothingInfo(params) {
		return request({
			url: "/api/v1/operations/asset/clothing/getClothingInfo",
			method: "get",
			params,
		})
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
                    useStatus           number              状态[1:空闲中,2:闲置中,3:使用中,4:回收中,5:洗涤中,6:待回收]
                    usedDept            string              使用部门
                    usedName            string              使用人
                    no                  string              编码
                    specification       string              型号
                }
    */
	getdailyClothingList(params) {
		return request({
			url: "/api/v1/operations/asset/clothing/getdailyClothingList",
			method: "get",
			params,
		})
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
	registerClothing(data) {
		return request({
			url: "/api/v1/operations/asset/clothing/registerClothing",
			method: "post",
			data,
		})
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
	getTypetree(params) {
		return request({
			url: "/api/v1/operations/asset/clothing/getTypetree",
			method: "get",
			params,
		})
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
                    usedTime            string              //领用时间
                    recallTime          string              //召回时间
                }
    */
	usedList(params) {
		return request({
			url: "/api/v1/operations/asset/clothing/usedList",
			method: "get",
			params,
		})
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
    */
	washList(params) {
		return request({
			url: "/api/v1/operations/asset/clothing/washList",
			method: "get",
			params,
		})
	},
}
