import { db } from '@/plugins/firebase'

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
    const sessions = db.collection('collection2')
    return sessions
      .add(session)
      .then(() => {})
      .catch((error) => console.log(error))
  },
  fetchSessions({ commit }) {
    const sessions = db.collection('collection2')
    return sessions
      .get()
      .then((response) => {
        const sessions = []
        response.forEach((doc) => {
          const endMillis = doc.data().end.toMillis()
          const totalTime = doc.data().totalTime
          const start = new Date(endMillis - totalTime)
          sessions.push({
            id: doc.id,
            name: doc.data().name,
            start,
            end: doc.data().end.toDate(),
            totalTime: doc.data().totalTime
          })
        })
        commit('SET_SESSIONS', sessions)
      })
      .catch(() => console.log('Error'))
  }
}
