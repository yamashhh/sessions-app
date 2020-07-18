import { auth, db } from '@/plugins/firebase'

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
    state.user = user
  },
  LOGOUT(state) {
    console.log('mutation LOGOUT')
    state.user = null
  }
}

export const actions = {
  // signIn() {
  //   return new Promise((resolve, reject) => {
  //     auth
  //       .signInWithRedirect(googleAuth)
  //       .then(() => {
  //         // console.log('before dispatch setUser')
  //         // dispatch('setUser', response)
  //         // console.log('resolve signIn')
  //         resolve()
  //       })
  //       .catch((e) => reject(e))
  //   })
  // },
  async setUser({ commit }, user) {
    console.log('ACTION setUser')
    const docRef = db.collection('users').doc(user.uid)
    const doc = await docRef.get()
    if (!doc.exists) {
      try {
        await docRef.set({ uid: user.uid })
      } catch (e) {
        console.log('Error: ', e)
      }
    }
    commit('SET_USER', user)
  },
  async signOut({ commit, dispatch }) {
    console.log('ACTION logout')
    try {
      await auth.signOut()
      await commit('LOGOUT')
      await dispatch('sessions/clearSessions', null, { root: true })
    } catch (e) {
      console.log(e)
    }
  }
}
