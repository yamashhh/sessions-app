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
          left
          v-on="on"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <Stopwatch :genres="genres"></Stopwatch>
    </v-dialog>
  </v-row>
</template>

<script>
import Stopwatch from '@/components/Stopwatch.vue'

export default {
  components: {
    Stopwatch
  },
  props: {
    genres: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      dialog: false
    }
  }
}
</script>

<style lang="scss" scoped></style>
