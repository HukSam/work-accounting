<template>
	<div class="wrapper-account-info">
		<h2>Информация об аккаунте</h2>
		<my-button
			class="btn-account"
			@click="showChangeEmail"
		>
	        Сменить почту
		</my-button>
		<my-dialog
		    :show="changeUserEmail"
		    @click="hideChangeEmail"
	    >
			<change-email/>
	    </my-dialog>
		<my-button
			class="btn-account"
			@click="showChangePassword"
		>
	        Сменить пароль
		</my-button>
		<my-dialog
			:show="changeUserPassword"
			@click="hideChangePassword"
		>
		  <change-password/>
		</my-dialog>
		<my-button
			class="btn-account"
			@click="$emit('accountSignOut')"
		>
			Выйти из аккаунта
		</my-button>
	</div>
</template>

<script setup>
import { ref } from 'vue'
import MyButton from '@/components/UI/MyButton.vue'
import MyDialog from './UI/MyDialog.vue';
import ChangeEmail from './ChangeEmail.vue';
import ChangePassword from './ChangePassword.vue'

const changeUserEmail = ref(false)
const changeUserPassword = ref( false)
const showChangeEmail = () => changeUserEmail.value = true
const showChangePassword = () => changeUserPassword.value = true
const hideChangeEmail = () => changeUserEmail.value = false
const hideChangePassword = () => changeUserPassword.value = false
</script>

<style scoped>
.wrapper-account-info {
	display: grid;
}

.btn-account {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 300px;
}
</style>
