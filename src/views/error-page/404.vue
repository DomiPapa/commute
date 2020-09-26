<template>
  <div>
    <img
      :src="errGif"
      width="313"
      height="428"
      alt="Girl has dropped her ice cream."
    />
  </div>
</template>

<script>
import errGif from '@/assets/404_images/404.png'

export default {
  name: 'Page404',
  data() {
    return {
      errGif: errGif + '?' + +new Date()
    }
  },
  methods: {}
}
</script>
