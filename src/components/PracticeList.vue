<template>
  <div v-if="practices.length > 0">
    <h3>Список практик</h3>
    <practice-item
      v-for="practice in practices"
      :practice="practice"
      :key="practice.id"
      @remove="$emit('remove',practice)"
     ></practice-item>
  </div>
  <h2 style="color:#80002f" v-else>
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
