import request from "@/utils/request"

export default {
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
                }
*/
	getBlacksupplierList(params) {
		return request({
			url: "/api/v1/operations/asset/blacklist/getBlacksupplierList",
			method: "get",
			params,
		})
	},
	/*
    @name       removeBlacklist
    @desc       移除黑名单       
    @params     {
                    supplierIds   string     供应商id
                }
    @return     null
    */
	removeBlacklist(params) {
		return request({
			url: "/api/v1/operations/asset/blacklist/removeBlacklist",
			method: "get",
			params,
		})
	},
	/*
    @name       saveBlacklist
    @desc       添加黑名单       
    @params     {
                    supplierIds   string     供应商id
                }
    @return     null
    */
	saveBlacklist(params) {
		return request({
			url: "/api/v1/operations/asset/blacklist/saveBlacklist",
			method: "get",
			params,
		})
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
	getsupplierList(params) {
		return request({
			url: "/api/v1/operations/asset/blacklist/getsupplierList",
			method: "get",
			params,
		})
	},
}
