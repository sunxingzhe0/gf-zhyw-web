<template>
	<div class="form-dig">
		<div class="dialognav">
			<div class="tabs-header">
				<template v-for="(item, index) in navs">
					<div
						:class="
							item.name == activeName
								? 'tab-item is-active'
								: !formId && item.name != 'first'
								? 'tab-item is-disabled'
								: 'tab-item'
						"
						:key="index"
						v-if="!isedit && item.name == 'four' ? false : true"
						@click="handleClick(item.name)"
					>
						{{ item.label }}
					</div>
				</template>
			</div>
			<div class="tabs-content">
				<div v-if="activeName == 'first'" class="tab-pane">
					<basicInfo
						:forminfo="forminfo"
						@submit="submit"
						:isedit="isedit"
					></basicInfo>
				</div>
				<div v-if="activeName == 'third' && formId" class="tab-pane">
					<equipmentList :contractId="formId"></equipmentList>
				</div>
				<div
					v-if="activeName == 'four' && formId && isedit"
					class="tab-pane"
				>
					<div class="basicinfo" v-if="data">
						<div class="basicinfoitem">
							<span class="infolabel">公司名称:</span>
							<span> {{ data.supplierName }}</span>
						</div>
						<div class="basicinfoitem">
							<span class="infolabel">公司电话:</span>
							<span> {{ data.supplierPhone }}</span>
						</div>
						<div class="basicinfoitem">
							<span class="infolabel">公司状态:</span>
							<span>
								{{
									data.supplierStatus == 1 ? "启用" : "停用"
								}}</span
							>
						</div>
						<div class="basicinfoitem">
							<span class="infolabel">合作次数:</span>
							<span> {{ data.CooperationNum }}次</span>
						</div>
						<div class="basicinfoitem">
							<span class="infolabel">合作总金额:</span>
							<span>￥{{ data.CooperationAcount }}</span>
						</div>
						<div class="basicinfoitem">
							<span class="infolabel">创建时间:</span>
							<span> {{ data.createTime }}</span>
						</div>
						<div
							v-for="(item, index) in data.userInfo"
							:key="index"
							class="contents"
						>
							<div class="basicinfoitem">
								<span class="infolabel"
									>联系人{{ index + 1 }}:</span
								>
								<span> {{ item.user }}</span>
							</div>
							<div class="basicinfoitem">
								<span class="infolabel"
									>联系电话{{ index + 1 }}:</span
								>
								<span> {{ item.phone }}</span>
							</div>
						</div>
						<div class="basicinfoitem contents">
							<span class="infolabel">公司地址:</span>
							<span> {{ data.supplierAddress }}</span>
						</div>
						<div class="basicinfoitem contents">
							<span class="infolabel">公司简介:</span>
							<span> {{ data.summary }},</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import basicInfo from "./form/basicInfo"
import asset from "@/api/operations/asset"
import equipmentList from "./form/equipmentList"
export default {
	props: {
		formId: String,
		isedit: Boolean,
	},
	components: {
		basicInfo,
		equipmentList,
	},
	watch: {
		formId() {
			this.activeName = "first"
			this.setinfo()
		},
	},
	created() {
		this.setinfo()
	},
	data() {
		return {
			navs: [
				{ label: "合同信息", name: "first" },
				{ label: "关联设备", name: "third" },
				{ label: "供应商信息", name: "four" },
			],
			activeName: "first",
			forminfo: null,
			data: null,
		}
	},
	methods: {
		async handleClick(name) {
			if (name == "four" && this.data == null) {
				this.getdata()
			}
			if (this.formId) {
				this.activeName = name
			} else if (name == "first") {
				this.activeName = name
			}
		},
		async submit(forminfo) {
			let res = await asset.contract.saveContract(forminfo)
			this.$message.success("提交成功")
			this.$emit("submit", res.id)
		},
		async setinfo() {
			if (this.formId && this.isedit) {
				this.forminfo = await asset.contract.getContract({
					id: this.formId,
				})
			} else {
				this.forminfo = null
			}
		},
		async getdata() {
			this.data = await asset.contract.getSupplier({
				id: this.formId,
			})
		},
	},
}
</script>
<style lang="scss">
.form-dig {
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
					width: 100%;
					height: 2px;
					background: #0071e3;
				}
			}
			.is-disabled {
				cursor: not-allowed;
			}
		}

		.tab-pane {
			padding-top: 20px;
			max-height: 580px;
			overflow-y: auto;
			box-sizing: border-box;
		}
		.tab-pane::-webkit-scrollbar {
			/*滚动条整体样式*/
			width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
			height: 1px;
		}
		.tab-pane::-webkit-scrollbar-thumb {
			/*滚动条里面小方块*/
			border-radius: 10px;
			box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
			background: #535353;
		}
		.tab-pane::-webkit-scrollbar-track {
			/*滚动条里面轨道*/
			box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
			border-radius: 10px;
			background: transparent;
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
}
</style>
