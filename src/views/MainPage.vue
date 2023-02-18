<template>
  <div class="app">
    <div class="wrapper">
      <div class="nav-menu">
        <div class="item group"><h2>ГРУППА: О-20-ПРИ</h2></div>

        <div class="item mode"><h2>РЕЖИМ:</h2></div>

        <div class="search-input">
          <my-input
            v-model="searchingStudent"
            aria-autocomplete="none"
            type="search"
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
                {{ filteredStudent.name }}
              </li>
            </ul>
          </div>
        </div>

        <div class="item auth">
          <div
            v-if="userStore.isLogged"
            class="userLoggedwrapper"
          >
            <button
              @click="showAccountVisible"
            >
              <img alt="account" class="accountImg" src="@/assets/img/account.png"/>
            </button>

            <my-dialog
              :show="accountVisible"
              @click="hideAccountVisible"
            >
              <account-info
                @accountSignOut="userSignOut"
              />
            </my-dialog>
          </div>

          <div v-else
               class="anonUserWrapper"
          >
            <my-button
              @click="showUserSignIn"
            >
              <span class="authOrReg">
                ВХОД
              </span>
              <img alt="signIn" src="@/assets/img/sign-in.png"/>
            </my-button>

            <my-dialog
              :show="signInVisible"
              @click="SingInHide"
            >
              <sign-in-form
                @hide="SingInHide"
              />
            </my-dialog>

            <my-button
              @click="showUserAuth"
            >
              <span class="authOrReg">
                РЕГИСТРАЦИЯ
              </span>
              <img alt="signIn" src="@/assets/img/sign-in.png"/>
            </my-button>
            <my-dialog
              :show="authVisible"
              @click="regHide"
            >
              <registration-form
                @hide="regHide"
              />
            </my-dialog>
          </div>
        </div>
      </div>

      <div class="mainBody">
        <div class="item teacher"><h2>Преподаватель: Коптенок Е.В.</h2></div>
        <div class="item info-panel">
          <div class="info-panel-content block-add-group">
            <h1>Команды</h1>
            <my-button
              class="create-group-btn"
              @click="showDialogGroups"
            >
              Добавить команду
            </my-button>
            <my-dialog
              :show="dialogVisibleGroups"
              @click="hideDialogGroups"
            >
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
              class="create-practice-btn"
              @click="showDialogPractices"
            >
              Добавить практику
            </my-button>
            <my-dialog
              :show="dialogVisiblePractices"
              @click="hideDialogPractices"
            >
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
              class="create-student-btn"
              @click="showDialogStudents"
            >
              Добавить студента
            </my-button>
            <my-dialog
              :show="dialogVisibleStudents"
              @click="hideDialogStudents"
            >
              <student-form
                :rights="user.rights"
                @create="createStudent"
              />
            </my-dialog>
            <div class="wrapper-groups">
              <student-list
                :groups="groups"
                :practices="practices"
                :rights="user.rights"
                :studentInfoSearch="studentInfoSearch"
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
import StudentForm from '@/components/StudentForm.vue'
import StudentList from '@/components/StudentList.vue'
import PracticeForm from '@/components/PracticeForm.vue'
import PracticeList from '@/components/PracticeList.vue'
import GroupForm from '@/components/GroupForm.vue'
import MyButton from '@/components/UI/MyButton.vue'
import MyDialog from '@/components/UI/MyDialog.vue'
import MyInput from '@/components/UI/MyInput.vue'
import RegistrationForm from '@/components/UI/User/RegistrationForm.vue'
import { arrayUnion, doc, onSnapshot, updateDoc } from 'firebase/firestore'
import { db } from '@/main'
import GroupList from '@/components/GroupList.vue'
import { checkOfRegistration } from '@/stores/checkOfRegistration'
import AccountInfo from '@/components/AccountInfo.vue'
import SignInForm from '../components/UI/User/SignIn.vue'
import ChangeEmail from '@/components/ChangeEmail.vue'

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
    RegistrationForm,
    AccountInfo,
    SignInForm,
    ChangeEmail
  },

  setup: () => ({
    userStore: checkOfRegistration(),
  }),

  data() {
    return {
      uid: '',
      user: {},
      groups: [],
      students: [],
      searchQuery: '',
      filteredStudents: [],
      searchingStudent: '',
      practices: [],
      dialogVisibleGroups: false,
      dialogVisiblePractices: false,
      dialogVisibleStudents: false,
      authVisible: false,
      accountVisible: false,
      changeUserEmail: false,
      signInVisible: false,
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
    filterStudents() {
      if (this.searchingStudent.length === 0) {
        this.filteredStudents = this.students
      }
    },
    searchedStudents() {
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
      onSnapshot(doc(db, 'university', 'bstu'), (doc) => {
        if (doc.exists()) {
          this.groups = doc.data().groups
        }
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
      onSnapshot(doc(db, 'university', 'bstu'), (doc) => {
        if (doc.exists()) {
          this.students = doc.data().students
        }
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
        if (doc.exists()) {
          this.practices = doc.data().practices
        }
      })
    },
    userSignOut() {
      localStorage.clear()
      this.userStore.$reset()
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
    showUserSignIn() {
      this.signInVisible = true
    },
    showAccountVisible() {
      this.accountVisible = true
    },
    showChangeEmail() {
      this.changeUserEmail = true
    },
    hideChangeEmail() {
      this.changeUserEmail = false
    },
    hideDialogGroups() {
      this.dialogVisibleGroups = false
    },
    hideDialogPractices() {
      this.dialogVisiblePractices = false
    },
    hideDialogStudents() {
      this.dialogVisibleStudents = false
    },
    hideUserAuth() {
      this.authVisible = false
    },
    hideAccountVisible() {
      this.accountVisible = false
    },
    regHide() {
      this.authVisible = false
    },
    SingInHide() {
      this.signInVisible = false
    }
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}

button {
  padding: 0;
}

html, body {
  height: 100vh;
  margin: 0;
  padding: 0;

  font-family: 'Montserrat', serif;
  font-size: 14px;
  line-height: 1;

  background-color: whitesmoke;
}

.wrapper {
  display: grid;

  grid-template-rows: 1fr 7fr;

  height: 100vh;
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
  display: grid;

  grid-gap: 10px;
  grid-template-columns: repeat(4, 1fr);

  padding: 10px;

  background: #dcdcdc;
}

.nav-menu input {
  max-width: 280px;
  max-height: 40px;

  border: none;
}

.anonUserWrapper {
  display: grid;

  grid-template-columns: 1fr 1fr;
}

.mainBody {
  display: grid;

  grid-template-rows: 1fr 6fr;
}

.mainBody .info-panel {
  display: grid;

  grid-template-columns: 1fr 1fr 1fr;
}

.nav-menu .auth .btn {
  font-size: 12px;
  font-weight: bold;
  color: black;

  background: #dcdcdc;
}

.nav-menu .auth .btn img {
  display: none;
}

.nav-menu .auth {
  display: grid;

  grid-template-columns: 1fr 1fr;

  max-width: 300px;
  margin-left: 200px;
}

.mainBody .info-panel .item * {
  max-height: 35px;

  border: 2px solid red;
}

.mainBody .teacher {
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
  overflow: auto;
}

.info-panel h1 {
  display: flex;
  justify-content: center;
  align-items: center;
}

.info-panel-content {
  margin-bottom: 20px;
  overflow: hidden;

  border: 1px solid darkgrey;
  border-radius: 20px;
}

.info-panel .info-panel-content {
  padding: 10px;
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
  justify-content: center;
  align-items: center;
}

.search-input {
  position: relative;

  max-width: 200px;
}

.search-input li {
  padding: 5px;

  list-style-type: none;
}

.search-input ul {
  margin: 0;
}

.search-input div {
  position: absolute;

  width: 200px;

  background: white;

  cursor: pointer;
}

.userLoggedwrapper button {
  min-width: 40px;
  min-height: 40px;
  margin-top: 15px;
  padding: 0;

  font-size: 18px;
  font-weight: bold;
  color: black;

  background: none;
  border: none;
}

.accountImg {
  width: 40px;
}

.accountImg:hover {
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

  .nav-menu .auth {
    max-width: 300px;
    margin-left: 0;
  }
}

@media (max-width: 625px) {
  .nav-menu .auth .btn img {
    display: inline-block;

    max-height: 30px;
  }

  .nav-menu .auth span {
    display: none;
  }

}

@media (max-width: 530px) {
  .nav-menu .auth .btn img {
    display: inline-block;

    max-height: 30px;
  }

  .nav-menu .auth .btn {
    margin: 0;
    padding: 0 20px;
  }

  .nav-menu .auth {
    margin: auto;
  }

  .nav-menu {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto auto auto;
  }
}

@media (max-width: 450px) {
  .nav-menu .auth {
    max-width: 15%;
    margin: auto;
  }

  .nav-menu {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
  }

  .nav-menu .group h2,
  .nav-menu .mode h2 {
    margin: 5px;

    font-size: 18px;
  }

  .nav-menu .auth span {
    display: none;
  }

  .mainBody .info-panel {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
  }
}

</style>
