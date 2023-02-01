<template>
  <div v-if="groups.length > 0">
    <h3>Список групп</h3>
    <group-item
      v-for="group in groups"
      :key="group.id"
      :group="group"
      :rights="rights"
      @remove="$emit('remove',group)"
    />
  </div>
  <h2 v-else>
    Список команд пуст
  </h2>
</template>

<script>
import GroupItem from '@/components/GroupItem.vue'

export default {
  components: {
    GroupItem
  },
  data() {
    return {
      studentPractice:
        []
    }
  },
  props: {
    groups: {
      type: Array,
      required: true
    },
    rights: {
      type: String,
      required: true
    }
  }

}
</script>

<style scoped>
h2 {
  color: #80002f;
}

h3 {
  margin-left: 10px;
}
</style>
