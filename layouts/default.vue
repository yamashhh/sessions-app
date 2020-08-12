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
      <v-btn text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Cookie from 'js-cookie'
import { auth } from '@/plugins/firebase'
import Navbar from '@/components/Navbar.vue'
import NavDrawer from '@/components/NavDrawer.vue'

export default {
  components: {
    Navbar,
    NavDrawer
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
  },
  methods: {
    ...mapActions({
      setUser: 'auth/setUser',
      clearUser: 'auth/clearUser'
    }),
    switchDrawer() {
      this.$refs.navDrawer.switchDrawer()
    },
    async signOut() {
      try {
        await auth.signOut()
        await Cookie.remove('access_token')
        await this.clearUser()
        this.setSnackbar('primary', 'Sign out complete.')
      } catch (e) {
        this.switchSnackbar('error', e.message)
      }
    },
    snackbarListener() {
      this.$nuxt.$on('updateSnackbar', this.setSnackbar)
    },
    setSnackbar(color, message) {
      console.log('setSnackbar @default.vue')
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
        content: 'An attempt to make my own Nuxt.js app.'
      }
    ]
  }
}
</script>
