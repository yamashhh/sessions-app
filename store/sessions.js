import { db, firestore } from '@/plugins/firebase'

export const state = () => ({
  sessions: []
})

export const getters = {
  getSessions(state) {
    return state.sessions
  }
}

export const mutations = {
  SET_SESSIONS(state, sessions) {
    state.sessions = sessions
  }
}

export const actions = {
  addSession({ dispatch }, { uid, session }) {
    dispatch('overlay/switchOverlay', null, { root: true })
    const sessions = db
      .collection('users')
      .doc(uid)
      .collection('sessions')
    return sessions
      .add(session)
      .then(() => {
        dispatch('overlay/switchOverlay', null, { root: true })
      })
      .catch((e) => {
        console.log(e)
        dispatch('overlay/switchOverlay', null, { root: true })
      })
  },
  fetchSessions({ commit, dispatch }, { uid, dateObj }) {
    dispatch('overlay/switchOverlay', null, { root: true })
    try {
      const year = dateObj.getFullYear()
      const month = dateObj.getMonth()
      let pastYear = null
      let futureYear = null
      let pastMonth = null
      let futureMonth = null
      if (month === 0) {
        pastYear = year - 1
        futureYear = year
        pastMonth = 11
        futureMonth = 2
      } else if (month >= 10) {
        pastYear = year
        futureYear = year + 1
        pastMonth = month - 1
        month === 10 ? (futureMonth = 0) : (futureMonth = 1)
      } else {
        pastYear = year
        futureYear = year
        pastMonth = month - 1
        futureMonth = month + 2
      }
      const pastDate = firestore.Timestamp.fromDate(
        new Date(pastYear, pastMonth)
      )
      const futureDate = firestore.Timestamp.fromDate(
        new Date(futureYear, futureMonth)
      )
      const sessions = db
        .collection('users')
        .doc(uid)
        .collection('sessions')
      const query = sessions
        .where('start', '>=', pastDate)
        .where('start', '<', futureDate)
      return query
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
          dispatch('overlay/switchOverlay', null, { root: true })
        })
        .catch(() => {
          console.log('Error')
        })
    } catch (e) {
      console.log(e)
      dispatch('overlay/switchOverlay', null, { root: true })
    }
  }
}
