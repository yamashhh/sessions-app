<template>
  <v-container>
    <h1>Home</h1>
    <ShowData :sessions="sessions" />
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ShowData from '@/components/ShowData.vue'

export default {
  components: {
    ShowData
  },
  async fetch() {
    try {
      await this.getSessions()
    } catch (e) {
      console.log(e)
    }
  },
  computed: mapState({
    sessions: (state) => state.sessions.sessions
  }),
  methods: {
    ...mapActions({
      getSessions: 'sessions/getSessions'
    })
  },
  head() {
    return {
      title: 'Home'
    }
  }
}
</script>

<style lang="scss" scoped></style>
