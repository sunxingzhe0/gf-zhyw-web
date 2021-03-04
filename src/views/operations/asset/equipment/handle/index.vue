<template>
	<div class="page-managementcener">
		<CardList
			:params="params"
			:fetcher="fetcher"
			:renderFunc="renderFunc"
			:headerBtns="headerBtns"
			ref="pagelist"
		></CardList>
		<router-view></router-view>
	</div>
</template>
<script>
/*
@author        cui
@name          OperationsAssetClothingHandle
@desc          设备处理
@query
@props
@emit
*/
import { CardList } from "@/components/App"
import asset from "@/api/operations/asset"
export default {
	name: "OperationsAssetEquipmentHandle",
	meta: {
		sort: 0,
		title: "处理",
		hideMenu: true,
	},
	components: {
		CardList,
	},
	data() {
		return {
			params: [
				{
					elAttrs: {
						size: "mini",
					},
					key: "searchType",
					options: [
						{ label: "设备名称", value: "1" },
						{ label: "设备编号", value: "2" },
						{ label: "安装位置", value: "3" },
						{ label: "使用部门", value: "4" },
						{ label: "管理负责人", value: "5" },
						{ label: "管理部门", value: "6" },
						{ label: "生产厂家", value: "7" },
					],
					component: "el-select",
				},
				{
					elAttrs: {
						size: "mini",
						placeholder: "关键字搜索",
						"suffix-icon": "el-icon-search",
					},
					key: "keyword",
					className: "keyword",
					component: "el-input",
				},
			],
			headerBtns: [
				{
					onClick: this.showTable,
					className: "addbtn",
					icon: "iconliebiao",
					elAttrs: {
						size: "mini",
					},
				},
			],
			fetcher: asset.equipment.getEquipmentList,
			DeviceStatus: null,
		}
	},
	created() {
		this.DeviceStatus = this.$store.state.operations.status.DeviceStatus
	},
	methods: {
		renderFunc(item) {
			let DeviceStatus = this.DeviceStatus
			return (
				<div class="card-item plan-item">
					<div class="card-content">
						<div class="card-icon">
							<svg class="iconfont" aria-hidden="true">
								<use xlinkHref="#iconshebeiguanli"></use>
							</svg>
						</div>
						<div class="card-infos">
							<div class="card-info">
								<span class="card-title" title={item.name}>
									{item.name}
								</span>
								<span class="card-title">
									{DeviceStatus[item.status]}
								</span>
							</div>
							<div class="card-info">
								<span>设备类型：{item.typeName}</span>
								<span>生产厂家：{item.manufactorName}</span>
							</div>
							<div class="card-info">
								<span>使用部门：{item.deptName}</span>
							</div>
						</div>
					</div>
					<div class="card-footer">
						<span onClick={() => this.showEditor(item.id)}>
							编辑
						</span>
						{item.status == "ToBePosted" ? (
							<span
								class="no-before"
								onClick={() => this.Placement(item.id)}
							>
								贴置
							</span>
						) : (
							""
						)}

						{item.status == "ToBeInstalled" ? (
							<span onClick={() => this.install(item.id)}>
								安装
							</span>
						) : (
							""
						)}
						{item.status == "ToBeInstalled" ? (
							<span
								type="text"
								class="no-before backbtn"
								onClick={() => this.Reset(item.id)}
							>
								撤回
							</span>
						) : (
							""
						)}
					</div>
				</div>
			)
		},
		//编辑
		showEditor(id) {
			this.$router.push({
				path: "/operations/asset/equipment/edit",
				query: {
					equipmentId: id,
				},
			})
		},
		//安装
		install(id) {
			//安装install
			this.$router.push({
				path: "/operations/asset/equipment/handle/install",
				query: {
					equipmentId: id,
				},
			})
		},
		//贴置
		Placement(id) {
			//贴置Placement
			this.$router.push({
				path: "/operations/asset/equipment/handle/placement",
				query: {
					equipmentId: id,
				},
			})
		},
		//撤回
		Reset(id) {
			this.$confirm("确定要撤回吗？", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			}).then(async () => {
				await asset.equipment.equipmentReset({ id: id })
				this.$messge.success("撤回成功")
			})
		},
		//详情
		showDetail(id) {
			this.$router.push({
				path: "/operations/asset/equipment/equipmentList/detail",
				query: { equipmentId: id },
			})
		},
		//查看更多
		showTable() {
			this.$router.push({
				path: "/operations/asset/equipment/handle/allTable",
			})
		},
	},
}
</script>
<style lang="scss">
.page-managementcener {
	.card-list-header {
		border: none;
	}
	.header-right {
		width: 100%;
	}
	.addbtn {
		margin-left: 10px;
		background: transparent;
		font-size: 20px;
		border: 1px solid #4d4d4d;
		padding: 3px;
		color: #4d4d4d;
	}
	.card-footer {
		.el-button {
			flex: 1;
			cursor: pointer;
			text-align: center;
			position: relative;
			&:before {
				content: "";
				position: absolute;
				width: 1px;
				height: 14px;
				background: hsla(0, 0%, 100%, 0.2);
				right: 0;
				top: 10px;
			}
			span {
				&:before {
					width: 0px;
				}
			}
		}
		.backbtn {
			color: #f74a4a;
		}
	}
}
</style>
