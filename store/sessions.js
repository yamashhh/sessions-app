import firebase from '@/plugins/firebase'

export const state = () => ({
  sessions: []
})

export const getters = {
  getSessions: (state) => {
    return state.sessions
  }
}

export const mutations = {
  SET_SESSIONS(state, sessions) {
    state.sessions = sessions
  }
}

export const actions = {
  addSession({ dispatch }, session) {
    const db = firebase.firestore()
    const sessions = db.collection('collection2')
    return sessions
      .add(session)
      .then((response) => {
        console.log(response)
      })
      .catch((error) => console.log(error))
  },
  fetchSessions({ commit }) {
    const db = firebase.firestore()
    const sessions = db.collection('collection2')
    return sessions
      .get()
      .then((response) => {
        const sessions = []
        response.forEach((doc) => {
          sessions.push({
            id: doc.id,
            name: doc.data().name,
            start: doc.data().start.toDate(),
            end: doc.data().end.toDate(),
            totalTime: doc.data().totalTime
          })
        })
        commit('SET_SESSIONS', sessions)
      })
      .catch(() => console.log('Error'))
  }
}
