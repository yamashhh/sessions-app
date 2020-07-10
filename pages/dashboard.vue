<template>
  <v-container>
    <h1>Dashboard</h1>
    <p v-if="user">
      {{
        `
      ${user.displayName}
      ${user.uid}
      `
      }}
    </p>
    <v-btn @click="logout">logout</v-btn>
    <ShowCalendar
      :sessions="formattedSessions"
      :overlay="overlay"
      @fetchSessions="fetchSessions"
    />
    <NewSession :genres="genres" @fetchSessions="fetchSessions"></NewSession>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ShowCalendar from '@/components/ShowCalendar.vue'
import NewSession from '@/components/NewSession.vue'

export default {
  name: 'Dashboard',
  components: {
    ShowCalendar,
    NewSession
  },
  async fetch() {
    try {
      await this.fetchSessions(new Date())
    } catch (e) {
      console.log(e)
    }
  },
  computed: {
    ...mapGetters({
      user: 'auth/getUser',
      sessions: 'sessions/getSessions',
      genres: 'genres/getGenres',
      overlay: 'overlay/getOverlay'
    }),
    formattedSessions() {
      return this.formatSessions(this.sessions)
    }
  },
  methods: {
    ...mapActions({
      fetchSessions: 'sessions/fetchSessions',
      logoutAction: 'auth/logout'
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
    },
    async logout() {
      try {
        console.log('logout button')
        await this.logoutAction()
        console.log('after await, before router.push')
        this.$router.push('/')
      } catch (e) {
        console.log('An error occurred while logging out: ', e)
      }
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
