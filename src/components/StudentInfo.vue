<template>
  <div class="wrapper-practice-info-add">
    <h2>Информация о студенте {{student.name}} </h2>
    <my-button class="btn-add-practice"
               @click="showDialog"
    >
      Добавить практику
    </my-button>
    <my-dialog v-model:show="dialogVisible">
      <practice-list
        :practices="practices"

      />
    </my-dialog>
    <practice-list
      :studentPractises="studentPractises"
      :practices="studentPractices"
    />
  </div>
</template>

<script>
import PracticeList from '@/components/PracticeList'
import MyDialog from '@/components/UI/MyDialog'
import MyButton from '@/components/UI/MyButton'

export default {
  components: {
    PracticeList,
    MyDialog,
    MyButton
  },
  data() {
    return {
      dialogVisible: false
    }
  },
  computed: {
    studentPractices() {
      return this.practices.filter(practices => practices.uid.includes(this.student.id))
    }
  },
  props: {
    practices: {
      type: Array,
      required: true
      },
    student: {
      type: Object,
      required: true
    },
    studentPractises: {
      type: Array,
      required: true
    },
    studentInfoSearch: {
      type: Boolean,
      required: true
    }
  },
  name: 'student-info',
  mounted() {

  },
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
