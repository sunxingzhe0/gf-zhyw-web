<template>
	<div class="maintain-info">
		<div class="title">保养信息</div>
		<el-form :model="forminfo" ref="maintainInfo" :rules="formRules">
			<el-checkbox-group v-model="rules" class="maintain-group">
				<el-checkbox :label="forminfo.a.id">
					<span class="label">保养周期: </span>
					<el-form-item prop="a.cycle">
						<el-input
							placeholder="请输入"
							v-model="forminfo.a.cycle"
							class="input-with-select"
							size="small"
						>
							<el-select
								v-model="forminfo.a.company"
								slot="append"
								placeholder="请选择"
							>
								<el-option label="天" value="天"></el-option>
								<el-option label="月" value="月"></el-option>
							</el-select>
						</el-input>
					</el-form-item>
					<span class="label level">保养等级: </span>
					<el-form-item>
						<el-select size="small" v-model="forminfo.a.level">
							<el-option label="日常保养" value="1"></el-option>
							<el-option label="一级保养" value="2"></el-option>
							<el-option label="二级保养" value="3"></el-option>
							<el-option label="三级保养" value="4"></el-option>
							<el-option label="定期检修" value="5"></el-option>
						</el-select>
					</el-form-item>
				</el-checkbox>
				<el-checkbox :label="forminfo.b.id">
					<span class="label">保养后运行：</span>
					<el-form-item prop="b.hour">
						<el-input
							size="small"
							placeholder="请输入"
							v-model="forminfo.b.hour"
							class="text-input"
						></el-input>
					</el-form-item>

					<span class="text">小时，初始化时间为</span>
					<el-form-item prop="b.initialization">
						<el-date-picker
							v-model="forminfo.b.initialization"
							type="date"
							size="small"
							placeholder="选择日期"
						>
						</el-date-picker>
					</el-form-item>
					<span class="label level">保养等级: </span>
					<el-form-item>
						<el-select size="small" v-model="forminfo.b.level">
							<el-option label="日常保养" value="1"></el-option>
							<el-option label="一级保养" value="2"></el-option>
							<el-option label="二级保养" value="3"></el-option>
							<el-option label="三级保养" value="4"></el-option>
							<el-option label="定期检修" value="5"></el-option>
						</el-select>
					</el-form-item>
				</el-checkbox>
				<el-checkbox :label="forminfo.c.id">
					<span class="label">累积运行：</span>
					<el-form-item prop="c.accumulate">
						<el-input
							size="small"
							placeholder="请输入"
							v-model="forminfo.c.accumulate"
							class="text-input"
						></el-input>
					</el-form-item>
					<span class="text">小时</span>
					<span class="label level">保养等级: </span>
					<el-form-item>
						<el-select size="small" v-model="forminfo.c.level">
							<el-option label="日常保养" value="1"></el-option>
							<el-option label="一级保养" value="2"></el-option>
							<el-option label="二级保养" value="3"></el-option>
							<el-option label="三级保养" value="4"></el-option>
							<el-option label="定期检修" value="5"></el-option>
						</el-select>
					</el-form-item>
				</el-checkbox>
			</el-checkbox-group>
		</el-form>
	</div>
</template>
<script>
export default {
	data() {
		var setCycle = (rule, value, callback) => {
			if (this.rules.includes(this.forminfo.a.id)) {
				if (!value) {
					return callback(new Error("请输入"))
				} else {
					callback()
				}
			} else {
				callback()
			}
		}
		var setHour = (rule, value, callback) => {
			if (this.rules.includes(this.forminfo.b.id)) {
				if (!value) {
					return callback(new Error("请输入"))
				} else {
					callback()
				}
			} else {
				callback()
			}
		}
		var setInitialization = (rule, value, callback) => {
			if (this.rules.includes(this.forminfo.b.id)) {
				if (!value) {
					return callback(new Error("请选择"))
				} else {
					callback()
				}
			} else {
				callback()
			}
		}
		var setAccumulate = (rule, value, callback) => {
			if (this.rules.includes(this.forminfo.c.id)) {
				if (!value) {
					return callback(new Error("请输入"))
				} else {
					callback()
				}
			} else {
				callback()
			}
		}
		return {
			rules: [],
			forminfo: {
				a: { id: "a", cycle: "", company: "天", level: "1" },
				b: { id: "b", hour: "", initialization: "", level: "1" },
				c: { id: "c", accumulate: "", level: "1" },
			},
			formRules: {
				"a.cycle": [
					{
						trigger: "blur",
						validator: setCycle,
					},
				],
				"b.hour": [
					{
						trigger: "blur",
						validator: setHour,
					},
				],
				"b.initialization": [
					{
						validator: setInitialization,
						trigger: "blur",
					},
				],
				"c.accumulate": [
					{
						validator: setAccumulate,
						trigger: "blur",
					},
				],
			},
		}
	},
}
</script>
<style lang="scss">
.maintain-info {
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
	.maintain-group {
		padding-right: 44px;
		padding-left: 44px;
		.el-checkbox {
			display: block;
			.el-form-item {
				display: inline-block;
			}
			.label {
				width: 100px;
				display: inline-block;
				color: #fff;
			}
			.level {
				margin-left: 25px;
			}
			.text {
				color: #fff;
				margin: 0px 20px;
			}
			.text-input {
				width: 200px;
			}
			.input-with-select {
				width: 260px;
				.el-input-group__append {
					width: 60px !important;
					color: #0071e3;
					background: transparent;
					border-color: #4d4d4d;
				}
			}
		}
	}
}
</style>
