<template>
	<form
		@submit.prevent="changeUserEmail"
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
	    <div class="wrapper-change-email">
	        <h2>Смена почты</h2>
	        <my-input
		        v-model.trim="user.value.newEmail"
		        placeholder="Новый email:"
		        type="text"
	         />
	        <my-input
		        v-model.trim="user.value.repeatedNewEmail"
		        placeholder="Подтвердите email:"
		        type="text"
	        />
	        <my-input
		        v-model.trim="user.value.password"
		        placeholder="Пароль:"
		        type="password"
	        />
	        <my-button
		        class="submit-btn"
		        type="submit"
	        >
		        Сменить почту
	        </my-button>
	    </div>
	</form>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
import MyButton from '@/components/UI/MyButton.vue'
import MyInput from './UI/MyInput.vue';
import { getAuth, updateEmail, signOut } from 'firebase/auth'
import { checkOfRegistration } from '@/stores/checkOfRegistration'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '@/main'

const userStore = checkOfRegistration()
const user = ref( {
    newEmail: '',
    repeatedNewEmail: '',
    password: ''
  })
const errors = ref([])
const auth = getAuth()
const emit = defineEmits(['hide'])
const changeUserEmail = async()=>  {
	if ( user.value.newEmail === user.value.repeatedNewEmail) {
		updateEmail(auth.currentUser, user.value.newEmail)
		.catch((error) => {
			console.log(error);
		})

		console.log(auth.currentuser.value.uid);

		await updateDoc(doc(db, 'users', auth.currentuser.value.uid), {
			email: user.value.newEmail
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
    if (user.value.newEmail === '') {
        errors.value.push('Введите почту!')
    }
    if (user.value.password !== user.value.password) {
        errors.value.push('Неправильный пароль!')
    }
    if (user.value.newEmail === '' || user.value.newEmail !== user.value.repeatedNewEmail || user.value.repeatedNewEmail === '') {
        errors.value.push('Почты не совпадают или не заполнены поля!')
    }
}
</script>

<style scoped>

.wrapper-change-email {
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
