<template>
  <div class="group">
    <div class="group-data">
      <div class="strong"><strong>Лидер: </strong>{{ group.leadName }}</div>
      <div class="strong"><strong>Оценки</strong></div>
      <div class="strong"><strong>Баллы: {{ group.points }}</strong></div>
    </div>
    <div class="group-btns">
      <div>
        <button
          @click="showGroupInfo"
        >
          <img alt="see" src="../img/see.png">
        </button>
        <my-dialog
          v-model:show="groupInfo"
        >
          <group-info :groups="group" rights="">

          </group-info>
        </my-dialog>
      </div>

      <div >
        <button
          @click="$emit('remove', group)"
        >
          <img alt="see" src="../img/close.png">
        </button>
      </div>

    </div>

  </div>
</template>

<script>
import GroupInfo from '@/components/GroupInfo'
import MyDialog from '@/components/UI/MyDialog'

export default {
  components: {
    GroupInfo,
    MyDialog
  },
  data () {
    return {
      groupInfo: false
    }
  },

  props: {
    group: {
      type: Object,
      required: true
    },
    rights: {
      type: String,
      required: true
    }
  },

  methods: {
    showGroupInfo () {
      this.groupInfo = true
    }
  }
}
</script>

<style scoped>

.group {
  border: 2px solid #c0c0c0;
  display: grid;
  grid-template-columns:8fr 2fr;
  min-height: 50px;
}

.group-data {
  display: grid;
  grid-template-columns: 3fr 1fr 1fr;

}

.group-data * {
  display: flex;
  align-items: center;
  justify-content: left;
}

.group-btns {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.strong {
  border-right: 2px solid #c0c0c0;
  height: 100%;
}

.strong:nth-child(3n) {
  border-right: none;
}

div strong {
  margin: 10px;

}

button {
  border-radius: 50px;
  border: none;
  background: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

img {
  max-width: 40px;
  min-width: 40px;
}
</style>
