<template>
  <v-card class="light-blue lighten-5" elevation="0">
    <v-card-title class="text-center justify-center py-6">
      <v-row>
        <v-col cols="2">
          <v-btn
            icon
            color="cyan"
            v-show="today === false"
            @click="change2today"
          >
            <v-icon>mdi-chevron-left-circle</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="8">
          <h2 class="font-weight-bold">
            {{ this.$store.getters.reservationDateInfo.day }} -
            {{ this.$store.getters.reservationDateInfo.date }}
          </h2>
        </v-col>
        <v-col cols="2">
          <v-btn
            icon
            color="cyan"
            v-show="today === true"
            @click="change2tomorrow"
          >
            <v-icon>mdi-chevron-right-circle</v-icon>
          </v-btn>
        </v-col>
      </v-row>
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
