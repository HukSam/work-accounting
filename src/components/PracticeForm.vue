<template>
  <form @submit.prevent>
    <h4>Добавление практики</h4>
      <my-input
        v-model="practice.name"
        type="text"
        placeholder="Название практики"
      > </my-input>
      <my-input
        v-model="practice.points"
        type="text"
        placeholder="Баллы"
      ></my-input>
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
import { doc, setDoc } from 'firebase/firestore'
import { db } from '@/main'

export default {
  components: {
    MyInput,
    MyButton
  },
  name: 'practice-form',
  data () {
    return {
      practice: {
        name: '',
        points: ''
      }
    }
  },
  methods: {
    async createPractice (practice) {
      this.practice.id = Date.now()
      this.$emit('create', this.practice)
      this.practice = {
        name: '',
        points: ''
      }
      this.practices.push(practice)
      const userRef = doc(db, 'practices', 'BwRAab6s5Z1J7b73ovgA')
      await setDoc(userRef, {
        practice
      })
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
