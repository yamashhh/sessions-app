<template>
  <v-app>
    <navbar :signed-in="signedIn" @switchDrawer="switchDrawer"></navbar>
    <nav-drawer
      v-if="signedIn"
      ref="navDrawer"
      :user="user"
      @signOut="signOut"
    ></nav-drawer>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-snackbar v-model="snackbar" :color="color">
      {{ message }}
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar = false">Close</v-btn>
      </template>
    </v-snackbar>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <Footer></Footer>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Cookie from 'js-cookie'
import { auth } from '@/plugins/firebase'
import Navbar from '@/components/nav/Navbar.vue'
import NavDrawer from '@/components/nav/NavDrawer.vue'
import Footer from '@/components/nav/Footer.vue'

export default {
  components: {
    Navbar,
    NavDrawer,
    Footer
  },
  data() {
    return {
      snackbar: false,
      message: '',
      color: ''
    }
  },
  computed: {
    ...mapGetters({
      user: 'auth/getUser',
      signedIn: 'auth/signedIn',
      overlay: 'overlay/getOverlay'
    })
  },
  created() {
    this.snackbarListener()
    this.signOutListener()
  },
  methods: {
    ...mapActions({
      setUser: 'auth/setUser',
      clearUser: 'auth/clearUser'
    }),
    switchDrawer() {
      this.$refs.navDrawer.switchDrawer()
    },
    signOutListener() {
      this.$nuxt.$on('signOut', this.signOut)
    },
    async signOut() {
      try {
        await auth.signOut()
        await Cookie.remove('access_token')
        await this.clearUser()
      } catch (e) {
        this.switchSnackbar('error', e.message)
      }
    },
    snackbarListener() {
      this.$nuxt.$on('updateSnackbar', this.setSnackbar)
    },
    setSnackbar(color, message) {
      this.snackbar = true
      this.color = color
      this.message = message
    }
  },
  head: {
    titleTemplate: '%s - Sessions',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'A simple activity recording tool.'
      }
    ]
  }
}
</script>

<style lang="scss" scoped></style>
