<template>
	<div>
		<div class="item" v-for="(item, index) in datas" :key="index">
			<div class="item-content">
				<div class="head">
					<div class="status bg">
						<svg class="iconfont" aria-hidden="true">
							<use xlink:href="#iconshebeiguanli"></use>
						</svg>
					</div>
					<div class="info">
						<div class="name">
							{{ item.name }}
						</div>
						<div class="date">
							{{ item.status == "Using" ? "在用" : "空闲" }}
						</div>
						<div class="cycle">设备类型:{{ item.typeName }}</div>
						<div class="cycle">
							生产厂家:{{ item.manufactorName }}
						</div>
						<div class="cycle">使用部门:{{ item.deptName }}</div>
					</div>
				</div>
				<div class="footer">
					<div>
						<el-button type="text" @click="show(item)"
							>详情</el-button
						>
					</div>
					<div>
						<el-button type="text" @click="edit(item)"
							>编辑</el-button
						>
					</div>
					<div>
						<el-button
							type="text"
							@click="scrap(item)"
							class="delbtn"
							>报废</el-button
						>
					</div>
					<div>
						<el-button class="delbtn" type="text" @click="del(item)"
							>删除</el-button
						>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
/*
@author        cui
@name          card
@desc          设备列表卡片
@query         
@props         datas       array                                    设备列表数据 
@emit          edit        function(params item //单条数据)          点击编辑按钮
@emit          del         function(params item //单条数据)          点击删除按钮
@emit          show        function(params item //单条数据)          点击详情按钮
@emit          scrap       function(params item //单条数据)          点击报废按钮
*/
export default {
	name: "card",
	props: {
		datas: {
			type: Array,
		},
	},
	methods: {
		edit(item) {
			this.$emit("edit", item)
		},
		del(item) {
			this.$emit("del", item)
		},
		scrap(item) {
			this.$emit("scrap", item)
		},
		show(item) {
			this.$emit("show", item)
		},
	},
}
</script>

<style lang="scss" scoped>
.item {
	background: rgba(51, 51, 51, 0.6);
	box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
	margin: 10px 20px;
	.item-content {
		padding: 10px;
		box-sizing: border-box;
	}
	.head {
		display: flex;
		padding-bottom: 10px;
		border-bottom: 1px solid rgba(255, 255, 255, 0.2);
		.info {
			flex: 1;
			margin-left: 10px;
			overflow: hidden;
			display: flex;
			flex-wrap: wrap;
			.cycle {
				width: 48%;
				font-size: 12px;
				color: #b3b3b3;
				margin-top: 10px;
				line-height: 20px;
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
			}
			.cycle:nth-of-type(even) {
				margin-left: 10px;
			}
			.name {
				font-size: 14px;
				line-height: 20px;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				margin-top: 0px;
				width: calc(100% - 28px);
			}
		}
		.date {
			font-size: 14px;
			color: #fff;
			line-height: 14px;
			text-align: right;
			width: 28px;
			white-space: nowrap;
			overflow: hidden;
		}
		.status {
			width: 36px;
			height: 36px;

			border-radius: 50%;
			font-size: 18px;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.nobg {
			background: #666666;
		}
		.bg {
			background: #0071e3;
		}
	}
	.footer {
		text-align: center;
		display: flex;
		padding-top: 11px;
		div {
			flex: 1;
			border-right: 1px solid rgba(255, 255, 255, 0.2);
		}
		div:last-child {
			border: none;
		}
		.el-button {
			border: none;
			padding: 0px;
		}
		.delbtn {
			color: #f74a4a;
		}
	}
}
</style>
