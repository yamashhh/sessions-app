import { db } from '@/plugins/firebase'

export const state = () => ({
  categories: [],
  default: [
    { name: 'Focus', color: '#1976D2' },
    { name: 'Rest', color: '#FFC107' }
  ]
})

export const getters = {
  getCategories(state) {
    return state.categories
  },
  getDefault(state) {
    return state.default
  },
  getCategoriesLength(state) {
    return state.categories.length
  }
}

export const mutations = {
  SET_CATEGORIES(state, categories) {
    console.log('mutation SET_CATEGORIES')
    state.categories = categories
  },
  CLEAR_CATEGORIES(state) {
    console.log('mutation CLEAR_CATEGORIES')
    state.categories = []
  }
}

export const actions = {
  async addCategory({}, { uid, categoryId, categoryData }) {
    const categoriesRef = db
      .collection('users')
      .doc(uid)
      .collection('categories')
    try {
      await categoriesRef.doc(categoryId).set(categoryData)
      console.log('finished adding category: ', categoryId)
    } catch (e) {
      console.log(e)
      throw new Error('An error occurred while adding category to the server.')
    }
  },
  async updateCategory({}, { uid, categoryId, color }) {
    console.log('updateCategory @store/categories')
    const categoryRef = db
      .collection('users')
      .doc(uid)
      .collection('categories')
      .doc(categoryId)
    try {
      await categoryRef.update({ color })
      console.log('finished updating category: ', categoryId)
    } catch (e) {
      console.log(e)
      throw new Error(e.message)
    }
  },
  async deleteCategory({}, { uid, categoryId }) {
    console.log('deleting category: ', categoryId)
    const categoryRef = db
      .collection('users')
      .doc(uid)
      .collection('categories')
      .doc(categoryId)
    try {
      await categoryRef.delete()
      console.log('finished deleting category')
    } catch (e) {
      console.log(e)
      throw new Error(e.message)
    }
  },
  async updateCategoriesLength({ getters }, uid) {
    console.log('actions updateCategoriesLength')
    const userRef = db.collection('users').doc(uid)
    try {
      await userRef.update({
        categoriesLength: getters.getCategoriesLength
      })
      console.log(
        'finished updating category length: ',
        getters.getCategoriesLength
      )
    } catch (e) {
      console.log(e)
      throw new Error(e.message)
    }
  },
  async resetCategories({ getters, dispatch }, uid) {
    console.log('actions resetCategories')
    const currentCategories = getters.getCategories
    const defaultCategories = getters.getDefault
    try {
      if (currentCategories !== []) {
        for (const category of currentCategories) {
          await dispatch('deleteCategory', { uid, categoryId: category.name })
        }
      }
      for (const category of defaultCategories) {
        console.log(category.name, category.color)
        await dispatch('addCategory', {
          uid,
          categoryId: category.name,
          categoryData: { color: category.color, uid }
        })
      }
    } catch (e) {
      console.log(e)
      throw new Error(e.message)
    }
  },
  async fetchCategories({ commit, dispatch }, uid) {
    console.log('actions fetchCategories')
    try {
      const categories = []
      const categoriesRef = db
        .collection('users')
        .doc(uid)
        .collection('categories')
      const response = await categoriesRef.get()
      response.forEach((doc) => {
        categories.push({
          name: doc.id,
          color: doc.data().color,
          uid: doc.data().uid
        })
      })
      commit('SET_CATEGORIES', categories)
      await dispatch('updateCategoriesLength', uid)
    } catch (e) {
      console.log(e)
      throw new Error(
        'An error occurred while fetching categories from the server.'
      )
    }
  },
  clearCategories({ commit }) {
    console.log('action clearCategories')
    commit('CLEAR_CATEGORIES')
  }
}
