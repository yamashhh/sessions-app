<template>
  <v-row>
    <v-col>
      <v-card max-width="600" class="mx-auto">
        <v-card-title>Customize categories</v-card-title>
        <v-card-subtitle>{{ `${categories.length}/10` }}</v-card-subtitle>
        <template v-for="category in categories">
          <CategoryEditor
            :key="`${category.name}${category.color}`"
            type="edit"
            :user="user"
            :categories="categories"
            :categories-length="categoriesLength"
            :original-name="category.name"
            :original-color="category.color"
            @fetchCategories="fetchCategories"
          ></CategoryEditor>
        </template>
        <CategoryEditor
          type="new"
          label="New Category"
          :user="user"
          :categories="categories"
          :categories-length="categoriesLength"
          @fetchCategories="fetchCategories"
        ></CategoryEditor>
        <v-card-actions>
          <ConfirmResetCategories
            :user="user"
            @fetchCategories="fetchCategories"
          ></ConfirmResetCategories>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import CategoryEditor from '@/components/settings/categories-card/CategoryEditor.vue'
import ConfirmResetCategories from '@/components/settings/categories-card/ConfirmResetCategories.vue'

export default {
  components: {
    CategoryEditor,
    ConfirmResetCategories
  },
  props: {
    user: {
      type: Object,
      required: true
    },
    categories: {
      type: Array,
      required: true
    },
    categoriesLength: {
      type: Number,
      required: true
    }
  },
  methods: {
    fetchCategories(uid) {
      this.$emit('fetchCategories', uid)
    }
  }
}
</script>

<style lang="scss" scoped></style>
