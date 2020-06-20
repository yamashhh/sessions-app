<template>
  <v-app-bar app color="primary" dark>
    <v-toolbar-title class="headline font-weight-bold font-italic">
      <nuxt-link to="/">Sessions</nuxt-link>
    </v-toolbar-title>

    <v-spacer></v-spacer>
    <v-btn to="/dashboard" nuxt text>Dashboard</v-btn>
    <!-- <v-btn to="/newSession" nuxt text rounded>New Session</v-btn> -->
  </v-app-bar>
</template>

<script>
export default {}
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
