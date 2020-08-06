<template>
  <v-dialog v-model="dialog" persistent max-width="300px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn block v-bind="attrs" color="primary" v-on="on">
        New Category
      </v-btn>
    </template>
    <v-card>
      <v-toolbar color="primary" dark>
        <v-toolbar-title>New Category</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <!-- <v-list-item>
        <v-row>
          <v-col>
            <v-list-item-title>
              Category Color
            </v-list-item-title>
            <v-row>
              <v-col>
                <v-color-picker
                  show-swatches
                  class="mx-auto"
                  width="250"
                ></v-color-picker>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-list-item> -->
      <v-list-item>
        <v-form ref="form">
          <v-text-field clearable counter="30" append-icon="mdi-palette">
            <v-icon slot="prepend">mdi-checkbox-blank</v-icon></v-text-field
          >
        </v-form>
      </v-list-item>
      <v-card-actions>
        <v-btn block>save</v-btn>
      </v-card-actions>
      <!-- <v-card-actions>
        <v-btn block>delete</v-btn>
      </v-card-actions> -->
    </v-card>
  </v-dialog>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
