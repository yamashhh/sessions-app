import { auth, db } from '@/plugins/firebase'

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
    state.user = user
  },
  CLEAR_USER(state) {
    state.user = null
  }
}

export const actions = {
  async setUser({ commit, dispatch, rootGetters }, user) {
    const docRef = db.collection('users').doc(user.uid)
    if (process.client) {
      try {
        const doc = await docRef.get()
        if (!doc.exists) {
          const defaultCategories = rootGetters['categories/getDefault']
          await docRef.set({ uid: user.uid, categoriesLength: 0 })
          for (const elem of defaultCategories) {
            const categoryId = elem.name
            const categoryData = { color: elem.color, uid: user.uid }
            const payload = { uid: user.uid, categoryId, categoryData }
            await dispatch('categories/addCategory', payload, { root: true })
          }
        }
      } catch (e) {
        return Promise.reject(e)
      }
    }
    commit('SET_USER', user)
  },
  clearUser({ commit, dispatch }) {
    commit('CLEAR_USER')
    dispatch('sessions/clearSessions', null, { root: true })
    dispatch('categories/clearCategories', null, { root: true })
  },
  async deleteAccount({ dispatch }, uid) {
    const user = auth.currentUser
    if (user.uid === uid) {
      try {
        await user.delete()
        dispatch('clearUser')
      } catch (e) {
        return Promise.reject(e)
      }
    }
  }
}
