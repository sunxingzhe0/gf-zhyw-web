const Mock = require("mockjs")
const Random = Mock.Random
module.exports = [
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
	{
		url: "/api/v1/operations/asset/type/getTree",
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
@name       saveEquipmentType   
@desc       类型保存        
@data     {
                name      string      类型名称
                no        string      类型编号
                pid       string      上级类型
            }
@return     ""
*/
	{
		url: "/api/v1/operations/asset/type/saveEquipmentType",
		handler() {
			return ""
		},
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
	{
		url: "/api/v1/operations/asset/type/editEquipmentType",
		handler() {
			return ""
		},
	},
	/*
@name       removeType   
@desc       类型删除       
@params     {
                id        string      记录id
            }
@return     ""
*/
	{
		url: "/api/v1/operations/asset/type/removeType",
		handler() {
			return ""
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
		url: "/api/v1/operations/asset/type/getTypetree",
		handler() {
			let typeindex = 0
			function gettypedata(typeindex, pid) {
				typeindex += 1
				if (typeindex <= 3) {
					let id = Random.id()
					return Mock.mock({
						[`value|7-10`]: [
							{
								id: () => id,
								name: () => Random.cword(3, 10),
								no: () => Random.increment(1000),
								pid: () => pid,
								level: () => typeindex,
								clothingNum: () => Random.integer(1, 1000),
								Proportion: () => Random.integer(1, 100),
								children: () => gettypedata(typeindex, id),
							},
						],
					}).value
				}
			}
			return gettypedata(typeindex, "")
		},
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
	{
		url: "/api/v1/operations/asset/type/gettypeEquipmentList",
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
						field: "typeName",
						dataField: "typeName",
						fieldName: "设备类型",
						fixed: true,
						sorted: false,
						index: 4,
					},
					{
						field: "position",
						dataField: "position",
						fieldName: "安装位置",
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
					{
						field: "chargeP",
						dataField: "chargeP",
						fieldName: "管理负责人",
						fixed: true,
						sorted: false,
						index: 7,
					},
					{
						field: "contractNo",
						dataField: "contractNo",
						fieldName: "合同编号",
						fixed: true,
						sorted: false,
						index: 8,
					},
					{
						field: "status",
						dataField: "status",
						fieldName: "使用状态",
						fixed: true,
						sorted: false,
						index: 9,
					},
					{
						field: "createTime",
						dataField: "createTime",
						fieldName: "创建时间",
						fixed: true,
						sorted: false,
						index: 10,
					},
				],
				list: Mock.mock({
					[`value|${params.pageSize}`]: [
						{
							id: () => Random.id(),
							no: () => Random.id(),
							name: () => Random.cword(3, 10),
							typeName: () => Random.cword(3, 10),
							deptName: () => Random.cword(3, 10),
							manufactorName: () => Random.cword(3, 10),
							position: () => Random.cword(3, 10),
							chargeP: () => Random.cname(),
							contractNo: () => Random.id(),
							createTime: () => Random.datetime(),
							status: () => Random.pick(["Using", "Free"]),
						},
					],
				}).value,
			}
		},
	},
]
