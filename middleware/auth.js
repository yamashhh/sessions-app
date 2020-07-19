export default function({ route, store, redirect }) {
  if (!store.getters['auth/signedIn'] && route.name === 'dashboard') {
    console.log('blocked')
    store.dispatch('sessions/clearSessions')
    redirect('/')
  }
}
