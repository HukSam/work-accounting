<template>
  <div class="wrapper-practice-info-add">
    <h2>Информация о студенте</h2>
    <my-button class="btn-add-practice"
      @click="showDialog"
    >
      Добавить практику
    </my-button>
    <my-dialog v-model:show="dialogVisible">
      <practice-list
        @remove="removePractice"
        :practices="practices"
      >
      </practice-list>
    </my-dialog>

  </div>
</template>

<script>
import PracticeList from '@/components/PracticeList'
import MyDialog from '@/components/UI/MyDialog'
import MyButton from '@/components/UI/MyButton'
import { deleteField, doc, updateDoc } from 'firebase/firestore'
import { db } from '@/main'

export default {
  components: {
    PracticeList,
    MyDialog,
    MyButton
  },
  data () {
    return {
      dialogVisible: false
    }
  },
  props: {
    student: {
      type: Object,
      required: true
    },
    props: {
      practice: {
        type: Array,
        required: true
      }
    }
  },
  name: 'practice-info',
  methods: {
    async removePractice (practice) {
      this.practices = this.practices.filter(g => g.id !== practice.id)
      const userDel = doc(db, 'practices', 'BwRAab6s5Z1J7b73ovgA')
      await updateDoc(userDel, {
        practice: deleteField()
      })
    },
    showDialog () {
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
