<template>
	<div class="tree-main">
		<el-tree
			:data="equipments"
			:highlight-current="false"
			icon-class="el-icon-arrow-right"
			:expand-on-click-node="false"
			:props="props"
		>
			<div class="equipment-tree-node" slot-scope="{ node, data }">
				<div v-if="node.level == 3" class="info">
					<span style="width:12px"></span>
					<div class="name">
						{{
							node.parent.data.children.findIndex(
								(d) => d.id === data.id
							) +
								1 +
								"."
						}}
						{{ data.name }}
					</div>
				</div>
				<div class="info" v-else>
					<div class="name">
						{{ data.name }}
					</div>
					<div class="no" v-if="node.level == 1">
						({{ data.children ? data.children.length : "" }})
					</div>
				</div>
			</div>
		</el-tree>
	</div>
</template>
<script>
export default {
	props: {
		equipments: Array,
	},
	data() {
		return {
			props: {
				children: "children",
				label: "label", //  类型可以为boolean/function(data,node)
				isLeaf: (data, node) => {
					if (node.level === 3) {
						// 根据需要进行条件判断添加is-leaf类名
						return true
					}
				},
			},
		}
	},
}
</script>
<style lang="scss">
.tree-main {
	width: 100%;
	.el-tree {
		background: transparent;
		.el-tree-node:focus > .el-tree-node__content {
			background-color: transparent;
		}
		.el-tree-node__content {
			&:hover {
				background-color: transparent;
			}
		}
		.el-tree-node__expand-icon {
			color: #0071e3;
			font-size: 14px;
			font-weight: bold;
		}
		.equipment-tree-node {
			width: 100%;
			display: flex;
			justify-content: space-between;
			.info {
				width: 100%;
				font-size: 14px;
				line-height: 25px;
				color: #e6e6e6;
				display: flex;
				.name {
					margin-right: 10px;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
			}
		}
	}
	.is-leaf,
	.el-tree-node_expand-icon {
		display: none !important;
	}
}
</style>
