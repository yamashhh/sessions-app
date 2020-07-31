export default function({ route, store, redirect }) {
  if (
    !store.getters['auth/signedIn'] &&
    (route.name === 'dashboard' || route.name === 'settings')
  ) {
    console.log('blocked')
    store.dispatch('sessions/clearSessions')
    redirect('/')
  }
}
