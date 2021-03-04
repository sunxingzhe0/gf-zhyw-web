<template>
	<div class="picture-form">
		<div class="title">被服图片</div>
		<div class="picture-form-item">
			<div class="btns">
				<el-upload
					class="upload-demo"
					action=""
					:on-change="changeFile"
					:file-list="archives"
					:show-file-list="false"
					:auto-upload="false"
					accept=".jpg,.png,.jpeg,JPG,JPEG,PDF,pdf"
				>
					<el-button
						:class="isDown ? 'btn downbtn isDown' : 'btn downbtn'"
						size="small"
						plain
						slot="tip"
						:disabled="isDown"
						>下载</el-button
					>
					<el-button class="btn" size="small" plain>上传</el-button>
				</el-upload>
			</div>
			<div class="archives">
				<div
					v-for="(file, index) in archives"
					:key="index"
					class="img-item"
				>
					<img
						class="el-upload-list__item-thumbnail"
						:src="file.url"
						alt=""
					/>
					<span class="el-upload-list__item-actions">
						<i class="el-icon-delete" @click="del(index)"></i>
					</span>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		id: {
			type: String,
		},
	},
	watch: {
		id(val) {
			if (val) {
				this.getDatas()
				this.isDown = false
			} else {
				this.archives = []
				this.isDown = true
			}
		},
	},
	data() {
		return {
			archives: [],
			isDown: true,
		}
	},
	methods: {
		getDatas() {},
		remove(id) {
			this.$confirm("确定要删除该图片吗？", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			}).then(async () => {
				console.log(id)
				// await asset.type.removeType({
				// 	id: data.id,
				// })
				// 重新拉取数据
				this.getDatas()
				this.$message.success("删除成功!")
			})
		},
		changeFile(file, fileList) {
			console.log(file)
			this.archives = fileList.filter((item) => {
				item.url = window.URL.createObjectURL(item.raw)
				return item
			})
		},
		down() {
			this.$confirm("确定要下载吗？", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			}).then(async () => {
				// await asset.type.removeType({
				// 	id: data.id,
				// })
				this.$message.success("操作成功!")
			})
		},
		del(index) {
			this.archives = this.archives.filter((item, i) => {
				if (index != i) {
					return item
				}
			})
		},
	},
}
</script>
<style lang="scss">
.picture-form {
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
	.picture-form-item {
		padding: 0px 20px;
	}
	.btn {
		border: 1px solid #0071e3;
		color: #0071e3;
		background: transparent;
		&:hover {
			background: transparent;
		}
		&:focus {
			background: transparent;
		}
	}
	.downbtn {
		margin-left: 20px;
	}
	.isDown {
		color: #646464 !important;
		border: 1px solid #646464 !important;
		background: transparent !important;
		&:hover {
			background: transparent;
		}
		&:focus {
			background: transparent;
		}
	}
	.archives {
		display: flex;
		flex-wrap: wrap;
		margin-top: 20px;
		.img-item {
			width: 100px;
			height: 74px;
			background: #ffffff;
			border: 1px solid #0071e3;
			margin-right: 20px;
			position: relative;
			img {
				width: 100%;
				height: 100%;
			}
			.el-upload-list__item-actions {
				position: absolute;
				width: 100%;
				height: 100%;
				left: 0;
				top: 0;
				text-align: center;
				color: #fff;
				opacity: 0;
				font-size: 20px;
				background-color: rgba(0, 0, 0, 0.5);
				// transition: opacity 0.3s;
				display: flex;
				align-items: center;
				justify-content: center;
			}
			&:hover {
				.el-upload-list__item-actions {
					opacity: 1;
					i {
						font-size: 20px;
						color: red;
						cursor: pointer;
					}
				}
			}
		}
	}
}
</style>
