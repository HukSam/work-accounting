import { createApp } from 'vue'
import App from './App.vue'
import components from '@/components/UI'
import { getFirestore } from 'firebase/firestore'
import { initializeApp } from 'firebase/app'
const app = createApp(App)

components.forEach(component => {
  app.component(component.name, component)
})

const firebaseConfig = {
  apiKey: 'AIzaSyBoFj1JhcaHurQbCfTUwiqAGMuSdqhisbI',
  authDomain: 'online-score-accounting.firebaseapp.com',
  databaseURL: 'https://online-score-accounting-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'online-score-accounting',
  storageBucket: 'online-score-accounting.appspot.com',
  messagingSenderId: '812117439420',
  appId: '1:812117439420:web:3871cecb02ccca982df1b9'
}

initializeApp(firebaseConfig)

export const db = getFirestore()

app.mount('#app')
