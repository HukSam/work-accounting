<template>
  <input :value="modelValue" class="input" type="text" @input="updateInput"/>
</template>

<script>
export default {
  name: 'my-input',

  props: {
    modelValue: [String, Number]
  },

  methods: {
    updateInput(event) {
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>

<style scoped>
.input {
  margin-top: 15px;
  padding: 10px 15px;

  border: 2px solid #dcdcdc;
}
</style>
