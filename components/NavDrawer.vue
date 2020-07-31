<template>
  <v-navigation-drawer v-model="drawer" app temporary right>
    <v-list nav>
      <v-list-item-group>
        <v-list-item to="/settings" nuxt>
          <v-list-item-avatar color="grey">
            <v-img
              v-if="user.photoURL"
              :src="user.photoURL"
              :alt="user.displayName"
            ></v-img>
            <v-icon v-else>mdi-account</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>
              {{ user.displayName }}
            </v-list-item-title>
            <v-list-item-subtitle>
              Settings
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item to="/" nuxt>
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
        <v-list-item to="/dashboard" nuxt>
          <v-list-item-icon>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Dashboard</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <template v-slot:append>
      <div class="pa-4">
        <v-btn block color="primary" @click="signOut"
          ><v-icon left>mdi-logout</v-icon>Sign out</v-btn
        >
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'NavDrawer',
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      drawer: false
    }
  },
  methods: {
    switchDrawer() {
      this.drawer = !this.drawer
    },
    signOut() {
      // Redirecting before signOut function to avoid prop error
      this.$router.push('/')
      this.$emit('signOut')
    }
  }
}
</script>

<style lang="scss" scoped></style>
