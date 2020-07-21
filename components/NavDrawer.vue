<template>
  <v-navigation-drawer v-model="drawer" app temporary right>
    <v-list nav>
      <v-list-item-group>
        <v-list-item inactive :ripple="false">
          <v-list-item-avatar>
            <v-img :src="user.photoURL"></v-img>
          </v-list-item-avatar>
          <v-list-item-title>
            {{ user.displayName }}
          </v-list-item-title>
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
        <!-- <v-list-item @click="signOut">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Sign out</v-list-item-title>
        </v-list-item> -->
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
