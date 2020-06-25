<template>
  <v-card>
    <v-card-title>
      New Session
    </v-card-title>
    <v-card-text class="display-2 text-center">
      {{ $moment.utc(totalTime).format('HH:mm:ss') }}
    </v-card-text>
    <v-card-actions>
      <v-select
        v-model="selectedGenre"
        :items="genres"
        label="Genre"
        hint="Please select a genre before you start your session."
        :persistent-hint="selectedGenre === ''"
        outlined
      ></v-select>
    </v-card-actions>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        :color="timerState !== 'started' ? 'primary' : 'warning'"
        :disabled="selectedGenre === ''"
        @click="startOrStop"
        >{{ buttonText }}</v-btn
      >
      <v-spacer></v-spacer>
      <v-btn
        color="success"
        :disabled="timerState !== 'stopped' || selectedGenre === ''"
        @click="save"
        >Save</v-btn
      >
      <v-spacer></v-spacer>
      <v-btn color="error" :disabled="timerState !== 'stopped'" @click="reset"
        >Reset</v-btn
      >
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'
import firebase from '@/plugins/firebase'

export default {
  props: {
    genres: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      timerState: 'initial',
      buttonText: 'Start',
      selectedGenre: '',
      initialTime: null,
      startTime: 0,
      elapsedTime: 0,
      totalTime: 0,
      timeoutId: null
    }
  },
  methods: {
    ...mapActions({
      addSession: 'sessions/addSession'
    }),
    startOrStop() {
      if (this.timerState !== 'started') {
        if (this.timerState === 'initial') {
          this.initialTime = firebase.firestore.Timestamp.now()
        }
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
    countUp() {
      this.totalTime = Date.now() - this.startTime + this.elapsedTime
      this.timeoutId = setTimeout(() => {
        this.countUp()
      }, 10)
    },
    save() {
      const d = firebase.firestore.Timestamp.now()
      const session = {
        name: this.selectedGenre,
        start: this.initialTime,
        end: d,
        totalTime: this.totalTime
      }
      this.addSession(session)
        .then(() => {
          this.$emit('fetchNewSessions', 'Session was saved successfully.')
          this.clearData()
        })
        .catch(() => console.log('Error'))
    },
    reset() {
      clearTimeout(this.timeoutId)
      this.clearData()
    },
    clearData() {
      this.timerState = 'initial'
      this.selectedGenre = ''
      this.initialTime = null
      this.startTime = 0
      this.elapsedTime = 0
      this.totalTime = 0
      this.timeoutId = null
    }
  }
}
</script>

<style lang="scss" scoped></style>
