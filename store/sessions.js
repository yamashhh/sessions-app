import firebase from '@/plugins/firebase'

export const state = () => ({
  sessions: []
})

export const mutations = {
  SET_SESSION(state, session) {
    state.sessions.push(session)
  }
}

export const actions = {
  addSession({}, session) {
    const db = firebase.firestore()
    const sessions = db.collection('collection2')
    sessions
      .add(session)
      .then((response) => {
        alert('The ID returned from Firestore is:', response.id)
        console.log(response.id)
      })
      .catch((error) => alert(error))
  },
  getSessions({ commit }) {
    const db = firebase.firestore()
    const sessions = db.collection('collection2')
    return sessions.get().then((response) => {
      response.forEach((doc) => {
        const session = {
          id: doc.id,
          name: doc.data().name,
          start: doc
            .data()
            .start.toDate()
            .toISOString(),
          end: doc
            .data()
            .end.toDate()
            .toISOString(),
          totalTime: doc.data().totalTime
        }
        commit('SET_SESSION', session)
      })
    })
  }
}
