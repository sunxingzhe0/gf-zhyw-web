import request from "@/utils/request"

export default {
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
	getcontractList(params) {
		return request({
			url: "/api/v1/operations/asset/contract/getcontractList",
			method: "get",
			params,
		})
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
	saveContract(data) {
		return request({
			url: "/api/v1/operations/asset/contract/saveContract",
			method: "post",
			data,
		})
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
	getContract(params) {
		return request({
			url: "/api/v1/operations/asset/contract/getContract",
			method: "get",
			params,
		})
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
	getequipmentList(params) {
		return request({
			url: "/api/v1/operations/asset/contract/getequipmentList",
			method: "get",
			params,
		})
	},
	/*
    @name       saveEquipment
    @desc       合同添加关联设备        
    @params     {
                    equipments   string     设备id逗号隔开
                }
    @return     null
    */
	saveEquipment(params) {
		return request({
			url: "/api/v1/operations/asset/contract/saveEquipment",
			method: "get",
			params,
		})
	},
	/*
    @name       removeEquipment
    @desc       合同解绑关联设备       
    @params     {
                    equipments   string     设备id逗号隔开
                }
    @return     null
    */
	removeEquipment(params) {
		return request({
			url: "/api/v1/operations/asset/contract/removeEquipment",
			method: "get",
			params,
		})
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
    }
    */
	getSupplier(params) {
		return request({
			url: "/api/v1/operations/asset/contract/getSupplier",
			method: "get",
			params,
		})
	},
}
