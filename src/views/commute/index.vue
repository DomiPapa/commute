<template>
  <v-card class="light-blue lighten-5">
    <v-card-title class="text-center justify-center py-6">
      <h1 class="font-weight-bold display-1">{{ date | dateToStr }}</h1>
    </v-card-title>

    <v-card-text>
      <card-group />
    </v-card-text>
  </v-card>
</template>
<script>
import moment from 'moment'
import CardGroup from './components/CardGroup'
export default {
  name: 'Commute',
  components: { CardGroup },
  data: () => {
    return {
      date: new Date()
    }
  },
  filters: {
    dateToStr(value, format = 'YYYY年MM月DD日') {
      return moment(value).format(format)
    }
  }
}
</script>
<style></style>
