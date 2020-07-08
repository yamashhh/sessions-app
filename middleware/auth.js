import { auth } from '@/plugins/firebase'

export default function({ route, store, redirect }) {
  auth.onAuthStateChanged((user) => {
    if (user) {
      console.log(user)
      store.dispatch('auth/setUser', user)
    } else if (route.name !== '/') {
      redirect('/')
    }
  })
}
