import request from "@/utils/request"

export default {
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
	getsupplierList(params) {
		return request({
			url: "/api/v1/operations/asset/supplier/getsupplierList",
			method: "get",
			params,
		})
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
	saveSupplier(data) {
		return request({
			url: "/api/v1/operations/asset/supplier/saveSupplier",
			method: "post",
			data,
		})
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
	getcontractList(params) {
		return request({
			url: "/api/v1/operations/asset/supplier/getcontractList",
			method: "get",
			params,
		})
	},
	/*
    @name       saveContracts 
    @desc       供应商添加关联合同        
    @params     {
                    contracts   string     合同id逗号隔开
                }
    @return     null
    */
	saveContracts(params) {
		return request({
			url: "/api/v1/operations/asset/supplier/saveContracts",
			method: "get",
			params,
		})
	},
	/*
    @name       removeContracts 
    @desc       供应商解绑关联合同        
    @params     {
                    contracts   string     合同id逗号隔开
                }
    @return     null
    */
	removeContracts(params) {
		return request({
			url: "/api/v1/operations/asset/supplier/removeContracts",
			method: "get",
			params,
		})
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
	getequipmentList(params) {
		return request({
			url: "/api/v1/operations/asset/supplier/getequipmentList",
			method: "get",
			params,
		})
	},
	/*
    @name       saveEquipment
    @desc       供应商添加关联设备        
    @params     {
                    contracts   string     设备id逗号隔开
                }
    @return     null
    */
	saveEquipment(params) {
		return request({
			url: "/api/v1/operations/asset/supplier/saveEquipment",
			method: "get",
			params,
		})
	},
	/*
    @name       removeEquipment
    @desc       供应商解绑关联设备       
    @params     {
                    contracts   string     设备id逗号隔开
                }
    @return     null
    */
	removeEquipment(params) {
		return request({
			url: "/api/v1/operations/asset/supplier/removeEquipment",
			method: "get",
			params,
		})
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
	getSupplier(params) {
		return request({
			url: "/api/v1/operations/asset/supplier/getSupplier",
			method: "get",
			params,
		})
	},
}
