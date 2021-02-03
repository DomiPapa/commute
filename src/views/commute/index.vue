<template>
  <v-card class="light-blue lighten-5" elevation="0">
    <v-card-title class="text-center justify-center py-6">
      <v-btn icon color="white" v-show="(today = false)" @click="change2today">
        <v-icon>mdi-less-than</v-icon>
      </v-btn>
      <h1 class="font-weight-bold display-1">
        {{ this.$store.getters.reservationDateInfo.day }} -
        {{ this.$store.getters.reservationDateInfo.date }}
      </h1>
      <v-btn
        icon
        color="white"
        v-show="(today = true)"
        @click="change2tomorrow"
      >
        <v-icon>mdi-greater-than</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <div class="mx-2">
        <v-alert
          v-model="alert"
          dismissible
          color="cyan"
          border="left"
          elevation="2"
          colored-border
          icon="mdi-clock-fast"
        >
          <strong>注意</strong>
          如果订车后计划更改，请及时取消预约，便于他人乘车
        </v-alert>
        <div class="text-center">
          <v-btn v-if="!alert" color="primary" @click="alert = true">
            查看订车注意事项
          </v-btn>
        </div>
      </div>
    </v-card-text>
    <v-card-text>
      <card-group />
    </v-card-text>
  </v-card>
</template>
<script>
// import store from '@/store'
import CardGroup from './components/CardGroup'
export default {
  name: 'Commute',
  components: { CardGroup },
  data: () => {
    return {
      today: true,
      alert: true,
      reservation: {}
    }
  },
  methods: {
    change2today() {
      this.today = true
    },
    change2tomorrow() {
      this.today = false
    }
  },
  created() {
    // this.reservation = store.getters.reservationDateInfo
  }
}
</script>
<style></style>
