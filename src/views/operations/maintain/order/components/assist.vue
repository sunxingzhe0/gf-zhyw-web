<template>
	<div class="dis" v-loading="loading">
		<basicInfo :data="data"></basicInfo>
		<assistForm :id="id" @sumbit="sumbit"></assistForm>
	</div>
</template>
<script>
import maintain from "@/api/operations/maintain"
import basicInfo from "./basicInfo"
import assistForm from "./form/assistForm"
export default {
	name: "assist",
	props: {
		id: {
			type: String,
		},
	},
	components: {
		basicInfo,
		assistForm,
	},
	data() {
		return {
			data: null,
			loading: true,
		}
	},
	async created() {
		this.data = await maintain.order.getBasicinfo({ id: this.id })
		this.loading = false
	},
	methods: {
		sumbit() {
			this.$emit("sumbit", true)
		},
	},
}
</script>
