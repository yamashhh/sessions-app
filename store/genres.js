export const state = () => ({
  genres: ['Focus', 'Rest']
})

export const getters = {
  getGenres: (state) => {
    return state.genres
  }
}
