<template>
    <div class="group">
      <div class="group-data">
        <div class="strong"><strong>Имя - </strong>{{ studentInGroup.name }}</div>
        <div class="strong"><strong>Баллы: {{ studentInGroup.points }}</strong></div>
      </div>
      <div class="group-btns">
        <div>
          <button
          @click="removeStudentFromGroup()"
          @remove="$emit('remove',studentInGroup)"
          >
            <img alt="edit" src="../assets/img/close.png"/>
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import MyDialog from '@/components/UI/MyDialog.vue'
  import StudentInfo from '@/components/StudentInfo.vue'
  
  export default {
    name: 'students-without-group-item',

    components: {
      MyDialog,
      StudentInfo
    },
    data() {
      return {
        studentInfo: false,
      }
    },
    props: {
      studentInGroup: {
        type: Object,
        required: true
      }
    },
    methods: {
      removeStudentFromGroup() {
        this.$emit('remove',studentInGroup)
        console.log('remove Student From Group');
      }
    }
  }
  </script>
  
  <style scoped>
  
  .group {
    display: grid;
  
    grid-template-columns:8fr 1fr;
  
    height: 50px;
  
    border: 2px solid #dcdcdc;
  }
  
  .group-data {
    display: grid;
    grid-template-columns: 2fr 1fr;
  }
  
  .group-data * {
    display: flex;
    justify-content: left;
    align-items: center;
  
    max-height: 46px;
  }
  
  .strong {
    height: 100%;
  
    border-right: 2px solid #dcdcdc;
  }
  
  .strong:nth-child(3n) {
    border-right: none;
  }
  
  div strong {
    margin: 10px;
  
  }
  
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
  