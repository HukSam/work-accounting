<template>
  <div class="wrapper-student-info-add">
    <h2>Информация о группе</h2>
    <students-group-list
      :students="students"
      :studentsInGroup="studentsInGroup"
      :group="group"
      @remove="removeStudent" 
    />
  </div>
</template>

<script>
import StudentForm from '@/components/StudentForm.vue'
import StudentsGroupList from '@/components/StudentsGroupList.vue'
import MyDialog from '@/components/UI/MyDialog.vue'
import MyButton from '@/components/UI/MyButton.vue'


export default {
  components: {
    StudentForm,
    StudentsGroupList,
    MyDialog,
    MyButton
  },
  data() {
    return {
      //dialogVisible: false
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
  name: 'group-info',
  methods: {}
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;

  font-size: 30px;
}

img {
  min-width: 25px;
  max-width: 25px;
}

.wrapper-student-info-add {
  display: grid;
}

.btn-add-student {
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
