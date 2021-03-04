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
@desc          被服处理
@query         
@props         
@emit           
*/
import { CardList } from "@/components/App"
import asset from "@/api/operations/asset"
export default {
	name: "OperationsAssetClothingHandle",
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
			fetcher: asset.clothing.getclothingList,
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
									{item.status == "ToBePosted"
										? "待贴置"
										: item.status == "ToBeRegistered"
										? "待注册"
										: ""}
								</span>
							</div>
							<div class="card-info">
								<span>类型：{item.typeName}</span>
								<span>规格：{item.specification}</span>
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

						{item.status == "ToBeRegistered" ? (
							<span onClick={() => this.register(item.id)}>
								注册
							</span>
						) : (
							""
						)}
						{item.status == "ToBeRegistered" ? (
							<span
								type="text"
								class="no-before greenBtn"
								onClick={() => this.Reset(item.id)}
							>
								重置
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
				path: "/operations/asset/clothing/edit",
				query: {
					clothingId: id,
				},
			})
		},
		//注册
		register(id) {
			this.$router.push({
				path: "/operations/asset/clothing/handle/register",
				query: {
					clothingId: id,
				},
			})
		},
		//贴置
		Placement(id) {
			this.$router.push({
				path: "/operations/asset/clothing/handle/placement",
				query: {
					clothingId: id,
				},
			})
		},
		//重置
		Reset(id) {
			this.$confirm("确定要重置吗？", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			}).then(async () => {
				await asset.clothing.Reset({ id: id })
				this.$message.success("操作成功")
			})
		},
		//详情
		showDetail(id) {
			this.$router.push({
				path: "/operations/asset/clothing/handle/detail",
				query: { clothingId: id },
			})
		},
		//查看更多
		showTable() {
			this.$router.push({
				path: "/operations/asset/clothing/handle/allTable",
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
	.greenBtn {
		color: #0ab2c1;
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
	}
}
.palcementdig {
	.dark-dialog-body {
		min-height: 145px !important;
	}
}
</style>
