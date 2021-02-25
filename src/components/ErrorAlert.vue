<template>
  <div class="mb-10">
    <v-alert
      v-model="alert.toggle"
      border="left"
      close-text="Close Alert"
      color="red lighten-1"
      dark
      dismissible
    >
      {{ alert.message }}
    </v-alert>
  </div>
</template>
<script>
export default {
  name: 'ErrorAlert',
  props: {
    alert: {
      type: Object,
      default: function() {
        return {
          toggle: true,
          message: '未知错误信息'
        }
      }
    }
  },
  data() {
    return {}
  },
  computed: {}
}
</script>
<style lang="sass"></style>
