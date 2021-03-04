<template>
	<div class="paln-maintain-info">
		<el-form :model="forminfo" ref="planMaintainInfo" :rules="formRules">
			<el-checkbox-group
				v-model="rules"
				class="maintain-group"
				@change="getRules"
			>
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
						<el-select
							placeholder="保养等级"
							size="small"
							v-model="forminfo.a.level"
						>
							<el-option
								v-for="(item, index) in levels"
								:key="index"
								:label="item.name"
								:value="item.id"
							></el-option>
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
						<el-select
							placeholder="保养等级"
							size="small"
							v-model="forminfo.b.level"
						>
							<el-option
								v-for="(item, index) in levels"
								:key="index"
								:label="item.name"
								:value="item.id"
							></el-option>
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
						<el-select
							placeholder="保养等级"
							size="small"
							v-model="forminfo.c.level"
						>
							<el-option
								v-for="(item, index) in levels"
								:key="index"
								:label="item.name"
								:value="item.id"
							></el-option>
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
				} else if (value) {
					let reg = /^\+?[1-9]\d*$/
					if (!reg.test(value)) {
						return callback(new Error("请输入整数"))
					} else {
						return callback()
					}
				} else {
					return callback()
				}
			} else {
				return callback()
			}
		}
		var setHour = (rule, value, callback) => {
			if (this.rules.includes(this.forminfo.b.id)) {
				if (!value) {
					return callback(new Error("请输入"))
				} else if (value) {
					let reg = /^\+?[1-9]\d*$/
					if (!reg.test(value)) {
						return callback(new Error("请输入整数"))
					} else {
						return callback()
					}
				} else {
					return callback()
				}
			} else {
				return callback()
			}
		}
		var setInitialization = (rule, value, callback) => {
			if (this.rules.includes(this.forminfo.b.id)) {
				if (!value) {
					return callback(new Error("请选择"))
				} else {
					return callback()
				}
			} else {
				return callback()
			}
		}
		var setAccumulate = (rule, value, callback) => {
			if (this.rules.includes(this.forminfo.c.id)) {
				if (!value) {
					return callback(new Error("请输入"))
				} else if (value) {
					let reg = /^\+?[1-9]\d*$/
					if (!reg.test(value)) {
						return callback(new Error("请输入整数"))
					} else {
						return callback()
					}
				} else {
					return callback()
				}
			} else {
				return callback()
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
			levels: [
				{ name: "日常保养", id: "1" },
				{ name: "一级保养", id: "2" },
				{ name: "二级保养", id: "3" },
				{ name: "三级保养", id: "4" },
				{ name: "定期检修", id: "5" },
			],
		}
	},
	methods: {
		getRules(val) {
			let rules = val.filter((item) => {
				return this.forminfo[item]
			})
			this.$emit("getRules", rules)
		},
	},
}
</script>
<style lang="scss">
.paln-maintain-info {
	.maintain-group {
		.el-checkbox {
			display: block;
			margin-bottom: 15px;
			.el-form-item {
				display: inline-block;
			}
			.label {
				width: 100px;
				display: inline-block;
				color: #fff;
			}
			.level {
				margin: 0px 20px;
				width: 65px;
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
