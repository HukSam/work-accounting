<template>
  <div class="practice">
    <div class="practice-data">
      <div class="strong">{{ practice.name }}</div>
      <div class="strong"><strong>Оценка -</strong></div>
      <div class="strong wrapper-points"><strong>Баллы: </strong></div>
      <div class="strong"><input id="result" type="submit" value="Введите значение"/></div>
    </div>
    <div class="practice-btns">
      <div>
        <button id="done-btn"
                @click="confirmPoints"
        >
          <img alt="see" src="../img/doneEditStudent.png"/>
        </button>
        <button id="edit-btn"
                @click="editPoints"
        >
          <img alt="see" src="../img/edit.png"/>
        </button>
      </div>
      <div>
        <button
          @click="removePractice()"
        >
          <img alt="see" src="../img/close.png"/>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// import MyDialog from '@/components/UI/MyDialog'

export default {
  components: {
    // MyDialog
  },
  data() {
    return {
      practiceInfo: false
    }
  },
  props: {
    practice: {
      type: Object,
      required: true
    }
  },
  methods: {
    editPoints() {
      document.getElementById('result').style.display = 'inline'
      document.getElementById('result').type = 'text'
      document.getElementById('done-btn').style.display = 'inline'
      document.getElementById('edit-btn').style.display = 'none'
    },
    confirmPoints(practice) {
      document.getElementById('edit-btn').style.display = 'inline'
      document.getElementById('done-btn').style.display = 'none'
      practice.points = document.getElementById('result').value
      document.getElementsByClassName('wrapper-points').innerHTML += document.getElementById('result').value
      console.log(practice.points)
    },
    async removePractice(practice) {
      this.$emit('remove', practice)
    }
  }
}
</script>

<style scoped>

.practice {
  border: 2px solid #c0c0c0;
  display: grid;
  grid-template-columns:8fr 2fr;
}

.practice-data {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}

.practice-data * {
  display: flex;
  align-items: center;
  justify-content: center;
}

.practice-btns {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.strong {
  border-right: 2px solid #c0c0c0;
  height: 100%;
  margin-left: 10px;
  padding-right: 10px;
}

.strong:nth-child(3n) {
  border-right: none;
}

button {
  border-radius: 50px;
  border: none;
  background: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.wrapper-points {
  display: none;
}

#result {
  display: none;
}

#done-btn {
  display: none;
}

img {
  padding: 5px;
  max-width: 35px;
  min-width: 35px;
}
</style>
