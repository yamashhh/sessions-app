<template>
  <v-container>
    <h1>Settings</h1>
    <UserCard :user="user"></UserCard>
    <CategoriesCard
      :user="user"
      :categories="categories"
      :categories-length="categoriesLength"
      @fetchCategories="fetchCategories"
    ></CategoriesCard>
    <v-row>
      <v-col>
        <v-sheet max-width="600" class="mx-auto pa-2">
          <ConfirmDeleteAccount :user="user"
            >Delete account</ConfirmDeleteAccount
          >
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import UserCard from '@/components/settings/UserCard.vue'
import CategoriesCard from '@/components/settings/categories-card/CategoriesCard.vue'
import ConfirmDeleteAccount from '@/components/settings/ConfirmDeleteAccount.vue'

export default {
  name: 'Settings',
  components: {
    UserCard,
    CategoriesCard,
    ConfirmDeleteAccount
  },
  data() {
    return {
      dialog: false
    }
  },
  computed: {
    ...mapGetters({
      user: 'auth/getUser',
      categories: 'categories/getCategories',
      categoriesLength: 'categories/getCategoriesLength'
    })
  },
  async mounted() {
    try {
      await this.fetchCategoriesAction(this.user.uid)
      this.switchOverlay(false)
    } catch (e) {
      console.log(e.message)
      this.switchOverlay(false)
    }
  },
  methods: {
    ...mapActions({
      fetchCategoriesAction: 'categories/fetchCategories',
      switchOverlay: 'overlay/switchOverlay'
    }),
    async fetchCategories(uid) {
      console.log('fetchCategories @settings')
      this.switchOverlay(true)
      try {
        await this.fetchCategoriesAction(uid)
        this.switchOverlay(false)
      } catch (e) {
        console.log(e.message)
        this.switchOverlay(false)
      }
    }
  },
  head() {
    return {
      title: 'Settings'
    }
  }
}
</script>

<style lang="scss" scoped></style>
