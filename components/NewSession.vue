<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="300px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          color="primary"
          fixed
          dark
          fab
          bottom
          right
          v-on="on"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <Stopwatch
        :genres="genres"
        :user="user"
        @fetchSessions="fetchSessions"
      ></Stopwatch>
    </v-dialog>
    <v-snackbar v-model="snackbar">
      {{ message }}
      <v-btn color="pink" text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-row>
</template>

<script>
import Stopwatch from '@/components/Stopwatch.vue'

export default {
  name: 'NewSession',
  components: {
    Stopwatch
  },
  props: {
    genres: {
      type: Array,
      required: true
    },
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      dialog: false,
      snackbar: false,
      message: ''
    }
  },
  methods: {
    fetchSessions(message, obj) {
      this.snackbar = true
      this.message = message
      this.$emit('fetchSessions', obj)
    }
  }
}
</script>

<style lang="scss" scoped>
.v-btn--fab.v-size--default {
  height: 56px;
  width: 56px;
}
</style>
