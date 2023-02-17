<template>
  <div class="group">
    <div class="group-data">
      <div class="strong"><strong>Имя - </strong>{{ student.name }}</div>
      <div class="strong"><strong>Оценка - </strong></div>
      <div class="strong"><strong>Баллы: {{ student.points }}</strong></div>
    </div>
    <div class="group-btns">
      <div>
        <button
          @click="showStudentInfo"
        >
          <img alt="edit" src="../assets/img/edit.png"/>
        </button>
        <my-dialog
          v-model:show="studentInfo"
        >
          <student-info
            :practices="practices"
            :student="student"
            :studentInfoSearch="studentInfoSearch"
            :studentPractises="studentPractises"
          />
        </my-dialog>
      </div>
      <div>
        <button
          @click="removeStudent()"

        >
          <img alt="see" src="../assets/img/close.png"/>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import MyDialog from '@/components/UI/MyDialog.vue'
import StudentInfo from '@/components/StudentInfo.vue'

export default {
  components: {
    MyDialog,
    StudentInfo
  },
  data() {
    return {
      studentPractises: [],
      studentInfo: false,
    }
  },
  props: {
    student: {
      type: Object,
      required: true
    },
    practices: {
      type: Array,
      required: true
    },
    studentInfoSearch: {
      type: Boolean,
      required: false
    }
  },
  methods: {
    showStudentInfo() {
      this.studentInfo = true
    },
    async removeStudent(student) {
      this.$emit('remove', student)
    }
  }
}
</script>

<style scoped>

.group {
  display: grid;

  grid-template-columns:8fr 2fr;

  height: 50px;

  border: 2px solid #dcdcdc;
}

.group-data {
  display: grid;

  grid-template-columns: 3fr 1fr 2fr;
}

.group-data * {
  display: flex;
  justify-content: left;
  align-items: center;

  max-height: 46px;
}

.group-btns {
  display: grid;

  grid-template-columns: 1fr 1fr;
}

.strong {
  height: 100%;

  border-right: 2px solid #dcdcdc;
}

.strong:nth-child(3n) {
  border-right: none;
}

div strong {
  margin: 10px;

}

button {
  background: none;
  border: none;
  border-radius: 50px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

  cursor: pointer;
}

img {
  min-width: 40px;
  max-width: 40px;
  padding: 5px;
}
</style>
