<template>
  <v-card>
    <v-card-title class="text-center justify-center py-6">
      <h1 class="font-weight-bold display-1">班次时刻表</h1>
    </v-card-title>

    <v-card-text>
      <card-group />
    </v-card-text>
  </v-card>
</template>
<script>
import CardGroup from './components/CardGroup'
export default {
  name: 'Commute',
  components: { CardGroup },
  data: () => {
    return {}
  }
}
</script>
<style></style>
