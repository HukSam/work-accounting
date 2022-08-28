<template>
  <div class="wrapper-practice-info-add">
    <h2>Информация о студенте</h2>
    <my-button class="btn-add-practice"
               @click="showDialog"
    >
      Добавить практику
    </my-button>
    <my-dialog v-model:show="dialogVisible">
      <student-practices-list
        :students="students"
        :practices="practices"
      />
    </my-dialog>
    <practice-list
      :practices="practices"
    />
  </div>
</template>

<script>
import PracticeList from '@/components/PracticeList'
import MyDialog from '@/components/UI/MyDialog'
import MyButton from '@/components/UI/MyButton'
import StudentPracticesList from '@/components/StudentPracticesList'

export default {
  components: {
    StudentPracticesList,
    PracticeList,
    MyDialog,
    MyButton
  },
  data() {
    return {
      dialogVisible: false
    }
  },
  props: {
    practices: {
      type: Array,
      required: true
      }
  },
  name: 'practice-info',
  methods: {
    showDialog() {
      this.dialogVisible = true
    }
  }
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  font-size: 30px;
  min-width: 400px;
}

img {
  max-width: 25px;
  min-width: 25px;
}

.wrapper-practice-info-add {
  display: grid;
}

.wrapper-practice-info-add my-button {
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>
