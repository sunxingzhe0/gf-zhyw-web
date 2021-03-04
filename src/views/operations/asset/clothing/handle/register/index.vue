<template>
	<AppDialog
		router
		title="单个注册"
		:show.sync="show"
		class="register-dialog"
	>
		<registerForm :id="clothingId" @submit="registerSubmit"></registerForm>s
	</AppDialog>
</template>
<script>
/*
@author        cui
@name          clothingRegister
@desc          单个注册
@query         clothingId    string    被服id
@props
@emit
*/
import registerForm from "./components/registerForm"
import { AppDialog } from "@/components/App"
export default {
	name: "clothingRegister",
	components: {
		AppDialog,
		registerForm,
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
		registerSubmit() {
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
.register-dialog {
	.el-dialog {
		width: 680px !important;
	}
}
</style>
