<template>
    <form
      @submit.prevent="changeUserPassword"
    >
		<div v-if="errors.length" class="errorsInfo">
			<b>Пожалуйста исправьте указанные ошибки:</b>
			<ul>
				<li
					v-for="error in errors"
					:key="error"
				>
					{{ error }}
				</li>
			</ul>
		</div>
		<div class="wrapper-change-password">
			<h2>Смена пароля</h2>
			<my-input
				  v-model.trim="user.value.password"
				  placeholder="Старый пароль:"
				  type="password"
			/>
			<my-input
				  v-model.trim="user.value.newPassword"
				  placeholder="Новый пароль:"
				  type="password"
			/>
			<my-input
				  v-model.trim="user.value.repeatedNewPassword"
				  placeholder="Подтвердите новый пароль:"
				  type="password"
			/>
			<my-button
				  class="submit-btn"
				  type="submit"
			>
				Сменить пароль
			</my-button>
		</div>
	</form>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
import MyButton from '@/components/UI/MyButton.vue'
import MyInput from './UI/MyInput.vue';
import { getAuth, updatePassword, signOut } from 'firebase/auth'
import { checkOfRegistration } from '@/stores/checkOfRegistration'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '@/main'
const userStore = checkOfRegistration()

const user = ref({
      newPassword: '',
      repeatedNewPassword: '',
      password: ''
})
const errors = ref( [])
const emit = defineEmits(['hide'])

const changeUserPassword = async() => {
    if ( user.value.newPassword === user.value.repeatedNewPassword) {
        const auth = getAuth()
        updatePassword(auth.currentUser, user.value.newPassword).then(()=> {
            console.log('password updated!');
        })
        .catch((error) => {
            console.log(error);
        })

        await updateDoc(doc(db, 'users', auth.currentuser.value.uid), {
            password: user.value.newPassword,
        })
        .catch((error) => {
            console.log(error);
        })

        localStorage.clear()
        userStore.$reset()
        emit('hide')
        window.location.reload();
    }
	else {
		alert('Почты не совпадают!')
	}
	if (user.value.newPassword === '') {
		errors.value.push('Введите почту!')
	}
	if (user.value.password !== user.value.password) {
		errors.value.push('Неправильный пароль!')
	}
	if (user.value.newPassword === '' || user.value.newPassword !== user.value.repeatedNewPassword || user.value.repeatedNewPassword === '') {
		errors.value.push('Почты не совпадают или не заполнены поля!')
	}
}
</script>

<style scoped>
.wrapper-change-password {
	display: grid;
}

.btn-account {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 300px;
}

.submit-btn {
	margin-top: 20px;
	cursor: pointer;
}
</style>
