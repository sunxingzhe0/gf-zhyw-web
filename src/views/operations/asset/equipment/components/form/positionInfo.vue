<template>
	<div class="position-info">
		<div class="title">点位信息</div>
		<el-form
			:model="ruleForm"
			:rules="rules"
			ref="assetinfo-ruleForm"
			label-width="100px"
			class="demo-ruleForm-postioninfo"
		>
			<el-form-item label="GIS坐标:">
				<el-input
					v-model="ruleForm.x"
					size="small"
					style="width:48%;"
				></el-input>

				<el-input
					v-model="ruleForm.y"
					size="small"
					style="width:48%;"
				></el-input>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
export default {
	data() {
		return {
			ruleForm: {
				x: "",
				y: "",
			},
			rules: {},
		}
	},
}
</script>
<style lang="scss">
.position-info {
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
	.demo-ruleForm-postioninfo {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		padding-right: 44px;
		padding-left: 20px;
		box-sizing: border-box;
		.el-form-item {
			width: 32.3%;
			margin-right: 1%;
			.el-select,
			.el-date-editor {
				width: 100%;
			}
		}
		.el-form-item:nth-of-type(3n) {
			margin-right: 0px;
		}
		.el-form-item__label {
			color: #fff;
		}
	}
}
</style>
