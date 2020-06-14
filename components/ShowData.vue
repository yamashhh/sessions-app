<template>
  <v-container>
    <v-card v-for="session in sessions" :key="session.id">
      <v-card-text>{{ session }}</v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState({
    sessions: (state) => state.sessions.sessions
  })
}
</script>

<style lang="scss" scoped></style>
