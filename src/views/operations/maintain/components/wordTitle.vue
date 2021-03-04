<template>
	<div class="header">
		<div class="title">{{ title }}</div>
		<div class="right">
			<slot></slot>
		</div>
	</div>
</template>
<script>
export default {
	name: "wordTitle",
	props: {
		title: {
			type: String,
			default: "",
		},
	},
}
</script>
<style lang="scss" scoped>
.header {
	display: flex;
	justify-content: space-between;
	padding: 10px;
	border-top: 1px solid rgba(255, 255, 255, 0.3);
	.title {
		font-size: 16px;
		line-height: 28px;
	}
}
</style>
