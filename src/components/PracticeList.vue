<template>
  <div v-if="practices.length > 0">
    <h3>Список практик</h3>

    <practice-item
      v-for="practice in practices"
      :key="practice.id"
      :practice="practice"
      @remove="$emit('remove',practice)"
    >
      <button
        id="edit-btn"
        @click="editPoints"
      >
        <img alt="edit" src="../assets/img/edit.png"/>
      </button>
    </practice-item>
  </div>

  <h2 v-else style="color:#80002f">
    Список практик пуст
  </h2>
</template>

<script>
import PracticeItem from '@/components/PracticeItem.vue'

export default {
  components: {
    PracticeItem
  },
  props: {
    practices: {
      type: Array,
      required: true
    }
  },
  methods: {
    editPoints() {
      document.getElementById('result').style.display = 'inline'
      document.getElementById('result').type = 'text'
      document.getElementById('done-btn').style.display = 'inline'
      document.getElementById('edit-btn').style.display = 'none'
    }
  }
}
</script>


<style scoped>
button {
  background: none;
  border: none;
  border-radius: 50px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

  cursor: pointer;
}

img {
  min-width: 40px;
  max-width: 40px;
  padding: 5px;
}
</style>
