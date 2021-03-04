import request from "@/utils/request"

export default {
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
	getEquipmentList(params) {
		return request({
			url: "/api/v1/operations/asset/equipment/getEquipmentList",
			method: "get",
			params,
		})
	},
	/*
    @name       getEquipmentInfo   
    @desc       获取设备信息        
    @params     {
                    id                  string             设备id      
                }
    @return     object<{
                    id                  number              记录id
                    basicInfo           object              基本信息
                    assetInfo           object              资产信息
                    factoryInfo         object              厂家信息
                    minfo               object              保养信息
                    positionInfo        object              位置信息
                    pictures            array               设备图片
                    indexs              array               关联指标
                    archives            array               档案信息
                }
    */
	getEquipmentInfo(params) {
		return request({
			url: "/api/v1/operations/asset/equipment/getEquipmentInfo",
			method: "get",
			params,
		})
	},
	/*
    @name       getTypes  
    @desc       获取保养计划设备类型          
    @return     Array<{
                        id          number              记录id
                        name        string              设备类型名称
                    }>
    */
	getTypes(params) {
		return request({
			url: "/api/v1/operations/asset/equipment/getTypes",
			method: "get",
			params,
		})
	},
	/*
    @name       getManufactors  
    @desc       获取生产厂家        
    @return     Array<{
                        id                    number              记录id
                        manufactorName        string              厂家名称
                    }>
    */
	getManufactors(params) {
		return request({
			url: "/api/v1/operations/asset/equipment/getManufactors",
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
			url: "/api/v1/operations/asset/equipment/getDepts",
			method: "get",
			params,
		})
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
	getdailyEquipmentList(params) {
		return request({
			url: "/api/v1/operations/asset/equipment/getdailyEquipmentList",
			method: "get",
			params,
		})
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
	getrepairList(params) {
		return request({
			url: "/api/v1/operations/asset/equipment/getrepairList",
			method: "get",
			params,
		})
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
	getmaintainList(params) {
		return request({
			url: "/api/v1/operations/asset/equipment/getmaintainList",
			method: "get",
			params,
		})
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
	getinspectionList(params) {
		return request({
			url: "/api/v1/operations/asset/equipment/getinspectionList",
			method: "get",
			params,
		})
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
	getorderList(params) {
		return request({
			url: "/api/v1/operations/asset/equipment/getorderList",
			method: "get",
			params,
		})
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
	getspareList(params) {
		return request({
			url: "/api/v1/operations/asset/equipment/getspareList",
			method: "get",
			params,
		})
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
	getknowledgeBaseList(params) {
		return request({
			url: "/api/v1/operations/asset/equipment/getknowledgeBaseList",
			method: "get",
			params,
		})
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
	gethistoricalAlarmList(params) {
		return request({
			url: "/api/v1/operations/asset/equipment/gethistoricalAlarmList",
			method: "get",
			params,
		})
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
                    eSpecification      stirng              规格
                    eNum                stirng              数量
                    eRemark             string              备注
                }
    */
	getsubsidiaryList(params) {
		return request({
			url: "/api/v1/operations/asset/equipment/getsubsidiaryList",
			method: "get",
			params,
		})
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
	getactionList(params) {
		return request({
			url: "/api/v1/operations/asset/equipment/getactionList",
			method: "get",
			params,
		})
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
	removeSubsidiaryEquipment(data) {
		return request({
			url: "/api/v1/operations/asset/equipment/removeSubsidiaryEquipment",
			method: "post",
			data,
		})
	},
	/*
    @name       equipmentReset
    @desc       设备撤回
    @params     {
                    id                  stirng              设备id
    }
    @return     null
    */
	equipmentReset(params) {
		return request({
			url: "/api/v1/operations/asset/equipment/equipmentReset",
			method: "get",
			params,
		})
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
	equipmentPlacement(data) {
		return request({
			url: "/api/v1/operations/asset/equipment/equipmentPlacement",
			method: "post",
			data,
		})
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
	equipmentInstall(data) {
		return request({
			url: "/api/v1/operations/asset/equipment/equipmentInstall",
			method: "post",
			data,
		})
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
	equipmentBatchPlacement(data) {
		return request({
			url: "/api/v1/operations/asset/equipment/equipmentBatchPlacement",
			method: "post",
			data,
		})
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
	equipmentBatchInstall(data) {
		return request({
			url: "/api/v1/operations/asset/equipment/equipmentBatchInstall",
			method: "post",
			data,
		})
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
	editEquimpent(data) {
		return request({
			url: "/api/v1/operations/asset/equipment/editEquimpent",
			method: "post",
			data,
		})
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
	equipmentScrap(data) {
		return request({
			url: "/api/v1/operations/asset/equipment/equipmentScrap",
			method: "post",
			data,
		})
	},
	/*
    @name       equipmentRemove
    @desc       设备删除
    @params     { 
                    id                  stirng              设备id
    }
    @return     null
    */
	equipmentRemove(data) {
		return request({
			url: "/api/v1/operations/asset/equipment/equipmentRemove",
			method: "post",
			data,
		})
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
	addSubsidiary(data) {
		return request({
			url: "/api/v1/operations/asset/equipment/addSubsidiary",
			method: "post",
			data,
		})
	},
	/*
    @name       equipmentDownload
    @desc       下载
    @params     { 
                    id                  stirng              设备id
    }
    @return     null
    */
	equipmentDownload(data) {
		return request({
			url: "/api/v1/operations/asset/equipment/equipmentDownload",
			method: "post",
			data,
		})
	},
	/*
    @name       equipmentPrinting
    @desc       打印
    @params     { 
                    id                  stirng              设备id
    }
    @return     null
    */
	equipmentPrinting(data) {
		return request({
			url: "/api/v1/operations/asset/equipment/equipmentPrinting",
			method: "post",
			data,
		})
	},
}
