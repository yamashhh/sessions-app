// Method from YouTube tutorial "Manage users in your Nuxt SSR app with Firebase 🔥" by Kaizen Codes
// https://youtu.be/_-_bz5lH_fI
// https://github.com/Eckhardt-D/nuxt-fire-auth/blob/master/store/index.js

import JWTDecode from 'jwt-decode'
import cookieparser from 'cookieparser'

export const actions = {
  nuxtServerInit({ dispatch }, { req }) {
    if (process.server && process.static) return
    if (!req.headers.cookie) return

    const parsed = cookieparser.parse(req.headers.cookie)
    const accessTokenCookie = parsed.access_token

    if (!accessTokenCookie) return

    const decoded = JWTDecode(accessTokenCookie)
    if (decoded) {
      dispatch('auth/setUser', {
        uid: decoded.user_id,
        displayName: decoded.name,
        photoURL: decoded.picture
      })
    }
  }
}
