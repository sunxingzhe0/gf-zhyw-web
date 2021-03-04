<template>
	<div class="position-info">
		<div class="title">使用信息</div>
		<template v-for="(usedInfo, index) in usedData">
			<div class="basicinfo" v-if="usedInfo" :key="index">
				<div class="basicinfoitem">
					<span class="infolabel">使用人:</span>
					<span> {{ usedInfo.usedName }}</span>
				</div>
				<div class="basicinfoitem">
					<span class="infolabel">洗涤次数:</span>
					<span> {{ usedInfo.usedNum }}次</span>
				</div>
				<div class="basicinfoitem">
					<span class="infolabel">洗涤单价:</span>
					<span> {{ usedInfo.usedPrice }}元</span>
				</div>
				<div class="basicinfoitem">
					<span class="infolabel">使用时间:</span>
					<span> {{ usedInfo.usedTime }} ~ 现在</span>
				</div>
			</div>
		</template>
	</div>
</template>
<script>
export default {
	data() {
		return {
			usedData: [],
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
	.basicinfo {
		width: 100%;
		padding: 0px 20px;
		.basicinfoitem {
			width: 25%;
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
