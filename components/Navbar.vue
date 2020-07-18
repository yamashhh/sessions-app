<template>
  <v-app-bar app color="primary" dark>
    <v-toolbar-title class="headline font-weight-bold font-italic">
      <nuxt-link to="/">Sessions</nuxt-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-app-bar-nav-icon
      v-if="loggedIn"
      @click="switchDrawer"
    ></v-app-bar-nav-icon>
    <v-btn v-else nuxt text small @click="signIn">
      <v-icon left small>mdi-google</v-icon>
      Sign in with Google</v-btn
    >
  </v-app-bar>
</template>
<script>
export default {
  name: 'Navbar',
  props: {
    loggedIn: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    switchDrawer() {
      this.$emit('switchDrawer')
    },
    signIn() {
      this.$emit('signIn')
    }
  }
}
</script>

<style lang="scss" scoped>
.v-application a {
  color: #fff;
  text-decoration: none;
}
.v-toolbar__title {
  overflow: visible;
}
</style>
