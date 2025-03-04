<template>
	<form @submit.prevent>
		<h4>Добавление студента</h4>
		<my-input
			v-model="student.name"
			placeholder="Фамилия"
			type="text"
		/>
		<my-input
			v-model="student.points"
			placeholder="Баллы"
			type="text"
		/>
		<my-input
			v-model="student.email"
			placeholder="Почта"
			type="email"
		/>
		<my-button @click="createUser">
			Добавить
		</my-button>
	</form>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
import MyInput from '@/components/UI/MyInput.vue'
import MyButton from '@/components/UI/MyButton.vue'

const student = ref({
	name: '',
	points: '',
	mark: '',
	email: ''
})
const emit = defineEmits(['hide', 'create'])

const createUser = async() =>  {
	student.value.id = Date.now()
	student.value.name = ''
	student.value.points = ''

	emit('create', student.value)
	emit('hide')
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;

  font-size: 30px;
}

h4 {
  margin: 10px;
}

img {
  min-width: 25px;
  max-width: 25px;
}
</style>
