import { auth } from '@/plugins/firebase'

export default (context) => {
  const { store } = context
  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged((user) => {
      console.log('onAuthStateChanged @plugins')
      if (user) {
        console.log('USER FOUND')
        // Make a new object from extracting properties
        // from the original "user" object
        const { uid, displayName } = user
        store
          .dispatch('auth/setUser', { uid, displayName })
          .then(() => {
            resolve()
          })
          .catch((e) => console.log(e))
      }
      resolve()
    })
  })
}