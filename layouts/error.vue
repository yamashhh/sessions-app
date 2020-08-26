<template>
  <!-- <v-app dark> -->
  <v-container>
    <v-sheet max-width="600" class="mx-auto">
      <v-row align="center" justify="center">
        <v-col class="text-center">
          <v-icon size="120">
            {{
              error.statusCode === 404
                ? 'mdi-help-circle-outline'
                : error.code === 'auth/requires-recent-login'
                ? 'mdi-alert-circle-outline'
                : 'mdi-emoticon-dead-outline'
            }}
          </v-icon>
        </v-col>
      </v-row>
      <v-row align="center" justify="center">
        <v-col>
          <h1 class="text-center">
            {{
              error.statusCode === 404
                ? error.statusCode
                : error.code === 'auth/requires-recent-login'
                ? 'Please sign in again'
                : `${error.statusCode} - ${otherError}`
            }}
          </h1>
        </v-col>
      </v-row>
      <v-row align="center" justify="center">
        <v-col>
          <p class="text-center my-auto">
            {{
              error.statusCode === 404
                ? pageNotFound
                : error.code === 'auth/requires-recent-login'
                ? 'This operation is sensitive and requires recent authentication.'
                : error.message
            }}
          </p>
        </v-col>
      </v-row>
      <v-row align="center" justify="center">
        <v-col class="text-center">
          <v-btn color="primary" to="/" nuxt>
            <v-icon left>mdi-home</v-icon>
            Return to home
          </v-btn>
        </v-col>
      </v-row>
    </v-sheet>
  </v-container>
  <!-- </v-app> -->
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      pageNotFound: 'Page not found',
      otherError: 'Something went wrong...'
    }
  },
  computed: {
    mobile() {
      return this.$vuetify.breakpoint.xs
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>
/* h1 {
  font-size: 20px;
} */
</style>
