<template>
  <div class="wrapper-student-info-add">
    <h2>Информация о группе</h2>
    <my-button
      class="btn-add-student"
      @click="showDialog"
    >
      Добавить студента
    </my-button>
    <my-dialog
      :show="dialogVisible"
    >
      <student-form
        @create="createStudent"
      />
    </my-dialog>

    <student-list
      :students="students"
      @remove="removeStudent"
    />
  </div>
</template>

<script>
import StudentForm from '@/components/StudentForm.vue'
import StudentList from '@/components/StudentList.vue'
import MyDialog from '@/components/UI/MyDialog.vue'
import MyButton from '@/components/UI/MyButton.vue'

export default {
  components: {
    StudentForm,
    StudentList,
    MyDialog,
    MyButton
  },
  data() {
    return {
      students:
        [],
      //dialogVisible: false
    }
  },
  props: {
    groups: {
      type: Object,
      required: true
    },
    rights: {
      type: String,
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
