<template>
	<form @submit.prevent>
		<h4>Добавление группы</h4>
		<select
			name="Лидеры"
			id="leads"
			v-model="selected"
		>
		<option disabled selected>
	        Выберите лидера
	    </option>
		<option
		    v-for="student in students"
		    :key="student.id"
		    :value= "student.name"
	    >
	        {{ student.name }}
	    </option>

		</select>
		<my-input
		    v-model="group.points"
		    placeholder="Баллы:"
		    type="text"
		/>
		<my-button
			:rights="rights"
			@click="createGroup"
		>
	        Создать команду
		</my-button>
	</form>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import MyInput from '@/components/UI/MyInput.vue'
import MyButton from '@/components/UI/MyButton.vue'

const group = ref({
	leadName: '',
	points: '',
	studentsInGroup: []
})
const selected = ref( '')
const props = defineProps({
	rights: {
		type: String,
		required: true
	},
	students: {
		type: Array,
		required: true
	}
})
const emit = defineEmits(['hide'])
const createGroup = async() => {
	group.value.id = Date.now()
	group.value.leadName = selected.value
	group.value.studentsInGroup = []

	emit('create', group.value)
	emit('hide')
}

</script>

<style scoped>
form {
	display: flex;
	flex-direction: column;
	font-size: 30px;
}

select {
	margin-top: 15px;
	padding: 10px 15px;

	border: 2px solid #dcdcdc;
}

select option{
	margin-top: 15px;
	padding: 10px 15px;

	border: 2px solid #dcdcdc;
}

h4 {
	margin: 10px;
}
</style>
