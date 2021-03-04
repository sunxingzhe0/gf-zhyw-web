<template>
	<div class="contentInfo-sigle" v-loading="loading">
		<infoCard :data="data.basicinfo"></infoCard>
		<infoCard :data="data.implement"></infoCard>
		<infoCard :data="data.evaluate"></infoCard>
	</div>
</template>
<script>
import infoCard from "./infoCard"
import maintain from "@/api/operations/maintain"
export default {
	name: "contentInfo",
	components: {
		infoCard,
	},
	props: {
		id: {
			type: String,
		},
	},
	data() {
		return {
			data: {
				basicinfo: {
					title: "基本信息",
					data: [
						{
							label: "保养单主题",
							value: "",
							join: "1",
						},
						{
							label: "类型",
							value: "任务保养",
							field: "type",
						},
						{
							label: "级别",
							value: "1",
							field: "level",
							alternatives: [
								{ label: "低", value: "1" },
								{ label: "中", value: "2" },
								{ label: "高", value: "3" },
							],
						},
						{
							label: "发起人",
							value: "保养计划创建人姓名、科室",
							join: "2",
						},
						{
							label: "设备名称",
							value: "名称",
							field: "ename",
						},
						{
							label: "设备类型",
							value: "设备类型",
							field: "etype",
						},
						{
							label: "计划完成时间",
							value: "2020-11-29 12:20:14",
							field: "PlancompleteTime",
						},
						{
							label: "所属区域",
							value: "区域",
							field: "area",
						},
						{
							label: "保养单时长",
							value: "105",
							field: "duration",
							company: "分钟",
						},
						{
							label: "实际完成时间",
							value: "2020-11-29 12:20:14",
							field: "ActualcompleteTime",
						},
						{
							label: "创建时间",
							value: "2020-11-29 12:20:14",
							field: "createTime",
						},
						{
							label: "保养单内容",
							value:
								"保养单内容：保养时间-保养计划-保养路线-保养点-保养设备    保养计划描述保养计划描述保养计划描述保养计划描述保养计划描述保养计划描述保养计划描述保养计划描述保养计划描述保养计划描述保养计划描述保养计划描述",
							field: "content",
							join: "3",
							ishang: true,
						},
					],
				},
				implement: {
					title: "执行情况",
					data: [
						{
							label: "执行人",
							value: "保养人姓名",
							field: "implementName",
						},
						{
							label: "维护组",
							value: "保养计划设置的维护组",
							field: "implementDept",
						},
						{
							label: "执行时间",
							value: "2020-11-29 12:20:14",
							field: "implementTime",
						},
						{
							label: "备注",
							value: "",
							field: "implementRemark",
							ishang: true,
						},
						{
							label: "协助人",
							value: "协助入姓名",
							field: "assistName",
						},
						{
							label: "所属部门",
							value: "工程部一组",
							field: "assistDept",
						},
						{
							label: "协助时间",
							value: "2020-11-29 12:20:14",
							field: "assistTime",
						},
						{
							label: "备注",
							value: "",
							field: "assistRemark",
							ishang: true,
						},
					],
				},
				evaluate: {
					title: "服务评价",
					data: [
						{
							label: "评分人",
							value: "保养人姓名",
							field: "name",
						},
						{
							label: "所属部门",
							value: "工程部一组",
							field: "dept",
						},
						{
							label: "评价时间",
							value: "2020-11-29 12:20:14",
							field: "time",
						},
						{
							label: "评价内容",
							value: [
								{ field: "score", value: 1 },
								{
									field: "remark",
									value: "非常好，我非常满意 ",
								},
							],
							isscore: true,
						},
					],
				},
			},
			loading: false,
		}
	},
	async created() {
		await this.getinfo()
	},
	methods: {
		async getinfo() {
			this.loading = true
			let basicinfo = await maintain.order.getBasicinfo({ id: this.id })
			this.data.basicinfo.data = this.data.basicinfo.data.filter(
				(item) => {
					if (item.join == "2") {
						item.value =
							basicinfo.createuser + " , " + basicinfo.userDept
					} else if (item.join == "1") {
						item.value =
							"【" +
							basicinfo.date +
							"】" +
							basicinfo.theme +
							"-" +
							basicinfo.ename
					} else {
						item.value = basicinfo[item.field]
					}
					return item
				}
			)
			let implement = await maintain.order.getImplement({ id: this.id })
			this.data.implement.data = this.data.implement.data.filter(
				(item) => {
					item.value = implement[item.field]
					return item
				}
			)
			let evaluate = await maintain.order.getEvaluate({ id: this.id })
			this.data.evaluate.data = this.data.evaluate.data.filter((item) => {
				if (item.isscore) {
					item.value = item.value.filter((x) => {
						x.value = evaluate[x.field]
						return x
					})
				} else {
					item.value = evaluate[item.field]
				}
				return item
			})
			this.loading = false
		},
	},
}
</script>
