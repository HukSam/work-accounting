<template>
	<div v-if="props.groups?.length > 0">
		<h3>Список групп</h3>
		<group-item
			v-for="group in props.groups"
			:students="props.students"
			:key="group.id"
			:group="group"
			@remove="emit('remove', group)"
		/>
	</div>
	<h2 v-else>
		Список команд пуст
	</h2>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import GroupItem from '@/components/GroupItem.vue'
const props = defineProps({
	props: {
		groups: {
			type: Array,
			required: true
		},
		students: {
			type: Array,
			required: true
		}
	}
})
const emit = defineEmits(['hide'])
</script>

<style scoped>
h2 {
	color: #80002f;
}

h3 {
	margin-left: 10px;
}
</style>
