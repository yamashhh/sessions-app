<template>
  <v-container>
    <v-calendar :events="sessions" type="day"></v-calendar>
  </v-container>
</template>

<script>
export default {
  props: {
    sessions: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped></style>
