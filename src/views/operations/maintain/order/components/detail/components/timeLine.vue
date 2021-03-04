<template>
	<div class="line-main">
		<div class="title">
			<span>执行内容</span>
		</div>
		<div class="contents">
			<div
				class="content-item"
				v-for="(item, index) in content.contents"
				:key="index"
			>
				<span>{{ index + 1 }}.保养内容</span>
				<el-button
					type="text"
					size="small"
					v-if="item.executionTime == ''"
					>执行</el-button
				>
				<span v-else>执行时间: {{ item.executionTime }}</span>
			</div>
		</div>
		<el-button
			class="addbtn"
			type="text"
			@click="pushContent"
			icon="el-icon-plus"
			:disabled="content.status == '7'"
			>添加</el-button
		>
		<el-steps
			direction="vertical"
			:active="1"
			class="step"
			v-loading="loading"
		>
			<el-step v-for="(item, index) in datas" :key="index">
				<div
					slot="title"
					class="line-content line-content-info"
					v-if="item.isedit == true || item.id == ''"
				>
					<div
						class="date"
						style="display: flex;justify-content: flex-end;"
					>
						<div class="zsk-content">
							<div class="zsk-list" v-if="zsk">
								<div
									x-arrow=""
									class="popper__arrow"
									style="left: 99px;"
								></div>
								<div class="list-content">知识库</div>
							</div>
							<el-button size="mini" class="zsk" @click="show"
								>知识库</el-button
							>
						</div>
					</div>
					<el-input
						type="textarea"
						v-model="item.content"
						placeholder="请输入执行内容"
						:rows="3"
						class="input-content"
					></el-input>
					<div class="up-footer-btns">
						<el-button
							class="canel"
							@click="canel(index)"
							size="small"
							>取消</el-button
						>
						<el-button
							type="primary"
							size="small"
							@click="saveContent(index)"
							>{{ item.isedit ? "保存" : "提交" }}</el-button
						>
					</div>
				</div>
				<div
					slot="title"
					class="line-content-info"
					v-else-if="item.isedit == false"
				>
					<div class="date">
						<div class="add-name">{{ item.cretatTime }}</div>
						<div class="add-name">添加人姓名</div>
					</div>
					<div class="info-content">{{ item.content }}</div>
					<div class="action-btns">
						<el-button
							type="primary"
							icon="el-icon-edit"
							@click="edit(index)"
							size="mini"
							:disabled="content.status == '7'"
						></el-button>
						<el-button
							type="danger"
							icon="el-icon-delete"
							size="mini"
							:disabled="content.status == '7'"
							@click="removeContent(index)"
						></el-button>
					</div>
				</div>
			</el-step>
		</el-steps>
	</div>
