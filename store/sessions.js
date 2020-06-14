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
    const sessions = db.collection('collection1')
    sessions
      .add(session)
      .then((response) => {
        console.log('The ID returned from Firestore is:', response.id)
        console.log(response)
      })
      .catch((error) => console.log(error))
  },
  getSessions({ commit }) {
    const db = firebase.firestore()
    const sessions = db.collection('collection1')
    return sessions.get().then((response) => {
      response.forEach((doc) => {
        const session = {
          id: doc.id,
          genre: doc.data().genre,
          date: doc.data().date.toDate(),
          totalTime: doc.data().totalTime
        }
        commit('SET_SESSION', session)
      })
    })
  }
}
