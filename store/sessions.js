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
  },
  CLEAR_SESSIONS(state) {
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
    } catch (e) {
      return Promise.reject(e)
    }
  },
  async deleteSession({}, { uid, sessionId }) {
    const session = db
      .collection('users')
      .doc(uid)
      .collection('sessions')
      .doc(sessionId)
    try {
      await session.delete()
    } catch (e) {
      return Promise.reject(e)
    }
  },
  async fetchSessions({ commit }, { uid, dateObj }) {
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
      commit('SET_SESSIONS', sessions)
    } catch (e) {
      return Promise.reject(e)
    }
  },
  clearSessions({ commit }) {
    commit('CLEAR_SESSIONS')
  }
}
