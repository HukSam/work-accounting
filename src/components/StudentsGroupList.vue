<template>

    <div v-if="studentsInGroup.length > 0">
      <h3>Студенты в данной группе</h3>
      <students-in-group-item
        v-for="studentInGroup in studentsInGroup"
        :key="studentInGroup.id"
        :group="group"
        :studentInGroup="studentInGroup"
        @add="addStudentToGroup"
      />
    </div>
    <h4 v-else style="color:#80002f">
      Список студентов в данной группе пуст
    </h4>

    <div v-if="students.length > 0">
      <h3>Список всех студентов</h3>
      <students-without-group-item
        v-for="student in students"
        :key="student.id"
        :group="group"
        :student="student"
        @remove="removeStudentFromGroup"
      />
    </div>
    <h4 v-else style="color:#80002f">
      Список студентов пуст
    </h4>
    
  </template>
  
  
  <script>
  import StudentsInGroupItem from '@/components/StudentsInGroupItem.vue';
  import StudentsWithoutGroupItem from '@/components/StudentsWithoutGroupItem.vue';
  
  export default {
    name: 'students-group-list',
    
    components: {
        StudentsInGroupItem,
        StudentsWithoutGroupItem
    },
    data() {
      return {
      }
    },
    props: {
      group: {
        type: Object,
        required: true
      },
      students: {
        type: Array,
        required: true
      },
      studentsInGroup: {
        type: Array,
        required: true
      }
    },
    methods: {
      addStudentToGroup(student) {
        console.log('add Student To Group1');
        this.studentsInGroup.push(student)
        console.log(this.studentsInGroup)
        this.students.splice(this.students.indexOf(student))
        console.log(this.students)
      },
      removeStudentFromGroup(studentInGroup) {
        console.log('remove Student From Group');
        this.students.push(studentInGroup)
        console.log(this.students)
        this.studentsInGroup.splice(this.studentsInGroup.indexOf(studentInGroup))
        console.log(this.studentsInGroup);
      }

    }
  }
  </script>
  
  <style scoped>

  h4 {
    margin-top: 0px;
  }
  </style>
  