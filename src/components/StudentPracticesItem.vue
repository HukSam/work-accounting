<template>
  <div class="practice">
    <div class="practice-data">
      <div class="strong">{{ studentPractice.name }}</div>
      <div class="strong"><strong>Оценка -</strong></div>
      <div class="strong wrapper-points"><strong>Баллы: </strong></div>
      <div class="strong"><input id="result" type="submit" value="Введите значение"/></div>
    </div>
  </div>
</template>

<script>

export default {
  components: {
  },
  data() {
    return {
      practiceInfo: false
    }
  },
  props: {
    studentPractice: {
      type: Object,
      required: true
    }
  },
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
