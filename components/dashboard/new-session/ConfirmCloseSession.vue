<template>
  <v-dialog v-model="dialog" persistent min-width="290" max-width="400">
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on" @click="initialClose">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-toolbar color="error" dark>
        <v-toolbar-title>Close Session</v-toolbar-title>
      </v-toolbar>
      <v-card-text class="pt-5">
        This session will not be saved.
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn depressed @click="dialog = false">Cancel</v-btn>
        <v-spacer></v-spacer>
        <v-btn depressed color="error" @click="closeDialog">Close</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    timerState: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      dialog: false
    }
  },
  methods: {
    initialClose() {
      if (this.timerState === 'initial') {
        console.log('methods initialClose @confirmclosedialog')
        this.closeDialog()
      }
    },
    closeDialog() {
      console.log('methods closeDialog @confirmclosedialog')
      this.dialog = false
      this.$emit('closeDialog')
    }
  }
}
</script>

<style lang="scss" scoped></style>
