<template>
  <div class="group">
    <div class="group-data">
      <div class="strong"><strong>Лидер: </strong>{{ group.leadName }}</div>
      <div class="strong"><strong>Баллы: {{ group.points }}</strong></div>
    </div>
    <div class="group-btns">
      <div>
        <button
          @click="showGroupInfo"
        >
          <img alt="see" src="../assets/img/see.png"/>
        </button>
        <my-dialog
          v-model:show="groupInfo"
        >
          <group-info :groups="group" rights=""/>
        </my-dialog>
      </div>

      <div>
        <button
          @click="removeGroup()"
        >
          <img alt="see" src="../assets/img/close.png"/>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import GroupInfo from '@/components/GroupInfo.vue'
import MyDialog from '@/components/UI/MyDialog.vue'

export default {
  components: {
    GroupInfo,
    MyDialog
  },
  data() {
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
    showGroupInfo() {
      this.groupInfo = true
    },
    async removeGroup(group) {
      this.$emit('remove', group)
    }
  }
}
</script>

<style scoped>

.group {
  display: grid;

  grid-template-columns:8fr 2fr;

  height: 50px;

  border: 2px solid #c0c0c0;
}

.group-data {
  display: grid;

  grid-template-columns: 3fr 2fr;

}

.group-data * {
  display: flex;
  justify-content: left;
  align-items: center;
}

.group-btns {
  display: grid;

  grid-template-columns: 1fr 1fr;
}

.strong {
  height: 100%;

  border-right: 2px solid #c0c0c0;
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
}

@media (max-width: 390px) {
  .group-data {
    grid-template-columns: 2fr;
    grid-template-rows: auto;
  }

  .group-btns {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }
}
</style>
