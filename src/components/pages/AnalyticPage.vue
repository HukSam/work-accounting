<template>
  <h1>Страница аналитики запросов</h1>
  <div class="main-wrapper">
    <div class="anal-btns">
      <my-button
        @click="getAllAnalytics()"
      >
        Загрузить
      </my-button>
      <my-button>
        Очистить
      </my-button>
    </div>
    <div class="analytics-item">
      <select id="requestType" v-model="selectedType">
        <option v-for="request in requestTypes" :key="request" :value="request">
          {{ generateOptionText(request) }}
        </option>
      </select>
      <ul v-if="selectedAnalytics.length">
        <li v-for="request in selectedAnalytics" :key="request.date">
          IP запроса: {{ request.ip }}
          <br />
          Дата запроса: {{ new Date(request.date.seconds) }}
        </li>
      </ul>

      <span v-else-if="!selectedType.length">Выберите тип запроса</span>

      <span v-else>Запросы такого типа отсутствуют</span>
    </div>
  </div>
</template>

<script>
import { getAnalytics } from '@/js/api'
import MyButton from '@/components/UI/MyButton.vue'

export default {
  name: 'analytic-page',
  components: {
    MyButton
  },
  data() {
    return {
      analytics: [],
      selectedType: '',
      requestTypes: [
        'addNewGroup',
        'addNewPractice',
        'addNewStudent',
        'deleteGroup',
        'deleteStudent',
        'deletePractice'
      ]
    }
  },
  computed: {
    selectedAnalytics() {
      if (this.selectedType) {
        return this.analytics.filter((item) => item.type === this.selectedType)
      }
      return []
    },
  },

  mounted() {
    this.load()
  },

  methods: {
    async load() {
      this.analytics = await getAnalytics()
    },

    findRequestsAmount(type) {
      const requestAnalytics = this.analytics.filter(
        (item) => item.type === type
      )
      return requestAnalytics.length
    },

    generateOptionText(request) {
      let requestText
      const requestsAmount = this.findRequestsAmount(request)
      if (
        requestsAmount % 10 === 0 ||
        (requestsAmount % 10 >= 5 && requestsAmount % 10 <= 9)
      ) {
        requestText = 'запросов'
      } else if (requestsAmount % 10 === 1) {
        requestText = 'запрос'
      } else {
        requestText = 'запроса'
      }
      return `${request} (${requestsAmount} ${requestText})`
    },
    async getAllAnalytics() {
      let anal = getAnalytics()
      console.log(anal)
    }
  }
}
</script>

<style scoped>
.anal-btns {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>
