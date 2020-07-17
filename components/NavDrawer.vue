<template>
  <v-navigation-drawer v-model="drawer" app temporary right>
    <v-list nav dense>
      <v-list-item-group>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Account</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'NavDrawer',
  data() {
    return {
      drawer: false
    }
  },
  methods: {
    switchDrawer() {
      this.drawer = !this.drawer
    }
  }
}
</script>

<style lang="scss" scoped></style>
