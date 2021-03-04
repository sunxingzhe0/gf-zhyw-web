<template>
	<div class="page-managementcener">
		<CardList
			title="发放记录"
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
@name          OperationsAssetRelease
@desc          资产发放
@query
@props
@emit
*/
import { CardList } from "@/components/App"
import asset from "@/api/operations/asset"
export default {
	name: "OperationsAssetRelease",
	meta: {
		sort: 5,
		title: "资产发放",
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
						{ label: "关联单据", value: "1" },
						{ label: "领用人", value: "2" },
						{ label: "领用部门", value: "3" },
					],
					component: "el-select",
					default: "1",
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
					onClick: this.append,
					text: "发放",
					className: "release-btn",
					elAttrs: {
						size: "mini",
						type: "primary",
					},
				},
			],
			fetcher: asset.release.getReleaseList,
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
								<span class="card-title" title={item.orderId}>
									{item.orderId}
								</span>
								<span class="card-title">
									数量:{item.releaseNum}
								</span>
							</div>
							<div class="card-info">
								<span>领用人：{item.releaseUser}</span>
								<span>领用部门：{item.releaseDept}</span>
							</div>
							<div class="card-info">
								<span>操作时间：{item.createTime}</span>
							</div>
						</div>
					</div>
					<div class="card-footer">
						<span onClick={() => this.showDetail(item.id)}>
							详情
						</span>
					</div>
				</div>
			)
		},
		append() {
			this.$router.push({
				path: "/operations/asset/release/add",
			})
		},
		showDetail(id) {
			this.$router.push({
				path: "/operations/asset/release/detail",
				query: { releaseId: id },
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
	.header-left {
		width: 90px;
	}
	.header-right {
		width: 100%;
	}
	.release-btn {
		margin-left: 10px;
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
</style>
