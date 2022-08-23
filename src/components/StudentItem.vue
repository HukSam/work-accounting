<template>
  <div class="group">
    <div class="group-data">
      <div class="strong"><strong>Фамилия - </strong>{{ student.name }}</div>
      <div class="strong"><strong>Оценка - </strong></div>
      <div class="strong"><strong>Баллы: {{ student.points }}</strong></div>
    </div>
    <div class="group-btns">
      <div>
        <button
          @click="showStudentInfo"
        >
          <img alt="edit" src="../img/edit.png"/>
        </button>
        <my-dialog
          v-model:show="studentInfo"
        >
          <practice-info :student="student"/>
        </my-dialog>
      </div>
      <div>
        <button
          @click="$emit('remove', student)"
        >
          <img alt="see" src="../img/close.png"/>
        </button>
      </div>
    </div>


  </div>
</template>

<script>
import MyDialog from '@/components/UI/MyDialog'
import PracticeInfo from '@/components/StudentInfo'

export default {
  components: {
    MyDialog,
    PracticeInfo
  },
  data() {
    return {
      studentInfo: false
    }
  },
  props: {
    student: {
      type: Object,
      required: true
    }
  },
  methods: {
    showStudentInfo() {
      this.studentInfo = true
    }
  }
}
</script>

<style scoped>

.group {
  border: 2px solid #dcdcdc;
  display: grid;
  grid-template-columns:8fr 2fr;
  min-height: 50px;
}

.group-data {
  display: grid;
  grid-template-columns: 3fr 1fr 2fr;
}

.group-data * {
  display: flex;
  align-items: center;
  justify-content: left;
}

.group-btns {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.strong {
  border-right: 2px solid #dcdcdc;
  height: 100%;
}

.strong:nth-child(3n) {
  border-right: none;
}

div strong {
  margin: 10px;

}

button {
  border-radius: 50px;
  border: none;
  background: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

img {
  padding: 5px;
  max-width: 35px;
  min-width: 35px;
}
</style>
