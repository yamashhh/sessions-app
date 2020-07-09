import { auth } from '@/plugins/firebase'

export default function({ route, store, redirect }) {
  auth.onAuthStateChanged((user) => {
    console.log('onAuthStateChanged')
    console.log(user)
    if (user) {
      // Make a new object from extracting properties
      // from the original "user" object
      const { uid, displayName } = user
      store.dispatch('auth/setUser', { uid, displayName })
    }
  })
}
