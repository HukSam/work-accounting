<template>
  <div v-if="show" class="dialog" @click.stop="hideDialog">
    <div class="dialog-content" @click.stop>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'my-dialog',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    hideDialog() {
      this.$emit('update:show', false)
    }
  }
}
</script>

<style scoped>

.dialog {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  display: flex;

  background: rgba(0, 0, 0, 0.3);
}

.dialog-content {
  min-width: 300px;
  min-height: 50px;
  margin: auto;
  padding: 15px;

  background: white;
  border-radius: 12px;
}
</style>
