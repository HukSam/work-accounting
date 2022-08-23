<template>
  <div class="wrapper-student-info-add">
    <h2>Информация о группе</h2>
    <my-button
      class="btn-add-student"
      @click="showDialog"
    >
      Добавить студента
    </my-button>
    <my-dialog v-model:show="dialogVisible">
      <student-form
        @create="createStudent"
      />
    </my-dialog>
    <student-list
      :students="students"
      @remove="removeStudent"
    />
  </div>
</template>

<script>
import StudentForm from '@/components/StudentForm'
import StudentList from '@/components/StudentList'
import MyDialog from '@/components/UI/MyDialog'
import MyButton from '@/components/UI/MyButton'
import { deleteField, doc, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/main'
// {{ groups[this.groupIndex].students }}
export default {
  components: {
    StudentForm,
    StudentList,
    MyDialog,
    MyButton
  },
  data() {
    return {
      students:
        [],
      dialogVisible: false
    }
  },
  props: {
    groups: {
      type: Object,
      required: true
    },
    rights: {
      type: String,
      required: true
    }
  },

  name: 'group-info',
  methods: {
    async createStudent(student) {
      this.students.push(student)
      const userRef = doc(db, 'student', 'op4moEEySSz5nlWujV3T')
      await setDoc(userRef, {
        student
      })
      this.dialogVisible = false
    },
    async removeStudent(student) {
      this.students = this.students.filter(g => g.id !== student.id)
      const userDel = doc(db, 'student', 'op4moEEySSz5nlWujV3T')
      await updateDoc(userDel, {
        student: deleteField()
      })
    },
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
}

img {
  max-width: 25px;
  min-width: 25px;
}

.wrapper-student-info-add {
  display: grid;
}

.btn-add-student {
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>
