<template>
  <form
    @submit.prevent="changeUserEmail"
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
    <div class="wrapper-change-email">
      <h2>Смена почты</h2>
      <my-input
        v-model.trim="user.newEmail"
        placeholder="Новый email:"
        type="text"
      />
      <my-input
        v-model.trim="user.repeatedNewEmail"
        placeholder="Подтвердите email:"
        type="text"
      />
      <my-input
        v-model.trim="user.password"
        placeholder="Пароль:"
        type="password"
      />
      <button
        class="submit-btn"
        type="submit"
      >Сменить почту  
      </button>
    </div>
    </form>
</template>

<script>
import MyButton from '@/components/UI/MyButton.vue'
import MyInput from './UI/MyInput.vue';
import { getAuth, updateEmail, signOut } from 'firebase/auth'
import { checkOfRegistration } from '@/stores/checkOfRegistration'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '@/main'

export default {
  name: 'change-email',

  components: {
    MyButton,
    MyInput
  },
  setup: () => ({
    userStore: checkOfRegistration(),
  }),
  data() {
    return {
      user: {
        newEmail: '',
        repeatedNewEmail: '',
        password: ''
      },
      errors: []
    }
  },

  methods: {
    async changeUserEmail() {
      if ( this.user.newEmail === this.user.repeatedNewEmail) {
          // samorod1010@mail.ru
          const auth = getAuth()
          updateEmail(auth.currentUser, this.user.newEmail).then(()=> {            
            console.log('email updated!');
          })
          .catch(() => {
            console.log(error);
          })

          console.log(auth.currentUser.uid);
          
          await updateDoc(doc(db, 'users', auth.currentUser.uid), {
              email: this.user.newEmail
          })
          .catch(() => {
                console.log(error);
          })

          localStorage.clear()
          this.userStore.$reset()
          this.$emit('hide')
          window.location.reload();
        } 
        
        else {
            alert('Почты не совпадают!')
        }
        if (this.user.newEmail === '') {
        this.errors.push('Введите почту!')
        }
        if (this.user.password !== this.user.password) {
        this.errors.push('Неправильный пароль!')
        }
        if (this.user.newEmail === '' || this.user.newEmail !== this.user.repeatedNewEmail || this.user.repeatedNewEmail === '') {
            this.errors.push('Почты не совпадают или не заполнены поля!')
        }
    }
  }
}
</script>

<style scoped>

.wrapper-change-email {
  display: grid;
}

.btn-account {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 300px;
}

.submit-btn {
    margin-top: 20px;
    cursor: pointer;
  }
</style>
