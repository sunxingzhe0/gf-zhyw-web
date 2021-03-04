<template>
	<div class="word">
		<wordTitle :title="$route.meta.title">
			<el-input
				placeholder="关键字"
				size="mini"
				v-model="list.query.keyword"
				class="input-with-select"
			>
				<el-select
					v-model="list.query.searchType"
					slot="prepend"
					placeholder="请选择"
					size="mini"
				>
					<el-option label="全部" value=""></el-option>
					<el-option label="设备名称" value="1"></el-option>
					<el-option label="设备类型" value="2"></el-option>
					<el-option label="编号" value="3"></el-option>
					<el-option label="巡检点" value="4"></el-option>
					<el-option label="巡检线路" value="5"></el-option>
				</el-select>
				<el-button
					slot="append"
					icon="el-icon-search"
					type="primary"
					class="searchbtn"
				></el-button>
			</el-input>
			<el-button size="mini" class="tablebtn" @click="showTable">
				<svg class="iconfont" aria-hidden="true">
					<use xlink:href="#iconliebiao"></use>
				</svg>
			</el-button>
		</wordTitle>
		<List
			:pageNum="list.query.pageNum"
			:pageSize="list.query.pageSize"
			:total="list.total"
			@handleSizeChange="handleSizeChange"
			@handleCurrentChange="handleCurrentChange"
			v-loading="loading"
		>
			<card
				:datas="list.datas"
				@show="show"
				@distribute="distribute"
				@receiving="receiving"
				@end="end"
				@assist="assist"
				@hangUp="hangUp"
				@recovery="recovery"
				@agree="agree"
				@refuse="refuse"
				@evaluate="evaluate"
				@transfer="transfer"
			></card>
		</List>
		<DarkDialog v-model="maintainDig">
			<distribute :id="id" @sumbit="sumbit"></distribute>
		</DarkDialog>
		<DarkDialog v-model="assistDig">
			<assist :id="id" @sumbit="sumbitas"></assist>
		</DarkDialog>
		<DarkDialog v-model="transfertDig">
			<transfer :id="id" @sumbit="sumbittransfer"></transfer>
		</DarkDialog>
		<DarkDialog v-model="evaluateDig">
			<evaluate :id="id" @sumbit="sumbitevaluate"></evaluate>
		</DarkDialog>
		<router-view></router-view>
	</div>
