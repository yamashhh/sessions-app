<template>
  <v-dialog v-model="dialog" persistent min-width="290" max-width="450">
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-toolbar color="error" dark>
        <v-toolbar-title
          >Delete Session: {{ selectedEvent.name }}</v-toolbar-title
        >
      </v-toolbar>
      <v-card-text class="pt-5 display-2 text-center">
        {{ $moment.utc(selectedEvent.totalTime).format('HH:mm:ss') }}
      </v-card-text>
      <v-card-subtitle class="font-weight-bold">Start</v-card-subtitle>
      <v-card-text>
        {{ $moment(selectedEvent.start).format('dddd, MMMM Do YYYY, HH:mm') }}
      </v-card-text>
      <v-card-subtitle class="font-weight-bold">End</v-card-subtitle>
      <v-card-text>
        {{ $moment(selectedEvent.end).format('dddd, MMMM Do YYYY, HH:mm') }}
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn depressed :disabled="deleting" @click="dialog = false"
          >Cancel</v-btn
        >
        <v-spacer></v-spacer>
        <v-btn
          depressed
          :loading="deleting"
          color="error"
          @click="deleteSession"
          >Delete</v-btn
        >
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'ConfirmDeleteSession',
  props: {
    user: {
      type: Object,
      required: true
    },
    selectedEvent: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      dialog: false,
      deleting: false
    }
  },
  methods: {
    ...mapActions({
      deleteSessionAction: 'sessions/deleteSession'
    }),
    async deleteSession() {
      try {
        console.log('deleteSession')
        this.deleting = true
        console.log('before store/sessions/deleteSession')
        await this.deleteSessionAction({
          uid: this.user.uid,
          sessionId: this.selectedEvent.sessionId
        })
        this.deleting = false
        this.dialog = false
        this.$emit('switchSelectedOpen', false)
        this.$nuxt.$emit(
          'updateSnackbar',
          'primary',
          'Session was deleted successfully.'
        )
        console.log('before emit fetchSessions')
        this.$emit('fetchSessions', {
          uid: this.user.uid,
          dateObj: this.$moment(this.selectedEvent.start).toDate()
        })
      } catch (e) {
        this.deleting = false
        console.log(e)
        this.$nuxt.$emit('updateSnackbar', 'error', e.message)
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
