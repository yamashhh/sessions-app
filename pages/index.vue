<template>
  <v-container>
    <h1>Welcome</h1>
    <client-only>
      <firebase-ui />
    </client-only>
  </v-container>
</template>

<script>
import FirebaseUi from '@/components/FirebaseUi.vue'

export default {
  components: {
    FirebaseUi
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
