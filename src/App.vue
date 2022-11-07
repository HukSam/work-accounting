<template>
  <div class="app">
    <div class="wrapper">
      <div class="nav-menu">
        <div class="item group"><h2>ГРУППА: О-20-ПРИ</h2></div>
        <div class="item mode"><h2>РЕЖИМ:</h2></div>
        <div class="search-input">
          <my-input
            type="search"
            v-model="searchingStudent"
            aria-autocomplete="none"
            @input="searchedStudents"
          />
          <div
            v-if="filteredStudents"
            @click="showStudentInfoSearch"
          >
            <ul>
              <li
                v-for="filteredStudent in filteredStudents"
                :key="filteredStudent.id"
                @click="setStudent(filteredStudent)"

              >
                {{filteredStudent.name}}
              </li>
            </ul>
          </div>
        </div>
        <div class="item auth">
          <my-button
            @click="showUserAuth"
          >
            <span>
              ВХОД / РЕГИСТРАЦИЯ
            </span>
            <img src="./img/sign-in.png" alt="signIn"/>
          </my-button>
          <my-dialog :show="authVisible">
            <registration-form
              @hide="regHide"
              :students="students"
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
              rights="user.rights"
              @remove="removeGroup"/>
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
                :studentInfoSearch="studentInfoSearch"
                :groups="groups"
                :rights="user.rights"
                :students="students"
                :practices="practices"
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
import MyInput from '@/components/UI/MyInput'
import RegistrationForm from '@/components/RegistrationForm'
import { arrayUnion, doc, onSnapshot, updateDoc } from 'firebase/firestore'
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
    MyInput,
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
      searchQuery:'',
      filteredStudents: [],
      searchingStudent: '',
      practices: [],
      dialogVisibleGroups: false,
      dialogVisiblePractices: false,
      dialogVisibleStudents: false,
      authVisible: false,
      studentInfoSearch: false,
      groupIndex: 0,
      studentIndex: 0
    }
  },
  mounted() {
    this.loadData()
    this.subscribePractice()
    this.subscribeStudent()
    this.subscribeGroup()
    this.filterStudents()
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
    showStudentInfoSearch() {
      this.studentInfoSearch = true
    },
    filterStudents () {
      if (this.searchingStudent.length === 0) {
        this.filteredStudents = this.students
      }
    },
    searchedStudents () {
      this.filteredStudents = this.students.filter(searchingStudent => {
        return searchingStudent.name.toLowerCase().startsWith(this.searchingStudent.toLowerCase())
      })
    },
    setStudent(searchingStudent) {
      this.searchingStudent = searchingStudent.name
    },
    async createGroup(group) {
      await updateDoc(doc(db, 'university', 'bstu'), {
        groups: arrayUnion(group)
      })
      this.dialogVisibleGroups = false
    },
    async removeGroup(group) {
      this.groups = this.groups.filter(g => g.id !== group.id)
      const userGroup = doc(db, 'university', 'bstu')
      await updateDoc(userGroup, {
        groups: this.groups
      })
    },
    subscribeGroup() {
      onSnapshot(doc(db, 'university', 'bstu'), (doc)=>{
        this.groups = doc.data().groups
      })
    },
    async createStudent(student) {
      await updateDoc(doc(db, 'university', 'bstu'), {
        students: arrayUnion(student)
      })
      this.dialogVisibleStudents = false
    },
    async removeStudent(student) {
      this.students = this.students.filter(g => g.id !== student.id)
      const userStudent = doc(db, 'university', 'bstu')
      await updateDoc(userStudent, {
        students: this.students
      })
    },
    subscribeStudent() {
      onSnapshot(doc(db,'university', 'bstu'), (doc)=>{
        this.students = doc.data().students
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
    },
    regHide() {
      this.authVisible = false
    }
  }
}
</script>

<style>
*{
  box-sizing: border-box;
}
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
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
  background: #dcdcdc;
}

.nav-menu input {
  max-width: 280px;
  max-height: 40px;
  border: none;
}

.mainBody {
  display: grid;
  grid-template-rows: 1fr 6fr;
}

.mainBody .info-panel {
  display: grid;
  grid-template-columns: 3fr 3fr 3fr;
}

.nav-menu .auth .btn img{
  display: none;
}

.nav-menu .auth{
  margin-left: 200px;
  max-width: 300px;
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

.search-input {
  position: relative;
  max-width: 200px;
}

.search-input li {
  list-style-type: none;
  padding: 5px;
}

.search-input ul {
  margin: 0;
}

.search-input div {
  width: 200px;
  position: absolute;
  background: white;
  cursor: pointer;
}

@media (max-width: 1310px) {
  .mainBody .info-panel {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto auto;
  }
}
@media (max-width: 970px) {
  .mainBody .info-panel {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
  }
  .nav-menu .auth{
    margin-left: 0;
    max-width: 300px;
  }
}

@media (max-width: 625px) {
  .nav-menu .auth .btn img{
    display: inline-block;
    max-height: 30px;
  }
  .nav-menu .auth span{
    display: none;
  }

}

@media (max-width: 530px){
  .nav-menu .auth .btn img{
    display: inline-block;
    max-height: 30px;
  }
  .nav-menu .auth .btn{
    padding: 0 20px;
    margin: 0;
  }
  .nav-menu .auth {
    margin: auto;
  }
  .nav-menu {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto auto auto;
  }
}
@media (max-width:450px){
  .nav-menu .auth {
    max-width: 15%;
  }
  .nav-menu {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
  }
  .nav-menu .group h2,
  .nav-menu .mode h2
  {
    font-size: 18px;
    margin: 5px;
  }
  .nav-menu .auth span{
    display: none;
  }
  .nav-menu .auth .btn img{
    display: inline-block;
    max-height: 30px;
  }
  .nav-menu .auth .btn{
    padding: 0 20px;
    margin: 0;
  }
  .nav-menu .auth {
    margin: auto;
  }
  .mainBody .info-panel {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
  }
}

</style>
