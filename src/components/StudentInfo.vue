<template>
	<div class="wrapper-practice-info-add">
		<h2>Информация о студенте {{student.name}} </h2>
		<my-button
			class="btn-add-practice"
		    @click="showDialog"
		>
			Добавить практику
		</my-button>
		<my-dialog v-model:show="dialogVisible">
			<practice-list
		        :practices="practices"
			>
			    <practice-item :practice="practice">
			        <button
			            @click="addStudentPractice()"
			        >
			            <img alt="see" src="../assets/img/plus.png"/>
			        </button>
			    </practice-item>
		    </practice-list>
		</my-dialog>
		<practice-list
			:practices="studentPractices"
		/>
	</div>
</template>

<script setup>
import { ref, defineEmits, defineProps } from 'vue'
import PracticeList from '@/components/PracticeList.vue'
import PracticeItem from '@/components/PracticeItem.vue'
import MyDialog from '@/components/UI/MyDialog.vue'
import MyButton from '@/components/UI/MyButton.vue'
const props = defineProps({
	practices: {
		type: Array,
		required: true
	},
	practice: {
		type:Object,
		required: true
	},
	student: {
		type: Object,
		required: true
	}
})
const emit = defineEmits(['add'])

const dialogVisible = ref(false)
const practisesList = ref(props.practices)
const studentPractices = computed(() => {
  return practisesList.value.filter(practices => practices.uid.includes(props.student.id))
})

const showDialog = () =>  dialogVisible.value = true
const addStudentPractice = () => emit('add', props.practice)
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;

  min-width: 400px;

  font-size: 30px;
}

img {
  min-width: 25px;
  max-width: 25px;
}

.wrapper-practice-info-add {
  display: grid;
}

.wrapper-practice-info-add my-button {
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