</template>
<script>
import wordTitle from "../components/wordTitle"
import { List } from "@/components/App"
import card from "./components/card"
import maintain from "@/api/operations/maintain"
import DarkDialog from "@/components/App/DarkDialog"
import distribute from "./components/distribute"
import assist from "./components/assist"
import transfer from "./components/transfer"
import evaluate from "./components/evaluate"
export default {
	name: "OperationsMaintainrder",
	meta: {
		sort: 5,
		title: "保养单",
		hideMenu: true,
	},
	components: {
		wordTitle,
		List,
		card,
		DarkDialog,
		distribute,
		assist,
		transfer,
		evaluate,
	},
	data() {
		return {
			//列表
			list: {
				total: 0,
				datas: [],
				query: {
					pageNum: 1,
					pageSize: 10,
					searchType: "",
					keyword: "",
				},
			},
			loading: true,
			//派单弹窗
			maintainDig: {
				dialogVisible: false,
				binds: {
					title: "派单",
					width: "1200px",
				},
			},
			id: "",
			//协助
			assistDig: {
				dialogVisible: false,
				binds: {
					title: "协助",
					width: "1200px",
				},
			},
			//转单
			transfertDig: {
				dialogVisible: false,
				binds: {
					title: "转单",
					width: "1200px",
				},
			},
			//评价
			evaluateDig: {
				dialogVisible: false,
				binds: {
					title: "评价",
					width: "1200px",
				},
			},
		}
	},
	async created() {
		await this.getlist()
	},
	methods: {
		async handleSizeChange(pageSize) {
			this.list.pageSize = pageSize
			await this.getlist(this.list.query)
		},
		async handleCurrentChange(pageNum) {
			this.list.pageNum = pageNum
			await this.getlist(this.list.query)
		},
		async getlist() {
			this.loading = true
			let res = await maintain.order.getOrderList(this.list.query)
			this.list.datas = res.list
			this.list.total = res.total
			this.loading = false
		},
		//派单信息提交刷新
		sumbit(flg) {
			if (flg) {
				this.maintainDig.dialogVisible = false
				this.getlist()
			}
		},
		//协助信息提交刷新
		sumbitas(flg) {
			if (flg) {
				this.assistDig.dialogVisible = false
				this.getlist()
			}
		},
		//转单信息提交刷新
		sumbittransfer(flg) {
			if (flg) {
				this.transfertDig.dialogVisible = false
				this.getlist()
			}
		},
		//评价信息提交刷新
		sumbitevaluate(flg) {
			if (flg) {
				this.evaluateDig.dialogVisible = false
				this.getlist()
			}
		},
		//详情
		show(item) {
			this.$router.push({
				path: "/operations/maintain/order/detail",
				query: {
					orderId: item.id,
				},
			})
		},
		//派单
		distribute(item) {
			this.id = item.id
			this.maintainDig.dialogVisible = true
		},
		//接单
		async receiving(item) {
			this.$confirm("确定要接单吗？", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			}).then(async () => {
				await maintain.order.receiving({
					id: item.id,
				})
				// 重新拉取数据
				await this.getlist()
				this.$message.success("操作成功!")
			})
		},
		//结束
		end(item) {
			this.$confirm("确定要结束该订单吗？", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			}).then(async () => {
				await maintain.order.end({
					id: item.id,
				})
				// 重新拉取数据
				await this.getlist()
				this.$message.success("操作成功!")
			})
		},
		//转单
		transfer(item) {
			this.id = item.id
			this.transfertDig.dialogVisible = true
		},
		//协助
		assist(item) {
			this.id = item.id
			this.assistDig.dialogVisible = true
		},
		//挂起
		hangUp(item) {
			this.$confirm("确定要操作该订单吗？", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			}).then(async () => {
				await maintain.order.hangUp({
					id: item.id,
				})
				// 重新拉取数据
				await this.getlist()
				this.$message.success("操作成功!")
			})
		},
		//恢复
		recovery(item) {
			this.$confirm("确定要操作该订单吗？", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			}).then(async () => {
				await maintain.order.hangUp({
					id: item.id,
				})
				// 重新拉取数据
				await this.getlist()
				this.$message.success("操作成功!")
			})
		},
		//同意
		agree(item) {
			this.$confirm("确定要操作该订单吗？", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			}).then(async () => {
				await maintain.order.agree({
					id: item.id,
				})
				// 重新拉取数据
				await this.getlist()
				this.$message.success("操作成功!")
			})
		},
		//拒绝
		refuse(item) {
			this.$confirm("确定要操作该订单吗？", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			}).then(async () => {
				await maintain.order.refuse({
					id: item.id,
				})
				// 重新拉取数据
				await this.getlist()
				this.$message.success("操作成功!")
			})
		},
		//评价
		evaluate(item) {
			this.id = item.id
			this.evaluateDig.dialogVisible = true
		},
		//显示列表
		showTable() {
			this.$router.push({
				path: "/operations/maintain/order/orderTable",
			})
		},
	},
}
</script>
<style lang="scss">
@import "@/assets/css/variables.scss";
.word {
	height: calc(100% - 220px);
	.select-search {
		width: 75px;
		margin-left: 10px;
	}
	.input-with-select {
		width: 260px;
		.el-input-group__append {
			width: 26px !important;
			color: #0071e3;
			background: transparent;
			border-color: #4d4d4d;
			padding: 0px;
		}
		.el-input-group__prepend {
			width: 100px !important;
			color: #0071e3;
			background: transparent;
			border-color: #4d4d4d;
		}
		.el-button {
			width: 36px;
			padding: 7px 0px;
			border-color: #4d4d4d;
		}
	}
	.searchbtn {
		border: none;
		width: 26px !important;
		margin: 0px;
	}
	.el-button--default {
		background: transparent;
		color: #fff;
	}
	.tablebtn {
		width: 28px;
		height: 28px;
		background: rgba(51, 51, 51, 0.6);
		border: 1px solid #4d4d4d;
		border-radius: 2px;
		padding: 5px 7px;
		color: #cccccc;
		margin-left: 10px;
	}
	.dialognav {
		.tabs-header {
			padding: 0px 20px;
			box-sizing: border-box;
			background: rgba(26, 26, 26, 0.8);
			.tab-item {
				display: inline-block;
				cursor: pointer;
				line-height: 36px;
				color: #fff;
				margin-right: 38px;
			}
			.is-active {
				color: #0071e3;
				position: relative;
				&::after {
					content: "";
					position: absolute;
					left: 0;
					bottom: 0;
					width: 56px;
					height: 2px;
					background: #0071e3;
				}
			}
		}

		.tab-pane {
			padding: 20px 20px;
		}
	}
}
</style>
