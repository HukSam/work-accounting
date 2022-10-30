<template>
  <div v-if="practices.length > 0">
    <h3>Список практик</h3>
    <student-practices-item
      v-for="studentPractice in studentPractises"
      :key="studentPractice.id"
      :studentPractice="studentPractice"
      @remove="$emit('remove',studentPractice)"
    />
  </div>
  <h2 v-else style="color:#80002f">
    Список практик пуст
  </h2>
</template>

<script>
import StudentPracticesItem from '@/components/StudentPracticesItem'

export default {
  components: {
    StudentPracticesItem
  },
  props: {
    practices: {
      type: Array,
      required: true
    },
    studentPractises: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
