<template>
	<div class="detail" v-loading="loading">
		<div class="basicinfo" v-if="data">
			<div class="basicinfoitem">
				<span class="infolabel">单据号:</span>
				<span> {{ data.no }}</span>
			</div>
			<div class="basicinfoitem">
				<span class="infolabel">创建日期:</span>
				<span> {{ data.time }}</span>
			</div>
			<div class="basicinfoitem">
				<span class="infolabel">单据状态:</span>
				<span>
					{{
						data.status == 1
							? "待处理"
							: data.status == 2
							? "待接单"
							: data.status == 3
							? "进行中"
							: data.status == 4
							? "挂起中"
							: data.status == 5
							? "待审核"
							: data.status == 6
							? "待评价"
							: data.status == 7
							? "已完成"
							: ""
					}}</span
				>
			</div>
		</div>
		<distributeOrderForm
			:id="id"
			@sumbit="sumbit"
			v-if="isform"
		></distributeOrderForm>
		<assistForm
			:id="id"
			@sumbit="isassist = false"
			v-else-if="isassist"
		></assistForm>
		<transferForm
			:id="id"
			@sumbit="istransfer = false"
			v-else-if="istransfer"
		></transferForm>
		<div class="dialognav">
			<div class="tabs-header">
				<template v-for="(item, index) in navs">
					<div
						:class="
							item.name == activeName
								? 'tab-item is-active'
								: 'tab-item'
						"
						:key="index"
						@click="handleClick(item.name)"
					>
						{{ item.label }}
					</div>
				</template>
			</div>
			<div class="tabs-content">
				<div v-if="activeName == 'first'" class="tab-pane">
					<contentInfo :id="id"></contentInfo>
				</div>
				<div v-if="activeName == 'second'" class="tab-pane">
					<timeLine></timeLine>
				</div>
				<div v-if="activeName == 'third'" class="tab-pane">
					<stepLine></stepLine>
				</div>
				<div v-if="activeName == 'fourth'" class="tab-pane">
					<notesTable></notesTable>
				</div>
			</div>
		</div>
		<div class="single-footer-btns">
			<el-button type="primary" plain size="small" @click="showForm"
				>派单</el-button
			>
			<el-button type="primary" plain size="small">重派工</el-button>
			<el-button type="primary" plain size="small" @click="showTransfer"
				>转单</el-button
			>
			<el-button type="primary" plain size="small" @click="showAssist"
				>协助</el-button
			>
			<el-button type="primary" plain size="small" @click="hangUp"
				>挂起</el-button
			>
		</div>
	</div>
</template>
<script>
import maintain from "@/api/operations/maintain"
import contentInfo from "./components/contentInfo"
import timeLine from "./components/timeLine"
import notesTable from "./components/notesTable"
import stepLine from "./components/stepLine"
import distributeOrderForm from "../form/distributeOrderForm"
import assistForm from "../form/assistForm"
import transferForm from "../form/transferForm"
export default {
	name: "singleDetail",
	props: {
		id: {
			type: String,
		},
		nav: {
			type: String,
		},
	},
	components: {
		contentInfo,
		timeLine,
		notesTable,
		stepLine,
		distributeOrderForm,
		assistForm,
		transferForm,
	},
	data() {
		return {
			data: null,
			activeName: "first",
			navs: [
				{ label: "保养单内容", name: "first" },
				{ label: "保养情况", name: "second" },
				{ label: "保养单跟踪", name: "third" },
				{ label: "备忘记录", name: "fourth" },
			],
			loading: true,
			//派单
			isform: false,
			//协助
			isassist: false,
			//转单
			istransfer: false,
		}
	},
	async created() {
		if (this.nav) {
			this.activeName = this.nav
		}
		this.isform = false
		this.isassist = false
		this.istransfer = false
		this.data = await maintain.order.getBasicinfo({ id: this.id })
		this.loading = false
	},
	methods: {
		handleClick(name) {
			this.activeName = name
		},
		showForm() {
			this.isform = true
			this.isassist = false
			this.istransfer = false
		},
		showAssist() {
			this.isform = false
			this.isassist = true
			this.istransfer = false
		},
		showTransfer() {
			this.isform = false
			this.isassist = false
			this.istransfer = true
		},
		sumbit() {
			this.isform = false
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
				this.$message.success("操作成功!")
			})
		},
	},
}
</script>
<style lang="scss">
.detail {
	height: 650px;
	overflow-y: auto;
	.basicinfo {
		width: 100%;
		padding: 20px 20px;
		padding-bottom: 0px;
		.basicinfoitem {
			width: 33.3%;
			display: inline-block;
			font-size: 14px;
			color: #fff;
			margin-bottom: 20px;
			overflow: hidden;
			white-space: nowrap;
			.infolabel {
				margin-right: 10px;
			}
			.index {
				margin-right: 10px;
			}
		}
		.contents {
			width: 100%;
			overflow: none;
			white-space: normal;
		}
		.content {
			width: 66%;
			text-overflow: ellipsis;
		}
	}
	.demo-ruleForm-detail {
		padding: 20px 20px 0px 20px;
		margin-bottom: 20px;
		background: rgba(26, 26, 26, 0.8);
		.el-form-item {
			width: 50%;
			display: inline-block;
			.el-input,
			.el-input {
				width: 400px;
			}
		}
		.el-form-item__label {
			color: #fff;
			font-size: 14px;
		}
		.el-form-item__content > .el-button {
			border: none;
			padding: 12px 24px;
			width: 74px;
		}
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
				width: auto;
				&::after {
					content: "";
					position: absolute;
					left: 0;
					bottom: 0;
					width: 100%;
					height: 2px;
					background: #0071e3;
				}
			}
		}

		.tab-pane {
			padding: 20px 20px;
		}
	}
	.single-footer-btns {
		height: 72px;
		border-top: 1px solid rgba(255, 255, 255, 0.3);
		padding: 20px;
		text-align: center;
		box-sizing: border-box;
		.el-button {
			border-color: #0071e3;
			width: 74px;
		}
	}
}

.detail::-webkit-scrollbar {
	width: 5px;
}
</style>
