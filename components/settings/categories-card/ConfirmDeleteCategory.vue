<template>
  <v-dialog v-model="dialog" persistent min-width="290" max-width="400">
    <template v-slot:activator="{ on, attrs }">
      <v-icon v-bind="attrs" v-on="on">mdi-delete</v-icon>
    </template>
    <v-card>
      <v-toolbar color="error" dark>
        <v-toolbar-title>Delete Category: {{ category }}</v-toolbar-title>
      </v-toolbar>
      <v-card-text class="pt-5">
        Any changes made to this category will not be saved.
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn depressed :disabled="deleting" @click="dialog = false">
          Cancel
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          depressed
          color="error"
          :loading="deleting"
          @click="deleteCategory"
        >
          Delete
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'ConfirmDeleteCategory',
  props: {
    user: {
      type: Object,
      required: true
    },
    category: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      dialog: false,
      deleting: false
    }
  },
  methods: {
    ...mapActions({
      deleteCategoryAction: 'categories/deleteCategory'
    }),
    async deleteCategory() {
      try {
        this.deleting = true
        await this.deleteCategoryAction({
          uid: this.user.uid,
          categoryId: this.category
        })
        this.deleting = false
        this.dialog = false
        this.$nuxt.$emit('updateSnackbar', 'primary', 'Category is deleted.')
        this.$emit('fetchCategories', this.user.uid)
      } catch (e) {
        this.deleting = false
        this.$nuxt.$emit('updateSnackbar', 'error', e.message)
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
