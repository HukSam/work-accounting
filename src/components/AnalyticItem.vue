<template>
  <div class="analytics">
    <div class="analytic-data">
      <div class="strong"><strong>Дата: </strong>{{analytics }}</div>
      <div class="strong"><strong>IP: </strong>{{ }}</div>
      <div class="strong"><strong>Тип запроса: </strong>{{  }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'analytic-item',
  data() {
    return {
      analytics: []
    }
  },
  mounted() {
    this.getAllAnalytics()
  }
}
</script>

<style scoped>

.analytic-data {
  grid-template-columns: 3fr 1fr 1fr;
}
</style>
