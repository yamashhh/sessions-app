<template>
  <v-app>
    <navbar @switchDrawer="switchDrawer"></navbar>
    <nav-drawer ref="navDrawer"></nav-drawer>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import NavDrawer from '@/components/NavDrawer.vue'

export default {
  components: {
    Navbar,
    NavDrawer
  },
  methods: {
    switchDrawer() {
      this.$refs.navDrawer.switchDrawer()
    }
  },
  head: {
    titleTemplate: '%s - Sessions',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'An attempt to make my own Nuxt.js app.'
      }
    ]
  }
}
</script>
