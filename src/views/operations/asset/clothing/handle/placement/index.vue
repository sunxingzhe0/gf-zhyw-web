<template>
	<AppDialog
		router
		title="单个贴置"
		:show.sync="show"
		class="clothing-palcement-dialog"
	>
		<placementForm
			:id="clothingId"
			@submit="placementSubmit"
		></placementForm>
	</AppDialog>
</template>
<script>
/*
@author        cui
@name          clothingPlacement
@desc          单个贴置
@query         clothingId    string    被服id
@props
@emit
*/
import placementForm from "./components/placementForm"
import { AppDialog } from "@/components/App"
export default {
	name: "clothingPlacement",
	components: {
		AppDialog,
		placementForm,
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
		placementSubmit() {
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
<style lang="scss">
.clothing-palcement-dialog {
	.el-dialog {
		width: 680px !important;
	}
}
</style>
