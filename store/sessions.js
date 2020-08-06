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
    console.log('commit SET_SESSIONS')
    state.sessions = sessions
    console.log('finished commit SET_SESSIONS')
  },
  CLEAR_SESSIONS(state) {
    console.log('mutation CLEAR_SESSIONS')
    state.sessions = []
  }
}

export const actions = {
  async addSession({}, { uid, session }) {
    const sessions = db
      .collection('users')
      .doc(uid)
      .collection('sessions')
    try {
      await sessions.add(session)
      console.log('finished adding session')
    } catch (e) {
      console.log(e)
      throw new Error('An error occurred while adding session to the server.')
    }
  },
  async deleteSession({}, { uid, sessionId }) {
    console.log('deleteSession @store/sessions')
    const session = db
      .collection('users')
      .doc(uid)
      .collection('sessions')
      .doc(sessionId)
    try {
      await session.delete()
      console.log('finished deleting session')
    } catch (e) {
      console.log(e)
      throw new Error(
        'An error occurred while deleting session from the server.'
      )
    }
  },
  async fetchSessions({ commit }, { uid, dateObj }) {
    console.log('action sessions/fetchSessions')
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
    const pastDate = firestore.Timestamp.fromDate(new Date(pastYear, pastMonth))
    const futureDate = firestore.Timestamp.fromDate(
      new Date(futureYear, futureMonth)
    )
    const sessionsRef = db
      .collection('users')
      .doc(uid)
      .collection('sessions')
    const query = sessionsRef
      .where('start', '>=', pastDate)
      .where('start', '<', futureDate)
    try {
      const response = await query.get()
      const sessions = []
      response.forEach((doc) => {
        sessions.push({
          sessionId: doc.id,
          name: doc.data().name,
          color: doc.data().color,
          start: doc.data().start.toDate(),
          end: doc.data().end.toDate(),
          totalTime: doc.data().totalTime,
          uid: doc.data().uid
        })
      })
      console.log('fetchSessions completed')
      commit('SET_SESSIONS', sessions)
    } catch (e) {
      console.log(e)
      throw new Error(
        'An error occurred while fetching sessions from the server.'
      )
    }
  },
  clearSessions({ commit }) {
    console.log('action clearSessions')
    commit('CLEAR_SESSIONS')
  }
}
