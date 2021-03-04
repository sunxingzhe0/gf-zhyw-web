<template>
	<div>
		<div class="item" v-for="(item, index) in datas" :key="index">
			<div class="item-content">
				<div class="head">
					<div class="status bg">
						<svg class="iconfont" aria-hidden="true">
							<use xlink:href="#iconneirong"></use>
						</svg>
					</div>
					<div class="info">
						<div class="name">{{ item.name }}</div>
						<div class="date">{{ item.typename }}</div>
						<div class="cycle">{{ item.content }}</div>
					</div>
				</div>
				<div class="footer">
					<div>
						<el-button type="text" @click="edit(item)"
							>编辑</el-button
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
				font-size: 12px;
				color: #b3b3b3;
				margin-top: 10px;
				line-height: 20px;
				text-overflow: -o-ellipsis-lastline;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				line-clamp: 2;
				-webkit-box-orient: vertical;
			}
			.name {
				font-size: 14px;
				line-height: 20px;
				// overflow: hidden;
				// text-overflow: ellipsis;
				// white-space: nowrap;
				margin-top: 0px;
				flex: 1;
			}
		}
		.date {
			font-size: 12px;
			color: #b3b3b3;
			line-height: 12px;
			text-align: right;
			width: 130px;
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
		}
		div:nth-of-type(odd) {
			border-right: 1px solid rgba(255, 255, 255, 0.2);
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
