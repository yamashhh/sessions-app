<template>
  <v-container>
    <h1>Settings</h1>
    <UserCard :user="user"></UserCard>
    <CategoriesCard :categories="categories"></CategoriesCard>
    <v-row>
      <v-col>
        <v-sheet max-width="600" class="mx-auto pa-2">
          <v-btn block color="error">Delete account</v-btn>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import UserCard from '@/components/UserCard.vue'
import CategoriesCard from '@/components/CategoriesCard.vue'

export default {
  components: {
    UserCard,
    CategoriesCard
  },
  async fetch() {
    this.switchOverlay(true)
    try {
      await this.fetchCategories(this.user.uid)
      this.switchOverlay(false)
    } catch (e) {
      console.log(e.message)
      this.switchOverlay(false)
    }
  },
  data() {
    return {
      dialog: false
    }
  },
  computed: {
    ...mapGetters({
      user: 'auth/getUser',
      categories: 'categories/getCategories'
    })
  },
  methods: {
    ...mapActions({
      fetchCategories: 'categories/fetchCategories',
      switchOverlay: 'overlay/switchOverlay'
    })
  }
}
</script>

<style lang="scss" scoped></style>
