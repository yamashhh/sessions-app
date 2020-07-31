<template>
  <v-card-text class="pt-0">
    <v-list-item>
      <v-row>
        <v-col>
          <v-form ref="form">
            <v-text-field
              clearable
              :label="label"
              counter="30"
              append-outer-icon="mdi-plus-box"
            >
              <v-icon slot="prepend" :color="color">mdi-checkbox-blank</v-icon>
              <v-menu
                slot="append"
                v-model="menu"
                :close-on-content-click="false"
                offset-y
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-icon v-bind="attrs" v-on="on">mdi-palette</v-icon>
                </template>
                <v-color-picker
                  v-model="color"
                  show-swatches
                  width="250"
                  @input="(val) => (color = val)"
                ></v-color-picker>
              </v-menu>
            </v-text-field>
          </v-form>
        </v-col>
      </v-row>
    </v-list-item>
  </v-card-text>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    originalName: {
      type: String,
      default: ''
    },
    originalColor: {
      type: String,
      default: '#757575'
    }
  },
  data() {
    return {
      menu: false,
      name: '',
      color: ''
    }
  },
  mounted() {
    this.name = this.originalName
    this.color = this.originalColor
  }
}
</script>

<style lang="scss" scoped></style>
