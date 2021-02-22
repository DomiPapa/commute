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
            {{ this.day_tag }}-{{ this.date_tag }}
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
      <card-group :today="today" />
    </v-card-text>
  </v-card>
</template>
<script>
// import store from '@/store'
import moment from 'moment'
import CardGroup from './components/CardGroup'
export default {
  name: 'Commute',
  components: { CardGroup },
  data: () => {
    return {
      today: true,
      day_tag: '今日',
      date_tag: moment().format('MM月DD日'),
      alert: true,
      reservation: {}
    }
  },
  methods: {
    change2today() {
      this.today = true
      this.day_tag = '今日'
      this.date_tag = moment().format('MM月DD日')
    },
    change2tomorrow() {
      this.today = false
      this.day_tag = '明日'
      this.date_tag = moment()
        .add(1, 'd')
        .format('MM月DD日')
    }
  },
  created() {
    // this.reservation = store.getters.reservationDateInfo
  }
}
</script>
<style></style>
