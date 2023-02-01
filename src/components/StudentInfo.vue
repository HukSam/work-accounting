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
      >
        <practice-item
          :practice="practice"
        >
          <button
            @click="addStudentPractice()"
          >
            <img alt="see" src="../img/plus.png"/>
          </button>
        </practice-item>
      </practice-list>
    </my-dialog>
    <practice-list
      :practices="studentPractices"
    />
  </div>
</template>

<script>
import PracticeList from '@/components/PracticeList.vue'
import PracticeItem from '@/components/PracticeItem.vue'
import MyDialog from '@/components/UI/MyDialog.vue'
import MyButton from '@/components/UI/MyButton.vue'

export default {
  components: {
    PracticeList,
    MyDialog,
    MyButton,
    PracticeItem
  },
  data() {
    return {
      dialogVisible: false,
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
    practice: {
      type:Object,
      required: true
    },
    student: {
      type: Object,
      required: true
    }
  },
  name: 'student-info',
  mounted() {

  },
  methods: {
    showDialog() {
      this.dialogVisible = true
    },
    addStudentPractice() {
      this.$emit('add', this.practice)
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
