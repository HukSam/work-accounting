import { defineStore } from 'pinia'

export const checkOfRegistration = defineStore('auth', {
  state: () => {
    return {
      uid :  localStorage.uid || null
    }
  },
  getters: {
    isLogged(){
      return !!this.uid
    }
  },
  actions: {
    setUid(uid) {
      this.uid = uid
      localStorage.uid = uid
    }
  },
})
