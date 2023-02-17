<template>
  <div>
    <button class="btn" type="submit">
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

  font-size: 14px;
  color: white;

  background: #80002f;
  border: 2px solid #80002f;
  border-radius: 5px;

  cursor: pointer;
}
</style>
