<template>
  <v-app>
    <navbar></navbar>
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
