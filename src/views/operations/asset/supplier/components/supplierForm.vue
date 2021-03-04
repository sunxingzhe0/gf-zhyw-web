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
				<div v-if="activeName == 'second' && formId" class="tab-pane">
					<contractList :supplierId="formId"></contractList>
				</div>
				<div v-if="activeName == 'third' && formId" class="tab-pane">
					<equipmentList :supplierId="formId"></equipmentList>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import basicInfo from "./form/basicInfo"
import contractList from "./form/contractList"
import asset from "@/api/operations/asset"
import equipmentList from "./form/equipmentList"
export default {
	props: {
		formId: String,
		isedit: Boolean,
	},
	components: {
		basicInfo,
		contractList,
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
				{ label: "公司信息", name: "first" },
				{ label: "关联合同", name: "second" },
				{ label: "管理设备", name: "third" },
			],
			activeName: "first",
			forminfo: null,
		}
	},
	methods: {
		handleClick(name) {
			if (this.formId) {
				this.activeName = name
			} else if (name == "first") {
				this.activeName = name
			}
		},
		async submit(forminfo) {
			let res = await asset.supplier.saveSupplier(forminfo)
			this.$message.success("提交成功")
			this.$emit("submit", res.id)
		},
		async setinfo() {
			if (this.isedit && this.formId) {
				this.forminfo = await asset.supplier.getSupplier({
					id: this.formId,
				})
			} else {
				this.forminfo = null
			}
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
					width: 56px;
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
}
</style>
