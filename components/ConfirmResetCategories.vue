<template>
  <v-dialog v-model="dialog" persistent min-width="290" max-width="400">
    <template v-slot:activator="{ on, attrs }">
      <v-btn block v-bind="attrs" v-on="on">
        Reset Categories
      </v-btn>
    </template>
    <v-card>
      <v-toolbar color="error" dark>
        <v-toolbar-title>Reset Categories</v-toolbar-title>
      </v-toolbar>
      <v-card-text class="pt-5">
        Categories will be reset to default.
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn depressed :disabled="resetting" @click="dialog = false"
          >Cancel</v-btn
        >
        <v-spacer></v-spacer>
        <v-btn
          depressed
          color="error"
          :loading="resetting"
          @click="resetCategories"
          >Reset</v-btn
        >
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      dialog: false,
      resetting: false
    }
  },
  methods: {
    ...mapActions({
      resetCategoriesAction: 'categories/resetCategories'
    }),
    async resetCategories() {
      console.log('resetCategories @ConfirmResetCategories')
      try {
        this.resetting = true
        await this.resetCategoriesAction(this.user.uid)
        this.resetting = false
        this.dialog = false
        this.$nuxt.$emit(
          'updateSnackbar',
          'primary',
          'Categories were reset to default.'
        )
        this.$emit('fetchCategories', this.user.uid)
      } catch (e) {
        this.resetting = false
        console.log(e)
        this.$nuxt.$emit('updateSnackbar', 'error', e.message)
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
