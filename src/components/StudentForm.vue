<template>
  <form @submit.prevent>
  <h4>Добавление студента</h4>
    <my-input
      v-model="student.name"
      type="text"
      placeholder="Фамилия"
    > </my-input>
    <my-input
      v-model="student.points"
      type="text"
      placeholder="Баллы"
    ></my-input>
    <my-button
      @click="createUser"
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
  name: 'student-form',
  data () {
    return {
      student: {
        name: '',
        points: '',
        mark: ''
      }
    }
  },
  methods: {
    createUser () {
      this.student.id = Date.now()
      this.$emit('create', this.student)
      this.student = {
        name: '',
        points: ''
      }
    }
  }
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
.wrapper-new-student {
  grid-template-columns: 4fr 4fr 1fr;
  display: grid;
}
</style>
