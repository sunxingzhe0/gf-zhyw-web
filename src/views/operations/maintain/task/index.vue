<template>
	<div class="task-main">
		<div class="layout-title">
			<span>保养任务</span>
			<span>
				<template v-for="(item, index) in bnts">
					<el-button
						size="mini"
						type="primary"
						v-if="index == i"
						plain
						:key="index"
						@click="setTime(index)"
						class="btn-active btn"
						>{{ item }}</el-button
					>
					<el-button
						size="mini"
						plain
						v-else
						:key="index"
						class="btn"
						@click="setTime(index)"
						>{{ item }}</el-button
					>
				</template>
				<el-input
					placeholder="请输入关键字查询"
					size="mini"
					v-model="query.keyword"
					class="input-with-select-search"
				>
					<el-button
						slot="append"
						icon="el-icon-search"
						type="primary"
						class="searchbtn"
						size="mini"
					></el-button> </el-input
			></span>
		</div>
		<DarkMenu :navs="navs"></DarkMenu>
		<router-view ref="view" :query="query"></router-view>
	</div>
</template>
<script>
/*
@author        cui
@name          OperationsMaintainTask
@desc          保养任务
@query
@props
@emit
*/
import { DarkMenu } from "@/components/App"
import { Navs } from "./constant"
export default {
	name: "OperationsMaintainTask",
	meta: {
		sort: 2,
		title: "保养任务",
		hideMenu: true,
		redirect: "/operations/maintain/task/unexecuted",
	},
	components: {
		DarkMenu,
	},
	data() {
		return {
			navs: Navs,
			query: {
				time: [],
				keyword: "",
			},
			i: 0,
			bnts: ["近7日", "近30天"],
		}
	},
	methods: {
		searchbtn() {
			this.$refs.view.$refs.pagelist.loadData()
		},
		setTime(index) {
			this.i = index
			this.$refs.view.$refs.pagelist.loadData()
		},
	},
}
</script>
<style lang="scss">
.task-main {
	height: calc(100% - 220px);
	.layout-title {
		padding: 15px;
		font-size: 16px;
		font-family: PingFang-SC-Bold;
		border-top: 1px solid rgba(255, 255, 255, 0.3);
		display: flex;
		justify-content: space-between;
		.btn-active {
			border: 1px solid #0071e3;
		}
		.input-with-select-search {
			width: 180px;
			margin-left: 10px;
			.el-input-group__append {
				width: 26px !important;
				color: #0071e3;
				background: transparent;
				border-color: #4d4d4d;
				padding: 0px;
				margin: 0px;
				.el-button {
					padding: 7px 7px;
				}
			}
		}
		.searchbtn {
			border: none;
			width: 26px !important;
			margin: 0px;
		}
		.btn {
			background: transparent;
			color: #fff;
		}
		.btn {
			padding: 7px;
			border-color: #4d4d4d;
		}
		.btn-active {
			border: 1px solid #0071e3;
			color: #0071e3;
			background: rgba(0, 113, 227, 0.2);
		}
	}
}
</style>
