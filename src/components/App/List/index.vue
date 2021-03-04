<template>
	<div class="list-content">
		<div class="data-table">
			<div class="view-scroll-y" ref="scrollBox">
				<slot></slot>
			</div>
		</div>
		<div class="table-page">
			<div class="total-page">共{{ total }}条，每页{{ pageSize }}条</div>
			<el-pagination
				small
				background
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="pageNum"
				:page-size="pageSize"
				layout="prev, pager, next"
				:total="total"
				:pager-count="5"
			>
			</el-pagination>
		</div>
	</div>
</template>
<script>
export default {
	name: "List",
	props: {
		pageNum: {
			type: Number,
			default: 1,
		},
		pageSize: {
			type: Number,
			default: 10,
		},
		total: {
			type: Number,
			default: 0,
		},
	},
	methods: {
		handleSizeChange(pageSize) {
			this.$emit("handleSizeChange", pageSize)
		},
		handleCurrentChange(pageNum) {
			this.$emit("handleCurrentChange", pageNum)
		},
	},
}
</script>
<style lang="scss" scoped>
@import "@/assets/css/variables.scss";
.list-content {
	height: calc(100% - 48px);
	position: relative;
	.data-table {
		height: calc(100% - 46px);
	}
	.view-scroll-y {
		height: 100%;
		overflow-y: auto;
	}
	.view-scroll-y::-webkit-scrollbar {
		/*滚动条整体样式*/
		width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
		height: 1px;
	}
	.view-scroll-y::-webkit-scrollbar-thumb {
		/*滚动条里面小方块*/
		border-radius: 10px;
		box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
		background: #535353;
	}
	.view-scroll-y::-webkit-scrollbar-track {
		/*滚动条里面轨道*/
		box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
		border-radius: 10px;
		background: transparent;
	}
	.table-page {
		width: 100%;
		position: absolute;
		bottom: 0px;
		padding: 10px;
		box-sizing: border-box;
		display: flex;
		justify-content: flex-end;
		background: #000000;
		border-top: 1px solid rgba(255, 255, 255, 0.3);
	}
	.total-page {
		font-size: 14px;
		font-family: PingFang-SC-Medium;
		font-weight: 500;
		color: #e6e6e6;
		line-height: 25px;
	}
}
</style>
