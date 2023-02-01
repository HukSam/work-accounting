<template>
  <form @submit.prevent>
    <h4>Добавление группы</h4>
    <my-input
      v-model="group.leadName"
      placeholder="Лидер:"
      type="text"
    />
    <my-input
      v-model="group.points"
      placeholder="Баллы:"
      type="text"
    />
    <my-button
      :rights="rights"
      @click="createGroup"
    >
      Создать команду
    </my-button>
  </form>
</template>

<script>
import MyInput from '@/components/UI/MyInput.vue'
import MyButton from '@/components/UI/MyButton.vue'
import { sendAnalyticsRequest } from '@/js/api'

export default {
  components: {
    MyInput,
    MyButton
  },
  data() {
    return {
      group: {
        leadName: '',
        points: ''
      }
    }
  },
  props: {
    rights: {
      type: String,
      required: true
    }
  },
  methods: {
    async createGroup() {
      this.group.id = Date.now()
      this.$emit('create', this.group)
      this.group = {
        leadName: '',
        points: ''
      }

      await sendAnalyticsRequest('addNewGroup')
      this.dialogVisible = false
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

h4 {
  margin: 10px;
}
</style>
