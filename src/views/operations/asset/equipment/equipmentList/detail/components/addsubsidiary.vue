<template>
	<div class="add-main">
		<div class="add-filter">
			<el-input
				placeholder="关键字搜索"
				v-model="query.keyword"
				class="input-with-select"
			>
				<el-select
					v-model="query.searchType"
					slot="prepend"
					placeholder="请选择"
				>
					<el-option label="设备编码" value="1"></el-option>
					<el-option label="设备名称" value="2"></el-option>
					<el-option label="设备类型" value="3"></el-option>
				</el-select>
				<el-button slot="append" icon="el-icon-search"></el-button>
			</el-input>
		</div>
		<div class="add-list" v-loading="loading">
			<div class="list-item" v-for="(item, index) in lists" :key="index">
				<div class="item-left">
					<div class="name">{{ item.name }}</div>
					<div class="no">{{ item.no }}</div>
					<div class="type">{{ item.typeName }}</div>
				</div>
				<div class="item-right">
					<el-button type="text" @click="add(item)">添加</el-button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import asset from "@/api/operations/asset"
export default {
	data() {
		return {
			query: {
				pageNum: 1,
				pageSize: 100,
				keyword: "",
				searchType: "1",
			},
			lists: [],
			loading: false,
		}
	},
	async mounted() {
		this.loading = true
		let res = await asset.equipment.getdailyEquipmentList(this.query)
		this.lists = res.list
		this.loading = false
	},
	methods: {
		add(id) {
			this.$emit("add", id)
		},
	},
}
</script>
<style lang="scss">
.add-main {
	height: 100%;
	.add-filter {
		.input-with-select {
			width: 100% !important;
			.el-input-group__append {
				width: 35px !important;
				color: #0071e3;
				background: transparent;
				border-color: #4d4d4d;
				padding: 0px;
				.el-button {
					margin: 0;
					width: 100%;
					height: 100%;
					padding: 0;
				}
			}
			.el-input-group__prepend {
				width: 110px !important;
				color: #0071e3;
				background: transparent;
				border-color: #4d4d4d;
			}
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
					width: 33.3%;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
				div:last-child {
					border-right: none;
				}
			}
			.item-right {
				padding-right: 10px;
				.el-button {
					padding: 0px;
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
</style>
