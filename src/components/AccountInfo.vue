<template>
  <div class="wrapper-account-info">
    <h2>Информация об аккаунте</h2>

    <my-button class="btn-account">
      Сменить email
    </my-button>

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

export default {
  name: 'account-info',

  components: {
    MyButton
  },

  data() {
    return {}
  },

  methods: {},
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
