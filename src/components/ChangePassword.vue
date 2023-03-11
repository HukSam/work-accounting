<template>
    <form
      @submit.prevent="changeUserPassword"
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
      <div class="wrapper-change-password">
        <h2>Смена пароля</h2>
        <my-input
          v-model.trim="user.password"
          placeholder="Старый пароль:"
          type="password"
        />
        <my-input
          v-model.trim="user.newPassword"
          placeholder="Новый пароль:"
          type="password"
        />
        <my-input
          v-model.trim="user.repeatedNewPassword"
          placeholder="Подтвердите новый пароль:"
          type="password"
        />
        <button
          class="submit-btn"
          type="submit"
        >Сменить пароль  
        </button>
      </div>
      </form>
  </template>
  
  <script>
  import MyButton from '@/components/UI/MyButton.vue'
  import MyInput from './UI/MyInput.vue';
  import { getAuth, updatePassword, signOut } from 'firebase/auth'
  import { checkOfRegistration } from '@/stores/checkOfRegistration'
  import { doc, updateDoc } from 'firebase/firestore'
  import { db } from '@/main'

  export default {
    name: 'change-password',
  
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
          newPassword: '',
          repeatedNewPassword: '',
          password: ''
        },
        errors: []
      }
    },
  
    methods: {
      async changeUserPassword() {
        if ( this.user.newPassword === this.user.repeatedNewPassword) {
            // samorod1010@mail.ru
            const auth = getAuth()
            updatePassword(auth.currentUser, this.user.newPassword).then(()=> {
                console.log('password updated!');
            })
            .catch(() => {
                console.log(error);
            })

            await updateDoc(doc(db, 'users', auth.currentUser.uid), {
              password: this.user.newPassword,
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
          if (this.user.newPassword === '') {
          this.errors.push('Введите почту!')
          }
          if (this.user.password !== this.user.password) {
          this.errors.push('Неправильный пароль!')
          }
          if (this.user.newPassword === '' || this.user.newPassword !== this.user.repeatedNewPassword || this.user.repeatedNewPassword === '') {
              this.errors.push('Почты не совпадают или не заполнены поля!')
          }
      }
    }
  }
  </script>
  
  <style scoped>
  
  .wrapper-change-password {
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
  