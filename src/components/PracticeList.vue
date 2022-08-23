<template>
  <div v-if="practices.length > 0">
    <h3>Список практик</h3>
    <practice-item
      v-for="practice in practices"
      :key="practice.id"
      :practice="practice"
      @remove="$emit('remove',practice)"
    />
  </div>
  <h2 v-else style="color:#80002f">
    Список практик пуст
  </h2>
</template>

<script>
import PracticeItem from '@/components/PracticeItem'

export default {
  components: {
    PracticeItem
  },
  props: {
    practices: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
