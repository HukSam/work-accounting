<template>
  <div class="app">
    <div class="wrapper">
      <div class="nav-menu">
        <div class="item group"><h2>ГРУППА: О-20-ПРИ</h2></div>
        <div class="item mode"><h2>РЕЖИМ:</h2></div>
        <div class="item auth">
          <my-button
            @click="showUserAuth"
          >
            ВХОД / РЕГИСТРАЦИЯ
          </my-button>
          <my-dialog v-model:show="authVisible">
            <registration-form
            />
          </my-dialog>
        </div>
      </div>
      <div class="mainBody">
        <div class="item teacher"><h2>Преподаватель: Коптенок Е.В.</h2></div>
        <div class="item info-panel">
          <div class="info-panel-content block-add-group">
            <h1>Команды</h1>
            <my-button
              class="create-group-btn" @click="showDialogGroups"
            >
              Добавить команду
            </my-button>
            <my-dialog v-model:show="dialogVisibleGroups">
              <group-form
                :rights="user.rights"
                @create="createGroup"
              />
            </my-dialog>
            <group-list
              :groups="groups"
              rights="user.rights"/>
          </div>
          <div class="info-panel-content block-add-practice">
            <h1>Практики</h1>
            <my-button
              class="create-practice-btn" @click="showDialogPractices"
            >
              Добавить практику
            </my-button>
            <my-dialog v-model:show="dialogVisiblePractices">
              <practice-form
                :rights="user.rights"
                @create="createPractice"
              />
            </my-dialog>

            <div class="wrapper-practices">
              <practice-list
                :practices="practices"
                @remove="removePractice"/>
            </div>
          </div>
          <div class="info-panel-content block-add-student">
            <h1>Студенты</h1>
            <my-button
              class="create-student-btn" @click="showDialogStudents"
            >
              Добавить студента
            </my-button>
            <my-dialog v-model:show="dialogVisibleStudents">
              <student-form
                :rights="user.rights"
                @create="createStudent"
              />
            </my-dialog>

            <div class="wrapper-groups">
              <student-list
                :groups="groups"
                :rights="user.rights"
                :students="students"
                @remove="removeStudent"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StudentForm from '@/components/StudentForm'
import StudentList from '@/components/StudentList'
import PracticeForm from '@/components/PracticeForm'
import PracticeList from '@/components/PracticeList'
import GroupForm from '@/components/GroupForm'
import MyButton from '@/components/UI/MyButton'
import MyDialog from '@/components/UI/MyDialog'
import RegistrationForm from '@/components/RegistrationForm'
import { arrayUnion, deleteField, doc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/main'
import GroupList from '@/components/GroupList'

export default {
  components: {
    GroupList,
    StudentList,
    StudentForm,
    MyButton,
    GroupForm,
    MyDialog,
    PracticeForm,
    PracticeList,
    RegistrationForm
  },
  data() {
    return {
      uid: '',
      user: {},
      groups: [],
      students: [],
      practices: [],
      dialogVisibleGroups: false,
      dialogVisiblePractices: false,
      dialogVisibleStudents: false,
      authVisible: false,
      groupIndex: 0,
      studentIndex: 0
    }
  },
  mounted() {
    this.loadData()
    this.subscribePractice()
  },

  methods: {
    loadData() {
      if (localStorage.uid) {
        this.uid = localStorage.uid

        onSnapshot(
          doc(db, 'users', this.uid),
          (data) => {
            if (data.exists()) {
              this.user = data.data()
            }
          }
        )
      }
    },

    async createGroup(group) {
      this.groups.push(group)
      const userRef = doc(db, 'groups', 'OCMGQFjLs6b3K5FCEqeV5FIJrmH2')
      await setDoc(userRef, {
        group
      })
      await updateDoc(userRef, {
        group
      })
      this.dialogVisibleGroups = false
    },
    async removeGroup(group) {
      this.groups = this.groups.filter(g => g.id !== group.id)
      const userDel = doc(db, 'groups', 'OCMGQFjLs6b3K5FCEqeV5FIJrmH2')
      await updateDoc(userDel, {
        group: deleteField()
      })
    },
    async createStudent(student) {
      this.students.push(student)
      const userRef = doc(db, 'student', 'op4moEEySSz5nlWujV3T')
      await setDoc(userRef, {
        student
      })
      this.dialogVisibleStudents = false
    },
    async removeStudent(student) {
      this.students = this.students.filter(g => g.id !== student.id)
      const userDel = doc(db, 'student', 'op4moEEySSz5nlWujV3T')
      await updateDoc(userDel, {
        student: deleteField()
      })
    },
    async createPractice(practice) {
      await updateDoc(doc(db, 'university', 'bstu'), {
        practices: arrayUnion(practice)
      })
      this.dialogVisiblePractices = false
    },
    async removePractice(practice) {
      this.practices = this.practices.filter(g => g.id !== practice.id)
      const userPractice = doc(db, 'university', 'bstu')
      await updateDoc(userPractice, {
        practices: this.practices
      })
    },
    subscribePractice() {
      onSnapshot(doc(db, 'university', 'bstu'), (doc) => {
        this.practices = doc.data().practices
      })
    },
    showDialogGroups() {
      this.dialogVisibleGroups = true
    },
    showDialogPractices() {
      this.dialogVisiblePractices = true
    },
    showDialogStudents() {
      this.dialogVisibleStudents = true
    },
    showUserAuth() {
      this.authVisible = true
    }
  }
}
</script>

<style>
button {
  padding: 0;
}

html, body {
  margin: 0;
  padding: 0;
  height: 100vh;
  line-height: 1;
  font-size: 14px;
  background-color: whitesmoke;
  font-family: 'Montserrat', serif;
}

.wrapper {
  height: 100vh;
  display: grid;
  grid-template-rows: 1fr 7fr;
}

.wrapper h2 {
  font-size: 24px;
  text-align: center;
  vertical-align: center;
}

.wrapper .mode h2 {
  color: #80002f;
}

.nav-menu {
  padding: 10px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10%;
  background: #dcdcdc;
}

.mainBody {
  display: grid;
  grid-template-rows: 1fr 6fr;
}

.mainBody .info-panel {
  display: grid;
  grid-template-columns: 3fr 3fr 3fr;
}

.mainBody .info-panel .item * {
  max-height: 35px;
  border: 2px solid red;
}

.mainBody .teacher {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  overflow: auto;
}

.info-panel h1 {
  display: flex;
  align-items: center;
  justify-content: center;
}

.info-panel .info-panel-content {
  padding: 10px;
}

.info-panel-content {
  border: 1px solid darkgrey;
  border-radius: 20px;
  margin-bottom: 20px;
  overflow: hidden;
}

.info-panel > :hover {
  border: none;
  border-radius: 20px;
  box-shadow: 0 0 0 4px black;
}

.create-group-btn,
.create-practice-btn,
.create-student-btn {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
