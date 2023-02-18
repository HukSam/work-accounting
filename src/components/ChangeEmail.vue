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
        placeholder="Подтверждение email:"
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
import { getAuth, updateEmail } from "firebase/auth";

export default {
  name: 'change-email',

  components: {
    MyButton,
    MyInput
  },

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
                
            await updateEmail(getAuth().currentUser, this.newEmail).then(()=> {
              
            })
            this.$emit('hide')

            /*
            const user = firebase.auth().currentUser;
            this.user.password = user.password
    
            user.updateEmail(this.user.newEmail)
            */
            // samorodsky1111@mail.ru
            this.$emit('hide')
            console.log(this.user.newEmail)
        } else {
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
