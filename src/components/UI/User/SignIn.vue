<template>
  <form
    @submit.prevent="signIn"
  >
    <h4 class="regauth signUp">Вход</h4>
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
    <button
      type="submit"
      class="submit-btn"
    >Войти</button>
  </form>
</template>

<script>
import MyInput from '@/components/UI/MyInput.vue'
import {signInWithEmailAndPassword, getAuth } from 'firebase/auth'
import { checkOfRegistration } from '@/stores/checkOfRegistration'

export default {
  components: {
    MyInput
  },
  setup: () => ({
    userStore: checkOfRegistration(),
  }),
  name: 'sign-in-form',
  data() {
    return {
      user: {
        email: '',
        password: ''
      },
      dialogVisible: false
    }
  },
  methods: {
    async signIn() {
      await signInWithEmailAndPassword(getAuth(), this.user.email, this.user.password).then(
          async (userCredential) => {
            const user = userCredential.user

            this.userStore.setUid(user.uid)
            console.log(this.user.email)
            //samorodsky101010@mail.ru
          },
          (err) => {
            alert(err)
          },
        )
      this.$emit('hide')
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
  display: block;

  font-size: 12px;
}

h4 {
  color:#80002f;

  cursor: pointer;
}

ul {
list-style-type: none;
}
.submit-btn {
  margin-top: 20px;
}
span {
  font-size: 14px;
}

</style>
