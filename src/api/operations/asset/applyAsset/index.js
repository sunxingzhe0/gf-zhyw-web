import request from "@/utils/request"

export default {
	/*
    @name       getassetList   
    @desc       获取申领资产列表         
    @params     {
                    keyword         string      关键字
                    pageNum         number      页码
                    pageSize        number      每页数量
                }
    @return     Array<{
                    id                  number              记录id
                    assetName           string              资产名称
                    assetNo             number              资产型号
                    assetType           string              资产类型
                    applyStatus         number              状态[1:待审核,2:已通过,3:已驳回]
                    applyDeptName       string              申领部门
                    applyUserName       string              申领人
                    applyRemark         string              申领理由
                    applyTime           string              申领日期
                }
    */
	getassetList(params) {
		return request({
			url: "/api/v1/operations/asset/applyAsset/getassetList",
			method: "get",
			params,
		})
	},
	/*
    @name       getassetData   
    @desc       获取申领资产统计
    @params     {
                    keyword         string      关键字
                }
    @return     Array<{
                    value      number           资产数
                    name       string           状态名称
                }
    */
	getassetData(params) {
		return request({
			url: "/api/v1/operations/asset/applyAsset/getassetData",
			method: "get",
			params,
		})
	},
	/*
    @name       getpurchaseAseets 
    @desc       获取资产采购列表         
    @params     {
                    keyword         string      关键字
                    pageNum         number      页码
                    pageSize        number      每页数量
                }
    @return     Array<{
                    id                  number              记录id
                    assetName           string              资产名称
                    assetNo             number              资产型号
                    assetType           string              资产类型
                    applyStatus         number              状态[1:待采买,2:采买中,3:已采买]
                    applyDeptName       string              申领部门
                    applyUserName       string              申领人
                    applyRemark         string              申领理由
                    applyTime           string              申领日期
                }
    */
	getpurchaseAseets(params) {
		return request({
			url: "/api/v1/operations/asset/applyAsset/getpurchaseAseets",
			method: "get",
			params,
		})
	},
	/*
    @name       getpurchaseData
    @desc       获取采买资产统计
    @params     {
                    keyword         string      关键字
                }
    @return     Array<{
                    value      number           资产数
                    name       string           状态名称
                }
    */
	getpurchaseData(params) {
		return request({
			url: "/api/v1/operations/asset/applyAsset/getpurchaseData",
			method: "get",
			params,
		})
	},
	/*
    @name       agree
    @desc       同意资产申领       
    @params     {
                    id   string     记录id
                }
    @return     null
    */
	agree(params) {
		return request({
			url: "/api/v1/operations/asset/applyAsset/agree",
			method: "get",
			params,
		})
	},
	/*
        @name       refuse
        @desc       拒绝资产申领       
        @params     {
                        id   string     记录id
                    }
        @return     null
    */
	refuse(params) {
		return request({
			url: "/api/v1/operations/asset/applyAsset/refuse",
			method: "get",
			params,
		})
	},
	/*
    @name       purchase
    @desc       采购       
    @params     {
                    id   string     记录id
                }
    @return     null
    */
	purchase(params) {
		return request({
			url: "/api/v1/operations/asset/applyAsset/purchase",
			method: "get",
			params,
		})
	},
	/*
        @name       signFor
        @desc       签收       
        @params     {
                        id   string     记录id
                    }
        @return     null
    */
	signFor(params) {
		return request({
			url: "/api/v1/operations/asset/applyAsset/signFor",
			method: "get",
			params,
		})
	},
	/*
        @name       withdraw
        @desc       撤回       
        @params     {
                        id   string     记录id
                    }
        @return     null
    */
	withdraw(params) {
		return request({
			url: "/api/v1/operations/asset/applyAsset/withdraw",
			method: "get",
			params,
		})
	},
	/*
    @name       saveApply
    @desc       申领信息添加       
    @params     {
                    assetName       string      资产名称
                    assetNo         string      资产型号
                    applyDeptName   string      申领部门
                    applyRemark     string      申领理由
                    applyUserName   string      申领人
                }
    @return     null
    */
	saveApply(data) {
		return request({
			url: "/api/v1/operations/asset/applyAsset/saveApply",
			method: "post",
			data,
		})
	},
}
