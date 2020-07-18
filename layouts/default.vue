<template>
  <v-app>
    <navbar
      :logged-in="loggedIn"
      @switchDrawer="switchDrawer"
      @signIn="signIn"
    ></navbar>
    <nav-drawer
      v-if="loggedIn"
      ref="navDrawer"
      :user="user"
      @signOut="signOut"
    ></nav-drawer>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { auth, googleAuth } from '@/plugins/firebase'
import Navbar from '@/components/Navbar.vue'
import NavDrawer from '@/components/NavDrawer.vue'

export default {
  components: {
    Navbar,
    NavDrawer
  },
  computed: {
    ...mapGetters({
      user: 'auth/getUser',
      loggedIn: 'auth/loggedIn'
    })
  },
  methods: {
    ...mapActions({
      setUser: 'auth/setUser',
      clearUser: 'auth/clearUser'
    }),
    switchDrawer() {
      this.$refs.navDrawer.switchDrawer()
    },
    async signIn() {
      try {
        const response = await auth.signInWithPopup(googleAuth)
        console.log('sign in complete: ', response)
        const { uid, displayName, photoURL } = response.user
        await this.setUser({ uid, displayName, photoURL })
        this.$router.push('/dashboard')
      } catch (e) {
        console.log(e)
      }
    },
    async signOut() {
      try {
        await auth.signOut()
        await this.clearUser()
      } catch (e) {
        console.log(e)
      }
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
