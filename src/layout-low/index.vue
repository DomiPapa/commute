<template>
  <v-app class="bg">
    <v-main>
      <app-main />
    </v-main>
  </v-app>
</template>

<script>
import AppMain from './components/AppMain'
export default {
  name: 'Layout',
  components: {
    AppMain
  },
  props: {
    source: String
  },
  data: () => ({})
}
</script>
<style lang="scss" scoped>
.bg {
  background-color: #e1f5fe;
}
</style>
