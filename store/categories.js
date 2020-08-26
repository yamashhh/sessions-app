import { db } from '@/plugins/firebase'

export const state = () => ({
  categories: [],
  default: [
    { name: 'Focus', color: '#1976D2' },
    { name: 'Rest', color: '#FB8C00' }
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
    state.categories = categories
  },
  CLEAR_CATEGORIES(state) {
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
    } catch (e) {
      return Promise.reject(e)
    }
  },
  async updateCategory({}, { uid, categoryId, color }) {
    const categoryRef = db
      .collection('users')
      .doc(uid)
      .collection('categories')
      .doc(categoryId)
    try {
      await categoryRef.update({ color })
    } catch (e) {
      return Promise.reject(e)
    }
  },
  async deleteCategory({}, { uid, categoryId }) {
    const categoryRef = db
      .collection('users')
      .doc(uid)
      .collection('categories')
      .doc(categoryId)
    try {
      await categoryRef.delete()
    } catch (e) {
      return Promise.reject(e)
    }
  },
  async updateCategoriesLength({ getters }, uid) {
    const userRef = db.collection('users').doc(uid)
    try {
      await userRef.update({
        categoriesLength: getters.getCategoriesLength
      })
    } catch (e) {
      return Promise.reject(e)
    }
  },
  async resetCategories({ getters, dispatch }, uid) {
    const currentCategories = getters.getCategories
    const defaultCategories = getters.getDefault
    try {
      if (currentCategories !== []) {
        for (const category of currentCategories) {
          await dispatch('deleteCategory', { uid, categoryId: category.name })
        }
      }
      for (const category of defaultCategories) {
        await dispatch('addCategory', {
          uid,
          categoryId: category.name,
          categoryData: { color: category.color, uid }
        })
      }
    } catch (e) {
      return Promise.reject(e)
    }
  },
  async fetchCategories({ commit, dispatch }, uid) {
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
      return Promise.reject(e)
    }
  },
  clearCategories({ commit }) {
    commit('CLEAR_CATEGORIES')
  }
}
