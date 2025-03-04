<template>
	<form @submit.prevent>
		<h4>Добавление практики</h4>
		<my-input
			v-model="practice.name"
			placeholder="Название практики"
			type="text"
		/>
		<my-input
			v-model="practice.points"
			placeholder="Баллы"
			type="text"
		/>
		<my-button @click="createPractice">
	        Добавить
		</my-button>
	</form>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
import MyInput from '@/components/UI/MyInput.vue'
import MyButton from '@/components/UI/MyButton.vue'

const practice = ref( {
    name: '',
    points: '',
    uid: []
})
const studentPractice = ref( {
    name: '',
	points: ''
})
const emit = defineEmits(['hide'])

const createPractice = async() => {
	practice.value.id = Date.now()
	practice.value.name = ''
	practice.value.points = ''

	emit('create', practice.value)
	emit('emit')
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
  max-width: 25px;
  min-width: 25px;
}
</style>
