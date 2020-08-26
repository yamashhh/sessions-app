<template>
  <v-sheet max-width="450" class="mx-auto">
    <v-row justify="center" align="center">
      <v-col :cols="mobile ? 12 : 6">
        <v-avatar size="64">
          <v-img :src="require('@/static/pics/my_pic.png')"> </v-img>
        </v-avatar>
      </v-col>
      <v-col :cols="mobile ? 12 : 6">
        <h3 class="title">Shogo Yamato</h3>
      </v-col>
      <v-col cols="12">
        <a href="https://github.com/yamashhh/sessions-app">
          <v-img
            alt="Github"
            height="40"
            contain
            :src="require('@/static/pics/GitHub_Logo.png')"
          >
          </v-img>
        </a>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script>
export default {
  name: 'MyProfile',
  computed: {
    mobile() {
      return this.$vuetify.breakpoint.xs
    }
  }
}
</script>

<style lang="scss" scoped></style>
