<template>
  <form
    @submit.prevent="register"
  >
    <div v-if="errors.length" class="errorsInfo">
      <b>Пожалуйста исправьте указанные ошибки:</b>
      <ul>
        <li
          v-for="error in errors"
          :key="error"
        >
          {{ error }}
        </li>
      </ul>
    </div>
    <div class="headerReg">
      <h4>Регистрация</h4>
    </div>
    <my-input
      v-model="user.email"
      placeholder="Email:"
      type="text"
    />
    <my-input
      v-model="user.password"
      placeholder="Пароль:"
      type="password"
    />
    <my-input
      v-model="user.repeatedPassword"
      placeholder="Подтверждение пароля:"
      type="password"
    />
    <select id="rights" v-model="user.rights" name="rights">
      Выберите роль
      <option selected value="student">Студент</option>
      <option value="leader">Лидер</option>
    </select>

    <button type="submit"
            @click="regNotice"
    >Зарегистрироваться</button>
  </form>
</template>

<script>
import MyInput from '@/components/UI/MyInput.vue'

import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '@/main'
import { checkOfRegistration } from '@/stores/checkOfRegistration'

export default {
  components: {
    MyInput
  },
  setup: () => ({
    userStore: checkOfRegistration(),

  }),
  name: 'registration-form',
  data() {
    return {
      user: {
        email: '',
        password: '',
        repeatedPassword: '',
        rights: '',
        errors: []
      },
      errors: [],
      dialogVisible: false
    }
  },
  methods: {
    async regNotice() {
      this.$emit('showUserEmail')
    },
    async register() {
      if (this.user.password === this.user.repeatedPassword) {
        /*this.user.id = Date.now()
        this.$emit('create', this.user)
        this.axios.post('http://127.0.0.1:8000/login', {
          email:'test1@mail.ru',
          password:'23030327'
        })
          .then((response) => {
            console.log(response.data)
          })
        this.authVisible = false
        */
        await createUserWithEmailAndPassword(getAuth(), this.user.email, this.user.password).then(
          async (userCredential) => {
            const user = userCredential.user

            await setDoc(doc(db, 'users', user.uid), {
              email: this.user.email,
              password: this.user.password,
              rights: this.user.rights
            })
            this.userStore.setUid(user.uid)
            this.$emit('hide')
            console.log(this.user.email)
          },
          (err) => {
            alert(err)
          },
        )
      } else {
        alert('Пароли не совпадают!')
      }
      if (this.user.email === '') {
        this.errors.push('Введите почту!')
      }
      if (this.user.password === '' || this.user.password !== this.user.repeatedPassword || this.user.repeatedPassword === '') {
        this.errors.push('Пароли не совпадают или не заполнены поля!')
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
ul {
list-style-type: none;
}

.errorsInfo {
  max-width: 300px;
}

.headerReg {
  display: grid;
  grid-template-columns: 10fr 1fr;
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

.alertGuest {
  position: fixed; /* or absolute */
  top: 50%;
  left: 50%;
  width: 200px;
  height:100px;
  transform: translate(-50%, -50%);
}
</style>
