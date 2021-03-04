<template>
	<div class="dis" v-loading="loading">
		<basicInfo :data="data"></basicInfo>
		<distributeOrderForm :id="id" @sumbit="sumbit"></distributeOrderForm>
	</div>
</template>
<script>
import maintain from "@/api/operations/maintain"
import basicInfo from "./basicInfo"
import distributeOrderForm from "./form/distributeOrderForm"
export default {
	name: "distribute",
	props: {
		id: {
			type: String,
		},
	},
	components: {
		basicInfo,
		distributeOrderForm,
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
