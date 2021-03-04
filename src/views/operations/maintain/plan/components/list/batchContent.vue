<template>
	<div class="add-main">
		<div class="add-filter">
			<el-select
				v-model="type"
				placeholder="设备类型"
				@change="getContens"
				size="mini"
				class="type"
			>
				<el-option
					v-for="(item, index) in types"
					:label="item.name"
					:value="item.id"
					:key="index"
				></el-option>
			</el-select>
			<el-select
				v-model="contentids"
				placeholder="请选择"
				size="mini"
				multiple
				collapse-tags
				class="content"
			>
				<el-option
					v-for="(item, index) in contents"
					:label="item.name"
					:value="item.id"
					:key="index"
				></el-option>
			</el-select>
			<el-button type="primary" size="mini" @click="add">添加</el-button>
		</div>
		<div class="add-list" v-loading="loading">
			<div class="list-item" v-for="(item, index) in lists" :key="index">
				<div class="item-left">
					<div class="type">{{ item.typeName }}</div>
					<div class="name">{{ item.name }}</div>
				</div>
				<div class="item-right">
					<el-button type="text" @click="remove(item.id)"
						>删除</el-button
					>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import maintain from "@/api/operations/maintain"
export default {
	props: {
		types: Array,
		planId: String,
	},
	data() {
		return {
			type: "",
			lists: [],
			contentids: [],
			contents: [],
			loading: false,
		}
	},
	created() {
		this.getList()
	},
	methods: {
		async remove(id) {
			// this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
			// 	confirmButtonText: "确定",
			// 	cancelButtonText: "取消",
			// 	type: "warning",
			// })
			// 	.then(() => {
			// 		this.$message({
			// 			type: "success",
			// 			message: "删除成功!",
			// 		})
			// 	})
			// 	.catch(() => {
			// 		this.$message({
			// 			type: "info",
			// 			message: "已取消删除",
			// 		})
			// 	})
			let res = await maintain.plan.delPlanContent({
				contentid: id,
				planId: this.planId,
			})
			this.$message.success(res.message)
			this.getList()
		},
		async add() {
			let res = await maintain.plan.savePlanContent({
				contentIds: this.contentids,
				planId: this.planId,
			})
			this.$message.success(res.message)
			this.contents = this.contents.filter((item) => {
				if (!this.contentids.includes(item.id)) {
					return item
				}
			})
			this.contentids = []
			this.getList()
		},
		async getContens(val) {
			this.contents = await maintain.plan.getContentList({ typeid: val })
		},
		async getList() {
			this.loading = true
			this.lists = await maintain.plan.getContents({
				planId: this.planId,
			})
			this.loading = false
		},
	},
}
</script>
<style lang="scss">
.add-main {
	height: 100%;
	.add-filter {
		display: flex;
		.el-button {
			margin-left: 10px;
		}
		.type {
			width: 100px;
		}
		.content {
			flex: 1;
		}
	}
	.add-list {
		height: calc(100% - 40px);
		overflow-y: auto;
		.list-item {
			padding: 10px 0px;
			display: flex;
			justify-content: space-between;
			border-bottom: 1px solid #232121;
			.item-left {
				div {
					display: inline-block;
					font-size: 14px;
					color: #fff;
					height: 14px;
					line-height: 14px;
					padding: 0px 10px;
					border-right: 2px solid #fff;
					width: 50%;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
				div:last-child {
					border-right: none;
				}
			}
			.item-right {
				padding-left: 10px;
				.el-button {
					padding: 0px;
					color: red;
				}
			}
		}
		.list-item:last-child {
			border-bottom: none;
		}
	}
	.add-list::-webkit-scrollbar {
		display: none;
	}
}
//选择框多选样式
.el-select-dropdown.is-multiple .el-select-dropdown__item.selected {
	background-color: transparent !important;
}
.content {
	overflow: hidden;
	.el-select__tags {
		& > span {
			display: flex !important;
		}
	}
}
</style>
