<template>
  <v-container>
    <v-calendar :events="events"></v-calendar>
    <v-card v-for="session in sessions" :key="session.id">
      <v-card-text>{{ session }}</v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  props: {
    sessions: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    events: [
      {
        name: 'Weekly Meeting',
        start: '2020-06-07 09:00',
        end: '2020-06-07 10:00'
      },
      {
        name: "Thomas' Birthday",
        start: '2020-06-10'
      },
      {
        name: 'Mash Potatoes',
        start: '2020-06-09 12:30',
        end: '2020-06-09 15:30'
      }
    ]
  })
}
</script>

<style lang="scss" scoped></style>
