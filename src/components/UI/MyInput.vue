<template>
	<input
		:value="modelValue"
		class="input"
		type="text"
		@input="updateInput"
	/>
</template>

<script setup>
import { defineEmits, defineProps } from 'vue'
defineProps({
	modelValue: {
		type: [String, Number],
		default: null
	}
})
const emit = defineEmits(['update:show'])
const updateInput = (event) => {
	emit('update:modelValue', event.target.value)
}
</script>

<style scoped>
.input {
  margin-top: 15px;
  padding: 10px 15px;

  border: 2px solid #dcdcdc;
}
</style>
