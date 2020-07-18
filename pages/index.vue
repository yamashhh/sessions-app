<template>
  <v-container>
    <h1>Welcome</h1>
    <!-- <client-only>
      <firebase-ui v-if="!user" />
    </client-only> -->
  </v-container>
</template>

<script>
// import { mapGetters } from 'vuex'
// import FirebaseUi from '@/components/FirebaseUi.vue'

// export default {
//   components: {
//     FirebaseUi
//   },
//   computed: {
//     ...mapGetters({
//       user: 'auth/getUser'
//     })
//   },
//   head() {
//     return {
//       title: 'Home'
//     }
//   }
// }

// import { mapActions } from 'vuex'
// import { auth } from '@/plugins/firebase'

// export default {
//   async mounted() {
//     const user = await new Promise((resolve, reject) => {
//       auth.onAuthStateChanged((user) => resolve(user))
//     })
//     if (user) {
//       console.log('before setUser')
//       const { uid, displayName, photoURL } = user
//       this.setUser({ uid, displayName, photoURL }) // setUser is mapped action from vuex
//       console.log('before redirect')
//       this.$router.push('/dashboard') // if non-null user given, go to root page.
//     }
//   },
//   methods: {
//     ...mapActions({
//       setUser: 'auth/setUser'
//     })
//   }
// }
</script>

<style lang="scss">
// .v-application ul {
//   padding-left: 0;
// }
</style>
