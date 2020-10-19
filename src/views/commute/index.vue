<template>
  <v-card class="light-blue lighten-5">
    <v-card-title class="text-center justify-center py-6">
      <h1 class="font-weight-bold display-1">
        {{ reservation.day }} - {{ reservation.date }}
      </h1>
    </v-card-title>

    <v-card-text>
      <card-group :reservation="reservation" />
    </v-card-text>
  </v-card>
</template>
<script>
import store from '@/store'
import moment from 'moment'
import CardGroup from './components/CardGroup'
export default {
  name: 'Commute',
  components: { CardGroup },
  data: () => {
    return {
      date: new Date(),
      reservation: {}
    }
  },
  created() {
    this.date = new Date()
    if (moment().format('HH') >= 18) {
      // 当天18点以后
      this.reservation['day'] = '明日'
      this.reservation['date'] = moment()
        .add(1, 'day')
        .format('MM月DD日')
      this.reservation['startTime'] = moment().format('YYYY-MM-DD') + ' 18:00'
      this.reservation['endTime'] =
        moment()
          .add(1, 'day')
          .format('YYYY-MM-DD') + ' 18:00'
    } else {
      this.reservation['day'] = '今日'
      this.reservation['date'] = moment().format('MM月DD日')
      this.reservation['startTime'] =
        moment()
          .add(-1, 'day')
          .format('YYYY-MM-DD ') + ' 18:00'
      this.reservation['endTime'] = moment().format('YYYY-MM-DD') + ' 20:00'
    }
    store.commit('rank_info/SET_RESERVATION_DATE_INFO', this.reservation)
  }
}
</script>
<style></style>
