<template>
  <v-container>
    <h1>Dashboard</h1>
    <Calendar
      :sessions="formattedSessions"
      :user="user"
      @fetchSessions="fetchSessions"
    />
    <NewSession
      :categories="categories"
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
    this.switchOverlay(true)
    try {
      await this.fetchSessionsAction({
        uid: this.user.uid,
        dateObj: new Date()
      })
      await this.fetchCategories(this.user.uid)
      this.switchOverlay(false)
    } catch (e) {
      console.log(e)
      this.switchOverlay(false)
    }
  },
  fetchOnServer: false,
  computed: {
    ...mapGetters({
      user: 'auth/getUser',
      sessions: 'sessions/getSessions',
      categories: 'categories/getCategories'
    }),
    formattedSessions() {
      return this.formatSessions(this.sessions)
    }
  },
  methods: {
    ...mapActions({
      fetchSessionsAction: 'sessions/fetchSessions',
      fetchCategories: 'categories/fetchCategories',
      switchOverlay: 'overlay/switchOverlay'
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
          sessionId: session.sessionId,
          name: session.name,
          color: session.color,
          start: formattedStart,
          end: formattedEnd,
          totalTime: session.totalTime,
          uid: session.uid
        }
      })
    },
    async fetchSessions(obj) {
      console.log('fetchSessions @dashboard')
      this.switchOverlay(true)
      try {
        await this.fetchSessionsAction(obj)
        this.switchOverlay(false)
      } catch (e) {
        console.log(e.message)
        this.switchOverlay(false)
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
