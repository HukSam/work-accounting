<template>
  <div class="practice">
    <div class="practice-data">
      <div class="strong">{{ practice.name }}</div>
      <div class="strong wrapper-points"><strong>Баллы: {{ practice.points }}</strong></div>
      <div class="strong"><input id="result" type="submit" value="Введите значение"/></div>
    </div>
    <div class="practice-btns">
      <div>
        <button id="done-btn"
                @click="confirmPoints"
        >
          <img alt="OK" src="../assets/img/doneEditStudent.png"/>
        </button>
        <slot>
        </slot>
      </div>
      <div>
        <button
          @click="removePractice()"
        >
          <img alt="X" src="../assets/img/close.png"/>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'

const practiceInfo = ref(false)
const props = defineProps({
	practice: {
		type: Object,
		required: true
	}
})
const emit = defineEmits(['hide'])

const confirmPoints = (practice) => {
	document.getElementById('edit-btn').style.display = 'inline'
	document.getElementById('done-btn').style.display = 'none'
	practice.points = document.getElementById('result').value
	document.getElementsByClassName('wrapper-points').innerHTML += document.getElementById('result').value
	console.log(practice.points)
}
const removePractice = async(practice) => {
	emit('remove', practice)
}
</script>

<style scoped>


.practice {
  display: grid;

  grid-template-columns:8fr 2fr;

  height: 50px;

  border: 2px solid #c0c0c0;
}

.practice-data {
  display: grid;

  grid-template-columns: 4fr 2fr 1fr;
}

.practice-data * {
  display: flex;
  justify-content: center;
  align-items: center;

  max-height: 46px;
}

.practice-btns {
  display: grid;

  grid-template-columns: 1fr 1fr;
}

.strong {
  height: 100%;
  margin-left: 10px;
  padding-right: 10px;

  border-right: 2px solid #c0c0c0;
}

.strong:nth-child(3n) {
  border-right: none;
}

button {
  background: none;
  border: none;
  border-radius: 50px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

  cursor: pointer;
}

#result {
  display: none;
}

#done-btn {
  display: none;
}

img {
  min-width: 40px;
  max-width: 40px;
  padding: 5px;
}
</style>
