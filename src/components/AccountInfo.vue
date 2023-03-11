<template>
  <div class="wrapper-account-info">
    <h2>Информация об аккаунте</h2>
    <my-button 
      class="btn-account"
      @click="showChangeEmail"
    >
      Сменить email
    </my-button>
      <my-dialog
        :show="changeUserEmail"
        @click="hideChangeEmail"
        >
          <change-email
          />
      </my-dialog>
    <my-button 
      class="btn-account"
      @click="showChangePassword"
    >
      Сменить password
    </my-button>
      <my-dialog
        :show="changeUserPassword"
        @click="hideChangePassword"
        >
          <change-password
          />
      </my-dialog>
    <my-button
      class="btn-account"
      @click="$emit('accountSignOut')"
    >
      Выйти из аккаунта
    </my-button>
  </div>
</template>

<script>
import MyButton from '@/components/UI/MyButton.vue'
import MyDialog from './UI/MyDialog.vue';
import ChangeEmail from './ChangeEmail.vue';
import ChangePassword from './ChangePassword.vue'

export default {
  name: 'account-info',

  components: {
    MyButton,
    MyDialog,
    ChangeEmail,
    ChangePassword
  },

  data() {
    return {
      changeUserEmail: false,
      changeUserPassword: false
    }
  },
  methods: {
    showChangeEmail() {
      this.changeUserEmail = true
    },
    showChangePassword() {
      this.changeUserPassword = true
    },
    hideChangeEmail() {
      this.changeUserEmail = false
    },
    hideChangePassword() {
      this.changeUserPassword = false
    }
  },
}
</script>

<style scoped>

.wrapper-account-info {
  display: grid;
}

.btn-account {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 300px;
}
</style>
