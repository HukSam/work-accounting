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
    <my-button
      @click="createPractice"
    >
      Добавить
    </my-button>
  </form>
</template>

<script>
import MyInput from '@/components/UI/MyInput'
import MyButton from '@/components/UI/MyButton'

export default {
  components: {
    MyInput,
    MyButton
  },
  name: 'practice-form',
  data() {
    return {
      practice: {
        name: '',
        points: ''
      },
      studentPractice: {
        name: '',
        points: ''
      }
    }
  },
  methods: {
    async createPractice() {
      this.practice.id = Date.now()
      this.$emit('create', this.practice)
      this.practice = {
        name: '',
        points: ''
      }
      this.dialogVisible = false
    }
  },
  rights: 'Студент'
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
