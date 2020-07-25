<template>
  <v-card>
    <v-toolbar color="primary" dark>
      <v-toolbar-title>New Session</v-toolbar-title>
      <v-spacer></v-spacer>
      <ConfirmClose
        :timer-state="timerState"
        @closeDialog="closeDialog"
      ></ConfirmClose>
    </v-toolbar>
    <v-card-text class="pt-5 display-2 text-center">
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
      <v-btn
        block
        depressed
        :color="timerState !== 'started' ? 'primary' : 'warning'"
        :disabled="selectedGenre === '' || saving"
        @click="startOrStop"
        >{{ buttonText }}</v-btn
      >
    </v-card-actions>
    <v-card-actions>
      <v-btn
        block
        depressed
        color="success"
        :disabled="timerState !== 'stopped' || selectedGenre === ''"
        :loading="saving"
        @click="save"
        >Save</v-btn
      >
    </v-card-actions>
    <v-card-actions>
      <v-btn
        block
        depressed
        color="error"
        :disabled="timerState !== 'stopped' || saving"
        @click="reset"
        >Reset</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'
import { firestore } from '@/plugins/firebase'
import ConfirmClose from '@/components/ConfirmClose.vue'

export default {
  name: 'Stopwatch',
  components: {
    ConfirmClose
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
      timerState: 'initial',
      buttonText: 'Start',
      selectedGenre: '',
      initialTime: null,
      startTime: 0,
      elapsedTime: 0,
      totalTime: 0,
      timeoutId: null,
      saving: false
    }
  },
  methods: {
    ...mapActions({
      addSession: 'sessions/addSession'
    }),
    closeDialog() {
      console.log('closeDialog @stopwatch')
      this.reset()
      this.$emit('closeDialog')
    },
    startOrStop() {
      if (this.timerState !== 'started') {
        if (this.timerState === 'initial') {
          this.initialTime = firestore.Timestamp.now()
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
    async save() {
      try {
        this.saving = true
        const d = firestore.Timestamp.now()
        const session = {
          name: this.selectedGenre,
          start: this.initialTime,
          end: d,
          totalTime: this.totalTime,
          uid: this.user.uid
        }
        await this.addSession({ uid: this.user.uid, session })
        this.saving = false
        this.closeDialog()
        this.$nuxt.$emit('updateSnackbar', 'Session was saved successfully.')
        this.$emit('fetchSessions', {
          uid: this.user.uid,
          dateObj: new Date()
        })
      } catch (e) {
        this.saving = false
        this.$nuxt.$emit('updateSnackbar', e.message)
      }
    },
    reset() {
      console.log('reset @stopwatch')
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

<style lang="scss" scoped>
.v-card__actions {
  padding: 8px 24px;
}
</style>
