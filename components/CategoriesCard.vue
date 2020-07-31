<template>
  <v-row>
    <v-col>
      <v-card max-width="600" class="mx-auto">
        <v-card-title>Customize categories</v-card-title>
        <v-card-subtitle>{{ `${categories.length}/10` }}</v-card-subtitle>
        <v-card-text>
          <template v-for="(category, index) in categories">
            <v-list-item :key="index">
              <v-list-item-icon>
                <v-icon :color="category.color">mdi-checkbox-blank</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ category.name }}</v-list-item-title>
              <v-list-item-icon>
                <v-icon>mdi-cog</v-icon>
              </v-list-item-icon>
            </v-list-item>
          </template>
        </v-card-text>
        <CategoryEditor label="New Category"></CategoryEditor>
        <v-card-actions>
          <v-btn block>Reset categories</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import CategoryEditor from '@/components/CategoryEditor.vue'

export default {
  components: {
    CategoryEditor
  },
  props: {
    categories: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped></style>
