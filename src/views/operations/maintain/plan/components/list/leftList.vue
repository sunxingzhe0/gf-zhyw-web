<template>
	<div class="left-list-tree" v-loading="loading">
		<el-tree
			:props="props"
			:load="loadNode"
			lazy
			show-checkbox
			icon-class="el-icon-arrow-right"
			ref="equipments"
			node-key="id"
		>
		</el-tree>
	</div>
</template>
<script>
import maintain from "@/api/operations/maintain"
export default {
	props: {
		query: Object,
	},
	data() {
		return {
			props: {
				label: "name",
				children: "children",
				isLeaf: "leaf",
			},
			node_had: undefined,
			resolve_had: undefined,
			loading: false,
		}
	},
	methods: {
		async loadNode(node, resolve) {
			this.loading = true
			if (node.level === 0) {
				this.node_had = node // 保存一下根节点
				this.resolve_had = resolve // 保存一下根节点
				let data = await maintain.plan.getUnboundequipments(this.query)
				data = data.filter((item) => {
					item.disabled = true
					return item
				})
				this.loading = false
				return resolve(data)
			} else if (node.level === 1) {
				let data = await maintain.plan.getUnboundequipments({
					type: node.id,
					searchType: this.query.searchType,
					keyword: this.query.keyword,
					pageSize: this.query.pageSize,
					pageNum: this.pageNum,
				})
				this.loading = false
				return resolve(data)
			} else if (node.level > 1) this.loading = false
			return resolve([])
		},
	},
}
</script>
<style lang="scss">
.left-list-tree {
	height: 100%;
	overflow-y: auto;
	.el-tree-node__expand-icon {
		color: #0071e3;
		font-size: 14px;
		font-weight: bold;
	}
	.is-disabled {
		display: none;
	}
}
.left-list-tree::-webkit-scrollbar {
	/*滚动条整体样式*/
	width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
	height: 1px;
}
.left-list-tree::-webkit-scrollbar-thumb {
	/*滚动条里面小方块*/
	border-radius: 10px;
	box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
	background: #535353;
}
.left-list-tree::-webkit-scrollbar-track {
	/*滚动条里面轨道*/
	box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
	border-radius: 10px;
	background: transparent;
}
</style>
