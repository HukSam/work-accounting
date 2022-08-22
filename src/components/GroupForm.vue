<template>
  <form @submit.prevent>
    <h4>Добавление группы</h4>
    <my-input
      v-model="group.leadName"
      type="text"
      placeholder="Лидер:"
    ></my-input>
    <my-input
      v-model="group.points"
      type="text"
      placeholder="Баллы:"
    ></my-input>
    <my-button
      @click="createGroup"
      :rights="rights"
    >
      Создать команду
    </my-button>
  </form>
</template>

<script>
import MyInput from '@/components/UI/MyInput'
import MyButton from '@/components/UI/MyButton'

export default {
  components: {
    MyInput,
    MyButton
  },
  data () {
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
    createGroup () {
      this.group.id = Date.now()
      this.$emit('create', this.group)
      this.group = {
        leadName: '',
        points: ''
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
h4 {
  margin: 10px;
}
</style>
