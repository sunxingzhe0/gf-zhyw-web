import request from "@/utils/request"

export default {
	/*
    @name       getTree   
    @desc       获取类型树         
    @params     {
                    searchType      string      查询类型
                    keyword         string      关键字
                }
    @return     Array<{
                    id          number              记录id
                    name        string              类型名称
                    no          string              类型编号
                    pid         string              上级类型
                }>
    */
	getTree(params) {
		return request({
			url: "/api/v1/operations/asset/type/getTree",
			method: "get",
			params,
		})
	},
	/*
    @name       saveEquipmentType   
    @desc       类型保存        
    @data     {
                    name      string      类型名称
                    no        string      类型编号
                    pid       string      上级类型
                }
    @return     ""
    */
	saveEquipmentType(data) {
		return request({
			url: "/api/v1/operations/asset/type/saveEquipmentType",
			method: "post",
			data,
		})
	},
	/*
    @name       editEquipmentType   
    @desc       类型编辑        
    @data     {
                    id        string      记录id
                    name      string      类型名称
                    no        string      类型编号
                    pid       string      上级类型
                }
    @return     ""
    */
	editEquipmentType(data) {
		return request({
			url: "/api/v1/operations/asset/type/editEquipmentType",
			method: "post",
			data,
		})
	},
	/*
    @name       removeType   
    @desc       类型删除       
    @params     {
                    id        string      记录id
                }
    @return     ""
    */
	removeType(params) {
		return request({
			url: "/api/v1/operations/asset/type/removeType",
			method: "get",
			params,
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
			url: "/api/v1/operations/asset/type/getTypetree",
			method: "get",
			params,
		})
	},
	/*
    @name       gettypeEquipmentList   
    @desc       获取类型设备列表         
    @params     {
                    searchType      string      查询类型
                    keyword         string      关键字
                    pageNum         number      页码
                    pageSize        number      每页数量
                    typeId          string      设备类型id
                    createTime      array       创建时间
                }
    @return     Array<{
                    id                  number              记录id
                    no                  string              设备编号
                    name                string              设备名称
                    manufactorName      string              生产厂商
                    deptName            string              使用部门
                    position            string              安装位置
                    chargeP             string              管理负责人
                    contractNo          string              合同编号
                    createTime          string              创建时间
                    status              string              状态[ Using: "在用", Free: "空闲"]
                    typeName            string              设备类型
                }
    */
	gettypeEquipmentList(params) {
		return request({
			url: "/api/v1/operations/asset/type/gettypeEquipmentList",
			method: "get",
			params,
		})
	},
}
