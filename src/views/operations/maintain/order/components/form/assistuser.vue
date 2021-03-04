<template>
	<div>
		<el-input
			size="small"
			placeholder="关键字"
			v-model="search"
			@input="getusers"
			class="searchkey"
			prefix-icon="el-icon-search"
		></el-input>
		<el-checkbox-group
			v-model="checkuser"
			class="asistg"
			@change="setusers"
		>
			<el-checkbox
				v-for="(item, index) in getusers()"
				:key="index"
				:label="item.id"
				border
			>
				<div>{{ item.name }}</div>
				<div>{{ item.no }}</div>
				<div>{{ item.phone }}</div>
			</el-checkbox>
		</el-checkbox-group>
	</div>
</template>
<script>
export default {
	name: "assistuser",
	props: {
		users: {
			type: Array,
		},
		assistusers: {
			type: Array,
		},
	},
	watch: {
		assistusers(val) {
			let arrr = []
			val.map((item) => {
				arrr.push(item.id)
			})
			this.checkuser = arrr
		},
	},
	data() {
		return {
			checkuser: [],
			search: "",
		}
	},
	methods: {
		getusers() {
			return this.users.filter((item) => {
				if (item.name.includes(this.search)) {
					// 返回item
					return item
				}
			})
		},
		setusers() {
			this.$emit("setusers", this.checkuser)
		},
	},
}
</script>
<style lang="scss">
.searchkey {
	margin-bottom: 10px;
}
.asistg {
	max-height: 300px;
	overflow-y: auto;
	.el-checkbox {
		width: 100%;
		margin-right: 0px;
		display: flex;
		margin-bottom: 10px;
		.el-checkbox__label {
			display: flex;
			width: 100%;
			div {
				flex: 1;
				color: #fff;
				line-height: 14px;
			}
		}
	}
	.el-checkbox.is-bordered + .el-checkbox.is-bordered {
		margin-left: 0px;
	}
}
.asistg::-webkit-scrollbar {
	width: 0;
}
</style>
