import { defineStore } from 'pinia'

export const connectGroupStudents = defineStore('auth', {
  state: () => {
    return {
      student: student
    }
  },
  getters: {
    isLogged(){
      return this.student
    }
  },
  actions: {
    selectStudent(stundet) {
      this.student = student
    },
  },
})
