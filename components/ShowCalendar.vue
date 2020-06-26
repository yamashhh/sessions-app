<template>
  <v-row class="fill-height">
    <v-col>
      <h2 v-show="mobile" class="ml-4 font-weight-regular">
        {{ title }}
      </h2>
      <v-sheet height="64">
        <v-toolbar flat color="white">
          <v-btn
            outlined
            color="grey darken-2"
            :small="mobile"
            @click="setToday"
          >
            <v-icon left :small="mobile">mdi-calendar-today</v-icon
            ><span>Today</span>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn fab text small color="grey darken-2" @click="prev">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-toolbar-title v-show="!mobile">
            {{ title }}
          </v-toolbar-title>
          <v-btn fab text small color="grey darken-2" @click="next">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-menu bottom right>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                outlined
                color="grey darken-2"
                v-bind="attrs"
                :small="mobile"
                v-on="on"
              >
                <v-icon left :small="mobile">{{ typeToIcon[type] }}</v-icon>
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right :small="mobile">mdi-menu-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title
                  ><v-icon left>mdi-view-day</v-icon>Day</v-list-item-title
                >
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title
                  ><v-icon left>mdi-view-week</v-icon>Week</v-list-item-title
                >
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title
                  ><v-icon left>mdi-view-module</v-icon>Month</v-list-item-title
                >
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="sessions"
          :type="type"
          @click:more="viewDay"
          @click:date="viewDay"
          @change="updateRange"
        ></v-calendar>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    sessions: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      start: null,
      end: null,
      focus: '',
      type: 'month',
      typeToIcon: {
        month: 'mdi-view-module',
        week: 'mdi-view-week',
        day: 'mdi-view-day'
      },
      typeToLabel: {
        month: 'Month',
        week: 'Week',
        day: 'Day'
      }
    }
  },
  computed: {
    title() {
      const { start, end } = this
      if (!start || !end) {
        return ''
      }
      const startMonth = this.monthFormatter(start)
      const startYear = start.year
      return `${startMonth} ${startYear}`
    },
    monthFormatter() {
      return this.$refs.calendar.getFormatter({
        timeZone: 'UTC',
        month: 'long'
      })
    },
    mobile() {
      return this.$vuetify.breakpoint.xs
    }
  },
  methods: {
    viewDay({ date }) {
      this.focus = date
      this.type = 'day'
    },
    setToday() {
      this.focus = ''
    },
    prev() {
      this.$refs.calendar.prev()
    },
    next() {
      this.$refs.calendar.next()
    },
    updateRange({ start, end }) {
      this.start = start
      this.end = end
    },
    nth(d) {
      return d > 3 && d < 21
        ? 'th'
        : ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'][d % 10]
    }
  }
}
</script>

<style lang="scss">
.v-btn--fab.v-size--small {
  height: 30px;
  width: 30px;
}
.v-btn--fab.v-size--default {
  height: 30px;
  width: 30px;
}
</style>
