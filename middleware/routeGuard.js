export default function({ route, store, redirect }) {
  if (
    !store.getters['auth/signedIn'] &&
    (route.name === 'dashboard' || route.name === 'settings')
  ) {
    store.dispatch('auth/clearUser')
    redirect('/')
  }
}
