export const state = () => ({
  overlay: false
})

export const getters = {
  getOverlay(state) {
    return state.overlay
  }
}

export const mutations = {
  SWITCH_OVERLAY(state) {
    state.overlay = !state.overlay
  }
}

export const actions = {
  switchOverlay({ commit }) {
    return commit('SWITCH_OVERLAY')
  }
}
