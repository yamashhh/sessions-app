<template>
  <v-card-text class="pt-0">
    <v-list-item>
      <v-row>
        <v-col>
          <v-form ref="form" lazy-validation>
            <v-text-field
              v-model="name"
              :label="label"
              :placeholder="originalName"
              :counter="max"
              :rules="rules"
              :disabled="disabled"
              :loading="saving"
              @focus="resetValidation"
              @blur="resetValidation"
            >
              <v-icon slot="prepend" :color="color" :disabled="disabled">
                mdi-checkbox-blank
              </v-icon>
              <v-menu
                slot="prepend-inner"
                v-model="menu"
                :close-on-content-click="false"
                offset-y
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    v-bind="attrs"
                    :disabled="disabled"
                    :color="color"
                    v-on="on"
                  >
                    mdi-palette
                  </v-icon>
                </template>
                <v-color-picker
                  v-model="color"
                  show-swatches
                  width="250"
                  @input="(val) => (color = val)"
                ></v-color-picker>
              </v-menu>
              <v-icon
                slot="append"
                :disabled="disabled || editSaveGuard"
                @click="clearData"
              >
                mdi-undo
              </v-icon>
              <v-icon
                slot="append-outer"
                :disabled="disabled || editSaveGuard"
                @click="save"
              >
                {{ icon }}
              </v-icon>
              <ConfirmDeleteCategory
                v-if="type === 'edit'"
                slot="append-outer"
                :user="user"
                :category="originalName"
                @fetchCategories="fetchCategories"
              ></ConfirmDeleteCategory>
            </v-text-field>
          </v-form>
        </v-col>
      </v-row>
    </v-list-item>
  </v-card-text>
</template>

<script>
import { mapActions } from 'vuex'
import ConfirmDeleteCategory from '@/components/settings/categories-card/ConfirmDeleteCategory.vue'

export default {
  name: 'CategoryEditor',
  components: {
    ConfirmDeleteCategory
  },
  props: {
    type: {
      type: String,
      required: true,
      validator(value) {
        return ['new', 'edit'].includes(value)
      }
    },
    label: {
      type: String,
      default: ''
    },
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
      color: '',
      max: 30,
      rules: [
        (v) => (v || '').length > 0 || `The category name is required.`,
        (v) =>
          (v || '').length <= this.max ||
          `The category name must be ${this.max} characters or less.`,
        (v) => !/^\s+$/.test(v) || `The category name is invalid.`,
        (v) => {
          if (!v) v = ''
          return (
            this.categories.every(
              (elem) => elem.name.toLowerCase() !== v.toLowerCase()
            ) ||
            v === this.originalName ||
            `This category already exists.`
          )
        }
      ],
      saving: false
    }
  },
  computed: {
    disabled() {
      if (this.type === 'new') {
        return this.saving || this.categoriesLength >= 10
      } else {
        return this.saving
      }
    },
    editSaveGuard() {
      return (
        this.name === this.originalName && this.color === this.originalColor
      )
    },
    icon() {
      return this.type === 'edit' ? 'mdi-content-save' : 'mdi-plus-box'
    }
  },
  mounted() {
    this.name = this.originalName
    this.color = this.originalColor
  },
  methods: {
    ...mapActions({
      addCategory: 'categories/addCategory',
      updateCategory: 'categories/updateCategory',
      deleteCategory: 'categories/deleteCategory'
    }),
    validateTextField() {
      return this.$refs.form.validate()
    },
    validateColor() {
      return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(this.color)
    },
    validate() {
      return this.validateTextField() && this.validateColor()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    async save() {
      if (!this.validate()) {
        return false
      } else if (this.type === 'new') {
        await this.newSave()
      } else if (this.type === 'edit') {
        await this.editSave()
      }
    },
    async newSave() {
      try {
        this.saving = true
        await this.addCategory({
          uid: this.user.uid,
          categoryId: this.name,
          categoryData: { color: this.color, uid: this.user.uid }
        })
        this.saving = false
        this.clearData()
        this.$nuxt.$emit('updateSnackbar', 'primary', 'Category is saved.')
        this.fetchCategories(this.user.uid)
      } catch (e) {
        this.saving = false
        this.$nuxt.$emit('updateSnackbar', 'error', e.message)
      }
    },
    async editSave() {
      try {
        this.saving = true
        if (this.name === this.originalName) {
          await this.updateCategory({
            uid: this.user.uid,
            categoryId: this.name,
            color: this.color
          })
        } else {
          await this.deleteCategory({
            uid: this.user.uid,
            categoryId: this.originalName
          })
          await this.addCategory({
            uid: this.user.uid,
            categoryId: this.name,
            categoryData: { color: this.color, uid: this.user.uid }
          })
        }
        this.saving = false
        this.$nuxt.$emit('updateSnackbar', 'primary', 'Category is updated.')
        this.fetchCategories(this.user.uid)
      } catch (e) {
        this.saving = false
        this.$nuxt.$emit('updateSnackbar', 'error', e.message)
      }
    },
    clearData() {
      this.name = this.originalName
      this.color = this.originalColor
      this.resetValidation()
    },
    fetchCategories(uid) {
      this.$emit('fetchCategories', uid)
    }
  }
}
</script>

<style lang="scss" scoped></style>
