<template>
  <v-container>
    <h1>Tracker</h1>
    <Stopwatch></Stopwatch>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Stopwatch from '@/components/Stopwatch.vue'

export default {
  components: { Stopwatch },
  computed: mapState({
    sessions: (state) => state.sessions.sessions,
    genres: (state) => state.genres.genres
  }),
  methods: {
    ...mapMutations
  },
  head() {
    return {
      title: 'Tracker'
    }
  }
}
</script>
