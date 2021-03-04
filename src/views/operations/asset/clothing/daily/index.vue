<template>
	<div class="page-daily">
		<CardList
			:params="params"
			:fetcher="fetcher"
			:renderFunc="renderFunc"
			:headerBtns="headerBtns"
			ref="page-daily-list"
		></CardList>
		<DarkDialog v-model="registerDig">
			<registerForm @submit="registerSubmit" :item="item"></registerForm>
		</DarkDialog>
		<router-view></router-view>
	</div>
</template>
<script>
/*
@author        cui
@name          OperationsAssetClothingDaily
@desc          被服日常
@query         
@props         
@emit           
*/
import { CardList } from "@/components/App"
import asset from "@/api/operations/asset"
import DarkDialog from "@/components/App/DarkDialog"
import registerForm from "./components/registerForm"
export default {
	name: "OperationsAssetClothingDaily",
	meta: {
		sort: 1,
		title: "日常",
		hideMenu: true,
	},
	components: {
		CardList,
		DarkDialog,
		registerForm,
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
						{ label: "名称", value: "1" },
						{ label: "编号", value: "2" },
						{ label: "管理负责人", value: "3" },
						{ label: "管理部门", value: "4" },
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
			fetcher: asset.clothing.getdailyClothingList,
			id: "",
			registerDig: {
				dialogVisible: false,
				binds: {
					title: "被服注册",
					width: "1200px",
				},
			},
			item: null,
		}
	},
	methods: {
		renderFunc(item) {
			return (
				<div class="card-item plan-item">
					<div class="card-content">
						<div class="card-icon">
							<svg class="iconfont" aria-hidden="true">
								<use xlinkHref="#iconxitong-beifuguanli"></use>
							</svg>
						</div>
						<div class="card-infos">
							<div class="card-info">
								<span class="card-title" title={item.name}>
									{item.name}
								</span>
								<span class="card-title">
									{item.useStatus == "ToBeSend"
										? "待发放"
										: item.useStatus == "ToBeUsed"
										? "待领用"
										: item.useStatus == "Using"
										? "使用中"
										: item.useStatus == "ToBeRecycled"
										? "待回收"
										: item.useStatus == "ToBeWashed"
										? "待洗涤"
										: item.useStatus == "Washing"
										? "洗涤中"
										: item.useStatus == "ToBeReceived"
										? "待收货"
										: item.useStatus == "Scrapped"
										? "已报废"
										: ""}
								</span>
							</div>
							<div class="card-info">
								<span>类型：{item.typeName}</span>
								<span>规格：{item.specification}</span>
							</div>
							<div class="card-info">
								<span>使用人：{item.usedName}</span>
								<span>使用部门：{item.usedDept}</span>
							</div>
						</div>
					</div>
					{item.useStatus == "ToBeSend" ? (
						<div class="card-footer">
							<span
								type="text"
								onClick={() => this.showDetail(item.id)}
							>
								详情
							</span>
							<span
								type="text"
								onClick={() => this.edit(item.id)}
							>
								编辑
							</span>
							<span
								type="text"
								onClick={() => this.grant(item.id)}
							>
								发放
							</span>
							<span
								type="text"
								onClick={() => this.recall(item.id)}
							>
								召回
							</span>
						</div>
					) : (
						""
					)}
					{item.useStatus == "ToBeUsed" ? (
						<div class="card-footer">
							<span
								type="text"
								onClick={() => this.showDetail(item.id)}
							>
								详情
							</span>
							<span
								type="text"
								onClick={() => this.edit(item.id)}
							>
								编辑
							</span>
							<span
								type="text"
								onClick={() => this.showRegister(item)}
							>
								注册
							</span>
						</div>
					) : (
						""
					)}
					{item.useStatus == "ToBeRecycled" ? (
						<div class="card-footer">
							<span
								type="text"
								onClick={() => this.showDetail(item.id)}
							>
								详情
							</span>
							<span
								type="text"
								onClick={() => this.edit(item.id)}
							>
								编辑
							</span>
							<span
								type="text"
								onClick={() => this.wash(item.id)}
							>
								洗涤
							</span>
						</div>
					) : (
						""
					)}
					{item.useStatus == "ToBeWashed" ? (
						<div class="card-footer">
							<span
								type="text"
								onClick={() => this.showDetail(item.id)}
							>
								详情
							</span>
							<span
								type="text"
								onClick={() => this.edit(item.id)}
							>
								编辑
							</span>
							<span
								type="text"
								onClick={() => this.qualified(item.id)}
							>
								合格
							</span>
							<span
								type="text"
								onClick={() => this.unqualified(item.id)}
							>
								不合格
							</span>
						</div>
					) : (
						""
					)}
					{item.useStatus == "Washing" ? (
						<div class="card-footer">
							<span
								type="text"
								onClick={() => this.showDetail(item.id)}
							>
								详情
							</span>
							<span
								type="text"
								onClick={() => this.edit(item.id)}
							>
								编辑
							</span>
							<span
								type="text"
								onClick={() => this.recovery(item.id)}
							>
								回收
							</span>
						</div>
					) : (
						""
					)}
				</div>
			)
		},
		showRegister(item) {
			this.registerDig.dialogVisible = true
			this.item = item
		},
		grant() {
			this.$confirm("确定要发放该被服设备吗？", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			}).then(async () => {
				// await asset.clothing.scrapClothing({
				// 	id: id,
				// })
				// // 重新拉取数据
				// this.$refs.pagelist.loadData()
				// this.$message.success("操作成功!")
			})
		},
		recall() {
			this.$confirm("确定要召回该被服设备吗？", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			}).then(async () => {
				// await asset.clothing.deleteClothing({
				// 	id: id,
				// })
				// // 重新拉取数据
				// this.$refs.pagelist.loadData()
				// this.$message.success("操作成功!")
			})
		},
		submit() {
			this.clothingDig.dialogVisible = false
			this.$refs["page-daily-list"].loadData()
			this.id = ""
		},
		edit(id) {
			this.$router.push({
				path: "/operations/asset/clothing/edit",
				query: { clothingId: id },
			})
		},
		registerSubmit() {
			this.registerDig.dialogVisible = false
			this.$refs["page-daily-list"].loadData()
			this.item = null
		},
		wash() {},
		qualified() {},
		unqualified() {},
		recovery() {},
		//查看更多
		showTable() {
			this.$router.push({
				path: "/operations/asset/clothing/daily/allTable",
			})
		},
	},
}
</script>
<style lang="scss">
.page-daily {
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
	.card-content {
		padding-bottom: 10px;
		margin-bottom: 0px !important;
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
		& > span:last-child {
			&::before {
				width: 0px;
			}
		}
	}
}
</style>
