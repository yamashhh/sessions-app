<template>
  <v-container>
    <h1>Sign in</h1>
    <v-row align="center" justify="center" class="mt-4">
      <v-col>
        <v-img
          v-ripple
          alt="Sign in with Google"
          :src="
            require('@/static/pics/btn_google_signin_light_normal_web@2x.png')
          "
          class="mx-auto"
          width="250"
          contain
          @click="signIn"
        ></v-img>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col class="text-center">
        <v-btn color="primary" to="/" nuxt>
          <v-icon left>mdi-home</v-icon>
          Return to home
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Cookie from 'js-cookie'
import { auth, googleAuth } from '@/plugins/firebase'

export default {
  name: 'SignIn',
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
        await Cookie.set('access_token', token, {
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict'
        })
        await this.setUser({ uid, displayName, photoURL })
        this.$nuxt.$emit(
          'updateSnackbar',
          'primary',
          `Signed in as ${displayName}.`
        )
        this.$router.push('/dashboard')
      } catch (e) {
        console.log(e)
        this.switchOverlay(false)
        this.$nuxt.$emit('updateSnackbar', 'error', e.message)
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
        console.log(e)
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
