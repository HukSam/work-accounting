<template>
  <div v-if="students.length > 0">
    <h3>Список учеников</h3>
    <student-item
      v-for="student in students"
      :key="student.id"
      :practices="practices"
      :student="student"
      @remove="$emit('remove',student)"
    />
  </div>
  <h2 v-else style="color:#80002f">
    Список студентов пуст
  </h2>
</template>


<script>
import StudentItem from '@/components/StudentItem.vue'

export default {
  components: {
    StudentItem
  },
  props: {
    students: {
      type: Array,
      required: true
    },
    practices: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped></style>
