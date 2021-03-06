import Cookie from 'js-cookie'
import { auth } from '@/plugins/firebase'

export default ({ store, route, isDev }) => {
  if (route.name === 'sign-in') return
  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // Make a new object by extracting properties
        // from the original "user" object
        const { uid, displayName, photoURL } = user
        // Set cookie
        auth.currentUser
          .getIdToken()
          .then((token) =>
            Cookie.set('access_token', token, {
              secure: !isDev,
              sameSite: 'strict'
            })
          )
          .then(() =>
            store.dispatch('auth/setUser', { uid, displayName, photoURL })
          )
          .then(() => {
            resolve()
          })
          .catch((e) => reject(e))
      }
      resolve()
    })
  })
}
