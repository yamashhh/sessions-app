<template>
  <v-row>
    <v-col>
      <v-card max-width="600" class="mx-auto">
        <v-list-item>
          <v-list-item-avatar color="grey" size="48">
            <v-img
              v-if="user.photoURL"
              :src="user.photoURL"
              :alt="user.displayName"
            ></v-img>
            <v-icon v-else>mdi-account</v-icon>
          </v-list-item-avatar>
          <v-list-item-title class="title">{{
            user.displayName
          }}</v-list-item-title>
        </v-list-item>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped></style>
