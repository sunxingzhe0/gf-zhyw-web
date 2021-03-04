<template>
	<div class="indexs-info">
		<div class="title">关联指标</div>
		<div class="indexs-content" v-if="indexs">
			<div
				class="indexs-item"
				v-for="(item, index) in indexs"
				:key="index"
			>
				{{ item }}
			</div>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		indexs: [Array, Object],
	},
}
</script>
<style lang="scss">
.indexs-info {
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
	.indexs-content {
		display: flex;
		flex-wrap: wrap;
		padding: 0px 44px;
		.indexs-item {
			width: 32.3%;
			overflow: hidden;
			color: #fff;
			margin-bottom: 20px;
			margin-right: 1%;
		}
	}
}
</style>
