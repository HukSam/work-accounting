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
    <my-button
      @click="createUser"
    >
      Добавить
    </my-button>
  </form>
</template>

<script>
import MyInput from '@/components/UI/MyInput.vue'
import MyButton from '@/components/UI/MyButton.vue'


export default {
  components: {
    MyInput,
    MyButton
  },
  data() {
    return {
      student: {
        name: '',
        points: '',
        mark: '',
        email: ''
      }
    }
  },
  methods: {
    async createUser() {
      this.student.id = Date.now()
      this.$emit('create', this.student)
      this.student = {
        name: '',
        points: ''
      }

      this.dialogVisible = false
    },

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
  min-width: 25px;
  max-width: 25px;
}
</style>
