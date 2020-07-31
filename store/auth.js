import { db } from '@/plugins/firebase'

export const state = () => ({
  user: null
})

export const getters = {
  getUser(state) {
    return state.user
  },
  signedIn(state) {
    return !!state.user
  }
}

export const mutations = {
  SET_USER(state, user) {
    console.log('mutation SET_USER')
    state.user = user
  },
  CLEAR_USER(state) {
    console.log('mutation CLEAR_USER')
    state.user = null
  }
}

export const actions = {
  async setUser({ commit, rootGetters }, user) {
    console.log('ACTION setUser')
    const docRef = db.collection('users').doc(user.uid)
    const doc = await docRef.get()
    if (!doc.exists) {
      const defaultCategories = rootGetters['categories/getDefault']
      try {
        await docRef.set({ uid: user.uid, categories: defaultCategories })
      } catch (e) {
        console.log('Error: ', e)
      }
    }
    commit('SET_USER', user)
  },
  clearUser({ commit, dispatch }) {
    console.log('ACTION clearUser')
    commit('CLEAR_USER')
    dispatch('sessions/clearSessions', null, { root: true })
  }
}
