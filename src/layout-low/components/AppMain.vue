<template>
  <section>
    <transition name="fade-transform" mode="out-in">
      <keep-alive>
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  data: () => ({}),
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>
<style lang="scss" scoped></style>