</template>
<script>
import maintain from "@/api/operations/maintain"
export default {
	name: "timeLine",
	data() {
		return {
			datas: [
				{
					content: "",
					cretatTime: "",
					id: "",
					isedit: false,
				},
			],
			loading: false,
			content: [],
			zsk: false,
		}
	},
	async created() {
		this.loading = true
		let res = await maintain.order.getMaintenance()
		this.content = await maintain.order.getMaintainContents()
		res.map((item) => {
			item.isedit = false
			this.datas.push(item)
		})
		this.loading = false
	},
	methods: {
		edit(index) {
			this.datas[index].isedit = true
		},
		saveContent(index) {
			if (this.datas[index].content == "") {
				this.$message.error("请填写完整信息")
			} else {
				if (this.datas[index].isedit == false) {
					let now = new Date()
					this.datas[index].id = index + 1 + ""
					this.datas[index].cretatTime =
						now.getFullYear() +
						"-" +
						(now.getMonth() + 1) +
						"-" +
						now.getDate() +
						" " +
						now.getHours() +
						":" +
						now.getMinutes() +
						":" +
						now.getSeconds()
					this.$message.success("保存成功")
				} else {
					this.datas[index].isedit = false
					this.$message.success("编辑成功")
				}
			}
		},
		pushContent() {
			this.datas.unshift({
				content: "",
				filelist: [],
				cretatTime: "",
				id: "",
			})
		},
		removeContent(index) {
			this.datas.splice(index, 1)
			this.$message.success("删除成功")
		},
		canel(index) {
			this.datas[index].content = ""
			this.datas[index].filelist = []
		},
		show() {
			this.zsk = !this.zsk
		},
	},
}
</script>
<style lang="scss">
.line-main {
	.el-step__icon,
	.is-text {
		width: 16px;
		height: 16px;
		font-size: 0px;
		border: 4px solid;
		position: absolute;
		.el-step__icon-inner {
			width: 10px;
			height: 10px;
			color: transparent;
		}
	}
	.el-step__line {
		background: #333;
	}
	.el-step.is-vertical,
	.el-step__line {
		left: 7px !important;
	}
	.is-process,
	.is-wait {
		.el-step__icon,
		.is-text {
			border-color: #999999;
			color: #999999;
			border: 8px solid;
			.el-step__icon-inner {
				width: 0px;
				height: 0px;
				color: transparent;
			}
		}
	}
	.step {
		margin-left: 264px;
	}
	.el-step:last-of-type .el-step__line {
		display: block !important;
	}
	.add-name {
		text-align: right;
	}
	.line-content,
	.line-content-info {
		color: #fff;
		background: rgba(26, 26, 26, 0.8);
		margin-bottom: 20px;
		padding: 20px;
		position: relative;
		width: 600px;
		.date {
			position: absolute;
			left: -190px;
			top: -2px;
			width: 146px;
			height: 12px;
			font-size: 14px;
			color: #ffffff;
		}
	}
	.line-content-info {
		.action-btns {
			position: absolute;
			right: -36px;
			top: 0px;
			.el-button {
				display: block;
				border: none;
				margin: 0;
				border-radius: 0px;
			}
			.el-button + .el-button {
				margin-top: 2px;
			}
		}
		.info-content {
			color: #b3b3b3;
			line-height: 24px;
			font-size: 14px;
		}
	}
	.input-content {
		margin-bottom: 10px;
	}
	.title {
		font-size: 16px;
		font-weight: 500;
		color: #fff;
		position: relative;
		padding-left: 10px;
		line-height: 16px;
		margin-bottom: 20px;
		height: 16px;
		&::before {
			content: "";
			position: absolute;
			left: 0;
			top: 0px;
			width: 2px;
			height: 16px;
			background: #0071e3;
		}
		span {
			float: left;
		}
		.el-button {
			border: none;
			padding: 0;
			line-height: 16px;
			margin-left: 16px;
		}
	}
	.up-footer-btns {
		text-align: center;
	}
	.contents {
		width: 800px;
		background: rgba(255, 255, 255, 0.1);
		border-radius: 0px 6px 6px 6px;
		margin: 0 auto;
		.content-item {
			border-bottom: 0.5px solid rgba(255, 255, 255, 0.5);
			padding: 10px;
			color: #fff;
			display: flex;
			justify-content: space-between;
			span {
				font-size: 12px;
				line-height: 12px;
			}
			.el-button {
				padding: 0px;
			}
		}
		.content-item:last-child {
			border-bottom: none;
		}
	}
	.addbtn {
		margin-left: 175px;
	}
	.zsk {
		border: 1px solid #0071e3;
		border-radius: 2px;
		background: transparent;
		color: #0071e3;
		&:hover,
		&:focus {
			background: transparent;
			color: #0071e3;
		}
	}
	.zsk-content {
		position: relative;
		width: 68px;
		.zsk-list {
			width: 300px;
			min-height: 300px;
			position: absolute;
			top: 36px;
			left: -110px;
			background: #000;
			min-width: 150px;
			border-radius: 4px;
			border: 1px solid #ebeef5;
			padding: 12px;
			z-index: 40000;
			color: #606266;
			line-height: 1.4;
			text-align: justify;
			font-size: 14px;
			box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
			word-break: break-all;
			.popper__arrow {
				top: -13px;
				left: 45% !important;
				margin-right: 3px;
				border-top-width: 0;
				border-bottom-color: #ebeef5 !important;
			}
			.popper__arrow {
				border-width: 6px;
				filter: drop-shadow(0 2px 12px rgba(0, 0, 0, 0.03));
			}
			.popper__arrow,
			.popper__arrow:after {
				position: absolute;
				display: block;
				width: 0;
				height: 0;
				border-color: transparent;
				border-style: solid;
			}
		}
	}
}
</style>
