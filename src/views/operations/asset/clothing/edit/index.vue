<template>
	<AppDialog router title="编辑被服" :show.sync="show">
		<clothingForm @submit="submit" :id="clothingId"></clothingForm>
	</AppDialog>
</template>
<script>
/*
@author        cui
@name          clothingEdit
@desc          编辑被服
@query         clothingId    string    被服id
@props
@emit
*/
import clothingForm from "../components/clothingForm"
import { AppDialog } from "@/components/App"
export default {
	name: "clothingEdit",
	components: {
		AppDialog,
		clothingForm,
	},
	data() {
		return {
			show: false,
			clothingId: "",
		}
	},
	mounted() {
		this.show = true
		this.clothingId = this.$route.query.clothingId
	},
	methods: {
		submit() {
			this.$router.back()
		},
	},
}
</script>
<style lang="scss" scoped>
.dark-el-menu.el-menu {
	padding: 0 20px;
	justify-content: flex-start;
	background: rgba(26, 26, 26, 0.8);
	&::v-deep {
		.el-menu-item {
			margin-right: 40px;
		}
	}
}
</style>
