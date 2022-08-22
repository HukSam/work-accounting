<template>
  <div>
    <button type="submit" class="btn">
      <slot></slot>
    </button>
  </div>
</template>

<script>
export default {
  name: 'my-button'
}
</script>

<style scoped>
.btn {
  margin-top: 15px;
  padding: 10px 15px;
  background: #80002f;
  color: white;
  border: 2px solid #80002f;
  cursor: pointer;
  border-radius: 5px;
  font-size: 14px;
}
</style>
