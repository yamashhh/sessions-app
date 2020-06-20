<template>
  <v-container>
    <v-calendar :events="sessions" type="month"></v-calendar>
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

<style lang="scss" scoped>
.v-btn--fab.v-size--default {
  height: 28px;
  width: 28px;
}
</style>
