<template>
  <v-menu
    v-model="selectedOpen"
    :close-on-content-click="false"
    :activator="selectedElement"
    offset-x
  >
    <v-card min-width="250px">
      <v-toolbar :color="selectedEvent.color" dark>
        <v-toolbar-title>{{ selectedEvent.name }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <ConfirmDeleteSession
          :user="user"
          :selected-event="selectedEvent"
          @switchSelectedOpen="switchSelectedOpen"
          @fetchSessions="fetchSessions"
        ></ConfirmDeleteSession>
      </v-toolbar>
      <v-card-text class="display-2 text-center">
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
        <v-btn depressed @click="selectedOpen = false">
          Close
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
import ConfirmDeleteSession from '@/components/ConfirmDeleteSession.vue'

export default {
  name: 'EventCard',
  components: {
    ConfirmDeleteSession
  },
  props: {
    user: {
      type: Object,
      required: true
    },
    selectedEvent: {
      type: Object,
      required: true
    },
    selectedElement: {
      validator(obj) {
        return obj instanceof HTMLElement || obj === null
      },
      default: null,
      required: true
    }
  },
  data() {
    return {
      selectedOpen: false
    }
  },
  methods: {
    switchSelectedOpen(bool) {
      this.selectedOpen = bool
    },
    fetchSessions(obj) {
      console.log('fetchSessions @EventCard')
      this.$emit('fetchSessions', obj)
    }
  }
}
</script>

<style lang="scss" scoped></style>
