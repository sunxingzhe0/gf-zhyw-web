<template>
	<div class="right" v-loading="loading" v-if="singleInfo">
		<div class="line-info">
			<div class="title">保养记录</div>
			<div class="basicinfo">
				<div class="basicinfoitem">
					<span class="infolabel">保养名称:</span>
					<span>
						<span class="index"
							>第{{ singleInfo.data.basicinfo.index }}次</span
						>
						{{ singleInfo.data.basicinfo.name }}</span
					>
				</div>
				<div class="basicinfoitem">
					<span class="infolabel">保养周期:</span>
					<span> {{ singleInfo.data.basicinfo.cycle }}</span>
				</div>
				<div class="basicinfoitem">
					<span class="infolabel">维护部门:</span>
					<span> {{ singleInfo.data.basicinfo.dept }}</span>
				</div>
				<div class="basicinfoitem">
					<span class="infolabel">执行人:</span>
					<span> {{ singleInfo.data.basicinfo.executor }}</span>
				</div>
				<div class="basicinfoitem">
					<span class="infolabel">保养时间:</span>
					<span> {{ singleInfo.data.basicinfo.date }}</span>
				</div>
				<div class="basicinfoitem contents">
					<span class="infolabel">保养内容:</span>
					<span
						v-for="(item, index) in singleInfo.data.basicinfo
							.contents"
						:key="index"
					>
						{{ item.content }},</span
					>
				</div>
			</div>
		</div>
		<div class="line-info">
			<div class="title">保养设备</div>
			<div class="equipmentTable">
				<equipmentTable :recordid="singleInfo.id"></equipmentTable>
			</div>
		</div>
		<div class="line-info">
			<div class="title searchall">
				<div>维修记录</div>
				<div class="title-fiter">
					<el-select
						placeholder="全部设备类型"
						v-model="repairTablequey.type"
						size="mini"
					>
						<el-option
							v-for="(item, index) in types"
							:key="index"
							:label="item.name"
							:value="item.id"
						></el-option>
					</el-select>
					<el-input
						placeholder="请输入内容"
						v-model="repairTablequey.keyword"
						class="input-with-select"
						size="mini"
					>
						<el-select
							v-model="repairTablequey.searchType"
							slot="prepend"
							placeholder="请选择"
							size="mini"
						>
							<el-option label="设备名称" value="1"></el-option>
							<el-option label="设备类型" value="2"></el-option>
						</el-select>
						<el-button
							slot="append"
							icon="el-icon-search"
							type="primary"
							class="searchbtn"
							size="mini"
						></el-button>
					</el-input>
					<el-date-picker
						size="mini"
						v-model="repairTablequey.time"
						type="datetimerange"
						range-separator="至"
						start-placeholder="开始日期"
						end-placeholder="结束日期"
						align="right"
						class="searchtime"
					>
					</el-date-picker>
				</div>
			</div>
			<div class="equipmentTable">
				<repairTable :repairTablequey="repairTablequey"></repairTable>
			</div>
		</div>
	</div>
</template>
<script>
import maintain from "@/api/operations/maintain"
import equipmentTable from "../../components/equipmentTable"
import repairTable from "../../components/repairTable"
export default {
	name: "taskDetail",
	props: {
		taskid: {
			type: String,
			default: "",
		},
	},
	components: {
		equipmentTable,
		repairTable,
	},
	data() {
		return {
			singleInfo: null,
			repairTablequey: {
				keyword: "",
				searchType: "1",
				type: "",
				time: [],
				recordid: this.singleInfo ? this.singleInfo.id : "",
			},
			types: [],
			loading: true,
		}
	},
	async created() {
		this.singleInfo = await maintain.task.getDetail({ taskid: this.taskid })
		this.types = await maintain.plan.getTypes()
		this.loading = false
	},
}
</script>
<style lang="scss">
.right {
	max-height: 630px;
	overflow-y: auto;
	.line-info {
		background: rgba(26, 26, 26, 0.8);
		margin-bottom: 22px;
		.title {
			font-size: 16px;
			font-weight: 500;
			color: #fff;
			position: relative;
			margin: 0px 20px;
			padding: 20px 0px;
			padding-left: 10px;
			line-height: 16px;
			&::before {
				content: "";
				position: absolute;
				left: 0;
				top: 20px;
				width: 2px;
				height: 16px;
				background: #0071e3;
			}
		}
		.searchall {
			display: flex;
			justify-content: space-between;
			.title-fiter {
				margin-top: -6px;
				.input-with-select {
					width: 250px;
					margin-left: 10px;
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
						margin: 0px;
					}
				}
				.searchtime {
					width: 250px !important;
					margin-left: 10px;
				}
			}
		}
		.basicinfo {
			width: 100%;
			padding: 0px 20px;
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
		}
		.equipmentTable {
			height: 450px;
			overflow: hidden;
		}
	}
}
.right::-webkit-scrollbar {
	display: none;
}
</style>
