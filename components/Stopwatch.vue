<template>
  <v-card>
    <v-row>
      <v-col class="display-2 text-center">
        {{ formatTime() }}
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-select
            v-model="selectedGenre"
            :items="genres"
            label="Genre"
            hint="Please select a genre before you start your session."
            persistent-hint
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          <v-btn
            :color="timerState !== 'started' ? 'success' : 'warning'"
            :disabled="selectedGenre === ''"
            block
            @click="startOrStop"
            >{{ buttonText }}</v-btn
          >
        </v-col>
        <v-col cols="4">
          <v-btn
            :disabled="timerState !== 'stopped' || selectedGenre === ''"
            block
            @click="save"
            >Save</v-btn
          >
        </v-col>
        <v-col cols="4">
          <v-btn
            color="error"
            :disabled="timerState !== 'stopped'"
            block
            @click="reset"
            >Reset</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import firebase from '@/plugins/firebase'

export default {
  data: () => ({
    timerState: 'reset',
    buttonText: 'Start',
    selectedGenre: '',
    startTime: 0,
    elapsedTime: 0,
    totalTime: 0,
    timeoutId: null
  }),
  computed: mapState({
    genres: (state) => state.genres.genres
  }),
  methods: {
    ...mapActions({
      addSession: 'sessions/addSession'
    }),
    startOrStop() {
      if (this.timerState !== 'started') {
        this.startTime = Date.now()
        this.countUp()
        this.timerState = 'started'
        this.buttonText = 'Stop'
      } else {
        clearTimeout(this.timeoutId)
        this.elapsedTime += Date.now() - this.startTime
        this.timerState = 'stopped'
        this.buttonText = 'Start'
      }
    },
    reset() {
      clearTimeout(this.timeoutId)
      this.clearData()
    },
    countUp() {
      this.totalTime = Date.now() - this.startTime + this.elapsedTime
      this.timeoutId = setTimeout(() => {
        this.countUp()
      }, 10)
    },
    formatTime() {
      const d = new Date(this.totalTime)
      const h = String(d.getUTCHours()).padStart(2, '0')
      const m = String(d.getMinutes()).padStart(2, '0')
      const s = String(d.getSeconds()).padStart(2, '0')
      const ms = String(d.getMilliseconds()).padStart(3, '0')
      return `${h}:${m}:${s}.${ms}`
    },
    save() {
      const d = firebase.firestore.Timestamp.fromDate(new Date())
      const session = {
        totalTime: this.totalTime,
        genre: this.selectedGenre,
        date: d
      }
      this.addSession(session)
      this.clearData()
    },
    clearData() {
      this.timerState = 'cleared'
      this.selectedGenre = ''
      this.startTime = 0
      this.elapsedTime = 0
      this.totalTime = 0
      this.timeoutId = null
    }
  }
}
</script>

<style lang="scss" scoped></style>
