<template>
	<div class="word">
		<wordTitle
			:title="$route.meta.title"
			style="background: #000000;"
			class="filter"
		>
			<!-- <template v-for="(item, index) in bnts">
				<el-button
					size="mini"
					type="primary"
					v-if="index == i"
					plain
					:key="index"
					@click="setTime(index)"
					class="btn-active btn"
					>{{ item }}</el-button
				>
				<el-button
					size="mini"
					plain
					v-else
					:key="index"
					class="btn"
					@click="setTime(index)"
					>{{ item }}</el-button
				>
			</template> -->
			<!-- <el-input
				placeholder="按照日期筛选"
				size="mini"
				v-model="search"
				class="input-with-select"
			>
				<el-button
					slot="append"
					icon="el-icon-search"
					type="primary"
					class="searchbtn"
				></el-button>
			</el-input> -->
			<el-date-picker
				class="input-with-select"
				v-model="search"
				size="mini"
				type="datetimerange"
				range-separator="至"
				start-placeholder="开始时间"
				end-placeholder="结束时间"
				@change="getData"
			>
			</el-date-picker>
		</wordTitle>
		<div v-loading="loading">
			<numChart :data="data1"></numChart>
			<pieChart :data="data2"></pieChart>
			<proportionChart :data="data3"></proportionChart>
		</div>
	</div>
</template>
<script>
import wordTitle from "../components/wordTitle"
import numChart from "./compontents/numChart"
import pieChart from "./compontents/pieChart"
import proportionChart from "./compontents/proportionChart"
import maintain from "@/api/operations/maintain"
export default {
	name: "OperationsMaintainSurvey",
	meta: {
		sort: 0,
		title: "保养概况",
		hideMenu: true,
	},
	components: {
		wordTitle,
		numChart,
		pieChart,
		proportionChart,
	},
	data() {
		return {
			loading: true,
			search: [],
			i: 0,
			bnts: ["今日", "本周", "本月", "本年"],
			data1: [],
			data2: [],
			data3: [],
		}
	},
	async created() {
		await this.getData()
	},
	methods: {
		setTime(index) {
			this.i = index
			if (this.i == 0) {
				this.getToday()
			} else if (this.i == 1) {
				this.getWeek()
			} else if (this.i == 2) {
				this.getMonth()
			} else if (this.i == 3) {
				this.getYear()
			}
			this.getData()
		},
		async getData() {
			this.loading = true
			let res = await maintain.survey.getData({ time: this.search })
			this.data1 = res.nums
			this.data2 = res.examines
			this.data3 = res.repairs
			this.loading = false
		},
		//今日
		getToday() {
			const end = new Date()
			const start = new Date()
			start.setTime(start.getTime() - 3600 * 1000 * 24)
			this.search = [start, end]
		},
		//本周
		getWeek() {
			const end = new Date()
			const start = new Date()
			start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
			this.search = [start, end]
		},
		//本月
		getMonth() {
			const end = new Date()
			const start = new Date()
			start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
			this.search = [start, end]
		},
		//本年
		getYear() {
			let now = new Date()
			var year = now.getFullYear()
			let end = year + "-01-01"
			let start = year + "-12-31"
			this.search = [start, end]
		},
	},
}
</script>
<style lang="scss">
.word {
	.filter {
		.input-with-select {
			width: 330px;
			// margin-left: 10px;
			.el-input-group__append {
				width: 26px !important;
				color: #0071e3;
				background: transparent;
				border-color: #4d4d4d;
				padding: 0px;
			}
		}
		.searchbtn {
			border: none;
			width: 26px !important;
			margin: 0px;
			padding: 0px;
		}
		.btn {
			background: transparent;
			color: #fff;
		}
		.btn {
			padding: 7px;
			border-color: #4d4d4d;
			&:focus,
			&:hover {
				background: transparent;
				color: #0071e3;
			}
		}
		.btn-active {
			border: 1px solid #0071e3;
			color: #0071e3;
		}
	}
}
</style>
