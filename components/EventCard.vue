<template>
  <v-menu
    v-model="selectedOpen"
    :close-on-content-click="false"
    :activator="selectedElement"
    offset-x
  >
    <v-card min-width="250px">
      <v-toolbar color="primary" dark>
        <v-toolbar-title>{{ selectedEvent.name }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text class="display-2 text-center">
        {{ $moment.utc(selectedEvent.totalTime).format('HH:mm:ss') }}
      </v-card-text>
      <v-card-subtitle>Start</v-card-subtitle>
      <v-card-text>
        {{
          $moment(selectedEvent.start).format('dddd, MMMM Do YYYY, HH:mm:ss')
        }}
      </v-card-text>
      <v-card-subtitle>End</v-card-subtitle>
      <v-card-text>
        {{ $moment(selectedEvent.end).format('dddd, MMMM Do YYYY, HH:mm:ss') }}
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="selectedOpen = false">
          Close
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  name: 'EventCard',
  props: {
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
    }
  }
}
</script>

<style lang="scss" scoped></style>
