<template>
  <v-container>
    <h1>Sign in</h1>
    <v-row align="center" justify="center" class="mt-4">
      <v-spacer></v-spacer>
      <v-col class="text-center">
        <v-btn color="primary" @click="signIn">
          <v-icon left>mdi-google</v-icon>
          Sign in with Google</v-btn
        >
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Cookie from 'js-cookie'
import { auth, googleAuth } from '@/plugins/firebase'

export default {
  computed: {
    ...mapGetters({
      user: 'auth/getUser'
    })
  },
  async mounted() {
    console.log('mounted')
    const user = await new Promise((resolve, reject) => {
      auth.onAuthStateChanged((user) => {
        console.log('onAuthStateChanged @sign-in')
        resolve(user)
      })
    })
    if (user) {
      console.log('if user')
      const { uid, displayName, photoURL } = user
      try {
        const token = await auth.currentUser.getIdToken()
        await Cookie.set('access_token', token)
        await this.setUser({ uid, displayName, photoURL })
        this.$nuxt.$emit(
          'updateSnackbar',
          'primary',
          `Signed in as ${displayName}.`
        )
        this.$router.push('/dashboard')
      } catch (e) {
        console.log(e.message)
        this.switchOverlay(false)
      }
    } else {
      console.log('else')
      this.switchOverlay(false)
    }
  },
  methods: {
    ...mapActions({
      setUser: 'auth/setUser',
      switchOverlay: 'overlay/switchOverlay'
    }),
    async signIn() {
      try {
        await auth.signInWithRedirect(googleAuth)
      } catch (e) {
        this.$nuxt.$emit('updateSnackbar', 'error', e.message)
      }
    }
  },
  head() {
    return {
      title: 'Sign In'
    }
  }
}
</script>

<style lang="scss">
.v-application ul {
  padding-left: 0;
}
</style>
