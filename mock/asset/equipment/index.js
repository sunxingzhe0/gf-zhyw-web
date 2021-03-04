const Mock = require("mockjs")
const Random = Mock.Random
module.exports = [
	/*
    @name       getEquipmentList   
    @desc       获取处理设备列表         
    @params     {
                    searchType      string      查询类型
                    keyword         string      关键字
                    pageNum         number      页码
                    pageSize        number      每页数量
                }
    @return     Array<{
                    id                  number              记录id
                    deptId              number              部门id
                    manufactorId        number              厂家id
                    typeId              number              类型id
                    name                string              设备名称
                    type                string              设备类型
                    status              number              状态[ToBePosted:待贴置,ToBeInstalled:待安装]
                    deptName            string              使用部门
                    manufactorName      string              生产厂家
                }
*/
	{
		url: "/api/v1/operations/asset/equipment/getEquipmentList",
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
						fieldName: "设备名称",
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
						fieldName: "设备类型",
						fixed: true,
						sorted: false,
						index: 4,
					},
					{
						field: "manufactorName",
						dataField: "manufactorName",
						fieldName: "生产厂家",
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
								Random.pick(["ToBePosted", "ToBeInstalled"]),
							deptName: () => Random.cword(3, 5),
							deptId: () => Random.id(),
							manufactorName: () => Random.cword(3, 5),
							manufactorId: () => Random.id(),
						},
					],
				}).value,
			}
		},
	},

	/*
    @name       getEquipmentInfo   
    @desc       获取设备信息        
    @params     {
                    id                  string             设备id      
                }
    @return     object<{
                    id                  number              记录id
                     assetInfo object {//资产信息
                        assetNo             string          资产编码
                        usedTime            string          启用日期
                        status              string          状态[1:在用,2:空闲,3:报废]
                        originalValue       string          资产原值
                        assignment          string          资产赋值
                        discountMethod      string          折扣方法[1:平均年限法]
                        discountRate        string          折扣率
                        discountPeriod      string          折扣年限
                    }
					basicInfo object {//基本信息
                        no                  string          编号
                        name                string          设备名称
                        specification       string          规格型号
                        parent              string          上级设备
                        category            string          类别[1:智能设备,0:非智能设备]
                        type                string          类型
                        dept                string          所属部门
                        position            string          安装位置
                        installTime         string          安装时间
                        chargeP             string          负责人
                        managementDept      string          维护部门
                        isSpecial           string          是否是特种设备[1:是,2:否]
                        RFID                string          rfid
                        barCode             string          条码
                        ip                  string          ip
                        supplier            string          供应商
                        contractNo          string          合同编号
                        lastMaintainTime    string          最后一次保养时间
                        afterRepairOperation string          检修后运行
                        cumulativeOperation string          累积运行
                    }
					factoryInfo object {//厂家信息
                        manufacturer        string          生产厂商
                        productionDate      string          出厂日期
                        contacts            string          联系人
                        contactInformation  string          联系方式
                        contactAddress      string          联系地址
                    }
					pictureForm array {//设备图片
                        name                string          文件名
                        raw                 string          文件
                        size                string          大小
                    }
                    minfo       object{//保养信息
                        a       object{//规则a
                            id          string  id[a]
                            cycle       string  周期
                            company     string  单位
                            level       string  保养等级
                        },
                        b        object{//规则b
                            id              string  id[b]
                            hour            string  保养后运行小时
                            initialization  string  初始化时间
                            level           string  保养等级
                        },
                        c       object{//规则a
                            id              string  id[c]
                            accumulate      string  累积运行时间
                            level           string  保养等级
                        },
                    },
                    indexs  array//保养指标信息
                    positionInfo    object{//点位信息
                        x           string     x轴
                        y           string     y轴
                    }
                    archives array {//档案
                        name                string          文件名
                        raw                 string          文件
                        size                string          大小
                    }
                    lifeCycles array{//全生命周期
                        content             string          内容
                        timestamp           string          时间
                    }
                }
    */
	{
		url: "/api/v1/operations/asset/equipment/getEquipmentInfo",
		handler() {
			return {
				assetInfo: {
					assetNo: Random.id(), //资产编码
					usedTime: Random.date(), //启用日期
					status: Random.pick(["1", "2", "3"]), //状态
					originalValue: Random.integer(1, 100000), //资产原值
					assignment: Random.integer(1, 10000000), //资产赋值
					discountMethod: Random.pick(["1"]), //折扣方法
					discountRate: Random.integer(1, 100), //折扣率
					discountPeriod: Random.integer(1, 5), //折扣年限
				},
				basicInfo: {
					no: Random.id(),
					name: Random.cword(3, 20),
					specification: Random.cword(3, 10), //规格型号
					category: Random.pick(["1", "0"]), //设备类别
					type: Random.cword(3, 10), //设备类型
					parent: Random.cword(3, 20), //上级设备
					position: Random.cword(3, 10), //安装位置
					installTime: Random.datetime(), //安装时间
					dept: Random.cword(3, 10), //所属部门
					chargeP: Random.cname(3, 10), //负责人
					managementDept: Random.cword(3, 10), //维护部门
					lastMaintainTime: Random.datetime(), //最后一次保养时间
					afterRepairOperation: Random.integer(1, 200), //检修后运行
					cumulativeOperation: Random.integer(1, 200), //积累运行
					isSpecial: Random.pick([true, false]), //是否是特种设备
					RFID: Random.id(), //RFID
					barCode: Random.id(), //条码
					supplier: Random.cword(3, 10), //供应商
					contractNo: Random.id(), //合同编号
					ip: Random.ip(), //设备IP
					url:
						"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1382995570,914777394&fm=26&gp=0.jpg",
				},
				factoryInfo: {
					manufacturer: Random.cword(3, 10), // 生产厂商
					productionDate: Random.date(), //出厂日期
					contacts: Random.cname(), //联系人
					contactInformation: "1994848348", //联系方式
					contactAddress: Random.county(true), //联系地址
				},
				pictures: Mock.mock({
					[`value|5-10`]: [
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
				minfo: {
					a: {
						id: "a",
						cycle: Random.integer(1, 20),
						company: Random.pick(["天", "月"]),
						level: Random.pick(["1", "2", "3", "4", "5"]),
					},
					b: {
						id: "b",
						hour: Random.integer(1, 200),
						initialization: Random.date(),
						level: Random.pick(["1", "2", "3", "4", "5"]),
					},
					c: {
						id: "c",
						accumulate: Random.integer(1, 200),
						level: Random.pick(["1", "2", "3", "4", "5"]),
					},
				},
				positionInfo: {
					x: Random.float(60, 100, 3),
					y: Random.float(60, 100, 3),
				},
				indexs: Mock.mock({
					[`value|5-10`]: [() => Random.cword(3, 10)],
				}).value,
				archives: Mock.mock({
					[`value|5-10`]: [
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
					[`value|5-10`]: [
						{
							content: () => Random.cword(3, 10), //内容
							timestamp: () => Random.datetime(), //时间
						},
					],
				}).value,
			}
		},
	},
	/*
@name       getTypes
@desc       获取设备类型
@return     Array<{
                    id          number              记录id
                    name        string              设备类型名称
                }>
*/
	{
		url: "/api/v1/operations/asset/equipment/getTypes",
		handler() {
			return Mock.mock({
				[`value|10`]: [
					{
						id: () => Random.id(),
						name: () => Random.csentence(4, 20),
					},
				],
			}).value
		},
	},
	/*
@name       getManufactors
@desc       获取生产厂家
@return     Array<{
                    id                    number              记录id
                    manufactorName        string              厂家名称
                }>
*/
	{
		url: "/api/v1/operations/asset/equipment/getManufactors",
		handler() {
			return Mock.mock({
				[`value|10`]: [
					{
						id: () => Random.id(),
						manufactorName: () => Random.csentence(4, 20),
					},
				],
			}).value
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
		url: "/api/v1/operations/asset/equipment/getDepts",
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
    @name       getdailyEquipmentList
    @desc       获取日常设备列表
    @params     {
                    searchType      string      查询类型
                    keyword         string      关键字
                    pageNum         number      页码
                    pageSize        number      每页数量
                }
    @return     Array<{
                    id                  number              记录id
                    no                  number              编号
                    deptId              number              部门id
                    manufactorId        number              厂家id
                    typeId              number              类型id
                    name                string              设备名称
                    type                string              设备类型
                    status              number              状态[Using:在用,Free:空闲]
                    deptName            string              使用部门
                    manufactorName      string              生产厂家
                }
    */
	{
		url: "/api/v1/operations/asset/equipment/getdailyEquipmentList",
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
						fieldName: "设备名称",
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
						fieldName: "设备类型",
						fixed: true,
						sorted: false,
						index: 4,
					},
					{
						field: "manufactorName",
						dataField: "manufactorName",
						fieldName: "生产厂家",
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
							no: () => Random.id(),
							name: () => Random.cword(3, 10),
							typeName: () => Random.cword(3, 10),
							typeId: () => Random.id(),
							status: () => Random.pick(["Using", "Free"]),
							deptName: () => Random.cword(3, 5),
							deptId: () => Random.id(),
							manufactorName: () => Random.cword(3, 5),
							manufactorId: () => Random.id(),
						},
					],
				}).value,
			}
		},
	},
	/*
    @name       getrepairList
    @desc       获取设备维修列表
    @params     {
                    searchType      string      查询类型
                    keyword         string      关键字
                    pageNum         number      页码
                    pageSize        number      每页数量
                    repairTime      array       维修日期
                    equipmentId     string      设备id
                }
    @return     Array<{
                    id                  number              记录id
                    repairUsername      string              报修人姓名
                    repairUserno        string              报修人工号
                    repairUserphone     string              报修人电话
                    repairDeptname      string              报修科室
                    repairContent       string              报修内容
                    repairDate          string              报修日期
                    executor            string              执行人
                    executiveDept       string              受理班组
                    repairDuration      string              报修时长
                    repairStatus        string              状态
                }
    */
	{
		url: "/api/v1/operations/asset/equipment/getrepairList",
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
						field: "repairUsername",
						dataField: "repairUsername",
						fieldName: "报修人姓名",
						fixed: true,
						sorted: false,
						index: 2,
					},
					{
						field: "repairUserno",
						dataField: "repairUserno",
						fieldName: "报修人工号",
						fixed: true,
						sorted: false,
						index: 3,
					},
					{
						field: "repairUserphone",
						dataField: "repairUserphone",
						fieldName: "报修人电话",
						fixed: true,
						sorted: false,
						index: 4,
					},
					{
						field: "repairDeptname",
						dataField: "repairDeptname",
						fieldName: "报修科室",
						fixed: true,
						sorted: false,
						index: 5,
					},
					{
						field: "repairContent",
						dataField: "repairContent",
						fieldName: "报修内容",
						fixed: true,
						sorted: false,
						index: 6,
					},
					{
						field: "repairDate",
						dataField: "repairDate",
						fieldName: "报修日期",
						fixed: true,
						sorted: false,
						index: 7,
					},
					{
						field: "executor",
						dataField: "executor",
						fieldName: "执行人",
						fixed: true,
						sorted: false,
						index: 8,
					},
					{
						field: "executiveDept",
						dataField: "executiveDept",
						fieldName: "受理班组",
						fixed: true,
						sorted: false,
						index: 9,
					},
					{
						field: "repairDuration",
						dataField: "repairDuration",
						fieldName: "报修时长",
						fixed: true,
						sorted: false,
						index: 10,
					},
					{
						field: "repairStatus",
						dataField: "repairStatus",
						fieldName: "状态",
						fixed: true,
						sorted: false,
						index: 11,
					},
				],
				list: Mock.mock({
					[`value|${params.pageSize}`]: [
						{
							id: () => Random.id(),
							manufactorName: () => Random.cword(3, 5),
							manufactorId: () => Random.id(),
							repairUsername: () => Random.cname(),
							repairUserno: () => Random.id(),
							repairUserphone: () => "148453483748",
							repairDeptname: () => Random.cword(3, 10),
							repairContent: () => Random.cword(3, 100),
							repairDate: () => Random.cword(3, 10),
							executor: () => Random.cname(),
							executiveDept: () => Random.cword(3, 10),
							repairDuration: () =>
								Mock.mock({
									"number|1-100": 100,
								}).number + "分钟",
							repairStatus: () =>
								Random.pick([
									"ToBeProcessed",
									"PendingOrder",
									"InProgress",
									"Pending",
									"TransferOrder",
									"Acceptance",
									"Completed",
									"ToBeEvaluated",
									"Closed",
								]),
						},
					],
				}).value,
			}
		},
	},
	/*
    @name       getmaintainList
    @desc       获取设备保养列表
    @params     {
                    searchType      string      查询类型
                    keyword         string      关键字
                    pageNum         number      页码
                    pageSize        number      每页数量
                    maintainTime    array       保养时间
                    equipmentId     string      设备id
                }
    @return     Array<{
                    id          number              记录id
                    time        string              任务时间
                    name        string              保养任务名称
                    index       string              任务次数
                    ename       string              设备名称
                    dept        string              所属部门
                    executor    string              执行人
                    floor       string              楼
                }
*/
	{
		url: "/api/v1/operations/asset/equipment/getmaintainList",
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
						fieldName: "任务名称",
						fixed: true,
						sorted: false,
						index: 2,
					},
					{
						field: "ename",
						dataField: "ename",
						fieldName: "设备名称",
						fixed: true,
						sorted: false,
						index: 3,
					},
					{
						field: "floor",
						dataField: "floor",
						fieldName: "所属楼宇",
						fixed: true,
						sorted: false,
						index: 4,
					},
					{
						field: "executor",
						dataField: "executor",
						fieldName: "执行人",
						fixed: true,
						sorted: false,
						index: 5,
					},
					{
						field: "dept",
						dataField: "dept",
						fieldName: "所属部门",
						fixed: true,
						sorted: false,
						index: 6,
					},
					{
						field: "time",
						dataField: "time",
						fieldName: "保养时间",
						fixed: true,
						sorted: false,
						index: 7,
					},
				],
				list: Mock.mock({
					[`value|${params.pageSize}`]: [
						{
							id: () => Random.id(),
							name: () => Random.csentence(4, 20),
							time: () => Random.datetime(),
							index: () => Random.increment(),
							ename: () => Random.csentence(4, 10),
							dept: () => Random.csentence(4, 20),
							executor: () => Random.cname(),
							floor: Mock.mock("@natural(1, 20)"),
						},
					],
				}).value,
			}
		},
	},

	/*
    @name       getinspectionList
    @desc       获取巡检记录列表
    @params     {
                    searchType        string      查询类型
                    keyword           string      关键字
                    pageNum           number      页码
                    pageSize          number      每页数量
                    inspectionTime    array       巡检时间
                    equipmentId       string      设备id
                }
    @return     Array<{
                    id                  number              记录id
                    inspectionNo        string              巡检点编号
                    inspectionName      string              巡检点名称
                    inspectionArea      string              所属区域
                    RFID                string              RFID
                    inspectionTypeName  string              巡检类型
                    GIS                 string              gis定位
                    inspectionImgs      string              拍照数量
                    inspectionTask      string              巡检任务
                    inspectionUser      string              执行人
                    inspectionTime      string              巡检时间
                }
*/
	{
		url: "/api/v1/operations/asset/equipment/getinspectionList",
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
						field: "inspectionNo",
						dataField: "inspectionNo",
						fieldName: "巡检点编号",
						fixed: true,
						sorted: false,
						index: 2,
					},
					{
						field: "inspectionName",
						dataField: "inspectionName",
						fieldName: "巡检点名称",
						fixed: true,
						sorted: false,
						index: 3,
					},
					{
						field: "inspectionArea",
						dataField: "inspectionArea",
						fieldName: "所属区域",
						fixed: true,
						sorted: false,
						index: 4,
					},
					{
						field: "RFID",
						dataField: "RFID",
						fieldName: "RFID",
						fixed: true,
						sorted: false,
						index: 5,
					},
					{
						field: "inspectionTypeName",
						dataField: "inspectionTypeName",
						fieldName: "巡检类型",
						fixed: true,
						sorted: false,
						index: 6,
					},
					{
						field: "GIS",
						dataField: "GIS",
						fieldName: "GIS定位",
						fixed: true,
						sorted: false,
						index: 7,
					},
					{
						field: "inspectionImgs",
						dataField: "inspectionImgs",
						fieldName: "拍照数量",
						fixed: true,
						sorted: false,
						index: 8,
					},
					{
						field: "inspectionTask",
						dataField: "inspectionTask",
						fieldName: "巡检任务",
						fixed: true,
						sorted: false,
						index: 9,
					},
					{
						field: "inspectionUser",
						dataField: "inspectionUser",
						fieldName: "执行人",
						fixed: true,
						sorted: false,
						index: 10,
					},
					{
						field: "inspectionTime",
						dataField: "inspectionTime",
						fieldName: "巡检时间",
						fixed: true,
						sorted: false,
						index: 11,
					},
				],
				list: Mock.mock({
					[`value|${params.pageSize}`]: [
						{
							id: () => Random.id(),
							inspectionNo: () => Random.id(),
							inspectionName: () => Random.csentence(4, 20),
							inspectionArea: () => Random.csentence(4, 20),
							RFID: () => Random.id(),
							inspectionTypeName: () => Random.csentence(4, 20),
							GIS: () => "130E,120N",
							inspectionImgs: () => Mock.mock("@natural(1, 20)"),
							inspectionTask: () => Random.csentence(4, 20),
							inspectionUser: () => Random.cname(),
							inspectionTime: () => Random.datetime(),
						},
					],
				}).value,
			}
		},
	},
	/*
    @name       getorderList
    @desc       获取设备工单列表
    @params     {
                    searchType      string      查询类型
                    keyword         string      关键字
                    pageNum         number      页码
                    pageSize        number      每页数量
                    repairTime      array       维修日期
                    equipmentId     string      设备id
                }
    @return     Array<{
                    id                  number              记录id
                    repairUsername      string              报修人姓名
                    repairUserno        string              报修人工号
                    repairUserphone     string              报修人电话
                    repairDeptname      string              报修科室
                    repairContent       string              报修内容
                    repairDate          string              报修日期
                    executor            string              执行人
                    executiveDept       string              受理班组
                    repairDuration      string              报修时长
                    repairStatus        string              状态
                }
*/
	{
		url: "/api/v1/operations/asset/equipment/getorderList",
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
						field: "repairUsername",
						dataField: "repairUsername",
						fieldName: "报修人姓名",
						fixed: true,
						sorted: false,
						index: 2,
					},
					{
						field: "repairUserno",
						dataField: "repairUserno",
						fieldName: "报修人工号",
						fixed: true,
						sorted: false,
						index: 3,
					},
					{
						field: "repairUserphone",
						dataField: "repairUserphone",
						fieldName: "报修人电话",
						fixed: true,
						sorted: false,
						index: 4,
					},
					{
						field: "repairDeptname",
						dataField: "repairDeptname",
						fieldName: "报修科室",
						fixed: true,
						sorted: false,
						index: 5,
					},
					{
						field: "repairContent",
						dataField: "repairContent",
						fieldName: "报修内容",
						fixed: true,
						sorted: false,
						index: 6,
					},
					{
						field: "repairDate",
						dataField: "repairDate",
						fieldName: "报修日期",
						fixed: true,
						sorted: false,
						index: 7,
					},
					{
						field: "executor",
						dataField: "executor",
						fieldName: "执行人",
						fixed: true,
						sorted: false,
						index: 8,
					},
					{
						field: "executiveDept",
						dataField: "executiveDept",
						fieldName: "受理班组",
						fixed: true,
						sorted: false,
						index: 9,
					},
					{
						field: "repairDuration",
						dataField: "repairDuration",
						fieldName: "报修时长",
						fixed: true,
						sorted: false,
						index: 10,
					},
					{
						field: "repairStatus",
						dataField: "repairStatus",
						fieldName: "状态",
						fixed: true,
						sorted: false,
						index: 11,
					},
				],
				list: Mock.mock({
					[`value|${params.pageSize}`]: [
						{
							id: () => Random.id(),
							manufactorName: () => Random.cword(3, 5),
							manufactorId: () => Random.id(),
							repairUsername: () => Random.cname(),
							repairUserno: () => Random.id(),
							repairUserphone: () => "148453483748",
							repairDeptname: () => Random.cword(3, 10),
							repairContent: () => Random.cword(3, 100),
							repairDate: () => Random.cword(3, 10),
							executor: () => Random.cname(),
							executiveDept: () => Random.cword(3, 10),
							repairDuration: () =>
								Mock.mock({
									"number|1-100": 100,
								}).number + "分钟",
							repairStatus: () =>
								Random.pick([
									"ToBeProcessed",
									"PendingOrder",
									"InProgress",
									"Pending",
									"TransferOrder",
									"Acceptance",
									"Completed",
									"ToBeEvaluated",
									"Closed",
								]),
						},
					],
				}).value,
			}
		},
	},

	/*
    @name       getspareList
    @desc       获取备品备件列表
    @params     {
                    searchType      string      查询类型
                    keyword         string      关键字
                    pageNum         number      页码
                    pageSize        number      每页数量
                    equipmentId     string      设备id
                }
    @return     Array<{
                    id                  number              记录id
                    spareName           string              备件名称
                    spareNo             string              备件编号
                    spareModel          string              备件型号
                    manufacturer        string              生产商
                    TypeName            string              设备类型
                    spareCompany        string              备件单位
                    sparePrice          string              备件单价
                    spareNum            string              备件数量
                }
*/
	{
		url: "/api/v1/operations/asset/equipment/getspareList",
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
						field: "spareNo",
						dataField: "spareNo",
						fieldName: "备件编号",
						fixed: true,
						sorted: false,
						index: 2,
					},
					{
						field: "spareName",
						dataField: "spareName",
						fieldName: "备件名称",
						fixed: true,
						sorted: false,
						index: 3,
					},
					{
						field: "spareModel",
						dataField: "spareModel",
						fieldName: "备件型号",
						fixed: true,
						sorted: false,
						index: 4,
					},
					{
						field: "manufacturer",
						dataField: "manufacturer",
						fieldName: "生产商",
						fixed: true,
						sorted: false,
						index: 5,
					},
					{
						field: "TypeName",
						dataField: "TypeName",
						fieldName: "设备类型",
						fixed: true,
						sorted: false,
						index: 6,
					},
					{
						field: "spareCompany",
						dataField: "spareCompany",
						fieldName: "备件单位",
						fixed: true,
						sorted: false,
						index: 7,
					},
					{
						field: "sparePrice",
						dataField: "sparePrice",
						fieldName: "备件单价",
						fixed: true,
						sorted: false,
						index: 8,
					},
					{
						field: "spareNum",
						dataField: "spareNum",
						fieldName: "库存数量",
						fixed: true,
						sorted: false,
						index: 9,
					},
				],
				list: Mock.mock({
					[`value|${params.pageSize}`]: [
						{
							id: () => Random.id(),
							spareName: () => Random.cword(3, 10),
							spareNo: () => Random.id(),
							spareModel: () => Random.id(),
							manufacturer: () => Random.cword(3, 10),
							TypeName: () => Random.cword(3, 10),
							spareCompany: () => Random.pick(["台", "个", "件"]),
							sparePrice: () => "& " + Random.float(1, 100, 1),
							spareNum: () =>
								Mock.mock({
									"number|1-100": 100,
								}).number,
						},
					],
				}).value,
			}
		},
	},
	/*
    @name       getknowledgeBaseList
    @desc       获取知识库
    @params     {
                    searchType      string      查询类型
                    keyword         string      关键字
                    pageNum         number      页码
                    pageSize        number      每页数量
                    equipmentId     string      设备id
                }
    @return     Array<{
                    id                  number              记录id
                    name                string              名称
                    content             stirng              内容
                }
*/
	{
		url: "/api/v1/operations/asset/equipment/getknowledgeBaseList",
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
						field: "content",
						dataField: "content",
						fieldName: "内容",
						fixed: true,
						sorted: false,
						index: 3,
					},
				],
				list: Mock.mock({
					[`value|${params.pageSize}`]: [
						{
							id: () => Random.id(),
							name: () => Random.cword(3, 10),
							content: () => Random.cparagraph(),
						},
					],
				}).value,
			}
		},
	},
	/*
    @name       gethistoricalAlarmList
    @desc       获取历史报警
    @params     {
                    alarmTime       array       历史报警
                    pageNum         number      页码
                    pageSize        number      每页数量
                    equipmentId     string      设备id
                }
    @return     Array<{
                    id                  number              记录id
                    alarmTime           string              报警时间
                    alarmTypename       stirng              报警类型
                    alarmLevel          stirng              报警级别["高", "中", "低"]
                    alarmContent        stirng              报警内容
                    alarmEquipment      stirng              报警设备
                    handleTime          stirng              处理时间
                    alarmVideos         stirng              报警录像
                    alarmPictures       stirng              报警抓拍
                }
*/
	{
		url: "/api/v1/operations/asset/equipment/gethistoricalAlarmList",
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
						field: "alarmTime",
						dataField: "alarmTime",
						fieldName: "报警时间",
						fixed: true,
						sorted: false,
						index: 2,
					},
					{
						field: "alarmTypename",
						dataField: "alarmTypename",
						fieldName: "报警类型",
						fixed: true,
						sorted: false,
						index: 3,
					},
					{
						field: "alarmLevel",
						dataField: "alarmLevel",
						fieldName: "报警级别",
						fixed: true,
						sorted: false,
						index: 4,
					},
					{
						field: "alarmContent",
						dataField: "alarmContent",
						fieldName: "报警内容",
						fixed: true,
						sorted: false,
						index: 5,
					},
					{
						field: "alarmEquipment",
						dataField: "alarmEquipment",
						fieldName: "报警设备",
						fixed: true,
						sorted: false,
						index: 6,
					},
					{
						field: "handleTime",
						dataField: "handleTime",
						fieldName: "处理时间",
						fixed: true,
						sorted: false,
						index: 7,
					},
					{
						field: "alarmVideos",
						dataField: "alarmVideos",
						fieldName: "报警录像",
						fixed: true,
						sorted: false,
						index: 8,
					},
					{
						field: "alarmPictures",
						dataField: "alarmPictures",
						fieldName: "报警抓拍",
						fixed: true,
						sorted: false,
						index: 9,
					},
				],
				list: Mock.mock({
					[`value|${params.pageSize}`]: [
						{
							id: () => Random.id(),
							alarmTime: () => Random.datetime(),
							alarmTypename: () => Random.cword(3, 10),
							alarmLevel: () => Random.pick(["高", "中", "低"]),
							alarmContent: () => Random.cparagraph(),
							alarmEquipment: () => Random.cword(3, 10),
							handleTime: () => Random.datetime(),
							alarmVideos: () =>
								Mock.mock({
									"number|0-100": 100,
								}).number,
							alarmPictures: () =>
								Mock.mock({
									"number|0-100": 100,
								}).number,
						},
					],
				}).value,
			}
		},
	},
	/*
    @name       getsubsidiaryList
    @desc       获取附属设备列表
    @params     {
                    searchType      string      查询类型
                    keyword         string      关键字
                    pageNum         number      页码
                    pageSize        number      每页数量
                    equipmentId     string      设备id
                }
    @return     Array<{
                    id                  number              记录id
                    ename               string              名称
                    eNo                 stirng              编号
                    eTypename           stirng              类型
                    eSpecification      stirng              规格
                    eNum                stirng              数量
                    eRemark             string              备注
                }
*/
	{
		url: "/api/v1/operations/asset/equipment/getsubsidiaryList",
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
						field: "eTypename",
						dataField: "eTypename",
						fieldName: "附属设备类型",
						fixed: true,
						sorted: false,
						index: 2,
					},
					{
						field: "ename",
						dataField: "ename",
						fieldName: "附属设备名称",
						fixed: true,
						sorted: false,
						index: 3,
					},
					{
						field: "eNo",
						dataField: "eNo",
						fieldName: "附属设备编号",
						fixed: true,
						sorted: false,
						index: 4,
					},
					{
						field: "eSpecification",
						dataField: "eSpecification",
						fieldName: "规格",
						fixed: true,
						sorted: false,
						index: 5,
					},
					{
						field: "eNum",
						dataField: "eNum",
						fieldName: "数量",
						fixed: true,
						sorted: false,
						index: 6,
					},
					{
						field: "eRemark",
						dataField: "eRemark",
						fieldName: "备注",
						fixed: true,
						sorted: false,
						index: 7,
					},
				],
				list: Mock.mock({
					[`value|${params.pageSize}`]: [
						{
							id: () => Random.id(),
							eTypename: () => Random.cword(3, 10),
							ename: () => Random.cword(3, 10),
							eNo: () => Random.id(),
							eSpecification: () => Random.cword(3, 10),
							eNum: () =>
								Mock.mock({
									"number|0-100": 100,
								}).number,
							eRemark: () => Random.cparagraph(),
						},
					],
				}).value,
			}
		},
	},
	/*
    @name       getactionList
    @desc       获取启停记录
    @params     {
                    searchType      string      查询类型
                    keyword         string      关键字
                    pageNum         number      页码
                    pageSize        number      每页数量
                    equipmentId     string      设备id
				    actionTime      array       操作时间
                }
    @return     Array<{
                    id                  number              记录id
                    actionUser          string              操作人
                    actionType          stirng              类型[启用,停用]
                    actionDept          stirng              所属部门
                    actionTime          stirng              操作时间
                }
*/
	{
		url: "/api/v1/operations/asset/equipment/getactionList",
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
						field: "actionUser",
						dataField: "actionUser",
						fieldName: "操作人",
						fixed: true,
						sorted: false,
						index: 2,
					},
					{
						field: "actionType",
						dataField: "actionType",
						fieldName: "类型",
						fixed: true,
						sorted: false,
						index: 3,
					},
					{
						field: "actionDept",
						dataField: "actionDept",
						fieldName: "所属部门",
						fixed: true,
						sorted: false,
						index: 4,
					},
					{
						field: "actionTime",
						dataField: "actionTime",
						fieldName: "操作时间",
						fixed: true,
						sorted: false,
						index: 5,
					},
				],
				list: Mock.mock({
					[`value|${params.pageSize}`]: [
						{
							id: () => Random.id(),
							actionUser: () => Random.cname(),
							actionType: () => Random.pick(["启用", "停用"]),
							actionDept: () => Random.cword(3, 10),
							actionTime: () => Random.datetime(),
						},
					],
				}).value,
			}
		},
	},
	/*
    @name       removeSubsidiaryEquipment
    @desc       移除附属设备
    @params     {
                    id                  stirng              设备id
                    eid                 stirng              附属设备id
    }
    @return     null
    */
	{
		url: "/api/v1/operations/asset/equipment/removeSubsidiaryEquipment",
		handler() {
			return null
		},
	},
	/*
    @name       equipmentReset
    @desc       设备撤回
    @params     {
                    id                  stirng              设备id
    }
    @return     null
    */
	{
		url: "/api/v1/operations/asset/equipment/equipmentReset",
		handler() {
			return null
		},
	},
	/*
    @name       equipmentPlacement
    @desc       设备单个贴置
    @params     {
                    id                  stirng              设备id
                    RFID                stirng              
    }
    @return     null
    */
	{
		url: "/api/v1/operations/asset/equipment/equipmentPlacement",
		handler() {
			return null
		},
	},
	/*
    @name       equipmentInstall
    @desc       设备单个安装
    @params     {
                    id                  stirng              设备id
                    position            string              安装位置
				    x                   string              GIS坐标x
				    y                   string              GIS坐标y
				    installTime         string              安装时间        
    }
    @return     null
    */
	{
		url: "/api/v1/operations/asset/equipment/equipmentInstall",
		handler() {
			return null
		},
	},
	/*
    @name       equipmentBatchPlacement
    @desc       设备批量贴置
    @params     {
                    equipments          array{
                        id                  stirng              设备id
                        RFID                stirng              RFID
                        position            string              安装位置
                        x                   string              GIS坐标x
                        y                   string              GIS坐标y
                        installTime         string              安装时间   
                    } 
    }
    @return     null
    */
	{
		url: "/api/v1/operations/asset/equipment/equipmentBatchPlacement",
		handler() {
			return null
		},
	},
	/*
    @name       equipmentBatchInstall
    @desc       设备批量安装
    @params     { 
                    equipments          array{
                        id                  stirng              设备id
                        RFID                stirng              RFID
                        position            string              安装位置
                        x                   string              GIS坐标x
                        y                   string              GIS坐标y
                        installTime         string              安装时间   
                    }   
    }
    @return     null
    */
	{
		url: "/api/v1/operations/asset/equipment/equipmentBatchInstall",
		handler() {
			return null
		},
	},
	/*
    @name       editEquimpent   
    @desc       编辑设备        
    @params     {
                    assetInfo object {//资产信息
                        assetNo             string          资产编码
                        usedTime            string          启用日期
                        status              string          状态[1:在用,2:空闲,3:报废]
                        originalValue       string          资产原值
                        assignment          string          资产赋值
                        discountMethod      string          折扣方法[1:平均年限法]
                        discountRate        string          折扣率
                        discountPeriod      string          折扣年限
                    }
					basicInfo object {//基本信息
                        no                  string          编号
                        name                string          设备名称
                        specification       string          规格型号
                        parent              string          上级设备
                        category            string          类别[1:智能设备,0:非智能设备]
                        type                string          类型
                        dept                string          所属部门
                        position            string          安装位置
                        installTime         string          安装时间
                        chargeP             string          负责人
                        managementDept      string          维护部门
                        isSpecial           string          是否是特种设备[1:是,2:否]
                        RFID                string          rfid
                        barCode             string          条码
                        ip                  string          ip
                        supplier            string          供应商
                        contractNo          string          合同编号
                        lastMaintainTime    string          最后一次保养时间
                        afterRepairOperation string          检修后运行
                        cumulativeOperation string          累积运行
                    }
					factoryInfo object {//厂家信息
                        manufacturer        string          生产厂商
                        productionDate      string          出厂日期
                        contacts            string          联系人
                        contactInformation  string          联系方式
                        contactAddress      string          联系地址
                    }
					pictureForm array {//设备图片
                        name                string          文件名
                        raw                 string          文件
                        size                string          大小
                    }
                    minfo       object{//保养信息
                        a       object{//规则a
                            id          string  id[a]
                            cycle       string  周期
                            company     string  单位
                            level       string  保养等级
                        },
                        b        object{//规则b
                            id              string  id[b]
                            hour            string  保养后运行小时
                            initialization  string  初始化时间
                            level           string  保养等级
                        },
                        c       object{//规则a
                            id              string  id[c]
                            accumulate      string  累积运行时间
                            level           string  保养等级
                        },
                    },
                    indexs  array//保养指标信息
                    positionInfo    object{//点位信息
                        x           string     x轴
                        y           string     y轴
                    }
                    archives array {//档案
                        name                string          文件名
                        raw                 string          文件
                        size                string          大小
                    }
                }
    @return     null
    */
	{
		url: "/api/v1/operations/asset/equipment/editEquimpent",
		handler() {
			return null
		},
	},
	/*
    @name       equipmentScrap
    @desc       设备报废
    @params     { 
                    id                  stirng              设备id
                    scrapValue          stirng              报废理由
    }
    @return     null
    */
	{
		url: "/api/v1/operations/asset/equipment/equipmentScrap",
		handler() {
			return null
		},
	},
	/*
    @name       equipmentRemove
    @desc       设备删除
    @params     { 
                    id                  stirng              设备id
    }
    @return     null
    */
	{
		url: "/api/v1/operations/asset/equipment/equipmentRemove",
		handler() {
			return null
		},
	},
	/*
    @name       addSubsidiary
    @desc       添加附属设备
    @params     { 
                    id                  stirng              设备id
                    ids                 stirng              附属设备id
    }
    @return     null
    */
	{
		url: "/api/v1/operations/asset/equipment/addSubsidiary",
		handler() {
			return null
		},
	},
	/*
    @name       equipmentDownload
    @desc       下载
    @params     { 
                    id                  stirng              设备id
    }
    @return     null
    */
	{
		url: "/api/v1/operations/asset/equipment/equipmentDownload",
		handler() {
			return null
		},
	},
	/*
    @name       equipmentPrinting
    @desc       打印
    @params     { 
                    id                  stirng              设备id
    }
    @return     null
    */
	{
		url: "/api/v1/operations/asset/equipment/equipmentPrinting",
		handler() {
			return null
		},
	},
]
