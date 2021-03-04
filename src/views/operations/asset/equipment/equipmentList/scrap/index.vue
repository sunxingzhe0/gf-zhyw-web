<template>
	<AppDialog router title="报废设备" :show.sync="show" class="scrap-dig">
		<div class="scrap">
			<div>理由</div>
			<el-input type="textarea" rows="4" v-model="scrapValue"></el-input>
		</div>
		<div class="footer-btn">
			<el-button type="primary" @click="submitScrap" size="small"
				>确认</el-button
			>
			<el-button @click="scrapValue = ''" size="small" class="infobtn"
				>取消</el-button
			>
		</div>
	</AppDialog>
</template>
<script>
/*
@author        cui
@name          OperationsAssetEquipmentListScrap
@desc          报废设备
@query         equipmentId    string    设备id
@props
@emit
*/
import { AppDialog } from "@/components/App"
import asset from "@/api/operations/asset"
export default {
	name: "OperationsAssetEquipmentListScrap",
	components: {
		AppDialog,
	},
	data() {
		return {
			show: false,
			scrapValue: "", //报废理由
			equipmentId: "",
		}
	},
	mounted() {
		this.show = true
		this.equipmentId = this.$route.query.equipmentId
	},
	methods: {
		async submitScrap() {
			await asset.equipment.equipmentScrap({
				id: this.equipmentId,
				scrapValue: this.scrapValue,
			})
			this.$message.success("操作成功!")
			this.$router.back()
		},
	},
}
</script>
<style lang="scss" scoped>
.dark-el-menu.el-menu {
	padding: 0 20px;
	justify-content: flex-start;
	background: rgba(26, 26, 26, 0.8);
	&::v-deep {
		.el-menu-item {
			margin-right: 40px;
		}
	}
}
</style>
<style lang="scss">
.scrap-dig {
	.el-dialog {
		width: 680px !important;
	}
	.scrap {
		padding: 20px;
		& > div {
			color: #fff;
			font-size: 14px;
			margin-bottom: 20px;
		}
	}
	.footer-btn {
		text-align: center;
		border-top: 1px solid rgba(255, 255, 255, 0.3);
		padding: 20px 0px;
		.el-form-item__content {
			margin-left: 0px !important;
		}
		.el-button {
			width: 56px;
		}
		.el-button + .el-button {
			margin-left: 20px;
		}
		.infobtn {
			background: transparent;
			border: 1px solid #ffffff;
			border-radius: 2px;
			color: #fff;
			&:hover,
			&:focus {
				background: transparent;
				color: #fff;
			}
		}
	}
}
</style>
