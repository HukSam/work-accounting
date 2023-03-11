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
    <h4 class="regauth signUp">Регистрация</h4>
    <my-input
      v-model.trim="user.email"
      placeholder="Email:"
      type="text"
    />
    <my-input
      v-model.trim="user.password"
      placeholder="Пароль:"
      type="password"
    />

    <my-input
      v-model.trim="user.repeatedPassword"
      class="signUp"
      placeholder="Подтверждение пароля:"
      type="password"
    />
    <select
      id="rights"
      v-model="user.rights"
      class="signUp"
      name="rights"
    >
      Выберите роль
      <option selected value="student">Студент</option>
      <option value="leader">Лидер</option>
    </select>

    <button
      class="submit-btn"
      type="submit"
    >Зарегистрироваться
    </button>
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
    async register() {
      if (this.user.password === this.user.repeatedPassword) {

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

<style lang="scss" scoped>
form {
  display: flex;
  flex-direction: column;
  font-size: 30px;

  p {
    font-size: 12px;
    display: block;
  }

  h4 {
    color: #80002f;
    cursor: pointer;
  }

  ul {
    list-style-type: none;
  }

  .errorsInfo {
    max-width: 200px;
  }

  .submit-btn {
    margin-top: 20px;
    cursor: pointer;
  }

  span {
    font-size: 14px;
  }
}
</style>
