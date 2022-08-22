<template>
  <div v-if="students.length > 0">
    <h3>Список учеников</h3>
    <student-item
      v-for="student in students"
      :student="student"
      :key="student.id"
      @remove="$emit('remove',student)"
    ></student-item>
  </div>
  <h2 style="color:#80002f" v-else>
    Список студентов пуст
  </h2>
</template>

<script>
import StudentItem from '@/components/StudentItem'
export default {
  components: {
    StudentItem
  },
  props: {
    students: {
      type: Array,
      required: true
    }
  }
}
</script>

-
<style scoped>

</style>
