<template>
  <v-container>
    <v-row justify="center" align="center" style="height: 70vh;">
      <v-col class="text-center" cols="12">
        <h1 class="display-3 font-weight-bold font-italic">Sessions</h1>
        <p class="display-1 font-weight-medium font-italic">
          A simple activity recording tool
        </p>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col
        v-for="(content, i) of demoContent"
        :key="i"
        cols="12"
        sm="6"
        lg="4"
      >
        <DemoCard :content="content"></DemoCard>
      </v-col>
    </v-row>
    <v-row justify="center" align="center" style="height: 45vh;">
      <v-col class="text-center" cols="12">
        <h2 class="display-1 font-weight-bold font-italic">
          Start your session now!
        </h2>
        <v-btn
          v-if="!signedIn"
          color="primary"
          width="200"
          class="mt-4"
          to="/sign-in"
          nuxt
        >
          <v-icon left>mdi-login</v-icon>Sign in
        </v-btn>
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col class="text-center" cols="12">
        <h2 class="headline font-weight-bold">Made With</h2>
      </v-col>
      <v-col
        v-for="(elem, i) of iconSet"
        :key="i"
        class="text-center"
        cols="12"
        sm="4"
      >
        <MadeWithIcon :elem="elem"></MadeWithIcon>
      </v-col>
    </v-row>
    <v-row justify="center" align="center" style="height: 35vh;">
      <v-col class="text-center" cols="12">
        <h2 class="display-2 font-weight-medium">
          <a
            href="https://www.edx.org/course/cs50s-introduction-to-computer-science"
          >
            CS50
          </a>
        </h2>
        <p class="body-2">
          This web page is my final project for
          <a
            href="https://www.edx.org/course/cs50s-introduction-to-computer-science"
          >
            <span class="font-italic">
              "CS50's Introduction to Computer Science"
            </span>
            on edX.
          </a>
        </p>
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col class="text-center" cols="12">
        <h2 class="headline font-weight-bold">A project by</h2>
        <MyProfile></MyProfile>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import DemoCard from '@/components/index/DemoCard.vue'
import MadeWithIcon from '@/components/index/MadeWithIcon.vue'
import MyProfile from '@/components/index/MyProfile.vue'

export default {
  name: 'Index',
  components: {
    DemoCard,
    MadeWithIcon,
    MyProfile
  },
  data() {
    return {
      demoContent: [
        {
          title: 'Visualize daily activities',
          picture: {
            src: [
              require('@/static/pics/calendar-pics/calendar_month.png'),
              require('@/static/pics/calendar-pics/calendar_week.png'),
              require('@/static/pics/calendar-pics/calendar_day.png')
            ],
            height: 400
          },
          text:
            'The dashboard has a built-in calendar which can be switched between monthly, weekly, and daily views.'
        },
        {
          title: 'Record new sessions',
          picture: {
            src: require('@/static/pics/new_session.png'),
            height: 400
          },
          text:
            'A new session can be recorded from the button at the bottom right corner of the dashboard.'
        },
        {
          title: 'Customizable categories',
          picture: {
            src: require('@/static/pics/settings.png'),
            height: 400
          },
          text:
            'Create and edit up to 10 categories, each with variable colors.'
        },
        {
          title: 'Easy authentication',
          picture: {
            class: 'ma-auto',
            src: require('@/static/pics/btn_google_signin_light_normal_web@2x.png'),
            width: 250
          },
          text: 'Only a Google account is required to sign in.'
        }
      ],
      iconSet: [
        {
          href: 'https://nuxtjs.org/',
          size: '35%',
          icons: ['$NuxtJSIcon', '$NuxtJSTypo']
        },
        {
          href: 'https://vuetifyjs.com/en/',
          size: '25%',
          icons: ['$VuetifyIcon']
        },
        {
          href: 'https://firebase.google.com/',
          size: '75%',
          icons: ['$FirebaseIcon']
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      signedIn: 'auth/signedIn'
    })
  },
  head() {
    return {
      title: 'Home'
    }
  }
}
</script>

<style lang="scss">
// Workaround for the default Vuetify behavior of
// words breaking inside VCard component
// https://github.com/vuetifyjs/vuetify/issues/9130
.v-card__text,
.v-card__title {
  word-break: normal;
}

.v-application a {
  color: #000;
  text-decoration: none;
}
</style>
