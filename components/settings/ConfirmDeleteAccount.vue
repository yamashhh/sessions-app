<template>
  <v-dialog v-model="dialog" persistent min-width="290" max-width="400">
    <template v-slot:activator="{ on, attrs }">
      <v-btn block color="error" v-bind="attrs" v-on="on">Delete account</v-btn>
    </template>
    <v-card>
      <v-toolbar color="error" dark>
        <v-toolbar-title
          >Delete Account: {{ user.displayName }}</v-toolbar-title
        >
      </v-toolbar>
      <v-card-text class="pt-5">
        All data related to this account will be permanently deleted.
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn depressed :disabled="deleting" @click="dialog = false"
          >Cancel</v-btn
        >
        <v-spacer></v-spacer>
        <v-btn
          depressed
          color="error"
          :loading="deleting"
          @click="deleteAccount"
          >Delete</v-btn
        >
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'ConfirmDeleteAccount',
  props: {
    user: {
      type: Object,
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
      deleteAccountAction: 'auth/deleteAccount'
    }),
    async deleteAccount() {
      console.log('methods deleteUser @ConfirmDeleteAccount')
      try {
        this.deleting = true
        await this.deleteAccountAction(this.user.uid)
        this.deleting = false
        this.dialog = false
        this.$router.push('/')
      } catch (e) {
        console.log(e)
        this.deleting = false
        this.dialog = false
        // this.$nuxt.$emit('updateSnackbar', 'error', e.message)
        if (e.code === 'auth/requires-recent-login') {
          // this.$router.push('/')
          this.$nuxt.error(e)
          this.$nuxt.$emit('signOut')
        } else {
          this.$nuxt.$emit('updateSnackbar', 'error', e.message)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
