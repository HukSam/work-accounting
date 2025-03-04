<template>
	<div class="wrapper-student-info-add">
		<h2>Информация о группе</h2>
		<students-group-list
			:students="students"
			:studentsInGroup="studentsInGroup"
			:group="group"
			@remove="removeStudent"
		/>
	</div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import StudentsGroupList from '@/components/StudentsGroupList.vue'

const props = defineProps({
	group: {
		type: Object,
		required: true
	},
	students: {
		type: Array,
		required: true
	},
	studentsInGroup: {
		type: Array,
		required: true
	}
})
const emit = defineEmits(['hide'])
</script>

<style scoped>
form {
	display: flex;
	flex-direction: column;
	font-size: 30px;
}

img {
	min-width: 25px;
	max-width: 25px;
}

.wrapper-student-info-add {
	display: grid;
}

.btn-add-student {
	display: flex;
	justify-content: center;
	align-items: center;
}

</style>
