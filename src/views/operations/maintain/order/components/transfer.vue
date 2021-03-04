<template>
	<div class="transfer-main" v-loading="loading">
		<basicInfo :data="data"></basicInfo>
		<transferForm :id="id"></transferForm>
	</div>
</template>
<script>
import maintain from "@/api/operations/maintain"
import basicInfo from "./basicInfo"
import transferForm from "./form/transferForm"
export default {
	name: "transfer",
	props: {
		id: {
			type: String,
		},
	},
	components: {
		basicInfo,
		transferForm,
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
