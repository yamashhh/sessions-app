<template>
  <v-container>
    <h1>Dashboard</h1>
    <Calendar
      :sessions="formattedSessions"
      :user="user"
      @fetchSessions="fetchSessions"
    />
    <NewSession
      :genres="genres"
      :user="user"
      @fetchSessions="fetchSessions"
    ></NewSession>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Calendar from '@/components/Calendar.vue'
import NewSession from '@/components/NewSession.vue'

export default {
  name: 'Dashboard',
  components: {
    Calendar,
    NewSession
  },
  async fetch() {
    try {
      await this.fetchSessions({ uid: this.user.uid, dateObj: new Date() })
    } catch (e) {
      console.log(e)
    }
  },
  computed: {
    ...mapGetters({
      user: 'auth/getUser',
      sessions: 'sessions/getSessions',
      genres: 'genres/getGenres'
    }),
    formattedSessions() {
      return this.formatSessions(this.sessions)
    }
  },
  methods: {
    ...mapActions({
      fetchSessions: 'sessions/fetchSessions'
    }),
    formatSessions(sessions) {
      return sessions.map((session) => {
        const formattedStart = this.$moment(session.start).format(
          'YYYY-MM-DD HH:mm'
        )
        const formattedEnd = this.$moment(session.end).format(
          'YYYY-MM-DD HH:mm'
        )
        return {
          id: session.id,
          name: session.name,
          start: formattedStart,
          end: formattedEnd
        }
      })
    }
  },
  head() {
    return {
      title: 'Dashboard'
    }
  }
}
</script>

<style lang="scss" scoped></style>
