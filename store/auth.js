import { auth } from '@/plugins/firebase'

export const state = () => ({
  user: null
})

export const getters = {
  getUser(state) {
    return state.user
  },
  loggedIn(state) {
    return !!state.user
  }
}

export const mutations = {
  SET_USER(state, user) {
    console.log('mutation SET_USER')
    state.loggedIn = true
    state.user = user
  },
  LOGOUT(state) {
    console.log('mutation LOGOUT')
    state.loggedIn = false
    state.user = null
  }
}

export const actions = {
  setUser({ commit }, user) {
    console.log('ACTION setUser')
    commit('SET_USER', user)
  },
  async logout({ commit }) {
    console.log('ACTION logout')
    try {
      console.log('before auth.signOut()')
      await auth.signOut()
      console.log('logged out')
      return commit('LOGOUT')
    } catch (e) {
      console.log(e)
    }
  }
}
