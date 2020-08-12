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
    console.log('mutation SET_USER')
    state.user = user
  },
  CLEAR_USER(state) {
    console.log('mutation CLEAR_USER')
    state.user = null
  }
}

export const actions = {
  async setUser({ commit, dispatch, rootGetters }, user) {
    console.log('ACTION setUser')
    const docRef = db.collection('users').doc(user.uid)
    const doc = await docRef.get()
    if (!doc.exists) {
      const defaultCategories = rootGetters['categories/getDefault']
      try {
        await docRef.set({ uid: user.uid, categoriesLength: 0 })
        for (const elem of defaultCategories) {
          console.log('adding category: ', elem.name)
          const categoryId = elem.name
          const categoryData = { color: elem.color, uid: user.uid }
          const payload = { uid: user.uid, categoryId, categoryData }
          await dispatch('categories/addCategory', payload, { root: true })
        }
      } catch (e) {
        console.log(e)
        throw new Error('An error occurred while creating a user.')
      }
    }
    commit('SET_USER', user)
  },
  clearUser({ commit, dispatch }) {
    console.log('ACTION clearUser')
    commit('CLEAR_USER')
    dispatch('sessions/clearSessions', null, { root: true })
    dispatch('categories/clearCategories', null, { root: true })
  },
  async deleteUser({ dispatch }, uid) {
    console.log('ACTION deleteUser')
    const user = auth.currentUser
    if (user.uid === uid) {
      try {
        console.log('before user.delete')
        await user.delete()
        console.log('finished user.delete')
        dispatch('clearUser')
      } catch (e) {
        console.log(e.message)
      }
    }
  }
}
