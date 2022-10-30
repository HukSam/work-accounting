<template>
  <form
    id="registration"
    @submit.prevent="register"
  >
    <h4>Регистрация</h4>
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
    <my-dialog v-model:show="dialogVisible">
      <div class="alertGuest">
        <p>123123</p>
      </div>
    </my-dialog>
    <select id="rights" v-model="user.rights" name="rights">
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
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'

import { doc, setDoc } from 'firebase/firestore'

import { db } from '@/main'
// import firebase from 'firebase/app'

export default {
  components: {
    MyInput
  },
  name: 'registration-form',
  data() {
    return {
      user: {
        email: '',
        password: '',
        repeatedPassword: '',
        rights: 'Студент'
      },
      props: {
        students: {
          type: Array,
          required: true
        }
      },
      errors: [],
      dialogVisible: false
    }
  },
  methods: {
    async register() {
      if (this.user.password === this.user.repeatedPassword) {
        this.user.id = Date.now()
        this.$emit('create', this.user)

        await createUserWithEmailAndPassword(getAuth(), this.user.email, this.user.password).then(
          async (userCredential) => {
            const user = userCredential.user

            await setDoc(doc(db, 'users', user.uid), {
              rights: this.user.rights,
              email: this.user.email,
              guest: true
            })
            console.log(userCredential)
            localStorage.uid = user.uid
            for (const emailValidation of this.students.email) {
              if (this.user.email !== emailValidation) {
                this.dialogVisible = true
                this.user.rights = 'Гость'
              }
            }
          },
          (err) => {
            alert(err)
          }
        )
      } else {
        alert('Пароли не совпадают!')
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

.alertGuest {
  position: fixed; /* or absolute */
  top: 50%;
  left: 50%;
  width: 200px;
  height:100px;
  transform: translate(-50%, -50%);
}
</style>
