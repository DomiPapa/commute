<template>
  <v-app id="inspire" class="bg">
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
    >
      <v-list dense>
        <template v-for="item in items">
          <v-list-item
            :key="item.text"
            link
            @click="handleNavDrawer(item.text)"
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="cyan"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <span class="hidden-sm-and-down"></span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="handleNavDrawer">
        <v-icon>mdi-home</v-icon>
      </v-btn>
    </v-app-bar>
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
  data: () => ({
    drawer: null,
    items: [
      //{ icon: 'mdi-history', text: '汽车班次' },
      { icon: 'mdi-contacts', text: '订车信息' },
      //{ icon: 'mdi-cog', text: '设置' },
      { icon: 'mdi-help-circle', text: '操作说明' },
      { icon: 'mdi-message', text: '反馈意见' }
    ]
  }),
  methods: {
    handleNavDrawer(text) {
      switch (text) {
        case '订车信息':
          this.$router.push('/order')
          break
        case '操作说明':
          this.$router.push('/instruction')
          break
        case '反馈意见':
          this.$router.push('/suggestion')
          break
        default:
          this.$router.push('/')
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.bg {
  background-color: #e1f5fe;
}
</style>
