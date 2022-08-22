<template>
  <form
    @submit.prevent="register"
    id="registration"
  >
    <h4>Регистрация</h4>
    <my-input
      v-model="user.email"
      type="text"
      placeholder="Email:"
    ></my-input>
    <my-input
      v-model="user.password"
      type="password"
      placeholder="Пароль:"
    ></my-input>
    <my-input
      v-model="user.repeatedPassword"
      type="password"
      placeholder="Подтверждение пароля:"
    ></my-input>

    <select v-model="user.rights" name="rights" id="rights">
      Выберите роль
      <option selected value="student">Студент</option>
      <option value="leader">Лидер</option>
      <option value="teacher">Преподаватель</option>
    </select>

    <button type="submit">Зарегистрироваться</button>
  </form>
</template>

<script>
import MyInput from '@/components/UI/MyInput'
import {
  createUserWithEmailAndPassword,
  getAuth
} from 'firebase/auth'

import { doc, setDoc } from 'firebase/firestore'

import { db } from '@/main'
// import firebase from 'firebase/app'

export default {
  components: {
    MyInput
  },
  name: 'registration-form',
  data () {
    return {
      user: {
        email: '',
        password: '',
        repeatedPassword: '',
        rights: 'Студент'
      },
      errors: []
    }
  },
  methods: {
    async register () {
      if (this.user.password === this.user.repeatedPassword) {
        this.user.id = Date.now()
        this.$emit('create', this.user)

        await createUserWithEmailAndPassword(getAuth(), this.user.email, this.user.password).then(
          async (userCredential) => {
            const user = userCredential.user

            await setDoc(doc(db, 'users', user.uid), {
              rights: this.user.rights
            })

            localStorage.uid = user.uid
          },
          (err) => {
            alert(err)
          }
        )
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

p {
  font-size: 12px;
  display: block;
}

.choice-radio {
  margin: 5px;
  display: flex;
  align-items: center;
  justify-content: left;
}

span {
  font-size: 14px;
}
</style>
