<template>
  <v-app>
    <Navbar></Navbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  components: {
    Navbar
  },
  head: {
    titleTemplate: '%s - focusOnTrack',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'My first Nuxt.js app under development.'
      }
    ]
  }
}
</script>
