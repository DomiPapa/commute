<template>
  <v-card class="light-blue lighten-5" elevation="0">
    <v-card-title class="text-center justify-center py-6">
      <h1 class="font-weight-bold display-1">
        {{ reservation.day }} - {{ reservation.date }}
      </h1>
    </v-card-title>

    <v-card-text>
      <card-group />
    </v-card-text>
  </v-card>
</template>
<script>
import store from '@/store'
import CardGroup from './components/CardGroup'
export default {
  name: 'Commute',
  components: { CardGroup },
  data: () => {
    return {
      reservation: {}
    }
  },
  methods: {},
  created() {
    this.reservation = store.getters.reservationDateInfo
  }
}
</script>
<style></style>
