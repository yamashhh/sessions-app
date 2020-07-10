<template>
  <v-container>
    <h1>Welcome</h1>
    <client-only>
      <firebase-ui v-if="!user" />
    </client-only>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import FirebaseUi from '@/components/FirebaseUi.vue'

export default {
  components: {
    FirebaseUi
  },
  computed: {
    ...mapGetters({
      user: 'auth/getUser'
    })
  },
  head() {
    return {
      title: 'Home'
    }
  }
}
</script>

<style lang="scss">
.v-application ul {
  padding-left: 0;
}
</style>
