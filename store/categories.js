import { db } from '@/plugins/firebase'

export const state = () => ({
  categories: [],
  default: [
    { name: 'Focus', color: 'primary' },
    { name: 'Rest', color: 'warning' }
  ]
})

export const getters = {
  getCategories(state) {
    return state.categories
  },
  getDefault(state) {
    return state.default
  }
}

export const mutations = {
  SET_CATEGORIES(state, categories) {
    console.log('mutation SET_CATEGORIES')
    state.categories = categories
  }
}

export const actions = {
  async fetchCategories({ commit, dispatch }, uid) {
    console.log('actions fetchCategories')
    try {
      const user = db.collection('users').doc(uid)
      const document = await user.get()
      console.log(document.data().categories)
      commit('SET_CATEGORIES', document.data().categories)
    } catch (e) {
      console.log(e.message)
    }
  }
}
